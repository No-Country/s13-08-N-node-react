const Categoria = require('../models/categorymaterial.model');

module.exports = {
    createCategory: async (req, res) => {
        try {
            const { nombreCategoria } = req.body;

            // Verificar si se proporcionó el campo 'nombreCategoria' en la solicitud
            if (!nombreCategoria) {
                return res.status(400).json({ error: 'El campo nombreCategoria es requerido' });
            }

            // Verificar si la categoría ya existe
            const categoriaExistente = await Categoria.findOne({ nombreCategoria });
            if (categoriaExistente) {
                return res.status(400).json({ error: 'Categoria Existente' });
            }

            // Crear una nueva instancia de Categoría
            const nuevaCategoria = new Categoria({ nombreCategoria });

            // Guardar la nueva categoría en la base de datos
            const categoriaGuardada = await nuevaCategoria.save();

            res.status(201).json(categoriaGuardada);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getAllInfoCategories: async (req, res) => {
        try {
            const categorias = await Categoria.find().select('nombreCategoria material');
            res.status(200).json(categorias);
        } catch (error) {
            console.error("Error al obtener categorias:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const categorias = await Categoria.find().select('nombreCategoria');
    
            // .map devuelve solo los nombres de las categorías
            const nombresCategorias = categorias.map(categoria => categoria.nombreCategoria);
    
            res.status(200).json(nombresCategorias);
        } catch (error) {
            console.error("Error al obtener categorias:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // [
    //     "Vidrio",
    //     "Plástico",
    //     "Papel y Cartón",
    //     "Metal",
    //     "Orgánicos",
    //     "Electrónicos",
    //     "4533543",
    //     "Textiles",
    //     "Neumáticos",
    //     "Madera",
    //     "Aceites y grasas"
    // ]

    getCategoryById: async(req, res) => {

        try {
            const {id} = req.params
            const categoria = await Categoria.findById(id);
    
            res.status(200).json(categoria)
    
            if(!categoria) {
                return res.status(404).json({error: "Categoria inexistente"})
            }            
        } catch (error) {
            console.error("Error al obtener categoria por ID:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

    },

    getCategoryInfoById: async() => {
        try {
            const {id} = req.params
            const categoria = await Categoria.findById(id);
    
            res.status(200).json(categoria)
    
            if(!categoria) {
                return res.status(404).json({error: "Categoria inexistente"})
            }            
        } catch (error) {
            console.error("Error al obtener categoria por ID:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}
