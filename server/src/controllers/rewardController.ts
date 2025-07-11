import { Request, Response } from "express";
import { execFile } from "child_process";
import path from "path";
import { promisify } from "util";
import { User } from "../models/userModel";

const runPython = promisify(execFile);

export const createReward = async (req: Request, res: Response) => {
    const { taskDoerAddress, rewardAmount } = req.body;
    const userId = (req as any).user?._id;

    try {
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ error: "No user found" });
        }

        const scriptPath = path.join(__dirname, "../../../smartContracts/runReward.py");

        const { stdout } = await runPython("python", [
            scriptPath,
            taskDoerAddress,
            rewardAmount.toString(),
        ]);

        const result = JSON.parse(stdout);

        if (result.success) {
            return res.status(201).json({
                message: "Reward created successfully",
                appId: result.app_id,
            });
        } else {
            console.error("Error from runReward.py:", result.error);
            return res.status(500).json({ error: result.error });
        }
    } catch (err) {
        console.error("Error running reward creation:", err);
        res.status(500).json({ error: "Something went wrong creating the reward" });
    }
};

export const completeRewardTask = async (req: Request, res: Response) => {
    const { appId } = req.body;
    const userId = (req as any).user?._id;

    try {
        const foundUser = await User.findById(userId);
        if (!foundUser || !foundUser.walletMnemonic) {
            return res.status(400).json({ error: "User wallet missing" });
        }

        const scriptPath = path.join(__dirname, "../../../smartContracts/completeTask.py");


        const { stdout } = await runPython("python", [
            scriptPath,
            appId.toString(),
            foundUser.walletMnemonic,
        ]);

        const result = JSON.parse(stdout);

        if (result.success) {
            return res.status(200).json({ message: "Task completed and reward sent" });
        } else {
            console.error("Error from completeTask.py:", result.error);
            return res.status(500).json({ error: result.error });
        }
    } catch (err) {
        console.error("Error completing reward task:", err);
        res.status(500).json({ error: "Failed to complete task" });
    }
};
