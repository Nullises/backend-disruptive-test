import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  writePermission: {
    type: Boolean,
  },
  readPermission: {
    type: Boolean,
  },
  adminAccountId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Categories", CategoriesSchema);
