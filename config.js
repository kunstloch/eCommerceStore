// TODO: Rewrite this file with dotenv https://www.npmjs.com/package/dotenv
require('dotenv').config();

export default {
  POSTGRES_CONNECTION_STRING:
    process.env.URI ||
    'postgres://ecommerce:ecommerce@localhost:5432/ecommerce'
};
