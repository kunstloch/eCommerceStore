// TODO: Rewrite this file with dotenv https://www.npmjs.com/package/dotenv

// console.log(process.env);

export default {
  POSTGRES_CONNECTION_STRING:
    process.env.DATABASE_URL + `?ssl=1` ||
    'postgres://ecommerce:ecommerce@localhost:5432/ecommerce'
};
