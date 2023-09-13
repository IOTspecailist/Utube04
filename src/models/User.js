import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    email: {type: String, required:true, unique:true}, 
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    location: String,
});

//save함수 동작 전 pre()함수로 로직 실행 
//참고로 create()함수는 내부적으로 save()함수를 호출한다고함
//this는 유저가 입력한 값이 메모리에 생성된 userSchema객체에 저장된걸 뜻한다
userSchma.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 5);
});

//이 부분덕에mongoDB에 자동으로 users라는 collection이 생김(자동 소문자변환 + s추가)
const User = mongoose.model("User", userSchma);

export default User;