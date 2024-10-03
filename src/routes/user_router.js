import { Router } from "express";
import user_controller from "../controllers/user_controller.js";
import authorizer from "../middlewares/authorizer.js";
import authenticator from "../middlewares/jwt_authenticator.js";

const router = Router();

router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);

router.use(authenticator);

router.put("/follow_unfollow/:id", user_controller.followUnfollow);

router.use(authorizer(["ADMINISTRATOR", "SUPPORT"]));

router.post("/", user_controller.store);
router.get("/", user_controller.index);
router.get("/:id", user_controller.show);
router.put("/:id", user_controller.update);
router.delete("/:id", user_controller.destroy);

export default router;

//anna's archive --> baixar livros de graça