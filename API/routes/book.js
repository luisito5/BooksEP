const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


//Get back all the books
router.get('/', async (req, res) => {
    try{
        const book = await Book.find();
        res.json(book);
    } catch(err) {
        res.json({message:err});
    }
});

//Get back a specific book
router.get('/:id', async (req,res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.json({message: err});

    }
});

//Submit a book
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    });
    try{
        const savedBook = await book.save()
        res.json(savedBook);
    } catch (err) {
        res.json({message: err});
    }
});

//Update a book
router.put('/:id', async (req, res) => {
    try{
        const updatedBook = await Book.updateOne(
            {_id: req.params.id}, 
            {$set: {title: req.body.title}});
            res.json(updatedBook);
    } catch(err){
        res.json({message: err});
    }
});

//Delete a book
router.delete('/:id', async (req, res) => {
    try{
        const removeBook = await Book.deleteOne({_id: req.params.id});
        res.json(removeBook);
    } catch(err){
        res.json({message: err});
    }
});

//Get books greater or equal than a year given
router.get('/getbyyear/:year', async (req,res) => {
    try {
        const book = await Book.find({year: {$gte: req.params.year}});
        res.json(book);
    } catch (err) {
        res.json({message: err});

    }
});

module.exports = router;