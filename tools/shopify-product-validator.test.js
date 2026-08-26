const assert = require("assert");

const {
  validateProduct,
  isValidUrl
} = require("./shopify-product-validator");


// 1. Valid product
const validProduct = {
  title: "Oversized Cotton T-Shirt",
  handle: "oversized-cotton-t-shirt",
  price: 999,
  inventory: 25,
  images: [
    "https://example.com/product-image.jpg"
  ]
};

const validResult = validateProduct(validProduct);

assert.strictEqual(validResult.valid, true);
assert.deepStrictEqual(validResult.errors, []);


// 2. Missing title
const missingTitle = {
  handle: "oversized-cotton-t-shirt",
  price: 999,
  inventory: 25,
  images: [
    "https://example.com/product-image.jpg"
  ]
};

const titleResult = validateProduct(missingTitle);

assert.strictEqual(titleResult.valid, false);
assert.ok(
  titleResult.errors.includes("Product title is required.")
);


// 3. Invalid handle
const invalidHandle = {
  title: "Oversized Cotton T-Shirt",
  handle: "INVALID HANDLE",
  price: 999,
  inventory: 25,
  images: [
    "https://example.com/product-image.jpg"
  ]
};

const handleResult = validateProduct(invalidHandle);

assert.strictEqual(handleResult.valid, false);


// 4. Invalid price
const invalidPrice = {
  title: "Oversized Cotton T-Shirt",
  handle: "oversized-cotton-t-shirt",
  price: -100,
  inventory: 25,
  images: [
    "https://example.com/product-image.jpg"
  ]
};

const priceResult = validateProduct(invalidPrice);

assert.strictEqual(priceResult.valid, false);


// 5. Invalid inventory
const invalidInventory = {
  title: "Oversized Cotton T-Shirt",
  handle: "oversized-cotton-t-shirt",
  price: 999,
  inventory: -5,
  images: [
    "https://example.com/product-image.jpg"
  ]
};

const inventoryResult = validateProduct(invalidInventory);

assert.strictEqual(inventoryResult.valid, false);


// 6. Images must be an array
const invalidImages = {
  title: "Oversized Cotton T-Shirt",
  handle: "oversized-cotton-t-shirt",
  price: 999,
  inventory: 25,
  images: "image.jpg"
};

const imagesResult = validateProduct(invalidImages);

assert.strictEqual(imagesResult.valid, false);
assert.ok(
  imagesResult.errors.includes("Images must be an array.")
);


// 7. Invalid image URL
const invalidImageUrl = {
  title: "Oversized Cotton T-Shirt",
  handle: "oversized-cotton-t-shirt",
  price: 999,
  inventory: 25,
  images: [
    "not-a-valid-url"
  ]
};

const imageUrlResult = validateProduct(invalidImageUrl);

assert.strictEqual(imageUrlResult.valid, false);


// 8. URL validation
assert.strictEqual(
  isValidUrl("https://example.com/image.jpg"),
  true
);

assert.strictEqual(
  isValidUrl("http://example.com/image.jpg"),
  true
);

assert.strictEqual(
  isValidUrl("not-a-url"),
  false
);


console.log("✅ All Shopify Product Validator tests passed!");