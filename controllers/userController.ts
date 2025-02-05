import { ObjectId } from 'mongodb';
import UserCredentials from '../models/userModel';
import { Request, Response, RequestHandler } from 'express';

const addUserCredentials = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const savedCredentials = await new UserCredentials(data).save();
        res.status(200).json({savedCredentials, 'success': true});
    } catch (error) {
        console.error("Error adding user credentials:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserCredentials = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const searchQuery = {email: email}
        const credentials = await UserCredentials.find(searchQuery);
        res.status(200).json({credentials, 'success': true});
    } catch (error) {
        console.error("Error getting user credentials:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUserCredentials: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.params.email;
        const id = req.params.id;
        const searchQuery = {email: email, _id: new ObjectId(id)}
        const deletedCredential = await UserCredentials.findOneAndDelete(searchQuery);

        if (!deletedCredential) {
            res.status(404).json({ success: false, message: "Credential not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Credential deleted successfully", data: deletedCredential });
    } catch (error) {
        console.error("Error deleting user credentials:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUserCredentials: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const updateData = req.body;
        const email = req.params.email;
        const id = req.params.id;
        const searchQuery = {email: email, _id: new ObjectId(id)}
        const updatedCredential = await UserCredentials.findOneAndUpdate(
            searchQuery,
            { $set: updateData },
            { new: true, runValidatorsa: true }
        );

        if (!updatedCredential) {
            res.status(404).json({ success: false, message: "Credential not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Credential updated successfully", data: updatedCredential });
    } catch (error) {
        console.error("Error updating user credentials:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



export { addUserCredentials, getUserCredentials, updateUserCredentials, deleteUserCredentials };