/**
 * Shopify Product Validator
 *
 * Validates common product data before sending it to Shopify
 * or using it inside an automation workflow.
 */

function validateProduct(product) {
  const errors = [];

  if (!product || typeof product !== "object") {
    return {
      valid: false,
      errors: ["Product must be an object."]
    };
  }

  // Required fields
  if (!product.title || typeof product.title !== "string") {
    errors.push("Product title is required.");
  }

  if (product.handle && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.handle)) {
    errors.push(
      "Handle must contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (product.price !== undefined) {
    const price = Number(product.price);

    if (!Number.isFinite(price) || price < 0) {
      errors.push("Price must be a valid non-negative number.");
    }
  }

  if (product.inventory !== undefined) {
    const inventory = Number(product.inventory);

    if (!Number.isInteger(inventory) || inventory < 0) {
      errors.push("Inventory must be a non-negative integer.");
    }
  }

  if (product.images !== undefined) {
    if (!Array.isArray(product.images)) {
      errors.push("Images must be an array.");
    } else {
      product.images.forEach((image, index) => {
        if (typeof image !== "string" || !isValidUrl(image)) {
          errors.push(`Image ${index + 1} must be a valid URL.`);
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

module.exports = {
  validateProduct,
  isValidUrl
};