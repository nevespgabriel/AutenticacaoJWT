import { Schema, model } from "mongoose";

const postSchema = new Schema({
    text:{
        type: Schema.Types.String,
        required: true
    },
    user: {
        ref: "User",
        type: Schema.ObjectId
    }
});

const Post = model("Post", postSchema);

export default Post;