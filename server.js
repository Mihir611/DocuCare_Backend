require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'docucare.backend.log',
    level: 'debug',
})
const app = express();
app.use(express.json());

// enabling cors protection
const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
};
app.use(cors(corsOptions));

// configuring the rate limiter
const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limiting each ip to 100 requests per windowsMs
});
app.use(limiter);

mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`, {
}).then(() => {
    console.log('Connected to DB');
    logger.info('Connected to DB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    logger.error('Error connecting to MongoDB:', err);
});

app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'"
    );
    next();
});

app.use('/api/users', userRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    logger.info(`Server running on port ${PORT}`)
});