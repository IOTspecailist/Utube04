import Video from "../models/Video";

export const home = async (req,res)=>{
    const videos = await Video.find({}).sort({createdAt:"desc"});
    return res.render("home", {pageTitle: "hoㄴme",videos} );
};

//상세보기네 이게
export const watch = async (req, res) =>{
    const{id}= req.params;
    const video = await Video.findById(id);
    
    if(!video){
        //error 먼저 처리하는게 nicolas style이라함
        return res.render("404",{pageTitle : "Video not found."});
    }
    return res.render("watch", {pageTitle : video.title, video} );
}

export const getEdit = async (req, res) =>{
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle:"video not found"});
    }
    return res.render("edit",{pageTitle:`Edit:${video.title}`,video});
};

export const postEdit = async (req,res) =>{
    const {id} = req.params;
    const  {title, description, hashtags} = req.body;
    const video  = await Video.exists({_id:id}); // _id?★
    if(!video){ //못찾으면
        return res.render("404", {pageTitle: "Video not found."});
    }
    await Video.findByIdAndUpdate(id, { // 기본제공함수  findByIdAndUpdate
        title,
        description,
        hashtags:Video.formatHashtags(hashtags), //직접만든 함수 사용
    });
    return res.redirect(`/videos/${id}`);
    //id를url에 받아서 보여주는건 어떤 기능이지 ★

};
export const getUpload = (req,res) =>{
    return res.render("upload",{pageTitle:"this is getUpload"});
}

export const postUpload = async (req,res) => {
    console.log("✅postUpload✅",req.body);
    const {title, description, hashtags} = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags:Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    }catch(error){
        return res.render("upload",{
            pageTitle : "Upload Video",
            errorMessage:error._message
        })
    }
}

export const deleteVideo = async (req,res) => {
    const{id} = req.params;
    await Video.findByIdAndDelete(id); // 아이디로 지우기
    return res.redirect("/");
};

export const search = async (req,res) =>{
    const {keyword} = req.query;//사용자가 /search?keyword=something와 같은 URL로 요청을 보냈을 때, something이 keyword 변수에 할당됩니다.
    console.log("✅search controller:✅",keyword);
    let videos = []; //이게 db의 collection 이름이네 테이블개념이랑 좀 다르게 접근해야겠군
    if(keyword){//존재하면 
        videos = await Video.find({
            title:{
              $regex: new RegExp(`${keyword}$`,"i"),  //i는 정규표현식임 대소문자구분안하는거
            },
        });
    }
    return res.render("search",{pageTitle:"search for what!", videos});
}
 

