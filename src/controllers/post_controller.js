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
        const content = await Post.findById(req.params.id).exec();
        if(content.user.equals(req.user._id)){
            const post = await Post.findByIdAndUpdate(req.params.id, req.body).exec();
            res.status(200).json(post);
        } else{
            res.status(404).json({
                error: "Post from another user"
            })
        }
    } catch(error){
        res.status(404).send(error);
    }
}

const destroy = async(req, res) => {
    try{
        const content = await Post.findById(req.params.id).exec();
        if(content.user.equals(req.user._id)){
            await Post.findByIdAndDelete(req.params.id).exec();
        } else{
            res.status(404).json({
                error: "Post from another user"
            })
        }
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