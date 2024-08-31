import User from '../models/User.js';

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

    // Return user information (excluding password)
    const { password: _, ...userInfo } = user.toObject(); 
    res.send({ message: 'Login successful', user: userInfo });
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
  try {
    const user = new User(req.body);

    // Setting default values for verification statuses
    user.isEmailVerified = false;
    user.isPhoneVerified = false;
    user.isDocumentVerified = false;

    await user.save();
    res.status(201).send(user);
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
    const allowedUpdates = ['firstName', 'lastName', 'email', 'phoneNumber', 'governmentIdNumber', 'profilePic', 'dob', 'address', 'baseLocation', 'subLocation', 'workType', 'experience', 'profession', 'currentEmployeerName'];
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
