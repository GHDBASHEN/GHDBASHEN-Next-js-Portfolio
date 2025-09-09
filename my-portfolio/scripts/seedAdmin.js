// File: scripts/seedAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' }); // Load environment variables

// We need to import the model in a way that Node.js understands
const Admin = require('../models/Admin.js');

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USERNAME = process.env.INITIAL_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD;

async function seedAdmin() {
  if (!MONGODB_URI || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('Error: Missing required environment variables for seeding.');
    return;
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');

    // Check if an admin user already exists
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });

    if (existingAdmin) {
      console.log('Admin user already exists. No action taken.');
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Create the new admin user
    await Admin.create({
      username: ADMIN_USERNAME,
      password: hashedPassword,
    });

    console.log('✅ Admin user created successfully!');
  
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    // Ensure the connection is closed
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

seedAdmin();