// dependencies
const express = require('express');

const router = express.Router();

const mongodb = require('mongodb');

const bcrypt = require('bcrypt');

const multer = require('multer');

const path = require('path');


const { connectToDatabase } = require('../data/database');




const storageConfig = multer.diskStorage({
  destination: function(req,file,cb){
    // Specify the directory where uploaded files will be stored
    cb(null,'form-images')
  },
  filename:  function(req,file,cb){
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Initialize multer with the storage configuration
const upload =multer({storage:storageConfig})

router.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, '..', 'views', 'index.html');
  res.sendFile(htmlFilePath);
});

router.get('/find', async (req, res) => {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    const eventsCollection = db.collection('events');

    // Fetch events data from the database
    const eventsData = await eventsCollection.find({}).toArray();

    // Render the modified find.html file with event data using EJS
    res.render('find', { events: eventsData });
} catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Internal Server Error');
}
});

router.get('/create', async (req, res) => {
  const htmlFilePath = path.join(__dirname, '..', 'views', 'create.html');
  res.sendFile(htmlFilePath);
});

router.get('/signin', (req, res) => {
  const htmlFilePath = path.join(__dirname, '..', 'views', 'signin.html');
  res.sendFile(htmlFilePath);
});

router.get('/signup', (req, res) => {
  const htmlFilePath = path.join(__dirname, '..', 'views', 'signup.html');
  res.sendFile(htmlFilePath);
});


router.post('/signup', async (req, res) => {
    try {
      const { text, email, password, 'password-confirm': passwordConfirm } = req.body;
  
      // Validate the form data if needed

      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Connect to the database
      const db = await connectToDatabase();
      const usersCollection = db.collection('users'); // Use 'users' collection
  
      // Insert the form data into the database
      await usersCollection.insertOne({
        text,
        email,
        password : hashedPassword,
      });
  
      // Respond with a success message
      res.redirect('/index?signup=success'); // Use query parameter for success message
      res.send('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).send('Internal Server Error');
    }
  });


router.post('/create', upload.single('imageUpload'),async (req, res) => {
    try {
      const {
        organizationName,
        eventTitle,
        eventDescription,
        date,
        time,
        location,
        duration,
        volunteersNeeded,
        skillsQualifications,
        ageRestrictions,
        volunteerResponsibilities,
        contactName,
        contactEmail,
        contactPhone,
        organizationInfo,
        imageUpload,
        additionalComments,
      } = req.body;
  
      // Access the uploaded file using req.file
      const uploadedImageFile = req.file
  
       // Connect to the database
      const db = await connectToDatabase();
      const eventsCollection = db.collection('events'); // Use 'events' collection
  
      // Insert the form data into the 'events' collection
      const result = await eventsCollection.insertOne({
        organizationName,
        eventTitle,
        eventDescription,
        date,
        time,
        location,
        duration,
        volunteersNeeded,
        skillsQualifications,
        ageRestrictions,
        volunteerResponsibilities,
        contactName,
        contactEmail,
        contactPhone,
        organizationInfo,
        additionalComments,
        imageUpload,
        imagePath:uploadedImageFile.path
    });

    

    // Redirect to create.html page
    res.redirect('/create?created=true');
 

  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Internal Server Error');

  }     
});
  
  

module.exports = router;

