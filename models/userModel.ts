import mongoose from "mongoose";

const userCredentialsSchema = new mongoose.Schema({
    website: {
        type: String,
        required: true
    },
    username_or_email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {timestamps: true});

const UserCredentials = mongoose.model('user-credentials', userCredentialsSchema)

export default UserCredentials;