import os
from algosdk.v2client import algod
from dotenv import load_dotenv

load_dotenv()

ALGOD_ADDRESS = os.getenv("ALGOD_ADDRESS")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN")
ADMIN_ADDRESS = os.getenv("ADMIN_ADDRESS")  # add this to your .env

client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)

info = client.account_info(ADMIN_ADDRESS)
print("Admin Algo Balance:", info["amount"] / 1_000_000, "Algos")