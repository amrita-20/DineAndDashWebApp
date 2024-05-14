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
exports.runUserTest = exports.addUser = void 0;
const User_1 = __importDefault(require("../../schemas/User"));
function addUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if user exists
        const { username, email } = newUser;
        const existinguser = yield User_1.default.exists({ $or: [{ username }, { email }] });
        console.log("User already exists:", newUser.username);
        if (existinguser) {
            return false;
        }
        // Create new user in mongoDB
        const addResult = yield User_1.default.create(newUser);
        console.log("Add result:", addResult);
        return !!addResult._id;
    });
}
exports.addUser = addUser;
const testNewUser1 = {
    username: "Bob",
    password: "BobPassword",
    email: "Bob@gmail.com",
    phone: 111111111,
    address: {
        road: "Park Avenue",
        postCode: 18,
        city: "New York",
        state: "NY",
        country: "USA"
    },
};
const testNewUser2 = {
    username: "Alice",
    password: "AlicePassword",
    email: "alice@gmail.com",
    phone: 123456789,
    address: [
        {
            road: "North Street",
            postCode: 95112,
            city: "San Jose",
            state: "CA",
            country: "USA",
        },
        {
            road: "South Street",
            postCode: 95113,
            city: "San Jose",
            state: "CA",
            country: "USA",
        },
    ],
};
function runUserTest() {
    addUser(testNewUser1);
    addUser(testNewUser2);
}
exports.runUserTest = runUserTest;
