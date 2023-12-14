const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt') 


router.get('/', async (req, res) => {
  const users = await User.find();
  res.json({
    users: users
  });

});
router.post('/registro', async (req, res) => {

    const { username, password, email } = req.body;
  
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const usuario = new User({
        username: username,
        password: passwordHash,
        email: email
  
    });
  
    await User.create(usuario);
  
    console.log(`Soy el back y recibí estos datos ${username}, ${password}, ${email}`)
  
    res.json({ 
      mensaje: 'Creamos un usuario nuevo en la base de database'
    });
    
  });

  const { isValidCredentials } = require('../controllers/userController')

  router.post('/validar', async (req, res) => {
 
    const {email, password} = req.body
    console.log(email);
    console.log(password);
    const user = {email, password}
  
    let result = await isValidCredentials(user)
    if(result.ok){
        req.session.user = user
        res.json({ 
        isValidCredentials:true
        })
    }else{
      res.json({ 
        isValidCredentials:false
      })
    }
  })
  

  module.exports = router;