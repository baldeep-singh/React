const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());
const data_dummy = [{id:1,Username:"user_1",Password : "Password_1"},{id:2,Username:"user_2",Password : "Password_2"},{id:3,Username:"user_3",Password : "Password_3"},{id:4,Username:"user_4",Password : "Password_4"},{id:5,Username:"user_5",Password : "Password_5"},{id:6,Username:"user_6",Password : "Password_6"},];
app.get("/",(req,res) =>{
    res.send(data_dummy);
});
app.post("/",(req,res)=>
{
    const {userN,passcode} = req.body;
    const user = data_dummy.find(x => x.Username===userN && x.Password===passcode);
    if(user)
    {
        res.json({success:true,message:"login success!!!"});
    }
    else
    {
        res.json({success:false,message:"login failed!!!"});
    }
});
app.listen(PORT,() =>
{
    console.log("The backend server.");
});