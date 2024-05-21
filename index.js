const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line

// Allow all origins
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/playlist-for-you", (req, res) => {
  fs.readFile("./playlist.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading playlist file");
    } else {
      const playlistData = JSON.parse(data);
      res.json(playlistData);
    }
  });
});

app.put("/like-playlist-for-you/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile("./playlist.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading playlist file");
    } else {
      let playlists = JSON.parse(data);
      const updatedPlaylist = playlists.find((playlist) => playlist.id === id);
      if (updatedPlaylist) {
        updatedPlaylist.liked = !updatedPlaylist.liked;
        fs.writeFile("./playlist.json", JSON.stringify(playlists), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error updating playlist file");
          } else {
            res.json(updatedPlaylist);
          }
        });
      } else {
        res.status(404).send("Playlist not found");
      }
    }
  });
});

app.get("/most-listened", (req, res) => {
  fs.readFile("./mostListened.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading playlist file");
    } else {
      const mostListened = JSON.parse(data);
      res.json(mostListened);
    }
  });
});

app.put("/like-most-listened/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile("./mostListened.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading most listened file");
    } else {
      let mostListened = JSON.parse(data);
      const updatedTrack = mostListened.find((track) => track.id === id);
      if (updatedTrack) {
        updatedTrack.liked = !updatedTrack.liked;
        fs.writeFile(
          "./mostListened.json",
          JSON.stringify(mostListened),
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Error updating most listened file");
            } else {
              res.json(updatedTrack);
            }
          }
        );
      } else {
        res.status(404).send("Track not found");
      }
    }
  });
});

app.get("/track-of-the-week", (req, res) => {
  fs.readFile("./music.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading playlist file");
    } else {
      const trackOfTheWeek = JSON.parse(data);
      res.json(trackOfTheWeek);
    }
  });
});

app.get("/track-of-the-week", (req, res) => {
  fs.readFile("./music.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading playlist file");
    } else {
      const trackOfTheWeek = JSON.parse(data);
      res.json(trackOfTheWeek);
    }
  });
});

app.put("/like-track-of-the-week/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile("./music.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading music file");
    } else {
      let trackOfTheWeek = JSON.parse(data);
      const updatedTrack = trackOfTheWeek.find((track) => track.id === id);
      if (updatedTrack) {
        updatedTrack.liked = !updatedTrack.liked;
        fs.writeFile("./music.json", JSON.stringify(trackOfTheWeek), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error updating music file");
          } else {
            res.json(updatedTrack);
          }
        });
      } else {
        res.status(404).send("Track not found");
      }
    }
  });
});

const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
