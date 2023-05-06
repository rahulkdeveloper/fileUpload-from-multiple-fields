const Joi = require("joi");  

let middlewareValidation = (schema,property)=>{
    return (request,response,next)=>{
        
    
        const {error} = schema.validate(request.body,{abortEarly:false})
        
        if(error == null){
            next()
        }
        else{
            const {details} = error;
            response.status(400).json({
                success:false,
                message:details
            })
        }
    }
}
const schemas ={
    userDetails :Joi.object().keys({
        firstName:Joi.string().trim().required().min(3).max(20).required(),
        lastName:Joi.string().required(),
        email:Joi.string().trim().email().required(),
        dob:Joi.date().required(),
        residentAdd_street1:Joi.string().required(),
        residentAdd_street2:Joi.string().required()
    }).unknown(true)
}




module.exports = {middlewareValidation,schemas}