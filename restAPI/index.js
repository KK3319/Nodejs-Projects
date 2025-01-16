const express=require('express');
const app=express();
app.listen(3357,()=>{
    console.log("server started")
});
app.get("/msg",(req,res,nxt)=>{
    res.json({"message":"hello this is get req created by REST method"})
})

app.use(express.json());
app.post("/msg-post",(req,res,nxt)=>{
    const message=req.body.message;
    res.json({"Message received from post call":message})
})