const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name        : { type: String },
    events      : { type: Number},
    description : { type: String },
    imagePlan   : { type: String },
    routines   : [{ type: Schema.Types.ObjectId, ref: "Routine" }],
}, {
    timestamps: true
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;