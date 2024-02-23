const materialesRecicladosEnum = {
  Vidrio: [
    "vasos",
    "frascos",
    "tarros",
    "tazas",
    "platos",
    "botellas",
    "copas",
    "vidrioventana",
  ],
  Papel_Carton: ["cajas", "envases", "tubos", "envases", "vasosdecafe"],
  Metal: ["latas", "tapas", "sartenes"],
  Plástico: ["botellas", "bolsas", "envases", "juguetes"],
  Pilas_Baterias: [],
  Aceite: [],
};
const materialesValidator = [
  {
    validator: function (material, tipoMaterial) {
      // Verificar que el material esté dentro del tipo de material correspondiente
      if (!materialesRecicladosEnum[tipoMaterial]) {
        return false; // El tipo de material no existe en la enumeración
      }
      return materialesRecicladosEnum[tipoMaterial].includes(material);
    },
    message:
      "El material proporcionado no es válido para el tipo de material especificado.",
  },
];
