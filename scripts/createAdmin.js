import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electron-nexus-club');
    
    const adminExists = await Admin.findOne({ username: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = new Admin({
      username: 'admin',
      password: 'admin123', // This will be hashed automatically by the schema
      email: 'admin@electronnexus.com'
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 