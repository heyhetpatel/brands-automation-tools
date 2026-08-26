# Brands Automation Tools

Open-source tools and workflow examples for fashion and e-commerce brands.

## What this project aims to provide

- Shopify and e-commerce utilities
- n8n automation workflow examples
- Customer and product workflow automation
- Website development helpers
- Reusable tools for fashion brands

## Shopify Product Validator

The Shopify Product Validator checks common product data before it is used in Shopify or an automation workflow.

### Usage

```javascript
const { validateProduct } = require("./tools/shopify-product-validator");

const product = {
  title: "Oversized Cotton T-Shirt",
  handle: "oversized-cotton-t-shirt",
  price: 999,
  inventory: 25,
  images: [
    "https://example.com/product-image.jpg"
  ]
};

const result = validateProduct(product);

console.log(result);