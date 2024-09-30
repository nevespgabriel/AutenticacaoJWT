import e from "express";
import "dotenv/config";
import "./config/db.js";
import user_router from "./routes/user_router.js";
import post_router from "./routes/post_router.js";
import jwtAuthenticator from "../middlewares/jwt-authenticator.js";

const app = e();

app.use(e.json());
app.use(jwtAuthenticator);
app.use("/user", user_router);
app.use("/post", post_router);

app.listen(process.env.API_PORT, () => console.log(`Server running at ${process.env.API_PORT}.`));