import "reflect-metadata";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/solid");

// connection messages
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Connected to Mongoose"))
.on("error", (error) => console.log(error))