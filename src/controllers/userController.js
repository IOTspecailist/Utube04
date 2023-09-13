import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    console.log("✅getJoin✅");   
    res.render("join", {pageTitle:"join input page!!"});
}
export const postJoin = async (req,res) => {
    console.log("✅postJoin✅");
    const {name , username,  email, password, password2, location} = req.body;
    const pageTitle="join";
    if(password !==password2){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage: "Password confirmation does not match",
        });
    }
    const exists = await User.exists(({$or:[{username},{email}]    }));
    if(exists){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage:"this is insane are u crazy username/email is already taken.",
        });
    }
    try{
        console.log("✅postJoin try✅");
        await User.create(
            {
                name,
                username,
                email,
                password,
                location
            }
        );
        return res.redirect("/login");
    }catch(error){
        console.log("✅postJoin catch✅");
        return res.status(400).render("join",{
            pageTitle:"user create() !catch! part",
            errorMessage:error._message, //이 _message 좀 거슬리는데
        });
    }

};
export const edit = (req,res) => res.send("Edit User");
export const remove  = (req,res) => res.send ("Remove user");
export const getLogin = (req,res) =>{
    res.render("login",{pageTitle:"Login!!!!"});
}
export const postLogin = async(req,res) =>{
    const{username, password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage: "An account with this username does not exists.", 
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage: "Wrong password",
        });
    }

    //세션에 정보를 추가하는것
    //아 loggedIn은 session에서 제공하는 무언가가 아니라 그냥 맘대로 지껄인 변수명이네
    req.session.qt = false;
    req.session.loggedIn = true; //서버의 app.use(session( 이게 있어야 됨
    req.session.user = user;
   // console.log("✅res.locals:✅",res.locals);
    return res.redirect("/");
}
export const logout = (req,res) =>res.send("Log out");
export const see = (req,res) => res.send("See User");