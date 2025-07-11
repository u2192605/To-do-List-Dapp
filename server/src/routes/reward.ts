import express from "express";
import {
  createReward,
  completeRewardTask,
} from "../controllers/rewardController";
//import { requireAuth } from "../middleware/requireAuth"; //comment this out when using test routes

const router = express.Router();

//router.use(requireAuth); //comment this out when using test routes too

router.post("/create", createReward);
router.post("/complete", completeRewardTask);

// Optional test routes
// router.get("/test-create", async (req, res) => {
//   req.body = {
//     taskDoerAddress: "TTSXLNP4NOB3XTME4WYNUCBXTP36AU3RNSCU3PIN7FNMKYNFKIMHC3OMXE", //replace with wallet address
//     rewardAmount: 1000000,
//   };
//   (req as any).user = { _id: "686e07c5c6b4ad8b0a729683" }; //mongodb stored account object id
//   await createReward(req, res);
// });

// router.get("/test-complete", async (req, res) => {
//   req.body = {
//     appId: 742575260, // replace with test complete appid when done
//   };
//   (req as any).user = { _id: "686e07c5c6b4ad8b0a729683" };
//   await completeRewardTask(req, res);
// });

export default router;
