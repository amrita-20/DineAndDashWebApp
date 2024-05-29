import mongoose from "mongoose";
import { Request, Response } from "express";
import User, {  userSchema } from "../models/User";

const getUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(currentUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occur while fetching user details" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const isUserExist = await User.exists({ auth0Id });
    if (isUserExist) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occur while creating user" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  console.log("inside controller", req);
  try {
    const { address, name, phoneNumber } = req.body;
    const user = await User.findById(req.userId); //req.userId - add

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.username = name;
    user.phone = phoneNumber;
    address && user.address?.push(address);
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occur while updating user" });
  }
};

type UserType = mongoose.InferSchemaType<typeof userSchema>;

// Functions
export async function addUser(newUser: UserType) {
  // Check if user exists
  const { username, email } = newUser;
  const existinguser = await User.exists({ $or: [{ username }, { email }] });
  console.log("User already exists:", newUser.username);
  if (existinguser) {
    return false;
  }

  // Create new user in mongoDB
  const addResult = await User.create(newUser);
  console.log("Add result:", addResult);
  return !!addResult._id;
}

const testNewUser1 = {
  username: "Bob",
  password: "BobPassword",
  email: "Bob@gmail.com",
  phone: 111111111,
  address: [
    {
      road: "Park Avenue",
      postCode: 18881,
      city: "New York",
      state: "NY",
      country: "USA",
    },
    {
      road: "South Street",
      postCode: 95112,
      city: "New York",
      state: "NY",
      country: "USA",
    },
  ],
  cart: [],
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
  cart: [],
};

export function runUserTest() {
  // addUser(testNewUser1);
  // addUser(testNewUser2);
}

export default {
  createUser,
  updateUser,
  getUser,
};
