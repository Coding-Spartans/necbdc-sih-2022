const route = require('express').Router();
const Portal = require("../models/portal");

route.get('/data',(req,res,next)=>{
    Portal.find()
    .then((result)=>{
        res.status(200).json({message:'Data Fetched Successfully',data:result})
    })
})

route.post('/',(req, res,next)=>{
    Portal.findOne({domainName: req.body.domainName})
    .then((portal)=>{
        if(portal){
        const check = portal.subDomains.find(e=>{
            console.log(e)
            return e.name.toString() === req.body.subDomains.name.toString()} )
        console.log(check)
        if(!check){
            portal.subDomains.push({...req.body.subDomains});
            return portal.save()
        }
        return
        }
        const newPortal = new Portal(req.body)
        return newPortal.save()
    })    
    .then(()=>{
        res.redirect('/portal')
    })
})


// route.use('/', (req,res,next) => {
//     res.render('sih-data');
// })

module.exports = route
