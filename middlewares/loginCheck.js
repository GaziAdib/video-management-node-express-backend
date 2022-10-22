import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const loginCheck = async (req, res, next) => {

    const bearer = await req.headers["authorization"];
    const token = bearer.split(" ")[1];

    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.foundUser._id);
        next()

    } catch (error) {
        res.status(401).json({
            msg: "UnAuthorized Token!",
        });
    }

}

export default loginCheck;