const mongoose = require("mongoose")
const env = require("../env")

const startDB = () => {
  if (!env.MONGO_URI) {
    console.log("No DB_URL in environment. Unable to connect to database.....");
    return;
  }
  mongoose.connect(`${env.MONGO_URI}/${env.MONGO_DB_NAME}`, {
}).then(() => console.log(`Connected to Database...`));
};

module.exports =  startDB;