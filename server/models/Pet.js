const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedPets` array in User.js
const petSchema = new Schema({
  size: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },

  species: {
    type: String,
    required: true,
  },

  petId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = petSchema;
