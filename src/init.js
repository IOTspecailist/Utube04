import app from "./server";

const PORT = 4000;

//화살표 함수다 function()에서 function을 생략해서 ()만 남은거라 보면 됨
//JS에선 function도 value 취급 하기때문에 변수 키워드에 할당 가능
//중괄호 없으면 1라인만 쓸 수있고, 화살표 함수도 중괄호 사용가능하긴 함
const handleListening = () =>
    console.log(`✅Server listening on http://localhost:${PORT} 🚀`);
 
app.listen(PORT, handleListening);

//init은 server를 import하고 server는 globalRouter를 import하고 globalRouter는 videoController를 import한다
//즉 init <- server <- globalRouter <- videoController
//home.pug는 base.pug를 기본 틀로 사용하면서 block부분만 바꿔주고 있다