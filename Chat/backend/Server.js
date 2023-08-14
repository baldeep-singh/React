const express = require("express");
const dummyUserData = require("./Data.js");
const ConnectDB = require("./Model.js"); 
const cors = require("cors");
const User = require("./Model.js");
const app =express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>
{
    res.json(dummyUserData);
});
ConnectDB();
app.post("/login",(req,res) =>
{
    const {username,password} = req.body;
    console.log({username,password});
    const result =  dummyUserData.find((e) => e.username===username && e.password === password);
    console.log(result);
    if(result)
    {
        res.json({result:true,message : "user is valid"});
    }
    else
    {
        res.status(401).json({result:false,message: "invalid user"});
    }
})
app.post("/Register",async (req,res) =>
{
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ sol:true ,message: 'User registered successfully', });
      } catch (error) {
        res.status(500).json({sol:false, message: 'Error registering user', });
      }
});
app.listen(5000,() =>
{
console.log("the server has started!!!");
}
);