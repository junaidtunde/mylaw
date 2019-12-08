import mongoose from 'mongoose';
const { Schema } = mongoose;

const attendeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    help: 'This field is required'
  },
  lastname: {
    type: String,
    required: true,
    help: 'This field is required'
  },
  email: {
    type: String,
    required: true,
    help: 'This field is required'
  },
  phonenumber: {
    type: String,
    required: true,
    help: 'This field is required'
  },
  talks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Talk'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Attendee = mongoose.model('Attendee', attendeeSchema);
export default Attendee;
