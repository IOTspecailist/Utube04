import express from "express";
//req시간순 정리
const PORT = 4000;
const handleListening = () => console.log(`server is coming!`);
const server = express();
const router = express.Router();
const home = (req,res) => {
    return res.render("home",{pageTitle:"으러케"});
}

//대기중이면요청이 들어옴
server.listen(PORT,handleListening);

//서버는 뷰 엔진을 pug로 알고 있고
server.set("view engine", "pug");
//뷰 엔진의 위치는 /src/views 폴더이므로 여기를 찾는데
server.set("views",process.cwd()+"/src/views");

// 루트경로로 요청이 들어오면 라우터를 실행시키고
server.use("/",router);

// 라우터는 루트경로로 요청이 들어오면 변수 home을 호출하여 home.pug를 렌더링한다 
//block에 있는 값에 값을 전달하면서
router.get("/",home);

//그럼 요청이 init에있는 listen을 꺠우면 server가 시작되고
//라우터가 url을보고 controller를 선택해서 선택된 pug를 return한다
//so simple

