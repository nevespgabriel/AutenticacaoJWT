import { Router } from "express";
import post_controller from "../controllers/post_controller.js";
import jwtAuthenticator from "../middlewares/jwt-authenticator.js";

const router = Router();

router.post("/", jwtAuthenticator, post_controller.store);
router.get("/", jwtAuthenticator, post_controller.index);
router.get("/:id", jwtAuthenticator, post_controller.show);
router.put("/:id", jwtAuthenticator, post_controller.update);
router.delete("/:id", jwtAuthenticator, post_controller.destroy);

export default router;