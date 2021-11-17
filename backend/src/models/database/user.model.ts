import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: false, default: "" },
  lastname: { type: String, required: false, default: "" },
});

export default mongoose.model("User", userSchema);
