
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')



const journalistSchema = new  mongoose.Schema(

{
    name:{
    type:String,
    required:true,
    trim:true 
},
email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    lowercase:true,  
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid')
        }
    } 

},
age:{
    type:Number,
    default:20,
    validate(value){
        if(value<0){
            throw new Error('Age must be a postive number')
        }
    }
},
password:{
  type:String,
  required:true,
  trim:true,
  minlength:6  
},
// phoneNumber:{
//     type:Number,
//     validate(value){
//         if(value>11){
//             throw new Error('wrong phone number')
//         }
//     }
//     // declarations: [
//     //     AppComponent,OnlyNumberDirective
//     //   ]

// },
 tokens:[
    {
        type:String,
        required:true
    }
],

})

const Journalist = mongoose.model('Journalist',journalistSchema)

//hash password
journalistSchema.pre('save',async function(next){

    const journalist = this
    if(journalist.isModified('password'))
   { journalist.password = await bcrypt.hash(journalist.password,8)}


})



// login 

journalistSchema.statics.findByCredentials = async (email,password) =>{
    const journalist = await Journalist.findOne({email})
    // console.log(user)
    if(!journalist){
        throw new Error ('Unable to login..please check email')
    }
    // 123456 --> req.body.password  --> user.password
    const isMatch = await bcrypt.compare(password,journalist.password)
    if(!isMatch){
        throw new Error('Unable to login.. please check password')
    }

    return journalist
}

//generate token
journalistSchema.methods.generateToken = async function(){
    // this --> document
    const journalist = this
    const token = jwt.sign({_id:journalist._id.toString()},'shhh')
    journalist.tokens = journalist.tokens.concat(token)
   
    await journalist.save()

    return token
}


journalistSchema.virtual('artical',{
    ref:'artical', 
    localField:'_id', 
    foreignField:'reporter'
  })













module.exports=Journalist