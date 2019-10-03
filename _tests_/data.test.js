import getAllProducts, { getProductById } from '../data';

test('gets a product by id from the database', () => {
  expect(
    //Get the product by id
    getProductById(2)
  ).toEqual(
    // Get the item by key from the array
    getAllProducts().find(product => {
      return product.id === 2;
    })
  );

  expect(getProductById(0)).toMatchSnapshot();
});

test('returns undefined when passed a non-id', () => {
  expect(getProductById('')).toBe(undefined);
  expect(getProductById(false)).toBe(undefined);
  expect(getProductById(null)).toBe(undefined);
  expect(getProductById(10)).toBe(undefined);
});
