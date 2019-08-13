require('./lib/index');

const {
  APP_PORT,
  APP_NAME,
  API_URL,
  API_PORT
} = process.env;

module.exports = {
  APP_PORT: APP_PORT || 3000,
  APP_NAME,
  API_URL,
  API_PORT
};
