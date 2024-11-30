const express = require("express");
const router = express.Router();
const users = require("../models/userschema");

// router.get("/",(req, res)=>{
//     console.log("connect");
// })

//register user api

router.post("/register", async(req, res)=>{
    // console.log(req.body)

    const {name,email,age,mobile,work,address,description} = req.body;
    
    if(!name || !email || !age || !mobile || !work || !address || !description){
        res.status(422).send("plz fill the data");
    }

    try{

        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).send("this user is allready present");
        }else{
            const adduser = new users({
                // name:name,
                name,email,age,mobile,work,address,description
            })
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser)
        }

    } catch (error){
        res.status(422).send(error)
    }
})

// get user data API

router.get("/getdata", async(req, res)=>{
    try{
        
        const userdata = await users.find();
        console.log(userdata);
        res.status(201).json(userdata);

    } catch (error){
        res.status(422).send(error)
    }
})

//get individual user

router.get("/getuser/:id", async(req, res)=>{
    try{
        console.log(req.params);
        const {id} = req.params;

        const userIndividual = await users.findById({_id:id});
        console.log(userIndividual);
        res.status(201).json(userIndividual)

    } catch (error){
        res.status(422).json(error)
    }
})

// update user data

router.patch("/updateuser/:id", async(req,res)=>{
    try{
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body, {
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser)

    } catch (error){
        res.status(422).json(error);
    }
})

// delete a user

router.delete("/deleteuser/:id", async(req,res)=>{
    try{
        const {id} = req.params;

        const deleteduser = await users.findByIdAndDelete({_id:id});

        console.log(deleteduser);
        res.status(201).json(deleteduser)

    } catch (error){
        res.status(422).json(error);
    }
})

module.exports = router;