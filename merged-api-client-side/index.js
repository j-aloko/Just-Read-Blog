const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const catRoute = require("./Routes/category");
const postRoute = require("./Routes/post");
const commentRoute = require("./Routes/comment");
const reply1Route = require("./Routes/reply1");
const reply2Route = require("./Routes/reply2");
const reply3Route = require("./Routes/reply3");
const reply4Route = require("./Routes/reply4");
const reply5Route = require("./Routes/reply5");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const path = require("path");
const { Server } = require("socket.io");

app.use(cors({ origin: "*", credentials: true }));

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Server Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/images", express.static(path.join(__dirname, "/public/images/")));
app.use(morgan("common"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);
app.use("/api/comments", commentRoute);
app.use("/api/reply1", reply1Route);
app.use("/api/reply2", reply2Route);
app.use("/api/reply3", reply3Route);
app.use("/api/reply4", reply4Route);
app.use("/api/reply5", reply5Route);
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "/client-side/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client-side/build", "index.html"));
});

//File Upload
app.post("/api/upload", async function (req, res) {
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json("No files were uploaded.");
  }

  const file = req.files.file;
  uploadPath = __dirname + "/public/images/" + file.name;

  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).json(err);

    res.status(200).json({
      fileName: file.name,
      filePath: `https://just-read-app.herokuapp.com/images/${file.name}`,
    });
  });
});

//Socket IO

const io = new Server({
  cors: { origin: " https://just-read-app.herokuapp.com/" },
});

io.on("connection", (socket) => {
  console.log("a user has connected");

  //Receieve and broadcast Message
  socket.on(
    "commentNotification",
    ({ senderUsername, receiverUsername, postId, message }) => {
      io.emit("receiveNotification", {
        senderUsername,
        receiverUsername,
        postId,
        message,
      });
    }
  );

  //Receive comments and emit back to the client side

  //upon disconnection lets remove all users from the connection
  socket.on("disconnect", () => {
    console.log("a user has disconnected");
  });
});

io.listen(8000);
