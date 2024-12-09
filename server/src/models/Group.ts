import { Schema, model } from 'mongoose';

const ssGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25,
    },
    members: [
      {
        type: String, 
      },
    ],
    matches: [
      {
        giver: { type: String, required: true },
        receiver: { type: String, required: true },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

const SSGroup = model('Group', ssGroupSchema);

export default SSGroup;
