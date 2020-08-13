const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

var schema = mongoose.Schema({
   uname:{
       type:String,
       required:[true,'this is a required field'],
       unique:[true,'username already taken']
   },
   email:{
     type:String,
     required:[true,'this is a required field']
   },
   github:{
     type:String
   },
   pwd:{
     type:String,
     min:6
   },
   give:{
       type:String,
      
   },
   gain:{
     type:String,
   }

});

module.exports = mongoose.model('User',schema);