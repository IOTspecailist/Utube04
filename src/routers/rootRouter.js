import express from "express";
import {getJoin,postJoin, getLogin, postLogin} from "../controllers/userController";
import {home, search} from "../controllers/videoController";//default로 export 하는거 아니면 무조건 {} 필요함 아니면 에러남


const rootRouter = express.Router();

rootRouter.get("/",home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);


export default rootRouter;