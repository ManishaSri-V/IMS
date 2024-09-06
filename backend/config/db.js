const mongoose = require("mongoose"); // npm install mongoose

const connectToDatabase = () => {
  const MongoDB_URI =
    "mongodb+srv://rasurimanishasri:S1ryf8HP89FVLfcy@cluster0.zv8dxjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // Connect to MongoDB
  mongoose.connect(MongoDB_URI, {});

  // Event listeners for MongoDB connection
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });
};

module.exports = {
  connectToDatabase,
};
