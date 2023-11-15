const express = require('express');
const app = express()

const path = require('path');
const fs = require("fs");

// const pageRoutes = require('./routes/volunteer')

app.use(express.static("public")); // Serve static files (e.g. CSS files)
app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies


// app.use(pageRoutes);

// app.use(function (error, req, res, next) {
//   // Default error handling function
//   // Will become active whenever any route / middleware crashes
//   console.log(error);
//   res.status(500).render('500');
// });


app.get('/' , function(req,res){
    const htmlFilePath = path.join(__dirname, 'views' , 'index.html')
    res.sendFile(htmlFilePath)
})

app.get('/find' , function(req,res){
    const htmlFilePath = path.join(__dirname, 'views' , 'find.html')
    res.sendFile(htmlFilePath)
})


app.get('/signin' , function(req,res){
    const htmlFilePath = path.join(__dirname, 'views' , 'signin.html')
    res.sendFile(htmlFilePath)
})

app.get('/signup' , function(req,res){
    const htmlFilePath = path.join(__dirname, 'views' , 'signup.html')
    res.sendFile(htmlFilePath)
})







app.listen(3000)