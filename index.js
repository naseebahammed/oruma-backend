const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const registration = require("./reg");

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/data/registration.json`, "utf8")
);

app.post("/api/registration", registration);

app.get("/api/game", (req, res) => {
  try {
    const playerList = data.map((player) => ({
      id: player.id,
      fName: player.fName,
      team: player.team,
      game: player.games,
    }));
    res.json(playerList);
  } catch (error) {
    console.error("Error fetching player list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
