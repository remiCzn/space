import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
    isHome: { type: Boolean, required: false, default: false },
    parentId: {
      type: String,
      required: function (this: { isHome: boolean }) {
        return this.isHome === false;
      },
    },
  },
  {
    timestamps: true,
  }
);

folderSchema.add({
  childrens: { type: [String], required: false, default: [] },
});

export default mongoose.model("Folder", folderSchema);
