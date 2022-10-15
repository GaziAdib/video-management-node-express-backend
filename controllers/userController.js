import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';



// register new user 

const createNewUser = async (req, res) => {

    const { username, email, password } = req.body

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
                    password: hashedPwd
                }


                const userAdded = await User.create(newUser)

                res.status(201).json({ message: `New User ${userAdded.username} created!` })


            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        }



    }


}


// login user

const loginUser = async (req, res) => {


    const { email, password } = req.body

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
            res.json({ message: `User with Email: ${email} logged in!` })

        } else {
            res.status(401).json({ message: 'User is not authorized' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }



}











export { createNewUser, loginUser };