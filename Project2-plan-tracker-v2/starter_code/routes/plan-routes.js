const express        = require('express');
const router         = express.Router();
//Upload configuration
const multer         = require('multer') 
const uploadCloud    = require('../config/upload-setup/cloudinary')
// Require mongoose models
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Routine        = require('../models/routine-model');
//create functions that will check against different roles automatically
const checkEditor = checkRoles('EDITOR');
const checkAdmin  = checkRoles('ADMIN');

//List all plans created by admins ======>localhost:3000/plans
router.get('/', (req, res, next) =>{
    Plan.find()
      .then((plans) =>{
        res.render('plans/plan-list', {plans});
      })
      .catch((error) =>{
        console.log(error)
      })
})

//localhost:3000/plans/add =====> Only admins can create plans
router.get("/add", checkAdmin, (req, res) => {
    res.render("plans/plan-add", { user: req.user });
});

router.post('/add', uploadCloud.single('imagePlan'), (req, res, next) => {
    const { name, description, events } = req.body;
    const imagePlan = req.file.secure_url;
    const owner     = req.user._id;
    const newPlan = new Plan ({name, description, events, imagePlan, owner})
    newPlan.save()
      .then(plans => {
        res.redirect('/plans');
      })
      .catch(error => {
        console.log(error);
      })
});
////////////////////////////////////////////////////////////////////////////
//Details route =====> http://localhost:3000/plans/5c748a4674aa4936ab77cbf1
router.get('/:id', ensureAuthenticated, (req, res, next) => {
    let planId = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(planId)) { 
      return res.status(404).render('not-found');
    }
    Plan.findById(req.params.id)
      .then(plan => {
        if (!plan) {
            return res.status(404).render('not-found');
        }
        res.render('plans/plan-details', { plan })
      })
      .catch (error => next (error))
});
//Create Session =====> //localhost:3000/plans/5c7d6793bd73534bc561eade/add-routine?
router.get("/:id/add-routine", checkAdmin, (req, res) => {
  Plan.findById(req.params.id)
      .then((plan) =>{
        console.log('the plan is: ', plan)
        res.render("routines/routine-add", { user: req.user, plan });
      })
      .catch((error) =>{
        console.log(error)
      })
});

//POST ====> /plans/5c7d6793bd73534bc561eade/add-routine
router.post('/:id/add-routine', uploadCloud.single('routinePlan'), (req, res, next) => {
  const { session, education, tips  } = req.body;
  Routine.create({
    session     : session,
    education   : education,
    tips        : tips,
    routinePlan : req.file.secure_url,
    owner       : req.user._id,
  })
    .then(newRoutine =>{
      Plan.findById(req.params.id)
      .then(foundPlan => {
        foundPlan.routines.push(newRoutine._id);
        foundPlan.save()
          .then(() => {
            res.redirect(`/plans/${foundPlan._id}`)
          })
          .catch(err => next(err));
          })
      .catch(err => next(err));
    })
    .catch(err => next(err));
});


////////////////////////////////////////////////////////////////////////////
//Edit route =====> //localhost:3000/plans/5c6b88be561f7043c47ad7aa/update
router.get('/:id/update', checkAdmin, (req, res, next) => {
    Plan.findOne({_id: req.params.id})
      .then((plan) => {
        res.render("plans/plan-update", {plan});
      })
      .catch((error) => {
        console.log(error);
      })
});

//POST /plans/5c7450030cac6b2d948e91e4/update
router.post('/:id/update', uploadCloud.single('imagePlan'), (req, res, next) => {
    const {name, description} = req.body;
    // console.log('the image file is: ', req.file)
    Plan.findByIdAndUpdate(req.params.id, {
      name        : name,
      description : description,
      imagePlan   : req.file.secure_url
    })
      .then((plan) =>{
        res.redirect('/plans');
      })
      .catch((error) =>{
        console.log(error);
      })
})

//POST /plans/5c742b2ae09a3a265d1ea374/delete
router.post('/:id/delete', (req, res, next) =>{
    Plan.findByIdAndDelete({'_id': req.params.id})
      .then(deletedPlan =>{
        res.redirect('/plans')
      })
      .catch(error => console.log('error while deleting the plan: ', error))
})



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

module.exports = router;