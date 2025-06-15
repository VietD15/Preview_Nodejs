'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { sendMessage } = require('../message_queue/producter');

const roles = {
    shop: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {
    static signup = async ({ name, email, password }) => {
        try {
            //step 1: check if email already exists
            const hodelShop = await shopModel.findOne({ email }).lean();

            if (hodelShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already exists with this email',
                }
            }
            const passwordHash = await bcrypt.hash(password, 10);

            const newshop = await shopModel.create({
                name,
                email,
                password,
                roles: [roles.shop]
            });

            if (newshop) {
                //create  primary key, public key
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                })

                console.log(publicKey, privateKey);  //save collection keystore


                const publicKeyString = await KeyTokenService.createKeyToken({
                    userID: newshop._id,
                    publicKey,
                });

                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'Failed to create key token',
                        status: 'error'
                    };
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString);

                //create token pair
                const tokens = await createTokenPair({ userID: newshop._id, email }, publicKeyString, privateKey)
                console.log('Created tokens:', tokens);

                await sendMessage('email_queue', {
                    to: email,
                    subject: 'Xác thực tài khoản',
                    content: `Chào ${name}, đây là liên kết xác thực tài khoản của bạn.`
                });

                return {
                    code: 201,
                    metadata: {
                        shop: newshop,
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null,
            }

        } catch (error) {
            return {
                code: 'xxxx',
                message: error.message || 'An error occurred during signup',
                status: 'error'
            }
        }
    }
}

module.exports = AccessService; 