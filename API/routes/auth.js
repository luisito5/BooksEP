const router = require("express").Router();
const {User} = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { valid } = require("joi");
const { response } = require("express");

router.post("/", async (req,res) => {
    try {
        //Check if the user exist in the DB
        const user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(401).send({message:"Invalid email or password"})
        
        //Compare the encrypted password 
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )

        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or Password"});

        const token = user.generateAuthToken();
        res.status(200).send({data:token, message: "Logged in successfully"})

    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

const validate = (data) => {
    
    const schema = Joi.Object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    
    return schema.validate(data);
}

module.exports = router;