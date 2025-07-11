from typing import Tuple
from algosdk.v2client.algod import AlgodClient
from algosdk import transaction
from algosdk import encoding

from account import Account
from contracts import approval_program, clear_state_program
from util import waitForTransaction, fullyCompileContract

APPROVAL_PROGRAM = b""
CLEAR_STATE_PROGRAM = b""


def getContracts(client: AlgodClient) -> Tuple[bytes, bytes]:
    global APPROVAL_PROGRAM, CLEAR_STATE_PROGRAM

    if not APPROVAL_PROGRAM:
        APPROVAL_PROGRAM = fullyCompileContract(client, approval_program())
        CLEAR_STATE_PROGRAM = fullyCompileContract(client, clear_state_program())

    return APPROVAL_PROGRAM, CLEAR_STATE_PROGRAM


def createRewardApp(
    client: AlgodClient,
    creatorMnemonic: str,
    taskDoerAddress: str,
    rewardAmount: int
) -> int:
    creator = Account.fromMnemonic(creatorMnemonic)
    approval, clear = getContracts(client)

    globalSchema = transaction.StateSchema(num_uints=2, num_byte_slices=2)
    localSchema = transaction.StateSchema(num_uints=0, num_byte_slices=0)

    app_args = [
        encoding.decode_address(taskDoerAddress),
        rewardAmount.to_bytes(8, "big")
    ]

    txn = transaction.ApplicationCreateTxn(
        sender=creator.getAddress(),
        on_complete=transaction.OnComplete.NoOpOC,
        approval_program=approval,
        clear_program=clear,
        global_schema=globalSchema,
        local_schema=localSchema,
        app_args=app_args,
        sp=client.suggested_params(),
    )

    signedTxn = txn.sign(creator.getPrivateKey())
    txID = client.send_transaction(signedTxn)
    response = waitForTransaction(client, txID)

    return response.applicationIndex


def completeTask(client: AlgodClient, appID: int, userMnemonic: str):
    user = Account.fromMnemonic(userMnemonic)

    txn = transaction.ApplicationNoOpTxn(
        sender=user.getAddress(),
        index=appID,
        app_args=[b"complete"],
        sp=client.suggested_params()
    )

    signedTxn = txn.sign(user.getPrivateKey())
    client.send_transaction(signedTxn)
    waitForTransaction(client, signedTxn.get_txid())
