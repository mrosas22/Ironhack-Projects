const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session       : { type: Number},
  education     : { type: String },
  tips          : { type: String },
  imageSession  : { type: String },
  owner         : { type: Schema.Types.ObjectId, ref: "User" },
  feedbacks     :[{ type: Schema.Types.ObjectId, ref: "Feedback" }]
  }, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;