//cvareting how how ctaeroyies should look like
import mongoose from "mongoose";
//create creating
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

export default mongoose.model("Category", categorySchema);

