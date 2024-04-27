import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  themeId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  credits: {
    type: String,
    required: true,
  },
  userAccountId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Content", ContentSchema);
