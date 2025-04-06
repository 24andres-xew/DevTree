import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(`Conectado en, ${url}`);

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
