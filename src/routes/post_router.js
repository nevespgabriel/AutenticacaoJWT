import { Router } from "express";
import post_controller from "../controllers/post_controller.js";
import jwt_authenticator from "../middlewares/jwt_authenticator.js"

const router = Router();

//Rotas públicas
router.get("/", post_controller.index);
router.get("/:id", post_controller.show);

router.use(jwt_authenticator);

//Rotas privadas
router.post("/", post_controller.store);
router.put("/:id", post_controller.update);
router.delete("/:id", post_controller.destroy);

export default router;