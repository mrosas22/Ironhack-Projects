const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email    : {type: String, require: true},
  password : {type: String, require: true},
  fullName : {type: String, require: true},
  bio      : {type: String, require: false},
  gender   : {type: String, require: false},
  age      : {type: Number, require: false},
  imageUrl : {type: String, default: 'https://res.cloudinary.com/mrosas22/image/upload/v1552686931/gallery/avatar.png'},
  googleID : {type: String},
  weight   : {type: Number, require: false},
  role     : {type: String, enum: ['GUEST', 'EDITOR', 'ADMIN'], default: 'GUEST'},
  plan     :[{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  routines :[{ type: Schema.Types.ObjectId, ref: "Routine" }],
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;