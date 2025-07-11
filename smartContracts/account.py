import os
from algosdk import account, mnemonic
from dotenv import load_dotenv

load_dotenv()

class Account:


    def __init__(self, private_key: str) -> None:
        self._sk = private_key
        self._addr = account.address_from_private_key(private_key)

    def getAddress(self) -> str:
        return self._addr

    def getPrivateKey(self) -> str:
        return self._sk

    def getMnemonic(self) -> str:
        return mnemonic.from_private_key(self._sk)

    @classmethod
    def fromMnemonic(cls, phrase: str) -> "Account":
        return cls(mnemonic.to_private_key(phrase))


def getAdminAccount() -> Account:
    admin_mnemonic = os.getenv("ADMIN_MNEMONIC")
    if not admin_mnemonic:
        raise Exception("ADMIN_MNEMONIC not found in .env file")
    return Account.fromMnemonic(admin_mnemonic)
