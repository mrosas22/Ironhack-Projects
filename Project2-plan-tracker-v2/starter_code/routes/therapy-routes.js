const express        = require('express');
const router         = express.Router();
// Require user model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Routine        = require('../models/routine-model');
const Feedback       = require('../models/feedback-model');


router.get("/:id", ensureAuthenticated, (req, res) => {
  Plan.findById(req.params.id)
    .then(plan =>{
      res.render("plans/plan-details", {plan});
    })
    .catch(err => console.log('Error while finding the plan: ', err));
  
})

// //localhost:3000/therapy/one
router.get("/:id/one", ensureAuthenticated, (req, res) => {
  Plan.findById(req.params.id).populate('reviews')
  .populate({path:'reviews', populate: {path: 'user'}})
  // Room.findById(req.params.id).populate({path: 'user', populate: {path: 'review'}})
    .then(plan =>{
      console.log('Please show me the reviews: ', plan.reviews)
      console.log('Please show me the name of the user: ', plan.reviews[0].user.fullName)
      res.render("routine/therapy/day1", { user: req.user, plan });
    })
    .catch(error => console.log('Error while finding the plan: ', error))
});

// // User update routine
// //localhost:3000/therapy/5c75b1ab33b63d96ff79050a/create
router.post("/:id/add-routine", ensureAuthenticated, (req, res) =>{
  const newRoutine = {
    water   : req.body.water,
    calories: req.body.calories,
    sleep   : req.body.sleep,
    exercise: req.body.exercise,
    member  : req.user._id
    }
  // console.log(' we are to see: ', req.body );
  Routine.create(newRoutine)
    .then(thenewRoutine =>{
      User.findById(req.user._id)
      .then(foundUser =>{
        foundUser.routines.push(thenewRoutine._id);
        foundUser.save()
        .then(() => {
          res.redirect(`/therapy/${req.params.id}/one`);
        })
        .catch(err => console.log('Error while saving the user: ', err));
      })
      .catch(err => console.log('Error while saving the user: ', err));
    })
    .catch(err => console.log('Error while saving the user: ', err));
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}



module.exports = router;