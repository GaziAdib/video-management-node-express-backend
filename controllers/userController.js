import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";



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

            // create jWT
            //token: generateToken(user._id),

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











export { createNewUser, loginUser };