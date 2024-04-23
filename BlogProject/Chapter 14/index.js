"use strict";

const express = require("express");
const app = new express();
const ejs = require("ejs");
const expressSession = require('express-session');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleware = require("./middleware/validateMiddleware");
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const flash = require('connect-flash');
global.loggedIn = null;
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware);
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
app.use(flash());
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));
app.listen(4000, () => {
    console.log("App listening on port 4000")
});

