import mongoose from 'mongoose';
import schema from './schema.js';

const model = mongoose.model('SavedModel', schema);
export default model;
