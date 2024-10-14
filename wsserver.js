const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// This will store data for simplicity, in real-world applications, this data would come from a database.
let data = [];

// Set up a socket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Optionally, send existing data to the connected client
  socket.emit("message", data);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Endpoint to trigger socket when new data is received
app.post("/new-data", express.json(), (req, res) => {
  const newData = req.body;

  // Validate if newData follows the required structure
  if (newData && newData.type) {
    data.push(newData);

    // Emit the new data to all connected clients
    io.emit("newData", newData);

    return res.status(200).json({ message: "Data received and broadcasted" });
  } else {
    return res.status(400).json({ error: "Invalid data structure" });
  }
});

app.get('/test', (req, res) => {
  return res.send('test');
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
