import mongoose, { Mongoose, mongo } from "mongoose";

const connectDB = () => {
  const url: any = process.env.DB_URL;
  mongoose.connect(url);

  mongoose.connection.on("connected", () => {
    console.log("Database is connected Is SuccessF");
  });

  mongoose.connection.on("error", () => {
    console.log("Error Occured while connecting to the database");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database is disconnected ");
  });
};

export default connectDB;
