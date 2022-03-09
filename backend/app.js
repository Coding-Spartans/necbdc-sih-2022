const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const URI = `mongodb+srv://${process.env.NAME}:${process.env.DPASS}@cluster0.1tdiu.mongodb.net/${process.env.dbname}`
const apiPage = require('./module/feed');
const authPage = require('./module/auth');
const portalPage = require('./module/portData');


app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs')
app.set('views','views')

app.use(express.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next()
})
app.use('/api',apiPage);
app.use('/auth',authPage);
app.use('/portal',portalPage);

app.use((req, res,next)=>{
    res.status(404).json({message:'Page Not Found'})
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong'
    const errors = err.cons
    console.log(errors)
    if(errors){
        let output = errors[0].msg
        if(output){
        return res.status(statusCode).json({message: message,output: output});
        }
    }
    res.status(statusCode).json({message: message});
})

mongoose.connect(URI)
.then(()=>{
    console.log('Mongoose Connected Successfully !!!');
    app.listen(process.env.PORT||8080,()=>{
        console.log('listening on http://localhost:8080');
    })
})
.catch(err=>console.log(err))