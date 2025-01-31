import { User } from '../Models/user.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const cookieOptions  = {
  httpOnly:true,
  secure:false,
  sameSite:'Lax'
}

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
    const user = new User({userName, email, password: hashedPassword });
    await user.save();

    // Respond to the client
    return res.status(201).json({ 
      message: 'User registered successfully', 
      success: "yes", 
      data: user 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Input validation
    if (!userName || !password) {
      return res.status(400).json({ error: 'Both username and password are required' });
    }

    // Find the user by username
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the password with the hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
     
    const token = jwt.sign({userId:user._id},'SecretKey',{expiresIn:'1h'});
    res.cookie('token',token,cookieOptions);
    // console.log(token);
    // Respond to the client with success message
    return res.status(200).json({
      message: 'Logged in successfully',
      success: "true",
      token,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const logoutUser = async(req,res)=>{
  res.clearCookie('token',cookieOptions).json({message: 'Logged out successfully'})
}


const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body;
    const userId = req.params.id; // Assuming user ID is passed as a URL parameter

    // Validate input
    if (!fullName || !profilePic) {
      return res.status(400).json({ error: 'Full name and profile picture are required.' });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, profilePic },
      { new: true, runValidators: true } // Return the updated document and run validations
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    updatedUser.save();
    return res.status(200).json({
      success: true,
      update: updatedUser,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

export { signUpUser, loginUser ,logoutUser,updateProfile};
