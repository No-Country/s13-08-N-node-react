const mongoose = require("mongoose");

//muchos a muchos entre model material y punto de reciclaje
const recyclingcenterSchema = new mongoose.Schema({
  usuario: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  materialaRecolectar: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
  ubicacionRecoleccion: String,
  fecha_recoleccion: Date,
  hora_recoleccion: Date,
  estadoSolicitud: String,
});

// Define el modelo a partir del esquema
module.exports = mongoose.model("RecyclingCenter", recyclingcenterSchema);
