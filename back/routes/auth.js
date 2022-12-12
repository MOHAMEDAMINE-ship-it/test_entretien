const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
//const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register", async (req, res) => {
    
    const newUser=new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),

    })
 

    try{
        const savedUser=await newUser.save();
        res.status(201).json({success:true,savedUser});
    }
    catch(err){
        res.status(500).json(err.message);
    }

})


//LOGIN
router.post("/login", async (req, res) => {

    try{
        const user=await User.findOne({
            email:req.body.email
        });

        !user && res.status(401).json("Wrong email");
       
        const hashedpass=CryptoJS.AES.decrypt(user.password,
            process.env.PASS_SEC
            );


        const Originpass=hashedpass.toString(CryptoJS.enc.Utf8)
        if (Originpass!==req.body.password){
            return  res.status(500).json("wrong  password")
        }

       else{
        const{password, ...others}=user._doc;
         return res.status(200).json({...others})}
      

}catch(err){
    res.status(500).json(err.message)
}})

router.put("/reset",async(req,res)=>{
    const user = await User.findOne({ email: req.body.email });
    try{
    if (user) {
        user.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
        user.save();
        res.status(200).json("Password updated");
    } else {

        res.status(403).json("error");
       
    }}catch(err){
        res.status(500).json(err.message)
    }
})

module.exports=router
