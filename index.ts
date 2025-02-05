import express from 'express';
import cors from 'cors';
import { connectDB } from './db/db';

const app = express();
const port = process.env.PORT || 4000;

import userRoutes from './routes/userRoutes';

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 
app.use('/users/', userRoutes);

app.get('/', (req, res) => {
    res.send('node server running here....');
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`node server running on port ${port}`);
    });
});