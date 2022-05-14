import mongoose from 'mongoose';
import config from 'config';

const mongoURI = config.get<string>('MONGO_URI');

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
module.exports.startDb = () => {

  mongoose.connect(mongoURI, options).then(() => console.log('connected to MONGO_URI')).
    catch((err) => console.log(err));
};