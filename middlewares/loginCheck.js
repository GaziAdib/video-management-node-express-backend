import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const loginCheck = async (req, res, next) => {

    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }

    const token = authorization.replace("Bearer ", "")

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })
        }

        const { _id } = payload.foundUser

        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        })
    })

}

export default loginCheck;



// if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')) {
//     try {
//         token = req.headers.authorization.split(' ')[1]

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         req.user = await User.findById(decoded.id).select('-password')

//         next()

//     } catch (error) {
//         console.error(error)
//         res.status(401).json({ message: 'Not Authorized, token failed' })

//     }
// }

// if (!token) {
//     res.status(401).json({ message: 'Not Authorized, no token' })
//     // throw new Error('Not Authorized, no token')
// }





//     import jwt from "jsonwebtoken";
// import User from "../models/UserModel.js";

// const loginCheck = async (req, res, next) => {

//     const bearer = await req.headers["authorization"];
//     const token = bearer.split(" ")[1];

//     try {

//         const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.foundUser._id);
//         next()

//     } catch (error) {
//         res.status(401).json({
//             msg: "UnAuthorized Token!",
//         });
//     }

// }

// export default loginCheck;


// import jwt from "jsonwebtoken";
// import User from "../models/UserModel.js";

// const loginCheck = async (req, res, next) => {

//     const bearer = await req.headers["authorization"];
//     const token = bearer.split(" ")[1];

//     try {

//         const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.foundUser._id);
//         next();

//     } catch (error) {
//         res.status(401).json({
//             msg: "UnAuthorized Token!",
//         });
//     }

// }

// export default loginCheck;
