// TODO: Rewrite this file with dotenv https://www.npmjs.com/package/dotenv
require('dotenv').config();

export default {
  POSTGRES_CONNECTION_STRING:
    process.env.PG_DATABASE_CONNECTION_STRING ||
    'postgres://ecommerce:ecommerce@localhost:5432/ecommerce'
};
