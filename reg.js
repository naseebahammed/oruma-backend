const fs = require("fs");
const registration = (req, res) => {
  const file = JSON.parse(
    fs.readFileSync(`${__dirname}/data/registration.json`, "utf8")
  );
  const id = file.length + 1;
  const { fName, phnNumber, team, games } = req.body;

  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const newData = {
    id: id,
    fName: fName,
    phnNumber: phnNumber,
    team: team,
    games: games,
    time: formattedTime,
  };

  fs.readFile(`${__dirname}/registration.json`, "utf8", (err, jsonData) => {
    const parsedData = JSON.parse(jsonData);
    parsedData.push(newData);
    fs.writeFile(
      `${__dirname}/registration.json`,
      JSON.stringify(parsedData),
      (err) => {
        res.status(201).json(
          {
            status: "success",
          },
          res.setHeader("Access-Control-Allow-Origin", "*"),
          res.setHeader("Access-Control-Allow-Credentials", "true"),
          res.setHeader("Access-Control-Max-Age", "1800"),
          res.setHeader("Access-Control-Allow-Headers", "content-type"),
          res.setHeader(
            "Access-Control-Allow-Methods",
            "PUT, POST, GET, DELETE, PATCH, OPTIONS"
          )
        );
      }
    );
  });
};

module.exports = registration;
