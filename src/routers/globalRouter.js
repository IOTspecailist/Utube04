import express from "express";
import {home} from "../controllers/videoController";//default로 export 하는거 아니면 무조건 {} 필요함 아니면 에러남
const globalRouter = express.Router();

globalRouter.get("/",home);

export default globalRouter;