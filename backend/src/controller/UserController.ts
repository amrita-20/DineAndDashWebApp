import {Request, Response} from 'express';
import User from '../models/user';

const getUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({_id: req.userId});
        if(!currentUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(currentUser);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: 'Error occur while fetching user details'});
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const {auth0Id} = req.body;
        const isUserExist = await User.exists({ auth0Id });
        if(isUserExist){
            return res.status(200).send();
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error occur while creating user'});
    }
};

const updateUser = async (req: Request, res: Response) => {
    console.log('inside controller', req);
    try {
        const {address, name, phoneNumber} = req.body;
        const user = await User.findById(req.userId);  //req.userId - add

        if(!user){
            return res.status(404).json({message: 'user not found'});
        }
        user.name = name;
        user.phone = phoneNumber;
        address && user.addresses?.push(address);

        await user.save();
        res.send(user);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: 'Error occur while updating user'});
    }
}

export default {
    createUser,
    updateUser,
    getUser
}