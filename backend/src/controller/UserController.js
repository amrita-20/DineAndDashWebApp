"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(currentUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error occur while fetching user details' });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        const isUserExist = yield user_1.default.exists({ auth0Id });
        if (isUserExist) {
            return res.status(200).send();
        }
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error occur while creating user' });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('inside controller', req);
    try {
        const { address, name, phoneNumber } = req.body;
        const user = yield user_1.default.findById(req.userId); //req.userId - add
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        user.name = name;
        user.phone = phoneNumber;
        address && ((_a = user.addresses) === null || _a === void 0 ? void 0 : _a.push(address));
        yield user.save();
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error occur while updating user' });
    }
});
exports.default = {
    createUser,
    updateUser,
    getUser
};
