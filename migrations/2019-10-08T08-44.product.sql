--product (up)

CREATE TABLE product
(
  id SERIAL,
  productname TEXT,
  category TEXT,
  price NUMERIC(2),
  measure TEXT,
  unit NUMERIC,
  img TEXT,
  infoshort varchar(200),
  infolong TEXT,
  instock Integer,
  rating NUMERIC
);