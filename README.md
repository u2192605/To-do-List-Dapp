# To-Do List DAPP (Blockchain-Integrated)
This is a full-stack decentralised To-Do List application built using MERN stack with blockchain integration. The application lets users register, log in, create categories and add tasks. Tasks (ToDos) trigger a smart contract reward mechanism on the Algorand blockchain. (not currently fully working)

# youtube demonstration for markers: https://www.youtube.com/watch?v=NezSWXYBcY4

# Features
•	Authentication (Signup/Login with JWT)
•	Category & Task Management (CRUD Functionality)
•	Pagination of Categories and Tasks
•	Smart Contract Integration for rewarding task doers via Alorand
•	Responsive UI using TailwindCSS
•	Redux & RTK Query state and API management

# Tech Stack
•	Frontend: React, TailwindCSS, Redux Toolkit, React Router, RTK Query
•	Backend: Node.js, Express, MongoDB (via Mongoose), JWT Bcrypt
•	Smart Contracts: Python (using algosdk) for Algorand)

# Installation Guide
# Prerequisites
•	Node.js (v16+ recommended)
•	npm or yarn
•	Python 3.x
•	MongoDB (Atlas or local)
•	Algorand sandbox/testnet wallet
•	Algos in test accounts (from the Algorand Dispenser)

# Required Global/Local Installs
Backend:
bash
cd server/
npm install
Frontend:
bash
cd server/
npm install
Python dependencies for smartContracts:
bash
pip install py-algorand-sdk


# Environment Variables Setup
First in the terminal run: python createAdminAccount.py
This will in the terminal print an admin address and mnemonic for a testnet wallet that will serve as the admin account. Save these for the .env
Create a .env file inside the server/ directory:
PORT=5000
MONGODB_URI=your_mongo_connection_string
SECRET=your_jwt_secret
Create a .env in client/ :
bash
REACT_APP_API_URL=http://localhost:5000/api/
Create a .env in smartContracts:
ALGOD_ADDRESS=https://testnet-api.algonode.cloud
ALGOD_TOKEN=""
ADMIN_MNEMONIC="insert generated admin mnemonic”
ADMIN_ADDRESS= use admin address


# Running the Application
Start MongoDB (if local) or ensure your Atlas DB is running.
Then:
bash
# Start backend
cd server/
npm run dev 

# In another terminal, start frontend
cd client/
npm start
Now visit: http://localhost:3000

# Smart Contract Integration (Algorand)
When a task is added, a Python script is executed on the backend that:
•	Generates a smart contract
•	Sends a reward (in Algos) to the task doer’s wallet
•	Saves the contract appId in MongoDB

# Running Manually (For Demonstration and current build)
If the automatic pipeline(its incomplete so it will) fail or you want to test manually: 
runReward.py
Creates a smart contract and sends reward:
bash
•	python runReward.py <taskDoerAddress> <algoAmount>
•	taskDoerAddress: Algorand address of the receiver, stored in mongodb account
•	adminMnemonic: 25-word mnemonic of the admin/sender account
This will print success, copy down the appId after funding the account generated in the smart contract (have to manually find the account using the generated adminId you place in a .env file and lora)


completeTask.py
Completes and closes out the smart contract:
bash
•	python completeTask.py <app_id> "<receiverMnemonic>"

•	recieverMnemonic: 25-word mnemonic of the person completing the task (in mongdb account/users section)
It will show success on success. Check the transaction on lora.


# Note: Funding Required
You must fund these accounts with Algos:
•	The admin account (sender, on signup)
•	The task doer (receiver)
•	The generated smart contract account after running runReward.py and finding through Lora algo explorer
Use the Algorand testnet faucet for this funding.

