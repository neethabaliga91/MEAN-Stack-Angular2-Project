const User = require('../models/user'); // Import User Model Schema
const Workflow = require('../models/workflow');
const Step = require('../models/step'); // Import workflow Model Schema
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
    var send = new Array(), promises =[];
console.log(req.headers);
    Workflow.find({}, (err, workflows)=>{
      if (err) {
        res.json({ success: false, message: err}); // Return error message
      } else {
        if(!workflows)
          res.json({ success: false, message: err }); // Return general error message
          else{
           /* workflows.forEach(function(workflow) {
              Step.find({workflowId : workflow._id}, (err, steps)=>{
                if(!err){
                  send.push({ _id: workflow._id,
                    title: workflow.title,
                    body: workflow.body,
                    createdBy: workflow.createdBy,
                    createdAt:workflow.createdAt,
                    steps: steps
                  });
                 }
              });

            });

            res.json({ success: true,  workflows: send});*/
          
           res.json({ success: true, workflows: workflows});
          }
      }
    }).sort({'_id' : -1});
  });

  router.get('/singleWorkflow/:id', (req, res) => {
    if(!req.params.id){
      res.json({success : false, message: "Id not entered"});
    }
   Workflow.findOne({ _id : req.params.id }, (err, workflow) =>{
     if(err){
       res.json({success: false, message : "Not a valid Workflow Id"});
     }else{
       if(!workflow){
        res.json({success: false, message : "Workflow not found"});
       }else{
         res.json({success: true, workflow : workflow});
       }
     }
   });
  });

  router.put('/updateWorkflow', (req, res) => {
    // Check if id was provided
    if (!req.body._id) {
      res.json({ success: false, message: 'No Workflow id provided' }); // Return error message
    } else {
      // Check if id exists in database
      Workflow.findOne({ _id: req.body._id }, (err, workflow) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid Workflow id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!workflow) {
            res.json({ success: false, message: err }); // Return error message
          } else {
            // Check who user is that is requesting workflow update
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user logged in the the one requesting to update workflow 
                  if (user.username !== workflow.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this Workflow.' }); // Return error message
                  } else {
                    workflow.title = req.body.title; // Save latest workflow title
                    workflow.body = req.body.body; // Save latest body
                    workflow.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Workflow Updated!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });
  
  router.delete('/deleteWorkflow/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Workflow.findOne({ _id: req.params.id }, (err, workflow) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if workflow was found in database
          if (!workflow) {
            res.json({ success: false, messasge: 'workflow was not found' }); // Return error message
          } else {
            // Get info on user who is attempting to delete post
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user's id was found in database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user attempting to delete workflow is the same user who originally posted the workflow
                  if (user.username !== workflow.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this workflow post' }); // Return error message
                  } else {
                    // Remove the workflow from database
                    workflow.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'workflow deleted!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });
  return router;
};
