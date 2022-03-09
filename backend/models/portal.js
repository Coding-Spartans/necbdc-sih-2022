const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;

const portalSchema = new Schema({
    domainName : String,
    subDomains : [{
        name: String,
        description: String,
        imageUrl : String
    }],
    desc:String,
},
{timestamps:true});

module.exports = mongoose.model("Portal",portalSchema);