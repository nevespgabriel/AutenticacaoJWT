import User from "../models/user_model.js";
import jwtService from "../services/jwt_service.js";

const signup = async(req, res) => {
    try{
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const token = jwtService.generateAccessToken(user);
        res.status(201).json(token);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

const login = async(req, res) => {
    try{
        const user = User.findOne({
            email: req.body.email
        }).exec();
        if(user && await User.isValidPassword(req.body.password)){
            const token = jwtService.generateAccessToken(user);
            res.json(token);
        } else{
            res.status(404).json({
                error: "Email or password incorrect",
            });
        }
    } catch(error){
        res.status(500).send(error.message);
    }
}

const store = async (req, res) => {
    try{
        const content = await User.create(req.body);
        res.status(201).json(content);
    } catch(error){
        res.status(500).send(error.message);
    }
}

const followUnfollow = async(req, res) => {
    try{
        if(!req.user.following.includes(req.params.id)){
            req.user.following.push(req.params.id);
        }else{
            const index = req.user.following.indexOf(req.params.id);
            req.user.following.splice(index, 1);
        }
        await req.user.save();
        res.json();
    } catch(error){
        res.status(400).send(error.message);
    }
}

const index = async (req, res) => {
    try {
        const filter = {
            
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const show = async (req, res) => {
    try{
        const content = await User.findById(req.params.id).exec();
        res.json(content);
    } catch(error){
        res.status(500).send(error.message);
    }
}

const update = async (req, res) => {
    try{
        const content = await User.findByIdAndUpdate(req.params.id);
        res.status(200).json(content);
    } catch(error){
        res.status(500).send(error.message);
    }
}

const destroy = async (req, res) => {
    try{
        User.findByIdAndDelete(req.params.id);
    } catch(error){
        res.status(500).send(error.message);
    }
}

export default{
    login,
    signup, 
    followUnfollow,
    store,
    index,
    show,
    update,
    destroy
}