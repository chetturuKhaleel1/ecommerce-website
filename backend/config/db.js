import mongoose from "mongoose";


const connectDB =async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`sucessfully connected to mongoDB`);
    } catch (error) {
        console.log(`ERROR:${error.messsage}`)

        process.exit(1)
    }
}

//export

export  default connectDB
