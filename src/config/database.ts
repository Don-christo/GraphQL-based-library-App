import mongoose from 'mongoose';

export const connectDatabase =async () => {
    try {
        const connect = mongoose.connect(`mongodb+srv://taskAndLearning:onGod@atlascluster.verf2tx.mongodb.net/learning`)
        console.log('mongoDb connected successfully')
    } catch (error) {
       console.log(error) 
    }
}