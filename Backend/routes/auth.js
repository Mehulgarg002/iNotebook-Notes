const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harryisagoodb$oy"

// Route1: Create a user using: Post "/api/auth/createuser" .Doesn't require login
router.post('/createuser', [
     body('name', 'Enter a valid name and length must be >3 .').isLength({ min: 3 }),
     body('email', 'Enter a valid email .').isEmail(),
     body('password', 'Enter a valid password and length must be >5  .').isLength({ min: 5 }),
], async (req, res) => {
     //if there are errors, return bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }
     // checl whether the user email exist already
     try {


          let user = await User.findOne({ email: req.body.email });
          if (user) {
               return res.status(400).json({ errors: "Sorry a user with this email is already exits" });
          }

          const salt = await bcrypt.genSalt(10);
          const secPas = await bcrypt.hash(req.body.password, salt);
          user = await User.create({
               name: req.body.name,
               email: req.body.email,
               password: secPas,
          });
          const data = {
               user: {
                    id: user.id
               }
          }
          const authToken = jwt.sign(data, JWT_SECRET);
          res.json({ authToken });
          

     } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error!");
         
     }

})

// Route2: Authenticate a user using: Post "/api/auth/loginpage" .Doesn't require login

router.post('/login', [
     body('email', 'Enter a valid email .').isEmail(),
     body('password', 'Password cannot be blank .').exists(),
], async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;
     try {
          let user = await User.findOne({ email });
          if (!user) {
               return res.status(400).json({ error: "Please try to login with correct credentials " });
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
               return res.status(400).json({ error: "Please try to login with correct credentials " });

          }

          const data = {
               user: {
                    id: user.id
               }
          }
          const authToken = jwt.sign(data, JWT_SECRET);
          res.json(authToken);

     } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error!");

     }
})


// Route3: Get LoggedIn user detail using: Post "/api/auth/getuser" .Login required

router.post('/getuser', fetchuser, async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }
     try {
          let userId = req.user.id;
          const user = await User.findById(userId).select("-password");
          res.send(user);
     } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error!");

     }
})
module.exports = router