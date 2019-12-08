import mongoose from 'mongoose';
const { Schema } = mongoose;

const talkSchema = new Schema({
  title: {
    type: String,
    required: true,
    help: 'This field is required'
  },
  author: {
    type: String,
    required: true,
    help: 'This field is required'
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Attendee'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Talk = mongoose.model('Talk', talkSchema);
export default Talk;
