import { Router } from "express";
import user_controller from "../controllers/user_controller.js";
import jwtAuthenticator from "../middlewares/jwt-authenticator.js";

const router = Router();

router.post("/signup", jwtAuthenticator, user_controller.signup);
router.post("/login", jwtAuthenticator, user_controller.login);

export default router;