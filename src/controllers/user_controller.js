import User from "../models/user_model";
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
        res.status(400).send(error);
    }
}

const login = async(req, res) => {
    try{
        const user = User.findOne({
            email: req.body.email
        }).exec();
        if(user && (await User.isValidPassword(req.body.password))){
            const token = jwtService.generateAccessToken(user);
            res.json(token);
        } else{
            res.status(404).json({
                error: "Email or password incorrect",
            });
        }
    } catch(error){
        res.status(400).send(error.message);
    }
}

export default{
    login,
    signup
}