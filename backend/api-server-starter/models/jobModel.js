const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
});
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  company: { type: companySchema, required: true },
});

// Ensure virtual fields are serialized
//setting the toJSON method to the jobSchema. This method is used to convert the jobSchema to a JSON object.
jobSchema.set("toJSON", {
  //setting the virtuals to true. This means that the virtual fields will be included in the JSON object.
  virtuals: true,
  //setting the transform method to the jobSchema. This method is used to transform the jobSchema to a JSON object.
  transform: (doc, ret) => {
    //setting the id to the _id of the jobSchema. This means that the id will be the _id of the jobSchema.
    ret.id = ret._id;
    //deleting the _id of the jobSchema. This means that the _id will be deleted from the JSON object.
    delete ret._id;
    //deleting the __v of the jobSchema. This means that the __v will be deleted from the JSON object.
    delete ret.__v;
    //returning the jobSchema as the JSON object.
    return ret;
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
