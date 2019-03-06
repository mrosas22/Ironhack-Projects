const express  = require('express');
const router   = express.Router();
const Session  = require('../models/session-model');
const Feedback = require('../models/feedback-model');


//localhost:3000/feedback/5c7735c8865baf788436a5e8/add-review
router.post('/:sessionId/add-review', (req, res, next) => {
  console.log('Review: ', req.params.sessionId);
  const newComment = {
    user     : req.user._id,
    comment  : req.body.comment,
  }
  Feedback.create(newComment)
    .then(theNewComment => {
        Session.findById(req.params.sessionId)
            .then(foundSession => {
                foundSession.feedbacks.push(theNewComment._id);
                foundSession.save()
                    .then(() => {
                        res.redirect(`/${foundSession.name}/${foundSession._id}`)
                    })
                    .catch(err => next(err));
            })
            .catch(err => next(err));
    })
    .catch(err => next(err));
})


// delete review
router.post('/:id/delete', (req, res, next) => {
  Feedback.findByIdAndDelete(req.params.id) 
    .then(() => {
        Session.findOne({'feedback': req.params.id})
            .then(foundSession => {
                for(let i=0; i< foundSession.feedbacks.length; i++ ){
                    console.log(foundSession.feedbacks[i]._id.equals(req.params.id))
                    if(foundSession.feedbacks[i]._id.equals(req.params.id)){
                        foundSession.feedbacks.splice(i, 1);
                    }
                }
                foundSession.save()
                    .then(() => {
                        res.redirect(`/session/${foundSession_id}/${foundSession.session}`)
                    })
                    .catch(err => next(err))
                    })
            .catch(error => console.log('Error while finding the feedback: ', error))
    })
    .catch(error => console.log('Error while deleting the feedback: ', error))
})




module.exports = router;