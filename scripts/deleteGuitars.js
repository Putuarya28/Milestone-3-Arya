const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function deleteProduct(productId) {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      
    },
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`❌ Failed to delete product ${productId}:`, errorBody);
    return;
  }
  console.log(`✅ Deleted product with ID: ${productId}`);
}

(async () => {
  await deleteProduct(57); // American Professional II Stratocaster® HSS
  await deleteProduct(58); // Player II Modified Stratocaster® - Sunburst
})();