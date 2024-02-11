const Role = require("../models/role.models.js");

module.exports = {
  CreateRoles: async () => {
    try {
      const count = await Role.estimatedDocumentCount();
      if (count > 0) return;
      const values = await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "admin" }).save(),
      ]);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  },
};
