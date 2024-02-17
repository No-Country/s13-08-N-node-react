const Point = require("../models/point.models");

module.exports = {
    createPoint: async (req, res) => {
        try {
            const {
                nombre,
                imagen,
                latLng,
                materiales,
                dia_hora,
                hora
            } = req.body;

            const nuevoPunto = new Point({
                nombre,
                imagen,
                latLng,
                materiales,
                dia_hora,
                hora
            });

            const puntoGuardado = await nuevoPunto.save();

            res.status(201).json(puntoGuardado);
        } catch (error) {
            console.error("Error al crear punto de reciclaje:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getAllPoints: async (req, res) => {
        try {
            const puntosReciclaje = await Point.find();
            res.status(200).json(puntosReciclaje);
        } catch (error) {
            console.error("Error al obtener puntos de reciclaje:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getPointById: async (req, res) => {
        try {
            const { id } = req.params;
            const puntoReciclaje = await Point.findById(id);
            if (!puntoReciclaje) {
                return res.status(404).json({ error: "Punto de reciclaje no encontrado" });
            }
            res.status(200).json(puntoReciclaje);
        } catch (error) {
            console.error("Error al obtener punto de reciclaje por ID:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    filterPointsByLatLng: async (req, res) => {
        try {
            const { lat, lng } = req.query;
    
            if (!lat || !lng) {
                return res.status(400).json({ error: 'Se deben proporcionar valores para lat y lng.' });
            }

            const dbPoints = await Point.find({
                "latLng.lat": { $gte: parseFloat(lat) },
                "latLng.lng": { $gte: parseFloat(lng) }
            });
    
            res.status(200).json(dbPoints);
        } catch (error) {
            console.error("Error al filtrar puntos de reciclaje por latitud y longitud:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
    
};
