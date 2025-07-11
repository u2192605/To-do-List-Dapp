import sys
import json
import os
from algosdk.v2client import algod
from dotenv import load_dotenv
from operations import createRewardApp

load_dotenv()

ALGOD_ADDRESS = os.getenv("ALGOD_ADDRESS")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN")
ADMIN_MNEMONIC = os.getenv("ADMIN_MNEMONIC")

def main():
    try:
        task_doer_address = sys.argv[1]
        reward_amount = int(sys.argv[2])

        client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)

        app_id = createRewardApp(
            client=client,
            creatorMnemonic=ADMIN_MNEMONIC,
            taskDoerAddress=task_doer_address,
            rewardAmount=reward_amount
        )

        print(json.dumps({"success": True, "app_id": app_id}))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
