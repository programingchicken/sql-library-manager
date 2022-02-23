const Book = require('../models/Book')
const express = require('express');
const router = express.Router();


//to look at try catch
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {

            await cb(req, res, next);

        } catch (err) {
            // new book error
            if (err.name === 'SequelizeValidationError' && req.params.id === undefined) {
                    res.render('new-book', { authorized: true, title: "New Book", errText: err.message})

                // update book error
            } else if (err.name === 'SequelizeValidationError') {
                    const reqID = req.params.id
                    const book = await Book.findByPk(reqID)
                    res.render('update-book', { authorized: true, title: "Update Book", id: reqID ,book, errText: err.message})

                //didnt find page error
            } else if (err.name === 'GlobalErrorHandler'){
                res.render('page-not-found', { message: 404, title: "Page Not Found", messageTwo: "Page didn't load." })
            } else {
                res.render('page-not-found', { message: 500, title: "Server Error", messageTwo: "Server didn't load." })
            }

        }
    }
}


//start database up with 2 books
router.get('/', asyncHandler(async (req, res) => {
    const book1 = await Book.build({
        title: "The Hunger Games",
        author: "Suzanne Collins",
        genre: "Fantasy",
        year: "2008"
    });
    await book1.save()

    const book2 = await Book.build({
        title: "The Hunger Games 2",
        author: "Suzanne Collins",
        genre: "Fantasy",
        year: "2009"
    });
    await book2.save()

    const book3 = await Book.build({
        title: "The Hunger Games 3",
        author: "Suzanne Collins",
        genre: "Fantasy",
        year: "2010"
    });
    await book3.save()

    const book4 = await Book.build({
        title: "The Hunger Games 4",
        author: "Suzanne Collins",
        genre: "Fantasy",
        year: "2011"
    });
    await book4.save()

    const book5 = await Book.build({
        title: "The Hunger Games 5",
        author: "Suzanne Collins",
        genre: "Fantasy",
        year: "2012"
    });
    await book5.save()

    const book6 = await Book.build({
        title: "The Hunger Games 6",
        author: "Suzanne Collins",
        genre: "Fantasy",
        year: "2013"
    });
    await book6.save()

    res.redirect('/books')
}))

//book index
router.get('/books', asyncHandler(async (req, res) => {
    //find all data in books
    const bookArray = await Book.findAll()
    if (bookArray) {
        res.render('index', { bookArray })
        // res.send(console.log(res.json(bookArray)))

    } else {
        res.sendStatus(404);
    }
}))


//New book page
router.get('/books/new', asyncHandler(async (req, res) => {
    res.render('new-book', { title: "New Book" })
}))


//Create new Book
router.post('/books/new', asyncHandler(async (req, res) => {
    //build data in Book
    const book = await Book.build({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year });
    if (book) {
        await book.save()
        res.redirect('/books')
    } else {
        //run form error
        res.sendStatus(404);
    }
}))


//update page
router.get('/books/:id', asyncHandler(async (req, res) => {
    const reqID = req.params.id;
    //find by id
    const book = await Book.findByPk(reqID);

    if (book) {
        res.render('update-book', { title: "Update Book", id: reqID, book })
    } else {
        return err
    }
}))


//update
router.post('/books/:id', asyncHandler(async (req, res) => {
    const reqID = req.params.id;
    const book = await Book.findByPk(reqID);
    //saves a thing in database


// testing for book title or author
    if (req.body.title !== undefined && req.body.author !== undefined) {
        await book.update({ id: reqID, title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year })
        res.redirect('/books')
    } else {
        return err
    }
}))

//Delete book
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
    const reqID = req.params.id;
    if (reqID) {
        await Book.destroy({ where: { id: reqID } });
        res.redirect('/books')
        res.send('Deleted');
    } else {
        return err
    }
}))


module.exports = router;