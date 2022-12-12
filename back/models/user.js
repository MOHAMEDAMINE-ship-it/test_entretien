const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

email:{
    type:String,
    required:true,
    unique:true


},
password:{
    type:String,
    
},
first_name:{
    type:String,
   
},
last_name:{
    type:String,

},
phoneNumber:{
    type:String,

},

});

module.exports=mongoose.model('User', UserSchema)