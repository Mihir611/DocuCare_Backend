const express = require('express');
const startDB = require("./startup/db");
const startCors = require("./startup/cors");
const appRouter = require("./startup/routes");
const rateLimit = require('express-rate-limit');
const bunyan = require('bunyan');
const env = require("./env")

const logger = bunyan.createLogger({
    name: 'docucare.backend.log',
    level: 'debug',
})
const app = express();
app.use(express.json());

startCors(app);

// configuring the rate limiter
const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limiting each ip to 100 requests per windowsMs
});
app.use(limiter);


startDB();
appRouter(app);
app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'"
    );
    next();
});


const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    logger.info(`Server running on port ${PORT}`)
});