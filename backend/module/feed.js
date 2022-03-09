const route = require('express').Router();
const {body,validationResult} = require('express-validator/check')

const isAuth = require('../middleware/isAuth')
const Data = require('../models/data').input
const Output = require('../models/data').output

route.post('/output',isAuth,(req,res,next)=>{
    console.log(req.body)
    Output.findOne({userId:req.userId})
    .then((result)=>{
        if(result){
            result.prediction = req.body.prediction
            result.whole1= req.body.whole1
            result.mean = req.body.mean
            return result.save()
        }
        const output = new Output({
            prediction: req.body.prediction,
            whole1: req.body.whole1,
            mean:req.body.mean,
            userId:req.userId
        })
        return output.save()
    })
    .then(()=>{
        res.status(201).json({message:'Output Added to the db'})
    })
    .catch(err=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
})
route.get('/output',isAuth,(req,res,next)=>{
    console.log(req.userId)
    if(!req.userId){
        const err = new Error('Login to Account Before Seeing the Prediction')
        err.statusCode=401
        throw err
    }
    Output.findOne({userId:req.userId})
    .then((result)=>{
        if(!result){
            const err = new Error('Currently no predictions found for this user')
            err.statusCode = 401
            throw (err)
        }
        res.status(200).json({message:'Prediction Successfully fetched from the db',result:result})
    })
    .catch(err=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
})


route.post('/data',isAuth,
[
    body('marks').isLength({min:1,max:3}).withMessage('Requires Mark'),
    body('status').isLength({min:1,max:3}).withMessage('Requires Econmical Stability'),
    body('personality').isLength({min:1,max:3}).withMessage('Requires Personality'),
    body('agree').isLength({min:1,max:3}).withMessage('Requires Agreeableness'),
    body('opens').isLength({min:1,max:3}).withMessage('Requires Openness'),
    body('aoi').isLength({min:1,max:3}).withMessage('Requires Area Of Interest'),
],
(req,res,next)=>{
    console.log(req.body)
    // console.log(JSON.parse(req.body))
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Data Should be filled Completely')
        error.statusCode = 422;
        error.cons = errors.array()
        throw error
    }
    // console.log(req.body)
    const data = new Data({
        marks:req.body.marks,
        status:req.body.status,
        personality:req.body.personality,
        agree:req.body.agree,
        opens:req.body.opens,
        aoi:req.body.aoi,
        userId:req.userId
    }) 
    data.save()
    .then(()=>{
        res.status(201).json({message:'Successfully added to the db'})
    })
    .catch(err=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 422
        }
        next(err)
    })
})

route.use('/data',isAuth,(req,res,next)=>{
    Data.find()
    .then((dataSet)=>{
        if(!dataSet){
            const error = new Error('No data found in database')
            error.statusCode = 401;
            throw error
        }
        console.log(dataSet)
        res.status(200).json({data:dataSet,message:'Data Fetched Successfully'})
    })
    .catch(err=>{
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 422
        }
        next(err)
    })
})


module.exports=route