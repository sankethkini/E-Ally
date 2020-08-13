const express=require("express");
var session = require('express-session');
app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
mongoose.connect("mongodb://localhost:27017/e-learn",{ useNewUrlParser: true });
app.use(express.static(__dirname+'/public'));
const User=require('./User');
const { check, validationResult } = require('express-validator');
app.use(session({
    secret:"this is a seceret",
    cookie:{
        maxAge:20000000
    },
    resave:true,
    saveUninitialized:true
}))
const profile=require("./profile");
app.use("/user",profile);

const{
    PORT = 3000,
} = process.env



app.get("/",function(req,res){
    res.render('home',{lg:1});

})
app.get("/signup",(req,res)=>{
   res.render('signup',{lg:1});
});
app.post("/signup",(req,res)=>{
    const user=new User({
        uname:req.body.username,
        email:req.body.Email,
        pwd:req.body.Password,
        github:req.body.github,
    });
    user.save(function(err,user){
        if(!err){
            req.session.login=true
            req.session.username=user.uname
            var us=user.uname;
            res.render("tech",{lg:0,urname:us});
            return;    
        }
       else{
           console.log(err);
           res.redirect("signup",{lg:1});
           return;
       }
      
    });
    
});
app.post("/login",(req,res)=>{

    var usname=req.body.usname
    var pwd1=req.body.password
    User.find({uname:usname},(err,user)=>{
        if(!err){
            if(user[0].pwd === pwd1)
            {
               
                if(!req.session.login)
                {
                    req.session.login=true;
                }
                if(!req.session.username)
                {
                    req.session.username=user[0].uname;
                }
                let lt='/user/'+user[0].uname+'/main';
                res.redirect(lt);
                return;
            }
            else{
                console.log('wrong password');
                res.render('login',{lg:1});
                return;
            }
        }
        else{
            console.log('username not found');
            res.render('login',{lg:1});
            return;
        }
    });


});

app.get("/login",(req,res)=>{
    res.render("login",{lg:1})
})
app.get("/main",(req,res)=>{
    res.render("main",{lg:1})
})

app.get('/tech',(req,res)=>{
    res.render('tech',{lg:1,urname:'sss'});

});
app.get('/logout',(req,res)=>{
    res.render('login',{lg:1});
})


app.listen(PORT,(req,res)=>{
    console.log('server started');
})
