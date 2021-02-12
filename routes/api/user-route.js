const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../auth/register");
const validateLoginInput = require("../../auth/login");
const User = require("../../models/User");
const secretOrKey = "secret";
const Data = require("../../models/userData");
const Pref = require("../../models/Pref")

// signup route to register new user
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
          // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

//  sign in route 
router.post("/login", (req, res) => {
    // Validating form
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // match user and create JWT payload and sign token
          const payload = {
            id: user.id,
            name: user.name
          };
          jwt.sign(
            payload,
            secretOrKey,
            {
              expiresIn: 2629800 // keep user logged in for 1 month.
            },
            (err, token) => {
           

              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  router.get("/signout", (req, res) => {
    console.log("Logout")
    req.session.user = undefined;
    res.redirect("/")
  })
  

  router.get('/data/:userId' , (req, res) => {
    Data.find({userId: req.params.userId})
    .then((results) => { 
      console.log(results, "123") 
  
    res.json(results)   
  })
  })

  router.post('/data', (req, res) => {
    console.log("data:", req.body.userId)
    const newData = new Data({
      userId: req.body.userId,
      weight: req.body.weight,    
      bmi: req.body.bmi,
      bmr: req.body.bmr,
      cpd: req.body.cpd
  
    })
    console.log( newData)
    newData
    .save()
    .then(Data => res.json(Data))
    .catch(err => console.log(err));
  })
  

  router.get('/dataPref/:userId' , (req, res) => {
    Pref.find({userId: req.params.userId})
    .then((results) => { 
      console.log(results, "123") 
    res.json(results)
  })
  })

  router.get('/data' , (req, res) => {
    Data.find()
    .then((results) => { 
      console.log(results, "123") 
    res.json(results)
  })

  })
  
  router.post('/dataPref', (req, res) => {
    const newPref = new Pref({
      userId: req.body.userId,
      preferences: req.body.preferences
    })
    newPref
    .save()
    .then(Pref => res.json(Pref))
    .catch(err => console.log(err));
  })

  // route to get user information
  router.post('/accountInfo', (req, res) => {
    console.log(req);
  })
  
  

  module.exports = router;