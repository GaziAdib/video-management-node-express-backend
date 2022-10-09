
import express from 'express';

// DotEnv module
import dotenv from 'dotenv';

import cors from 'cors';

import db from './db/db.js';

import videoRoutes from './routes/videoRoutes.js';


dotenv.config()

const app = express();

// mongo connect

db();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);



app.get('/hellow', (req, res) => {
    return res.json({ message: 'hellow' })
});

app.use('/api/videos', videoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => `server is running on port: ${PORT}`);






