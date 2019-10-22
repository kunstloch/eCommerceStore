import { NextApiRequest, NextApiResponse } from 'next';
import { createPool, sql } from 'slonik';
import config from '../../config.js';

import { setConfig } from 'react-hot-loader';
setConfig({ pureSFC: true });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { productname, results: results, incart: incart } = req.body;
  const pool = createPool(config.POSTGRES_CONNECTION_STRING);
  try {
    await pool.connect(async connection => {
      let result;

      if (results) {
        console.log('RESULTS GEHT');
        console.log(
          sql`select * FROM product WHERE productname LIKE ${results}%'`
        );
        result = await connection.query(
          sql`select * FROM product WHERE productname LIKE ${'%' +
            results +
            '%'}`
        );
      } else if (incart) {
        console.log('CART GEHT');
        console.log(req.body);
        console.log(sql`SELECT * FROM product WHERE id IN ${incart}`);
        result = await connection.query(
          sql`SELECT * FROM product WHERE id IN ${incart}`
        );
      } else if (!productname) {
        console.log('ALLES ANZEIGEN');
        result = await connection.query(sql`SELECT * FROM product`);
      } else {
        console.log('NUR EINES ANZEIGEN');
        result = await connection.query(
          sql`SELECT * FROM product WHERE productname = ${productname}`
        );

        if (result.rowCount < 1) {
          console.log('ERROR - productname not defined');
        }
      }

      res.status(200).json(result);
    });
  } catch (err) {
    console.error(err);
  }
};
