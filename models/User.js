import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

const User = mongoose.model('User', userSchema);

// Create default admin user if none exists
export const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ isAdmin: true });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin',  // Simple admin username
        password: 'admin123', // Simple admin password
        isAdmin: true,
      });
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

export default User; 