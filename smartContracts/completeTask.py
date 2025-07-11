import sys
import json
import os
from algosdk.v2client import algod
from dotenv import load_dotenv
from operations import completeTask

load_dotenv()

ALGOD_ADDRESS = os.getenv("ALGOD_ADDRESS")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN")

def main():
    try:
        app_id = int(sys.argv[1])
        user_mnemonic = sys.argv[2]

        client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)

        completeTask(
            client=client,
            appID=app_id,
            userMnemonic=user_mnemonic
        )

        print(json.dumps({ "success": True }))
    except Exception as e:
        print(json.dumps({ "success": False, "error": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    main()
