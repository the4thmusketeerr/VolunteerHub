const express = require('express');
const app = express()

const path = require('path');

const db = require('./data/database');

const volunteerRoutes = require('./routes/volunteer');

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public")); // Serve static files (e.g. CSS files)
app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies

app.use('/form-images',express.static("form-images")); 


app.use(volunteerRoutes)


app.use(function (error, req, res, next) {
    // Default error handling function
    // Will become active whenever any route / middleware crashes
    console.log(error);
    res.status(500).render('500');
  });
  

db.connectToDatabase().then(function() {
    app.listen(3000);
})