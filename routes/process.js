const User = require('../models/process');

module.exports = (router) => {
    router.post('/newProcess', (req, res)=>{
        let process = new User({
            name: req.body.name,
            creator : req.body.creator,
            no_of_steps: req.body.no_of_steps,
            active : true
        });
         process.save((err) =>{
             if(err){
                 console.log(err);
                res.json({ success: false, message: 'Could not save process' });
             }else{
                res.json({ success: true, message: 'Process saved' });
             }
           
         });
    });

return router;

}