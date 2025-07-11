from algosdk.v2client import algod

client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")
status = client.status()
print("TestNet is online at round:", status["last-round"])