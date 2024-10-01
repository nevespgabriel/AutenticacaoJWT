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
        const content = await Post.find(req.query).exec();
        res.json(content);
    } catch(error){
        res.status(400).send(error);
    }
}

const show = async (req,res) => {
    try{
        const content = await Post.findById(req.params.id).exec();
        res.json(content);
    } catch(error){
        res.status(400).send(error);
    }
}

const update = async (req, res) => {
    try{
        const user = req.user._id;
        const { text } = req.body
        const content = await Post.findOneAndUpdate({
            _id: req.params.id,
            user
        },
        { text }
        ).exec();
        res.json(content);
    } catch(error){
        res.status(404).send(error);
    }
}

const destroy = async(req, res) => {
    try{
        const user = req.user._id;
        const content = await Post.findOneAndDelete({
            _id: req.params.id,
            user
        }).exec();
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