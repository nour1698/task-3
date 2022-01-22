const express = require('express')
const router = express.Router()
const auth = require('../middelware/auth')


const Journalist = require('../models/journalist')


//signup
router.post('/signup', async (req, res) => {
    try{
        const journalist = new Journalist(req.body) // {}
        await journalist.save()
        const token = await journalist.generateToken()
        res.status(200).send({journalist,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }

})

//login
router.post('/login',async (req,res)=>{
    try{
        const journalist = await Journalist.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.status(200).send({journalist,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// profile 
router.get('/profile',auth,async(req,res)=>{
    res.send(req.journalist)
})


//update

router.patch('/journalist',auth,async (req,res)=>{
    const _id = req.params.id

    const updates = Object.keys(req.body)

   try{
 
       const journalist = await Journalist.findById(_id)
       if(!journalist){
        return res.status(404).send('Unable to find user')
    }
       console.log(journalist)
 
       updates.forEach((update)=> (journalist[update] = req.body[update]))
       await journalist.save()
     
       
       res.status(200).send(journalist)
   }catch(e){
       res.status(400).send(e.message)
   }
})

// delete 
router.delete('/journalist',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const journalist = await Journalist.findByIdAndDelete(_id)
        if(!journalist){
            return res.status(404).send('No journalist is found')
        }
        res.send(journalist)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})


module.exports=router