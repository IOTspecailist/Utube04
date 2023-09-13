import express from "express"; //babel 덕에 가능한 소스. 멍청한 노드
import morgan from "morgan"; //log
import session from "express-session";//session 관리 미들웨어 기능제공
import MongoStore from "connect-mongo"; //session을 DB에 저장하기 위함
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";


const app = express(); //이제부터 app은 서버다
const logger= morgan("dev");


//view engine과 views라는 stirng은 express에서 정의한 것임
app.set("view engine", "pug"); // 뷰 엔진으로 pug 설정
app.set("views",process.cwd() + "/src/views"); // process.cwd()는 현재 작업 디렉토리를 반환함 / views 폴더 위치 설정
app.use(logger);
app.use(express.urlencoded({ extended: true }));

//session middleware
app.use(
    session({
        secret:"Hello",
        resave: true,//true면 모든 접속자에게 세션id를 줘서 그 유저를 기억함
        saveUninitialized: true,
        //store : MongoStore.create({mongoUrl:process.env.DB_URL}),
    })
);

//서버가 항상 쿠키에 담긴 세션ID를 받는다는걸 로그로 확인
app.use((req,res,next)=>{
    console.log(req.headers);
    next();
});


app.get("/add-one", (req,res,next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}`);
});
app.use(localsMiddleware);
app.use("/", rootRouter); // 라우터의 경로는 최초 경로설정이라 보면 될거 같고
app.use("/videos",videoRouter);
app.use("/users",userRouter);

export default app; //수출을 해야 init.js에서 수입 해 쓰는 불편함