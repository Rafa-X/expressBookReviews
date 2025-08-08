const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        if(isValid(username)){
            users.push({"username":username, "password":password});
            return res.status(200).json({message:"User registered."});
        }else{
            return res.status(404).json({message:"Error. User already registered."});
        }
    }
    return res.status(404).json({message:"Error. Information missing."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    console.log(req.body.isbn);
    const filtered = Object.entries(books)
    .filter(([key,book]) => book.isbn === req.body.isbn)
    .map(([key, book]) => ({ id: key, ...book }));
    return res.status(200).send(JSON.stringify(filtered, null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    console.log(req.body.author);
    const filtered = Object.entries(books)
    .filter(([key,book]) => book.author === req.body.author)
    .map(([key,book]) => ({ id: key, ...book}));
    return res.status(200).send(JSON.stringify(filtered, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    console.log(req.body.title);
    const filtered = Object.entries(books)
    .filter(([key,book]) => book.title === req.body.title)
    .map(([key,book]) => ({ id: key, ...book}));
    return res.status(200).send(JSON.stringify(filtered, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    console.log(req.body.isbn);
    const filtered = Object.entries(books)
    .filter(([key,book]) => book.isbn == req.body.isbn)
    .flatMap(([key,book]) => Object.entries(book.reviews));
    return res.status(200).send(JSON.stringify(filtered, null, 4));
});

module.exports.general = public_users;
