const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;

const dataSchema = new Schema({
    //12 th Marks
    marks:{
        type:Number,
        required:true,
    },
    //Economical Stability
    status:{
        type:Number,
        required:true,
    },
    personality:{
        type:Number,
        required:true,
    },
    //agreeableness
    agree:{
        type:Number,
        required:true,
    },
    //openness
    opens:{
        type:Number,
        required:true,
    },
    //Area Of Interest
    aoi:{
        type:Number,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
},{timestamps:true})



exports.input = mongoose.model('data',dataSchema)

const outputSchema = new Schema({
    prediction:{
        type:String,
    },
    mean:{
        type:Number,
    },
    whole1:Array,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

exports.output = mongoose.model('outputs',outputSchema)