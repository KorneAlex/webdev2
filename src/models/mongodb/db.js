import mongoose from "mongoose";

const mongoUrl = "mongodb://127.0.0.1:27017/webdev2" // for local tests
// const mongoUrl = "mongodb://mongo:27017/webdev2" // for docker

export async function connect() {
  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
