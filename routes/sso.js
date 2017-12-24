const User = require('../models/user'); // Import User Model Schema
 // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const auth = require('./NodeL2p/l2pAuth'); 
auth.setClientID('mQSZ0xgOuYww3EiRdqmhYMCG6t3sHcsfIWxPXAs7Z3v2LperWuIQaV0qMHlTKHhm.apps.rwth-aachen.de')
const Usersso = require('../models/usersso');
var open = require('open');

module.exports = (router) => {
   router.post('/loginSSO', (req, res) => {
    auth.obtainUserCode(function(response){
      console.log(response);
      device_code =  response.device_code;
      user_code =  response.user_code;
      open(response.verification_url);
       let usersso = new Usersso({
        usertoken: user_code,
        deviceToken : device_code
      });
      usersso.save((err) => {
        if(err){
          res.json({ success: false, message : "User not saved"}); 
        }
      });
      
     res.json({ success: true, ress : response, message : "Loading.."}); 
     });
      });
  router.post('/loginSSOCallback/:dc', (req, res) => {
        device_code = req.params.dc;
        console.log("Devcieqqq "+ device_code);
       
        auth.getTokens(device_code,function(response1){
          if(response1.access_token !== null){
            console.log(response1);
            let now = new Date();
            accessToken = response1.access_token;
            refreshToken = response1.refresh_token;
            expiresAt= now + 7200;
            //validate token and show output
            auth.tokenValidation(accessToken, function(response2){
              console.log(response2);
                if(response2.status !=="ok")
                     res.json({ success: false, message : "Token invalid. Try again later!"}); 
            });
           
        
              if(accessToken == "undefined")
                accessToken= refreshToken;
              else if(refreshToken == "undefined")
                refreshToken= accessToken;
               
                Usersso.findOne({ deviceToken: device_code }, (err, usersso) => {
                  if(err)
                     res.json({ success: false, message : "User not saved"});

                  usersso.accessToken = accessToken;
                  usersso.refreshToken = refreshToken;
                  usersso.accessTokenExpire =  expiresAt;
                 
                  usersso.save((err) => {
                    if(err){
                      res.json({ success: false, message : "User not saved"}); 
                    }
                  });
                 
              res.json({ success: true, message : "User validated!", token : accessToken, user : usersso, expiresAt : expiresAt, refreshToken : refreshToken }); 
              
                });
             
          }
          else
            res.json({ success: false, message: "You did not authorize in time"});
        });

    });

    router.post('/getRefreshToken/:refreshToken', (req, res) => {
      refreshToken = req.params.refreshToken;
      console.log("We are in getRefresjh: "+ refreshToken);
      auth.refreshToken(refreshToken,function(response){
        console.log(response);
          if(response.status == "ok"){
            Usersso.findOne({ refreshToken: refreshToken }, (err, usersso) => {
              if(!err){
                let now = new Date();
                usersso.accessToken = response.access_token;
                usersso.accessTokenExpire =  now + response.expires_in;
               
                usersso.save((err) => {
                  if(err){
                    res.json({ success: false, message : "User not saved"}); 
                  }
                });
              }
              });
              window.localStorage.setItem('token', usersso.accessToken);
              window. localStorage.setItem('user', JSON.stringify(usersso)); 
              window.localStorage.setItem('expiresAt', usersso.accessTokenExpire);
              window.localStorage.setItem('refreshToken', refreshToken);
            res.json({ success: true, message : "User validated!"}); 
          }else{
            res.json({ success: false, message : "Token could not be refreshed" }); 
          }
      });
   });

     /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================*/
  router.use((req, res, next) => {
    console.log(req.headers);
    const token = req.headers['Authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      let now = new Date();
      const expiresAt = window.localStorage.getItem("expiresAt");
      if (expiresAt !== null && expiresAt < now) {
       next();
      } else {
        res.json({ success: false, message: 'Token invalid'});
      }
    }
  }); 
  return router; // Return router object to main index.js
}