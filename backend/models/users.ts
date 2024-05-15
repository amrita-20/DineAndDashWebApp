import User from "../schemas/User";

export async function addUser(newUser) {
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

const testNewUser1 = new User({
  username: "Bob",
  email: "Bob@gmail.com",
  phone: 111111111,
  address: [
    {
      road: "Park Avenue",
      postCode: 18,
      city: "New York",
      state: "NY",
      country: "USA",
    },
  ],
});

const testNewUser2 = new User({
  username: "Alice",
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
});

export function runUserTest() {
  addUser(testNewUser1);
  addUser(testNewUser2);
}
