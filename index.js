const express=require('express')
const app=express()
const mongoose=require('mongoose')

const cors=require('cors')
app.use(cors())
app.use(express.json())
const PORT=8085


//create connection for mongodb

mongoose.connect('mongodb://127.0.0.1:27017/newmerncrud')
.then(()=>console.log("connected"))
.catch(()=>console.log("database error"))

//here i design schema

const userSchema= new mongoose.Schema({
    employeename:{
        type:String,
        require:[true,'']
    },
    age:{
        type:Number,
        require:[true,'']
    },
    exprience:{
        type:String,
        require:[true,'']
    },
    salary:{
        type:Number,
        require:[true,'']
    }

},{timestamps:true})

//defime model
//model use the schema to intrect with document in the  database

const User = mongoose.model('item',userSchema)

//create route  or api for insert data in database

app.post('/createemployee',async(req,resp)=>{
    try {
        const bodydata=req.body
        const employee= User(bodydata)

        const userdata=await employee.save()
        resp.send(userdata)
    } catch (error) {
        
    }
})

app.get("/getallemp",async(req,resp)=>{
    try {
        const userdata = await User.find({})
        resp.send(userdata)
    } catch (error) {
        console.log("error")
    }
})


// get single employee data

app.get("/singleemp/:id",async(req,resp)=>{
    try {
        const id=req.params.id
        const user=await User.findById({
            _id:id
        })
        resp.send(user)
    } catch (error) {
        console.log('error')
    }
})


//update single employee data

app.put('/updataemp/:id',async(req,resp)=>{
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(
            { _id: id }, req.body, { new: true }
        )
        resp.send(user)
    } catch (error) {
        console.log("error")
    }
})


//delete specific user in database

app.delete('/deleteemp/:id',async(req,resp)=>{
    try {
        const id =req.params.id
        const user =await User.findByIdAndDelete({_id:id})
        resp.send(user)
    } catch (error) {
        console.log("error")
    }
})



app.listen(PORT,(req,resp)=>{
    console.log("My server Runing on Port NO 8085")
})



