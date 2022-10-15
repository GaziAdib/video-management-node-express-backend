import mongoose from "mongoose";
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';



// register new user 

const createNewUser = async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    else {

        // check for duplicate usernames in the db

        const existingUser = await User.find({ username: username });
        console.log(existingUser)

        if (existingUser.username === username) {
            // return res.sendStatus(409);
            return res.json({ message: 'User alreaaddy Exists in db' });
        } else {

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

                res.status(201).json({ message: `New User ${userAdded} created!` })


            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        }



    }


}


// login user

const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const foundUser = await User.find({ email: email })

    if (!foundUser) return res.status(401).json({ message: 'Cannot find this user!' })

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {

        // create jWT
        res.json({ message: `User with Email: ${email} logged in!` })

    } else {
        res.status(401).json({ message: 'User is not authorized' })
    }


}











export { createNewUser, loginUser };