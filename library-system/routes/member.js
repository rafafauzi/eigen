import express from "express";
import {
  addMember,
  getAllMembers,
  deleteMember,
} from "../controllers/member.js";

const router = express.Router();

router.post("/add", addMember);
router.get("/members", getAllMembers);
router.delete("/delete/:id", deleteMember);

export default router;
