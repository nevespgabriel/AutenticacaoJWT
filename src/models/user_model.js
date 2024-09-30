import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: Schema.Types.String,
        required: true
    },
    email:{
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password:{
        type: Schema.Types.String,
        required: true
    }
});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

export default User;