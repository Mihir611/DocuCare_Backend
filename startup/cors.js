// enabling cors protection
const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
};
const startCors = (app) => {
    app.use(cors(corsOptions));
};

module.exports = startCors;