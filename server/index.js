const express = require("express"); //Line 1
const cors = require("cors");
const { getToken } = require("./bin/auth");
const path = require("path");
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get("/token", (req, res) => {
  // console.log("am here");
  getToken()
    .then((resp) => res.send(resp))
    .catch((err) => console.log(err));
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
