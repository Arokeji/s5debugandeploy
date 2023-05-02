const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creacion del esquema del libro
const bookSchema = new Schema(
  {
    title: {
      // Parametros del campo
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      min: 0,
      max: 10,
    },
    publisher: {
      type: {
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: false,
        },
      },
      required: false,
    },
  },
  {
    // Deja fecha y hora
    timestamps: true,
  }
);

// Creacion del modelo en si con un nombre y la configuracion del esquema
const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
