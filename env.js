const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    TOKEN_KEY: process.env.TOKEN_KEY
};