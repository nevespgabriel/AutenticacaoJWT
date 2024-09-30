import { Router } from "express";
import user_controller from "../controllers/user_controller.js";

const router = Router();

router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);

export default router;