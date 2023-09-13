export const localsMiddleware = (req,res,next) => {
    
    //pug와 controller를 이어주는 부분
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName ="dddddddddddddddfudsaasd";
    res.locals.loggedInUser = req.session.user;
    console.log(res.locals);
    next();
}