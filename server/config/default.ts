import dotenv from 'dotenv'

dotenv.config()

export default {
    CORSORIGIN: process.env.CORSORIGIN!,
    PORT: process.env.PORT!,
    HOST: process.env.HOST!,
    PASSWORD: process.env.PASSWORD!,
    MONGO_URI: process.env.MONGO_URI!,
    mongoOpt: {
      autoIndex: true, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6'
    },
    PRIVATEKEY : process.env.PRIVATEKEY!,
  };
  