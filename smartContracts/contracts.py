from pyteal import *

# constant for global state key
user_key = Bytes("user")                    
taskComplete_key = Bytes("taskComplete")     
rewardAmount_key = Bytes("rewardAmount")     

@Subroutine(TealType.none)
def sendReward(account: Expr, amount: Expr) -> Expr:
    return Seq(
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.Payment,
            TxnField.amount: amount,
            TxnField.receiver: account
        }),
        InnerTxnBuilder.Submit(),
    )

def approval_program():

    on_create = Seq(
        App.globalPut(user_key, Txn.application_args[0]),
        App.globalPut(taskComplete_key, Int(0)),
        App.globalPut(rewardAmount_key, Btoi(Txn.application_args[1])),
        Approve()
    )


    on_complete_task = Seq(
        Assert(App.globalGet(taskComplete_key) == Int(0)), 
        App.globalPut(taskComplete_key, Int(1)),
        sendReward(App.globalGet(user_key), App.globalGet(rewardAmount_key)),
        Approve()
    )


    on_call = Cond(
        [Txn.application_args[0] == Bytes("complete"), on_complete_task]
    )


    on_delete = Approve()


    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, on_call],
        [Txn.on_completion() == OnComplete.DeleteApplication, on_delete],
        [
            Or(
                Txn.on_completion() == OnComplete.OptIn,
                Txn.on_completion() == OnComplete.CloseOut,
                Txn.on_completion() == OnComplete.UpdateApplication,
            ),
            Reject()
        ]
    )

    return program

def clear_state_program():
    return Approve()

if __name__ == "__main__":
    with open("rewardApproval.teal", "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
        f.write(compiled)

    with open("rewardClearState.teal", "w") as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
        f.write(compiled)