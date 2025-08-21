import mongoose from 'mongoose';

const UserStateSchema = new mongoose.Schema({
  userId: { type: String, index: true, unique: true },
  status: { 
    type: String, 
    enum: ['active', 'idle', 'banned'], 
    default: 'active'
  },
  dailyQueries: { type: Number, default: 0 },
  lastActive: Date
});

export const UserState = mongoose.model('UserState', UserStateSchema);