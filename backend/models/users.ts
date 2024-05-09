import User from "../schemas/User"

interface NewUser {
    username: string,
    password: string,
    email: string,
    phone: number,
    address: Address | Address[]
}

interface Address {
    road: string;
    postCode: number;
    city: string;
    state: string;
    country: string;
}

async function addUser(newUser: NewUser) {
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

addUser(testNewUser1);
addUser(testNewUser2);
