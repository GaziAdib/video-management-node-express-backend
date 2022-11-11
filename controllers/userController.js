import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c35a5169c3141f",
        pass: "4b7b64130b15ac"
    }
});



// register new user 

const createNewUser = async (req, res) => {

    const { username, email, password, profileImage } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username and password and email are required.' });
    } else if (password.length < 4) {
        return res.status(400).json({ message: 'Password must be at least 4 character long!' });
    }
    else {

        // check for duplicate usernames in the db
        const existingUserEmail = await User.findOne({ email: email });

        if (existingUserEmail) {
            res.json({ message: 'Email already Exists in our database!  Try another email' });
        }

        else {

            try {

                // encrypt the passsword

                const hashedPwd = await bcrypt.hash(password, 10);

                // store the new user

                const newUser = {
                    username: username,
                    email: email,
                    password: hashedPwd,
                    profileImage: profileImage ? profileImage : ''
                }


                const user = await User.create(newUser)

                // create token

                const token = jwt.sign({ user: user }, process.env.JWT_SECRET,
                    {
                        expiresIn: "2h",
                    }
                );

                // save user token

                user.token = token

                // return new user


                res.status(201).json({ message: `New User ${user.username} created!`, user: user, accessToken: token })


            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        }



    }


}



// login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    //const hashpwd = await bcrypt.hash(password, 10);

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) return res.status(401).json({ message: 'Cannot find this user!' });

    try {
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {

            const accessToken = jwt.sign({ foundUser }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            res.json({ message: `User with Email: ${email} logged in!`, user: foundUser, accessToken: accessToken })

        } else {
            res.status(401).json({ message: 'User is not authorized' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }

}



// send email link for reset password
//router.post("/sendpasswordlink"
const sendEmailLink = async (req, res) => {
    console.log(req.body)

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" })
    }

    try {
        const userfind = await User.findOne({ email: email });

        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
            expiresIn: "3m"
        });

        const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });

        console.log('userToken', setusertoken);


        if (setusertoken) {
            const mailOptions = {
                from: "greatadib82@gmail.com",
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind._id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                }
            })

        }

    } catch (error) {
        res.status(401).json({ status: 401, message: "invalid user" })
    }
};


// verify user for forgot password time
// route.get('/forgotpassword/:id/:token')
const forgotPassword = async (req, res) => {
    const { id, token } = req.params;

    try {

        const validUser = await User.findOne({ _id: id, verifytoken: token });

        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

        console.log(verifytoken);

        if (validUser && verifytoken._id) {
            res.status(201).json({ status: 201, validUser })
        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}


// change password
// route.post('/:id/:token')

const changePassword = async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {

        const validUser = await User.findOne({ _id: id, verifytoken: token });

        // const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

        if (validUser) {

            const newpassword = await bcrypt.hash(password, 12);

            const setNewPass = await User.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setNewPass.save();

            res.status(201).json({ status: 201, setNewPass })

        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }


    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}










export { createNewUser, loginUser, sendEmailLink, forgotPassword, changePassword };