import * as dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as mongoose.ConnectOptions);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1); // Exit process with failure
    }
};


export { client, connectDB }