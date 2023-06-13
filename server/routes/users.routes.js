import { Router } from "express";
import { registerUser, loginUser, getUserById, forgotPassword, resetPassword } from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserById);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
/*router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser); */

export default router;
