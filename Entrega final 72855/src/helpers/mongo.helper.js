import { connect } from "mongoose";

async function connectToMongo(link) {
  try {
    await connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectToMongo;
