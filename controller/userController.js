const { hashpassword ,compare } = require('../middlewear/helper');
const userModel = require('../models/userModels');

//register  
             
exports.register = async (req, res) => {                                            
    try {
        const { name, email, password, seceratekey, address, phone } = req.body;
        if (!name || !email || !password || !seceratekey || !address || !phone) {
            return res.status(400).send("Please fill all the fields");
        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(200).send("User Already Registered. Please Login.");
        }

        const hash = await hashpassword(password);
        const newUser = new userModel({ name, email, phone, password: hash, seceratekey, address });
        const userSave = await newUser.save()

        res.status(200).send({ message: "User registered Successfully", userSave });
    } catch (err) {
        res.status(400).send({ message: "User Registration Failed", error: err.message });
    }
};

//Log in Route

exports.login = async (req,res) =>{
    try{
      
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send("please fill all feilds")
        }

    
        
        const user = await userModel.findOne({email})
        if(!user){
           return res.status(400).send({message:"user Does not Exists Please Sign Up"})
        } 
        // if user exists compare password
        const match = await compare(password,user.password);
        // if password not match 
        if(!match){
            return res.status(400).send({message:"invalid Password"})
        }
       
        const token = await user.generatetoken();
        res.status(200).send({message:"user login successfully",token,user})

    } catch(err){
        res.status(400).send({message:"user login failed",err})
    }
}




exports.forgotpassword = async(req,res)=>{
    try{
   
    const {email,seceratekey,newpassword} = req.body
    if(!email || !seceratekey || !newpassword){
        //if any feild is missing 
        res.status(400).send({message:"please fill all your feilds"});
    }
   
    const user = await userModel.findOne({email:email,seceratekey:seceratekey})
    if(!user){
        res.status(400).send({message:"user not exits,Please sign up"});
    }
   
    const hash = await hashpassword(newpassword);
    const updatepassword = await userModel.findByIdAndUpdate(user._id,{password:hash},{new:true})
    res.status(200).send({message:"password reset Successfully"})


    }catch(err){
        res.status(400).send({message:"forgot password failed"},err)
    }
}