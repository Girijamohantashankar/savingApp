require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Remove duplicate import
const User = require("./models/User");
const UserMoneyAdd = require("./models/Moneyadd.js");
const Products = require('./models/Products');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }
    // If everything is okay, create a new user
    const user = new User({ username, email, password });
    await user.save();
    // Generate token
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    // console.log('JWT_SECRET:', JWT_SECRET);
    // Return token in response
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    // console.log(token);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Money Add Home page
app.post("/addMoney", async (req, res) => {
  try {
    const { email, accountBalance } = req.body;
    let userAccount = await UserMoneyAdd.findOne({ email });
    if (!userAccount) {
      userAccount = new UserMoneyAdd({ accountBalance, email });
    } else {
      userAccount.accountBalance = accountBalance;
    }
    await userAccount.save();
    res.status(200).json({ accountBalance: userAccount.accountBalance });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});
// Account Balance Api
app.get('/getAccountBalance', async (req, res) => {
  try {
    const { email } = req.query;
    const userAccount = await UserMoneyAdd.findOne({ email }).sort({ createdAt: -1 });
    if (!userAccount) {
      return res.status(404).json({ message: "Account balance not found" });
    } res.status(200).json({ accountBalance: userAccount.accountBalance });
  } catch (error) {
    res.status(500).json({ errror: "Internal Server Error" });
    console.log(error);
  }
})

// product added
app.post("/addProduct", async (req, res) => {
  try {
    const { email,productName, productAmount } = req.body;
    const newProduct = new Products({ productName, productAmount, email });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error adding product:", error);
  }
});

app.get("/getProducts", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error fetching products:", error);
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
