const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
    },
    latLng: {
        type: {
            lat: {
                type: String,
                required: true
            },
            lng: {
                type: String,
                required: true
            }
        },
        required: true
    },
    materiales: {
        type: [String],
        required: true
    },
    dia_hora: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    }
});

const Point = mongoose.model("Point", pointSchema);

module.exports = Point;
