const User = require('../models/user'); // Import User Model Schema
const Step = require('../models/step'); // Import step Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => { 
    router.post('/newstep/:id', (req, res) => {
        // Check if step title was provided
        if (!req.body.title) {
          res.json({ success: false, message: 'step title is required.' }); // Return error message
        } else {
          // Check if step body was provided
          if (!req.body.body) {
            res.json({ success: false, message: 'step body is required.' }); // Return error message
          } else {
            if (!req.params.id) {
                res.json({ success: false, message: 'Workflow id could not be found' }); // Return error message
              } else {
            const step = new Step({
                title: req.body.title, // Title field
                body: req.body.body, // Body field
               workflowId : req.params.id// CreatedBy field
              });
              // Save step into database
              step.save((err) => {
                // Check if error
                if (err) {
                  // Check if error is a validation error
                  if (err.errors) {
                    // Check if validation error is in the title field
                    if (err.errors.title) {
                      res.json({ success: false, message: err.errors.title.message }); // Return error message
                    } else {
                      // Check if validation error is in the body field
                      if (err.errors.body) {
                        res.json({ success: false, message: err.errors.body.message }); // Return error message
                      } else {
                        res.json({ success: false, message: err }); // Return general error message
                      }
                    }
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                } else {
                  res.json({ success: true, message: 'step saved!' }); // Return success message
                }
              });
            }
          }
        }
      });

    router.get('/getAllsteps', (req, res) => {
        Step.find({}, (err, steps)=>{
          if (err) {
            res.json({ success: false, message: err}); // Return error message
          } else {
            if(!steps)
              res.json({ success: false, message: err }); // Return general error message
              else{
                res.json({ success: true, steps: steps});
              }
          }
        }).sort({'_id' : -1});
      });
       return router;
};