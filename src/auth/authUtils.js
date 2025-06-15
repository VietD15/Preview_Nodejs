'use strict';
const jwt = require('jsonwebtoken');

const  createTokenPair =async (payload, publicKey, privateKey)=>{

    try {
        //accsess token
        const accsessToken = await jwt.sign(payload, privateKey,{
            algorithm:'RS256',
            expiresIn: '1h',
        })

          const refreshToken = await jwt.sign(payload, privateKey,{
            algorithm:'RS256',
            expiresIn: '7d',
        })

        jwt.verify(accsessToken, publicKey,(err, decoded)=>{
            if(err){
                console.error('Error verifying access token:', err);
            }else{
                console.log('Access token verified successfully:', decoded);
            }
        })

        return {
            accsessToken,
           refreshToken
        }
    } catch (error) {
        
    }
}


module.exports = {
    createTokenPair
}