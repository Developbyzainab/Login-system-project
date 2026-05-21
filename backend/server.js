// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/invoicebuilder", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true },
//   password: String,
//   businessLine: String,
//   signupType: String,
//   mode: String,
// });

// const User = mongoose.model("User", userSchema);

// // Register API
// app.post("/api/register", async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, businessLine, signupType, mode } = req.body;
//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ message: "Email already registered" });

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email, password: hashed, businessLine, signupType, mode });
//     await newUser.save();
//     res.json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Login API
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     res.json({ message: "Login successful", user });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Forgot Password API
// app.post("/api/forgot-password", async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.password = hashed;
//     await user.save();
//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));








// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/invoiceDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // ✅ Schema
// const invoiceSchema = new mongoose.Schema({
//   sender: {
//     company: String,
//     name: String,
//     first: String,
//     last: String,
//     country: String,
//     phone: String,
//     email: String,
//     address1: String,
//     address2: String,
//     postal: String,
//     city: String,
//   },
//   recipient: {
//     company: String,
//     name: String,
//     first: String,
//     last: String,
//     country: String,
//     phone: String,
//     email: String,
//     address1: String,
//     address2: String,
//     postal: String,
//     city: String,
//   },
//   currency: String,
//   items: [
//     {
//       name: String,
//       qty: Number,
//       price: Number,
//       tax: String,
//       description: String,
//     },
//   ],
//   totalAmount: Number,
//   notes: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Invoice = mongoose.model("Invoice", invoiceSchema);

// // ✅ Save Invoice API
// app.post("/api/invoice/save", async (req, res) => {
//   try {
//     const invoice = new Invoice(req.body);
//     await invoice.save();
//     res.status(200).json({ success: true, message: "Invoice saved successfully!" });
//   } catch (err) {
//     console.error("❌ Save Error:", err);
//     res.status(500).json({ success: false, message: "Server error while saving." });
//   }
// });

// // ✅ Get All Invoices API
// app.get("/api/invoice/all", async (req, res) => {
//   try {
//     const invoices = await Invoice.find().sort({ createdAt: -1 });
//     res.json(invoices);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching invoices" });
//   }
// });

// // ✅ Server Start
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/invoiceDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Invoice Schema
const invoiceSchema = new mongoose.Schema({
  logo: String,
  template: String,
  invoiceType: String,
  invoiceNumber: String,
  issueDate: String,
  dueDate: String,

  sender: {
    company: String,
    name: String,
    first: String,
    last: String,
    country: String,
    phone: String,
    email: String,
    address1: String,
    address2: String,
    postal: String,
    city: String,
  },

  recipient: {
    company: String,
    name: String,
    first: String,
    last: String,
    country: String,
    phone: String,
    email: String,
    address1: String,
    address2: String,
    postal: String,
    city: String,
  },

  items: [
    {
      name: String,
      qty: Number,
      price: Number,
      tax: String,
      description: String,
    },
  ],

  customFields: [
    {
      location: String,
      name: String,
      content: String,
    },
  ],

  notes: String,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

// ✅ Model
const Invoice = mongoose.model("Invoice", invoiceSchema);

// ✅ API: Save Invoice
app.post("/api/invoice/save", async (req, res) => {
  try {
    const invoiceData = req.body;
    console.log("📦 Received invoice data:", invoiceData);

    const newInvoice = new Invoice(invoiceData);
    await newInvoice.save();

    res.status(200).json({
      success: true,
      message: "✅ Invoice saved successfully!",
    });
  } catch (err) {
    console.error("❌ Error saving invoice:", err);
    res.status(500).json({
      success: false,
      message: "Server error while saving invoice.",
    });
  }
});

// ✅ API: Get All Invoices
app.get("/api/invoice/all", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({
      message: "Error fetching invoices from server.",
    });
  }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);


