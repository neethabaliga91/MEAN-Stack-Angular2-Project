const User = require('../models/user'); // Import User Model Schema
const Workflow = require('../models/workflow'); // Import workflow Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  /* ===============================================================
     CREATE NEW workflow
  =============================================================== */
  router.post('/newworkflow', (req, res) => {
    // Check if workflow title was provided
    if (!req.body.title) {
      res.json({ success: false, message: 'workflow title is required.' }); // Return error message
    } else {
      // Check if workflow body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'workflow body is required.' }); // Return error message
      } else {
        // Check if workflow's creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'workflow creator is required.' }); // Return error
        } else {
          // Create the workflow object for insertion into database
          const workflow = new Workflow({
            title: req.body.title, // Title field
            body: req.body.body, // Body field
            createdBy: req.body.createdBy,
            createdAt: req.body.createdAt // CreatedBy field
          });
          // Save workflow into database
          workflow.save((err) => {
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
              res.json({ success: true, message: 'workflow saved!' }); // Return success message
            }
          });
        }
      }
    }
  });

  router.get('/getAllworkflows', (req, res) => {
    Workflow.find({}, (err, workflows)=>{
      if (err) {
        res.json({ success: false, message: err}); // Return error message
      } else {
        if(!workflows)
          res.json({ success: false, message: err }); // Return general error message
          else{
            res.json({ success: true, workflows: workflows});
          }
      }
    }).sort({'_id' : -1});
  });
  return router;
};
