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
      device_code =  response.device_code;
      user_code =  response.user_code;
      console.log(response); 
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
          console.log(response1); 
          if(response1.access_token !== null){
            acessToken = response1.access_token;
            refreshToken = response1.refresh_token;
        
            //validate token and show output
            auth.tokenValidation(acessToken, function(response2){
                console.log(response2);
                if(response2.status !=="ok")
                     res.json({ success: false, message : "Token invalid. Try again later!"}); 
            });
            
              if(acessToken == "undefined")
                acessToken= refreshToken;
              else if(refreshToken == "undefined")
                refreshToken= accessToken;
                Usersso.findOne({ deviceToken: device_code }, (err, usersso) => {
                  if(err)
                     res.json({ success: false, message : "User not saved"});

                  usersso.acessToken = acessToken;
                  usersso.refreshToken = refreshToken;
                  usersso.save((err) => {
                    if(err){
                      res.json({ success: false, message : "User not saved"}); 
                    }
                  });
                });
             
            
              res.json({ success: true, message : "User validated!"}); 
        
          }
          else
            res.json({ success: false, message: "You did not authorize in time"});
        });

    });
  return router; // Return router object to main index.js
}
