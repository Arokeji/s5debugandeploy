const express = require("express");

// Router de Books
const router = express.Router();

// Modelos
const { Book } = require("../models/Book.js");

// Rutas
// CRUD: Read
// Ejemplo de request con parametros http://localhost:3000/book/?page=2&limit=10
router.get("/", async (req, res) => {
  try {
    // Lectura de query parameters
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const books = await Book.find().limit(limit).skip((page - 1) * limit);

    // Conteo del total de elementos
    const totalElements = await Book.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: books
    }

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CRUD: Create
router.post("/", async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      rating: req.body.rating,
      publisher: {
        name: req.body.publisher.name,
        category: req.body.publisher.category
      }
    });

    const createdBook = await book.save();
    return res.status(200).json(createdBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: Read
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findByIdAndUpdate(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// No CRUD. Busqueda personalizada
router.get("/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const book = await Book.find({ title: new RegExp("^" + title.toLowerCase(), "i") });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: Delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookDeleted = await Book.findByIdAndDelete(id);
    if (bookDeleted) {
      res.json(bookDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json();
  }
});

// CRUD: Put
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookUpdated = await Book.findByIdAndUpdate(id, req.body);
    if (bookUpdated) {
      res.json(bookUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { userRoutes: router };
