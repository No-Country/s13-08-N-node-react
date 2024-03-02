const CourseSchema = require("../models/course.models.js");

CourseSchema.pre("validate", function (next) {
  if (this.nivel && !this.precio) {
    this.precio = nivelesPreciosEnum[this.nivel];
  }
  next();
});

module.exports = mongoose.model("course", CourseSchema);
