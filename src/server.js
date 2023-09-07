import express from "express"; //babel 덕에 가능한 소스. 멍청한 노드
import globalRouter from "./routers/globalRouter";


const app = express(); //이제부터 app은 서버다
app.set("view engine", "pug"); // 템플릿 엔진으로 pug 설정
app.set("views",process.cwd() + "/src/views"); // process.cwd()는 현재 작업 디렉토리를 반환함 / views 폴더 위치 설정
app.use("/", globalRouter); // 라우터 설정

export default app; //수출을 해야 init.js에서 수입 해 쓰는 불편함