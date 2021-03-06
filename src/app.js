/* .env lib */
require('dotenv').config();

/* Dependencies */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const i18n = require('./config/i18n');

/* Routes */
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const searchRoutes = require('./routes/search');
const ingredientRoutes = require('./routes/ingredient');
const favoriteRoutes = require('./routes/favorite');
const foodsRoutes = require('./routes/food');

/* Express initialization */
const app = express();

/* Logger */
const LoggerConfig = require('./config/LoggerConfig');
const Logger = require('./helpers/Logger');

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(i18n.init);
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Log express request and response */
LoggerConfig.expressRequest(app);

/* Status endpoint */
app.get('/', (req, res) => {
  res.send('ok');
});

/* Instatiate routes */
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/search', searchRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/foods', foodsRoutes);

/* Log errors */
LoggerConfig.expressError(app);

app.all('*', (req, res) => {
  res.status(404).send({ success: false, code: '404' });
});

/* Startup message */
app.listen(process.env.PORT, () => {
  /* Configure Log */
  LoggerConfig.init();
  Logger.info(`Server started on port ${process.env.PORT}`);
});
