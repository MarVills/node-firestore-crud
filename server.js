const express = require("express");
const app = express();
const cors = require("cors");
const recordsRouter = require("./routes/records");
const admin = require("firebase-admin");
const serviceAccount = require("./firestore-service.json"); // Your downloaded Firebase JSON

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve frontend files

// Initialize Firestore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
app.locals.db = db; // Pass db to routes

// Routes
app.use("/api/records", recordsRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
