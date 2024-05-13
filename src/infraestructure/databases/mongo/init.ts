import mongoose from 'mongoose'

export class MongoDatabase {

    public static async connect(url: string) {

        try {
            await mongoose.connect(url);
        } catch (error) {
            throw error;
        }
    }

    public static async disconnect() {

        try {
            await mongoose.disconnect();
        } catch (error) {
            throw error;
        }
    }
}