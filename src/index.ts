const express = require('express') 
const app = express();

app.get('/' ,(req:any,res:any)=>{
    res.send("get working")
})
app.put('/' ,(req:any,res:any)=>{
    res.send("put working")
})
app.post('/' ,(req:any,res:any)=>{
    res.send("post working")
})
app.delete('/' ,(req:any,res:any)=>{
    res.send("delete working")
})

app.listen(3000, ()=> console.log('server on port 3000'))
