const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express();

// connect to mangoDB
const dbURI = 'mongodb+srv://netninja:test123@nodetuts.qc1eub9.mongodb.net/node-tuts?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set("strictQuery", false)
// .then(() => console.log('connected to db'))
// .catch((err) => console.log(err))
mongoose.connect(dbURI, () => {
    app.listen(3000)
});


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
