'use strict';

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {

    static createKeyToken = async({userID, publicKey })=>{
        try {
            const publicKeyString = publicKey.toString();
            const token = await keytokenModel.create({
                user:userID,
                publicKey: publicKeyString,
            })

            return token ? token.publicKey : null;
        } catch (error) {
           return error 
        }
    }

}

module.exports = KeyTokenService;