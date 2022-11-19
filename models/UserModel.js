import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    verifytoken: {
        type: String,
    },
    token: { type: String },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);
export default User;