const express = require('express')
const router = express.Router()
const Artical = require('../models/artical')
const auth = require('../middelware/auth')

router.post('/artical',auth,async(req,res)=>{
    try{
        
        const artical = new Artical({...req.body,reporter:req.journalist._id})
        await artical.save()
        res.status(200).send(artical)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})







router.get('/artical',auth,async(req,res)=>{
    try{
        const _id = req.params.id
 
        const artical = await Artical.findOne({_id,reporter:req.journalist._id})
        console.log(artical)
        if(!artical){
           return res.status(404).send('No artical')
        }
        res.send(artical)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

// update

router.patch('/artical',auth,async(req,res)=>{
    try{
        const id = req.params._id
        const artical = await Artical.findOneAndUpdate({_id:id,reporter:req.journalist._id},req.body,{
            new:true,
            runValidators:true
        })
        if(!artical){
          return res.send('No artical')
        }
        res.send(artical)
    }
    catch(e){
        res.send(e.message)
    }
})

router.delete('/artical',auth,async(req,res)=>{
    try{
        const _id  = req.params.id
        const artical = await News.findOneAndDelete({_id,reporter:req.journalist._id})
        if(!artical){
            return res.status(404).send('No artical')
        }
        res.send(artical)
    }
    catch(e){
        res.send(e.message)
    }
})



module.exports = router

