const bcrypt = require('bcrypt') 

const User = require("../models/User")


const isValidCredentials = async (user) =>{
    const userFound = await User.findOne({email: user.email})
    console.log('hola', userFound)
    console.log(user)
    if(userFound){
        console.log(userFound.password, user.password)
        const passwordMatched = await bcrypt.compare(user.password, userFound.password)

        if(passwordMatched){
            return {ok: true, userFound}
        }
    }
    return {ok: false, message: 'No existe un usuario con esas credenciales!'}
}

module.exports = { isValidCredentials}