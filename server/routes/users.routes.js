import { Router } from "express";
import { deleteUser, getUserById, loginUser, registerUser, updateUser } from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
