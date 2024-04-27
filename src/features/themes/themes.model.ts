import mongoose from "mongoose";

const ThemesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  imagePermission: {
    type: Boolean,
  },
  videoPermission: {
    type: Boolean,
  },
  textPermission: {
    type: Boolean,
  },
  adminAccountId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Themes", ThemesSchema);
