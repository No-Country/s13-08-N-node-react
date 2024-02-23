const RecyclingCenter = require("../models/recyclingcenter.models.js")
const Material = require("../models/material.models")

module.exports = {
    createPoint: async (req, res) => {
        try {
            const {
                nombre,
                ubicacion,
                horario_atencion,
                imagen,
                latLng,
                materials
            } = req.body;

        // Verificar si ya existe un punto de reciclaje con el mismo nombre, ubicación y latLng
        const existingPoint = await RecyclingCenter.findOne({ nombre, ubicacion, "latLng.lat": latLng.lat, "latLng.lng": latLng.lng });
        
        if (existingPoint) {
            return res.status(400).json({ error: "Ya existe un punto de reciclaje con el mismo nombre, ubicación y coordenadas" });
        }

            const nuevoPunto = new RecyclingCenter({
                nombre,
                ubicacion,
                horario_atencion,
                imagen,
                latLng,
                materials
            });

            const puntoGuardado = await nuevoPunto.save();

            await Material.findByIdAndUpdate(materials, {$push: {recyclingCenters: puntoGuardado._id}})

            res.status(201).json(puntoGuardado);
        } catch (error) {
            console.error("Error al crear punto de reciclaje:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // {
    //     "nombre": "Punto de Reciclaje 1",
    //     "ubicacion": "Avenida El Sapito 55",
    //     "horario_atencion": "Martes a Sábado de 11 a 17 hs.",
    //     "materials": [
    //         "65d8f1ac89b012a63d744f9b", "65d8f21189b012a63d744fa7"
    //     ],
    //     "imagen": "https://pixabay.com/get/g18b1ef311640eca6a298c963ca6466032e6a34cc9f515d3c022fc13f27dfad4a09f93d58a6fd7a781725eb80dcba3b5b_1280.jpg",
    //     "latLng": {
    //         "lat": "-58.46463459803104",
    //         "lng": "-34.5673114271266"
    //     }
    // }

    getAllPoints: async (req, res) => {
        try {
            const puntosReciclaje = await RecyclingCenter.find();
            res.status(200).json(puntosReciclaje);
        } catch (error) {
            console.error("Error al obtener puntos de reciclaje:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getPointById: async (req, res) => {
        try {
            const { id } = req.params;
            const puntoReciclaje = await RecyclingCenter.findById(id);
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

            const dbPoints = await RecyclingCenter.find({
                "latLng.lat": { $gte: parseFloat(lat) },
                "latLng.lng": { $gte: parseFloat(lng) }
            });
    
            res.status(200).json(dbPoints);
        } catch (error) {
            console.error("Error al filtrar puntos de reciclaje por latitud y longitud:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // http://localhost:3000/recycling-center/filter-points-by-materials/65d8a71c72d4f453c1c7963f

    filterPointsByMaterial: async (req, res) => {
        try {
            const { materialId } = req.params;

            // Buscar los puntos de reciclaje que contengan el material específico
            const puntosReciclaje = await RecyclingCenter.find({ materials: materialId });

            if (!puntosReciclaje || puntosReciclaje.length === 0) {
                return res.status(404).json({ error: "No se encontraron puntos de reciclaje para el material especificado" });
            }

            res.status(200).json(puntosReciclaje);
        } catch (error) {
            console.error("Error al filtrar puntos de reciclaje por material:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    editPointById: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                nombre,
                ubicacion,
                horario_atencion,
                imagen,
                latLng,
                materials
            } = req.body;

            // Verificar si el punto de reciclaje existe
            const puntoReciclaje = await RecyclingCenter.findById(id);
            if (!puntoReciclaje) {
                return res.status(404).json({ error: "Punto de reciclaje no encontrado" });
            }

            // Verificar si ya existe otro punto de reciclaje con el mismo nombre y ubicación
            const existingPoint = await RecyclingCenter.findOne({ nombre, ubicacion });
            if (existingPoint && existingPoint._id.toString() !== id) {
                return res.status(400).json({ error: "Ya existe un punto de reciclaje con el mismo nombre y ubicación" });
            }

            // Verificar si ya existe otro punto de reciclaje con las mismas coordenadas
            const existingLatLngPoint = await RecyclingCenter.findOne({ "latLng.lat": latLng.lat, "latLng.lng": latLng.lng });
            if (existingLatLngPoint && existingLatLngPoint._id.toString() !== id) {
                return res.status(400).json({ error: "Ya existe un punto de reciclaje con las mismas coordenadas" });
            }

            // Actualizar los campos editables
            puntoReciclaje.nombre = nombre;
            puntoReciclaje.ubicacion = ubicacion;
            puntoReciclaje.horario_atencion = horario_atencion;
            puntoReciclaje.imagen = imagen;
            puntoReciclaje.latLng = latLng;
            puntoReciclaje.materials = materials;

            // Guardar los cambios
            const puntoActualizado = await puntoReciclaje.save();

            res.status(200).json(puntoActualizado);
        } catch (error) {
            console.error("Error al editar punto de reciclaje:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

        // Eliminar un punto de reciclaje por su ID
        deletePointById: async (req, res) => {
            try {
                const { id } = req.params;
                const puntoReciclaje = await RecyclingCenter.findByIdAndDelete(id);
                if (!puntoReciclaje) {
                    return res.status(404).json({ error: "Punto de reciclaje no encontrado" });
                }
                res.status(200).json({ message: "Punto de reciclaje eliminado exitosamente" });
            } catch (error) {
                console.error("Error al eliminar punto de reciclaje:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        },
    
        // Eliminar todos los puntos de reciclaje
        deleteAllPoints: async (req, res) => {
            try {
                await RecyclingCenter.deleteMany({});
                res.status(200).json({ message: "Todos los puntos de reciclaje han sido eliminados" });
            } catch (error) {
                console.error("Error al eliminar todos los puntos de reciclaje:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        }
    
};
