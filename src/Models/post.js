import mongoose from 'mongoose';
import { string } from 'zod';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content:{
    type: String,
    required: true,
  },
  image:{
    type:String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // Corrected here
    ref: 'User',
    required: true, // Added required if the author is a mandatory field
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
