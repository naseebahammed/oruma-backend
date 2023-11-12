const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connection);
    console.log(`Db connection success`);
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
  });

const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`App is running on ${port}....`);
});
