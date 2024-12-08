import { Schema, model} from 'mongoose';

// Define the schema for the Comment subdocument
const ssGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25,
    },
    members: [{
      type: String,
    }]
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }

);

const SSGroup = model('Group', ssGroupSchema);

export default SSGroup;
