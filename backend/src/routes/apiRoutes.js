const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Validation middleware
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

router.get('/profile', apiController.getProfile);
router.get('/projects', apiController.getProjects);
router.get('/skills', apiController.getSkills);
router.get('/socials', apiController.getSocials);
router.post('/contact', validateContact, apiController.submitContact);

module.exports = router;
