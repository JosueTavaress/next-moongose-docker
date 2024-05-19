import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://mongo:27017/rdr', {
    
    });
    console.log(`Connect on port: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connect MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;



