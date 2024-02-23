const mongoose = require("mongoose");

// Define el esquema de Mongoose
const materialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
    // unique: true,
  },
  recyclingCenters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material"
  }],
  imagen: {
    type: String
  }
});

// Define el modelo a partir del esquema
module.exports = mongoose.model("Material", materialSchema);


// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// // Define el esquema de Mongoose
// const materialSchema = new mongoose.Schema({
//   nombre: {
//     type: String,
//     required: true,
//   },
//   descripción: {
//     type: String,
//     required: true,
//   },
//   codigoQR: {
//     type: String,
//     required: true,
//   },
//   valor: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   categoria: String,
//   imagen: [{}],
//   centrosReciclaje: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "RecyclingCenterMaterial",
//     },
//   ],
// });

// // Define el modelo a partir del esquema
// module.exports = mongoose.model("Material", materialSchema);
