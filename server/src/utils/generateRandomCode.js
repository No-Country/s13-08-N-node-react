module.exports = {
    GenerateRandomCode: async (req, res, next) => {
      try {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        const maxLength = Math.min(length, 5); // Asegurar que la longitud no sea mayor a 5
        for (let i = 0; i < maxLength; i++) {
          code += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return code;
      } catch (error) {
        // Manejar cualquier error que pueda surgir durante la generación del código
        console.error("Error al generar el código aleatorio:", error);
        // Retornar un valor por defecto en caso de error
        return null;
      }
    },
  };
  