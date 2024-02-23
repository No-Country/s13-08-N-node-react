const jwt = require("jsonwebtoken");
module.exports = {
  //generar un token firmado
  tokenSign: async (user) => {
    return jwt.sign(
      {
        _id: user.id,
        role: user.role,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
  },

  verifyToken: async (token) => {
    try {
      return jwt.verify(token, process.env.TOKEN_KEY);
    } catch (e) {
      return null;
    }
  },

  // decodeToken: (token) => {
  //   try {
  //     const decoded = jwt.decode(token);
  //     return decoded;
  //   } catch (error) {
  //     console.error("Error al decodificar el token:", error.message);
  //     return null;
  //   }
  // },

  decodeToken: (token) => {
    const base64Url = token.split(".")[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(base64);
  },



  confirmToken: () => {
    const random = Math.random().toString(32).substring(2)
    const fecha = Date.now().toString(32)
    return random + fecha
  }
  
};

