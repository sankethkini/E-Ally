const express = require("express");
const User = require("./User");
var session=require('express-session');
const router = express.Router();
const bodyParser = require("body-parser");
const { query } = require("express");
var login = true;
router.get("/:username/tech", (req, res) => {
  if (req.session.login===true) {
    var us = req.params.username
    res.render("tech", {
      lg: 0,
      urname: us
    });
  } else {
    res.render("home", { lg: 1})
  }
});
router.post("/:username/tech", (req, res,next) => {
  var push = {
    give: req.body.radio,
    gain: req.body.radio1
  }
  urname=req.params.username;

  User.findOneAndUpdate({uname:urname}, push, function (err, place) {
    if(!err){
      
      let rt="/user/"+urname+"/main/?gn="+Number(push.gain);
      res.redirect(rt);
    }
    else{
      res.status(500);
    }

  });

});

router.get("/:username/main",async (req, res) => {
  if(req.session.login){

  var give1;
  var gain1;
  var urname=req.params.username
  var result;
  var match;
  await User.find({uname: urname}, (err, user) => {
  give1 = user[0].give;
  gain1 = user[0].gain;
  
  })
  await User.find({
    $and : [
      {gain:give1},
      {give:gain1}
    ]
  },(err,y)=>{
    if(!err){
      result=y;
      return;
    }
    else{
      console.log('dfs');
    }
  })
  await User.find({
    $and:[
      {give:gain1},
      {gain: { $ne:give1}}
    ]
  },(err,y)=>{
    if(!err){
      match=y;
      return;
    }
    else{
      console.log('dfs');
    }
  })
  
  res.render('main',{
    lg:0,
    gn:gain1,
    urname:req.params.username,
    users:result,
    mat:match,
    click:"func(id)"
  })
  console.log(give1,gain1,result);
  }
  else{
  res.render("login",{lg:1});
  }
   

});



module.exports = router;
