const Role = require("../models/role.models.js");

module.exports = {
  CreateRoles: async () => {
    try {
      const count = await Role.estimatedDocumentCount();
      if (count > 0) return;
      const values = await Promise.all([
        new Role({ name: "User" }).save(),
        new Role({ name: "Admin" }).save(),
        new Role({ name: "Empresa" }).save(),
      ]);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  },
};
