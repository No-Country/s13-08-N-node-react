module.exports = {
    calcularPuntosPorTicket: async (ticket) => {
      try {
        let puntos = 0;
        // Iterar sobre los materiales relacionados en el ticket y sumar sus pesos
        ticket.materialesRelacionados.forEach((material) => {
          puntos += material.peso;
        });
        return puntos;
      } catch (error) {
        console.error("Error al calcular puntos para el ticket:", error.message);
        return null;
      }
    },
  };
  