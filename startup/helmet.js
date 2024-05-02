const helmet = require("helmet");

const xssProtecion = (app) => {
    app.use(helmet());
}

module.exports = xssProtecion;