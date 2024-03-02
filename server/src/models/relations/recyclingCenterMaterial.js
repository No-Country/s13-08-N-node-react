const mongoose = require("mongoose");
//muchos a muchos
const recyclingCenterMaterialSchema = new mongoose.Schema({
  recyclingCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecyclingCenter",
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
  },
});

module.exports = mongoose.model(
  "RecyclingCenterMaterial",
  recyclingCenterMaterialSchema
);
