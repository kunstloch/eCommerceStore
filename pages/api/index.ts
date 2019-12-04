import { NextApiRequest, NextApiResponse } from 'next';
import { createPool, sql } from 'slonik';
import config from '../../config.js';

import { setConfig } from 'react-hot-loader';
setConfig({ pureSFC: true });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    productname,
    results: results,
    incart,
    listOfIds,
    rankingNow
  } = req.body;
  const pool = createPool(config.POSTGRES_CONNECTION_STRING);
  try {
    await pool.connect(async connection => {
      let result;

      if (results) {
        // console.log('RESULTS GEHT');
        // console.log(
        //   sql`select * FROM product WHERE productname LIKE ${results}%'`
        // );
        result = await connection.query(
          sql`select * FROM product WHERE productname LIKE ${'%' +
            results +
            '%'}`
        );
      } else if (incart) {
        // console.log('CART GEHT');
        // console.log('LIST OF IDS', listOfIds);
        // let stringListOfIds = '(' + listOfIds.join(' , ') + ')';
        // console.log('stringListOfIds ', stringListOfIds);

        // changed .list
        result = await connection.query(
          //@ts-ignore
          sql`SELECT * FROM product WHERE id IN (${sql.join(
            listOfIds,
            sql`, `
          )})`
        );
      } else if (rankingNow) {
        // console.log('RANKING DATA');
        result = await connection.query(
          sql`select * from product order by ${rankingNow} desc offset 0 fetch first 3 rows only`
        );
      } else if (!productname) {
        // console.log('ALLES ANZEIGEN');
        result = await connection.query(sql`SELECT * FROM product`);
      } else {
        // console.log('NUR EINES ANZEIGEN');
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
