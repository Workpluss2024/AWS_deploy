import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Static lists for genders and languages
const validGenders = ['Male', 'Female', 'Prefer not to say'];
const validLanguages = ['English', 'Hindi', 'Marathi'];

// Function to handle user login
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Send only the token
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Failed to login', error: error.message });
  }
}

// Function to get all users
export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve users', error: error.message });
  }
}

// Function to create a new user
export async function createUser(req, res) {
  const {
    firstName, lastName, email, phone, password, gender, language,
    dateOfBirth, birthCity, birthCountry, city, doorNumber, nearBy,
    state, streetName, zipCode
  } = req.body;

  // Validate gender and language names from static lists
  if (!validGenders.includes(gender.name)) {
    return res.status(400).json({ message: `Invalid gender. Valid options are: ${validGenders.join(', ')}` });
  }

  if (!validLanguages.includes(language.name)) {
    return res.status(400).json({ message: `Invalid language. Valid options are: ${validLanguages.join(', ')}` });
  }

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      password,
      gender: gender.name,  // Use the name from the gender object
      language: language.name, // Use the name from the language object
      dateOfBirth,
      birthCity,
      birthCountry,
      city,
      doorNumber,
      nearBy,
      state,
      streetName,
      zipCode,
      isEmailVerified: false,
      isPhoneVerified: false,
      isDocumentVerified: false
    });

    // Save the user
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Failed to create user', error: error.message });
  }
}

// Function to retrieve a user by ID
export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve user', error: error.message });
  }
}

// Function to update a user by ID
export async function updateUser(req, res) {
  try {
    const updates = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Update allowed fields
    const allowedUpdates = [
      'firstName', 'lastName', 'email', 'phoneNumber', 'governmentIdNumber', 
      'profilePic', 'dob', 'address', 'baseLocation', 'subLocation', 'workType', 
      'experience', 'profession', 'currentEmployeerName', 'birthCity', 'birthCountry', 
      'city', 'doorNumber', 'nearBy', 'state', 'streetName', 'zipCode'
    ];
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) user[field] = updates[field];
    });

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: 'Failed to update user', error: error.message });
  }
}

// Function to delete a user by ID
export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete user', error: error.message });
  }
}
