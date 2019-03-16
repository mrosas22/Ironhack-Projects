const express        = require('express');
const router         = express.Router();
// Require mongoose model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Session       = require('../models/session-model');
const Routine        = require('../models/routine-model');
const uploadCloud    = require('../config/upload-setup/cloudinary');

//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/search', (req, res, next) =>{
  User.findById(req.user._id).populate('routines')
  .then(userInfo =>{
    let showForm = true;

    Session.findById(req.params.id).populate('feedbacks')
    .populate({path:'feedbacks', populate: {path: 'user'}})
      .then(foundSession =>{
      //Go through all the feedbacks and display only those made by current user
        Promise.all(foundSession.feedbacks.filter(singleReview =>{
          if(singleReview.user._id.equals(req.user._id)){
            singleReview.canBeChanged = true;
          }
          return singleReview; 
        }))
        .then(() =>{
          for(let i=0; i < userInfo.routines.length; i++) {
            console.log('User info: ', typeof userInfo.routines[i].session, typeof req.query.session)
            if(userInfo.routines[i].session === +req.query.session){
              console.log('The req query session is: ', typeof req.query.session)
              showForm = false;
              res.render('session/session-details', {session: foundSession, user: req.user, showForm})
              return
            }
          };
            console.log('The form is false: ', showForm)
            res.render('session/session-details', {session: foundSession, user: req.user, showForm})
        })
        .catch(err => next (err))
    })
    .catch( error => console.log('Error while finding the routine: ', error))
  })
  .catch(err => next (err))
  
})

// User update routine =====> POST 
router.post('/session/:id/search', ensureAuthenticated,(req, res) =>{
    const {session, water, calories, sleep, exercise} = req.body;
    // console.log('the image file is: ', req.file)
    const newRoutine = {
      session  : session,
      calories : calories,
      water    : water,
      sleep    : sleep,
      exercise : exercise,
      member   : req.user._id
    }
    Routine.create(newRoutine)
      .then((thenewRoutine) =>{
        User.findById(req.user._id)
          .then(foundUser =>{
            foundUser.routines.push(thenewRoutine._id);
            foundUser.save()
              .then(() =>{
                res.redirect(`/session/${req.params.id}/search?session=${thenewRoutine.session}`)
                // res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});

//Create GET request Route for /api/data
router.get('/api/data', (req, res) =>{
  User.findById(req.user._id).populate('routines')
    .then(response =>{
      console.log('The response from API is: ', response.routines)
      res.json(response.routines)
    })
})


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


module.exports = router;