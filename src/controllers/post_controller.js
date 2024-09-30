import Post from "../models/post_model.js";

const store = async(req, res) => {
    try{
        const post = await Post.create({
            text: req.body.text,
            user: req.body.user._id
        })
        res.status(201).json(post);
    } catch(error){
        res.status(400).send(error);
    }
}

const index = async (req, res) => {
    try{
        const content = await Post.find(req.query);
        res.json(content);
    } catch(error){
        res.status(400).send(error);
    }
}

const show = async (req,res) => {
    try{
        const content = await Post.findById(req.params.id);
        res.json(content);
    } catch(error){
        res.status(400).send(error);
    }
}

const update = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id);
        res.status(200).json(post);
    } catch(error){
        res.status(404).send(error);
    }
}

const destroy = async(req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id);
    } catch(error){
        res.status(404).send(error);
    }
}

export default {
    store,
    index,
    show,
    update,
    destroy
}