const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

// const MongoURI = process.env.MONGO_URI;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.use(cors({
  origin: 'http://localhost:3000',
}));


// MongoDB connection
mongoose.connect("mongodb+srv://vishak7murali:vishak7murali@cluster0.kumo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Schemas and Models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePhoto: String
});
const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  location: String,
  image: String,
  views: String,
  time: String,
  likes: Number,
  comments: [String],
  showCommentBox: Boolean
});
const Post = mongoose.model('Post', postSchema);

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// API Routes

// User routes
// app.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// });

app.post('/signup', async (req, res) => {
  try {
    const { name,  password } = req.body;
    const user = new User({ name,  password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error details
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    // Assume we have a function to find a user by name
    const user = await User.findOne({ name  });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare the password (assuming you're using bcrypt)
    const isMatch = await bcrypt.compare(name, password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authentication successful
    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Post routes
app.post('/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ message: 'Post added successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error adding post', error });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Message routes
app.post('/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

app.get('/messages/:user', async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.params.user });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

// Profile photo upload
app.post('/upload-profile-photo', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { userId } = req.body;
    const profilePhoto = req.file.path;
    await User.findByIdAndUpdate(userId, { profilePhoto });
    res.status(200).json({ message: 'Profile photo updated successfully', profilePhoto });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading profile photo', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
