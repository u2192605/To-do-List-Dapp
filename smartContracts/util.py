from typing import Any, Dict, List, Optional, Union
from base64 import b64decode

from algosdk.v2client.algod import AlgodClient
from pyteal import compileTeal, Mode, Expr


class PendingTxnResponse:
    def __init__(self, response: Dict[str, Any]) -> None:
        self.txn: Dict[str, Any] = response.get("txn", {})
        self.applicationIndex: Optional[int] = response.get("application-index")
        self.confirmedRound: Optional[int] = response.get("confirmed-round")


def waitForTransaction(
    client: AlgodClient, txID: str, timeout: int = 10
) -> PendingTxnResponse:
    status = client.status()
    lastRound = status["last-round"]
    startRound = lastRound

    while lastRound < startRound + timeout:
        pending_txn = client.pending_transaction_info(txID)

        if pending_txn.get("confirmed-round", 0) > 0:
            return PendingTxnResponse(pending_txn)

        pool_error = pending_txn.get("pool-error")
        if pool_error:
            raise Exception(f"Pool error: {pool_error}")

        client.status_after_block(lastRound + 1)
        lastRound += 1

    raise Exception(f"Transaction {txID} not confirmed after {timeout} rounds")


def fullyCompileContract(client: AlgodClient, contract: Expr) -> bytes:
    teal = compileTeal(contract, mode=Mode.Application, version=5)
    response = client.compile(teal)
    return b64decode(response["result"])


def decodeState(stateArray: List[Dict[str, Any]]) -> Dict[bytes, Union[int, bytes]]:
    state: Dict[bytes, Union[int, bytes]] = {}

    for pair in stateArray:
        key = b64decode(pair["key"])
        val = pair["value"]
        val_type = val["type"]

        if val_type == 2:
            state[key] = val.get("uint", 0)
        elif val_type == 1:
            state[key] = b64decode(val.get("bytes", ""))
        else:
            raise Exception(f"Unexpected state type: {val_type}")

    return state


def getAppGlobalState(client: AlgodClient, appID: int) -> Dict[bytes, Union[int, bytes]]:
    app_info = client.application_info(appID)
    state_array = app_info["params"].get("global-state", [])
    return decodeState(state_array)
