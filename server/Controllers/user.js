import { User } from '../Models/user.js';
import bcrypt from 'bcryptjs';

const signUpUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Input validation
    if (!userName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const isExist = await User.findOne({ userName });
    if (isExist) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    // Respond to the client
    return res.status(200).json({ 
      message: 'User registered successfully', 
      success: "yes", 
      data: user 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { signUpUser };
