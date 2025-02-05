import * as dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@neovault-cluster.c4uyx.mongodb.net/neovault-user-credentials
?retryWrites=true&w=majority&appName=NeoVault-Cluster`;


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