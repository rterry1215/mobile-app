const express = require('express');

const router = express.Router();
const {
  createUser,
  userSignIn,
  // uploadProfile,
  signOut,
  updateUserProfile, // New function for updating user profile
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');

router.get('/', (req, res) => {
  res.send('Welcome to the application');
});
router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/signin', validateUserSignIn, userVlidation, userSignIn);
router.get('/sign-in', userSignIn);
router.put('/updateprofile/:userId', updateUserProfile); // New route for updating user profile
router.post('/sign-out', isAuth, signOut);
module.exports = router;
