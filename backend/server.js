const express = require("express"); // npm install express
const { connectToDatabase } = require("./config/db");
const PORT = 5000;
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(express.json());
app.use(cors());

connectToDatabase();

const authRoutes = require("./routers/authRoute");
const userRoutes = require("./routers/userRoute");
const orderRoutes = require("./routers/orderRoute");
const productRoutes = require("./routers/productRoute");
const supplierRoutes = require("./routers/supplierRoute");
const reportRoutes = require("./routers/reportRoute");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/report", reportRoutes);

const server = app.listen(PORT, () => {
  console.log("My server has started on the port " + PORT);
});

// Set up WebSocket server
const io = new Server(server);

// Listen for websocket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send a welcome message to the connected client
  socket.emit("message", "New Product added");

  // Listen for message from the client
  socket.on("message", (message) => {
    console.log("Received this message: " + message);

    // broadcast this message to all the connected clients
    io.emit("message", message);
  });

  // Listen for the connection close event
  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});
