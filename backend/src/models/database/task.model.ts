import mongoose from "mongoose";

const taskSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);
