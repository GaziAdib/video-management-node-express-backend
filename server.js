
import express from 'express';

// DotEnv module
import dotenv from 'dotenv';

import cors from 'cors';

import db from './db/db.js';

import videoRoutes from './routes/videoRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import commentRoutes from './routes/commentRoutes.js'
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import blogCommentRoutes from './routes/blogCommentRoutes.js';
import userProfileRoutes from './routes/userProfileRoutes.js';


dotenv.config()

const app = express();

// mongo connect

db();

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

app.get('/hellow', (req, res) => {
    return res.json({ message: 'hellow' })
});


app.use('/api/users', userRoutes);
app.use('/api/user/profile', userProfileRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/videos/wishlists', wishlistRoutes);
app.use('/api/videos', commentRoutes);
app.use('/api/blog', blogCommentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `server is running on port: ${PORT}`);






