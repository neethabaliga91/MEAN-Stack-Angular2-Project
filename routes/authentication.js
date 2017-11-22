const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res)=>{
        //req.body.username
        //req.body.password
        //req.body.first_name
        //req.body.last_name

          if (!req.body.username) {
            res.json({ success: false, message: 'You must provide a username' }); // Return error
          }else{
            
             if (!req.body.first_name) {
                res.json({ success: false, message: 'You must provide a First Name' }); // Return error
             }else{
                if (!req.body.last_name) {
                    res.json({ success: false, message: 'You must provide a Last Name' }); // Return error
                 }else{
                    if (!req.body.password) {
                        res.json({ success: false, message: 'You must provide a password' }); // Return error
                     }else{
                        const crypto = require('crypto');
                         var token = crypto.randomBytes(64).toString('hex');
                         let user = new User({
                            username: req.body.username.toLowerCase(),
                            password : req.body.password,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            token : token,
                            active : true

                         });
                         user.save((err) =>{
                             if(err){
                                 console.log(err);
                                res.json({ success: false, message: 'Could not save user' });
                             }else{
                                res.json({ success: true, message: 'User saved' });
                             }
                           
                         });
                     }
                 }
             }
          }
            
    });
    return router;
}