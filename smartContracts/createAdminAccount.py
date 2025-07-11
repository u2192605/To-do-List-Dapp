from algosdk import account, mnemonic

private_key, address = account.generate_account()
mnemonic_phrase = mnemonic.from_private_key(private_key)

print("Admin Address:", address)
print("Admin Mnemonic:", mnemonic_phrase)
