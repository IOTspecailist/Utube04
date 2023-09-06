import express from "express";
const PORT = 4000;
const app = express();
app.set("view engine", "pug" )

let reqUrl ="";
let reqTime ="";
let securityUrlYn ="";
let protectedYn ="";

const urlLogeer = (req, res, next) => {
  reqUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  next();
  };
const timeLogger = (req, res, next) => {
  reqTime =new Date(); 
  next();
};
const securityLogger = (req, res, next) => {
  if(req.protocol === "https"){
      securityUrlYn = "secure";
    }else{
      securityUrlYn = "insecure";
  }
  next();
};
const protectorMiddleware = (req, res, next) => {
  console.log("do not enter");
  res.redirect('/');
};


const final =(req,res)=>{
  res.send("url-->"+reqUrl+"<br>"+reqTime+"<br>"+securityUrlYn);
}
app.use("/protected", protectorMiddleware);
app.use("/", urlLogeer,timeLogger,securityLogger, final);



  app.listen(PORT, () => console.log(`time is running out http://localhost:${PORT}`));
