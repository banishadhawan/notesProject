import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';

import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean);


//middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origin not allowed by CORS'));
    },
}));
app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);


//our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// } )

app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on PORT:', PORT);
    });
})


//what is Endpoint?
//An endpoint is combination of a URL + HTTP method that lets client
//interact with specific resource.
