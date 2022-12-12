const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const {UserInputError} = require('apollo-server'); //importing builtin user error msg
const {validateRegisterInput, validateLoginInput} = require('../../validation/validators');
const {SECRET_KEY}=require('../../config');
const { compare } = require('bcryptjs');

function generateToken(user){
    return jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username
    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_,{username,password}){
            const{errors,valid}=validateLoginInput(username,password);
            if(!valid){
                throw new UserInputError('Input must not be empty',{errors});
            }
            const user = await User.findOne({username});

            if(!user){
                errors.general = 'User does not exist';
                throw new UserInputError('User does not exist',{errors});
            }
            
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general='Invalid Credentials';
                throw new UserInputError('Invalid Credentials',{errors});
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token 
            };
        }, 
        async register(_, {registerInput: {firstname, lastname, username, email, password, confirmPassword}},
        context, info){

            const {valid,errors}=validateRegisterInput(firstname, lastname, username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }
            const user= await User.findOne({username, email});  //async await
            if(user){
                throw new UserInputError('username already exist',{errors:{
                    username:'username already exist'
                }})
            }


            password = await bcrypt.hash(password,10);


            const newUser = new User({
                firstname,
                lastname,
                username,
                email,
                password,
                confirmPassword
            });
            

            const res = await newUser.save();
            
            const token = generateToken(res)
            

            return {
                ...res._doc,
                id: res._id,
               token
            };

        }
    },
    
};
