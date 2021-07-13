const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userAuth = require('../models/userAuth');

/**
 *  for verifiying token 
 */
const verifyToken = (req, res, next) => {
  
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'SecretKey');
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject;
    next()
  }

/**
 *  for register user 
 */
const registrationController = async(req,res) => {
    

    const userExists = await userAuth.findOne({email: req.body.email});
    console.log(userExists);
    if(userExists) res.send({message: 'This is already exists!'});
    else {
        await bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        const userData = new userAuth(req.body);

        userData.save((err, regData) => {
            if(err) console.log(err);
            else {
                let payload = {subject: regData._id};
                let token = jwt.sign(payload,'SecretKey');
                res.status(200).send({message:'Successfully registered!', token: token});
            }
    })
    });
    }
    //console.log(req.userId);

}

/**
 *  for login user 
 */
const loginController = async(req,res) => {

    await userAuth.findOne({email: req.body.email}, (error, user) => {
        if(error) console.log(error);
        else {
            const hash = user.password;
            console.log(hash);
            bcrypt.compare(req.body.password, hash, function(err, result) {
                // result == true
                if(!user) res.status(401).send('Invalid email');
                else{
                    if(!result) res.status(401).send('Invalid password');
                    else {
                        let payload = {subject: user._id};
                        // console.log(payload.subject);
                        let token = jwt.sign(payload,'SecretKey');
                        //req.userId = payload.subject;
                        //console.log(req.userId);
                        res.status(200).json({token:token, userName: user.userName});
                }
            }
            });
            //console.log(user);
            
        }
        
    });

    
}

/**
 *  for check authorized or not 
 */
const authorizedController = async(req, res) => {
    //console.log(req.userId);
    const userData = await userAuth.findOne({_id: req.userId}, (err, user) => {
        if(err) console.log(err);
        else {
            //console.log(req.userId);
            res.json({data: user});
        }
    });
    // console.log(userData);
    // res.json(userData);
}

module.exports = {
    verifyToken,
    registrationController,
    loginController,
    authorizedController
};