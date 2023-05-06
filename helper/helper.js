exports.ageValid = async(date,ageVal)=>{

    let dt = new Date(date);

    const age = (Date.now() - dt.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if(dt>= new Date()){
        return {isAgeValid:false,message:"invalid dob"}
    }

    if(age>=ageVal){
     
        return {isAgeValid:true,message:"valid"}
    }
    else{
     
        return {isAgeValid:false,message:"Minimum age should be 18 years"}
    }
    
}