const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      default: '',
    },
    deadline: {
      type: Date,
      required: [true, 'Please add a deadline'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
