const express        = require('express');
const router         = express.Router();
// Require mongoose model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Session       = require('../models/session-model');
const Routine        = require('../models/routine-model');
const uploadCloud    = require('../config/upload-setup/cloudinary');

//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/1', (req, res, next) =>{
  Session.findById(req.params.id).populate('feedbacks')
  .populate({path:'feedbacks', populate: {path: 'user'}})
    .then(foundSession =>{
      //Go through all the feedbacks and display only those made by current user
      Promise.all(foundSession.feedbacks.filter(singleReview =>{
        if(singleReview.user._id.equals(req.user._id)){
          singleReview.canBeChanged = true;
          console.log('The feedback is: ', singleReview.canBeChanged)
        }
        return singleReview; 
      }))
        .then(() =>{
          res.render('session/session-details', {session: foundSession, user: req.user})
        })
        .catch(err => next (err))
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

//User Update form with DOM manipulation
// const theNames = document.getElementsByClassName("the-name");
// const theOccupations = document.getElementsByClassName("the-occupation");
// const theWeapons = document.getElementsByClassName("the-weapon");
// document.getElementById("character-form").onsubmit = function(event) {
//     event.preventDefault();
   
//      router.post('/session/:id/1', ensureAuthenticated,(req, res) =>{
//       const newRoutine = {
//         water    : theNames[0].value,
//         calories : theOccupations[0].value,
//         sleep    : theWeapons[0].value
//       };
//       Routine.create(newRoutine)
//         .then((thenewRoutine) =>{
//           const { water, calories, sleep} = thenewRoutine;
//           const newRoutineHtml =  `
//           <li>
//              <p> Water: ${water} </p>
//              <p> Calories: ${calories} </p>
//              <p> Sleep: ${sleep} </p>
//           </li>
//           `;
//           document.getElementById("characters-list").innerHTML += newRoutineHtml;
//           document.getElementById("character-form").reset();
//         })
//         .catch(error => {
//           console.log("Error is: ", error);
//       })
//      })
// }   

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/1', ensureAuthenticated,(req, res) =>{
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
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});

//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/2', (req, res, next) =>{
  Session.findById(req.params.id)
    .then(foundSession =>{
      res.render('session/session-details', {session: foundSession, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/2', ensureAuthenticated,(req, res) =>{
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
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});

//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/3', (req, res, next) =>{
  Session.findById(req.params.id)
    .then(foundSession =>{
      res.render('session/session-details', {session: foundSession, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/3', ensureAuthenticated,(req, res) =>{
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
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});


//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/4', (req, res, next) =>{
  Session.findById(req.params.id)
    .then(foundSession =>{
      res.render('session/session-details', {session: foundSession, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/4', ensureAuthenticated,(req, res) =>{
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
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});




function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


module.exports = router;