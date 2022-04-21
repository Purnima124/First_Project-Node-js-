const fs=require('fs')
const read = require('body-parser/lib/read')
const express=require('express')
const data=require('./Merakileran_Data3.json')
const { type } = require('os')
const axios = require('axios');

// const readline=require("readline-sync")
// const saral_API=axios.get('https://api.merakilearn.org/courses ')
//     .then(  Response=>{
//         let saral_data=(Response.data)
//         let json_file=JSON.stringify(saral_data,null,5)
//         fs.writeFileSync("Merakileran_Data3.json",json_file)
//     })
const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:{
        id:data.length+1,
        name:req.body.name,
        logo:req.body.logo,
        notes:req.body.notes,
        days_to_complete:req.body.days_to_complete,
        short_description:req.body.short_description,
        type:req.body.type,
        course_type:req.body.course_type,
        lang_available:req.body.lang_available
    }
    
})
})

app.get('/api/data',(req,res)=>{
    res.json(data)
})

app.post('/api/data',(req,res)=>{
    const user={
        id:data.length+1,
        name:req.body.name,
        logo:req.body.logo,
        notes:req.body.notes,
        days_to_complete:req.body.days_to_complete,
        short_description:req.body.short_description,
        type:req.body.type,
        course_type:req.body.course_type,
        lang_available:req.body.lang_available

    }

const jsonData=JSON.stringify(user)
fs.writeFile("json2.json",jsonData,(err)=>{
    res.json("done")
})
    
})
app.put('/api/data/:id',(req,res)=>{
    let id=req.params.id
    let name=req.body.name
    let logo=req.body.logo
    let notes=req.body.notes
    let days_to_complete=req.body.days_to_complete
    let short_description=req.body.short_description
    let type=req.body.type
    let course_type=req.body.course_type
    let lang_available=req.body.lang_available
    let index=data.findIndex((data)=>{
        return (data.id==Number.parseInt(id))
    })

    if(index >=0){
        let std = data[index]
        std.logo=logo
        std.name=name
        std.notes=notes
        std.days_to_complete=days_to_complete
        std.short_description=short_description
        std.type=type
        std.course_type=course_type
        std.lang_available=lang_available
        res.send(std)

        a=fs.writeFileSync("Merakileran_Data3.json",JSON.stringify(data,null,3))
        res.send({message:"data put sucessfilly",data:user})

    }else{
        res.status(err)
    }

})

app.delete("/api/delete/:id", (req,res)=>{
    let id=req.params.id;
    let index=data.findIndex((student)=>{
        return(student.id==Number.parseInt(id))
    })
    if (index>= 0){
        let std1=data[index]
        data.splice(index,1)

        a=fs.writeFileSync("Merakileran_Data3.json",JSON.stringify(data,null,3))
        res.send({message:"data delete sucessfilly",data:std1})

    }else{
        res.status(404)
    }


})

app.listen(3000,()=>{
    console .log('Listen On Port 3000')
})