const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/*GET contact us page */
router.get('/contact', (req, res, next) => {
  res.render('contact');
});

/*GET about us page */
router.get('/about', (req, res, next) => {
  res.render('about');
});

module.exports = router;