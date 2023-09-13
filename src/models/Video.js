import mongoose from "mongoose";
const videoSchema  = new mongoose.Schema({ 

    title : { type : String, required: true, trim : true, maxLength:80},
    description : {type :String, required:true, trim:true, minLength:20},
    createdAt: {type:Date, requried : true, default :Date.now},
    hashtags:[{type:String ,trim:true}],
    meta:{
        views:{type:Number, default: 0, required :true},
        rating:{type:Number, default:0, requried :true},
    },
});

videoSchema.static("formatHashtags", function(hashtags){
    return hashtags.split(",").map((word)=>(word.startsWith("#")?word:`#${word}` ));
});

const Video = mongoose.model("Video", videoSchema);
//Video 모델을 정의했을 때, Mongoose는 소문자 +s자를 붙여 videos라는 이름의 컬렉션을 MongoDB에 자동으로 만듭니다.
export default Video;

//Schema로 틀을 생성한 후에
//model로 틀을 이용해 실제 사용 할 수 있는 데이터를 만든다
//static을 사용하면 그 Schema만의 function을 만들 수 있다
//그 후에 create()함수를 쓰면 MongoDB에 데이터를 무려 "저장"해버린다
//단 터미널에 mongod를 입력해서 DB를 켜놔야만 한다(이부분은 직접 테스트는 안해봤지만 gpt가 그랬음)
