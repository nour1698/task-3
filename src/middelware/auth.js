
// check token
const jwt = require('jsonwebtoken')
const Journalist = require('../models/journalist')
const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
    
        const decode = jwt.verify(token,'shhh')
 
        const journalist = await Journalist.findOne({_id:decode._id,tokens:token})
 
        if(!journalist){
          
            throw new Error()
        }

    //    x = user
    req.journalist = journalist

    // logout
    req.token = token
    
        next()
    }
    catch(e){
        res.status(401).send({error:'PLease authenticate'})
    }
    // clarify that middelware has finsihed it's job
    
}

module.exports = auth