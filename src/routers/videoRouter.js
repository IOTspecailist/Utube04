import express from "express";

import {watch, getEdit,postEdit, deleteVideo, getUpload,postUpload,  } from "../controllers/videoController";

const  videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;

//.get(): 특정 URL 경로에 대한 GET 요청의 핸들러를 설정합니다.
//.route(): 하나의 경로에 대해 여러 HTTP 메서드 (예: GET, POST)의 핸들러를 연쇄적으로 정의하는 데 사용됩니다.
