const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SpesialisSchema = new Schema({
  nama: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

// SpesialisSchema.pre("save", async function (next) {
//   const doc = this;
//   // Check if the document is new
//   if (doc.isNew) {
//     // Find the highest value of yourField in the collection
//     const highestDoc = await mongoose
//       .model("Spesialis", SpesialisSchema)
//       .findOne({})
//       .sort({ _id: -1 });

//     doc.id = highestDoc ? highestDoc.id + 1 : 1;
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model("Spesialis", SpesialisSchema);
