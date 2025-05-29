console.log("✅ uploadGuitars.ts is running...");
import { createProduct } from "../lib/api.ts";
console.log("✅ Imported createProduct successfully!");

const fenderGuitars = [
  {
    title: "RevoShop - American Professional II Stratocaster® HSS",
    price: 1200,
    description: "The American Professional II Stratocaster® HSS draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today's working player.",
    categoryId: 1,
    images: ["https://i.imgur.com/lr7597x.png"],
  },
  {
    title: "RevoShop - Player II Modified Stratocaster® - Sunburst",
    price: 1100,
    description: "The Player II Modified Stratocaster® is a classic guitar with the modern player in mind. Sunburst finish adds a vintage touch to this modern instrument.",
    categoryId: 1,
    images: ["https://i.imgur.com/BePqXpr.png"],
  },
  {
    title: "RevoShop - Player II Modified Stratocaster® - Pearl",
    price: 1300,
    description: "The Player II Modified Stratocaster® is a classic guitar with the modern player in mind. Pearl finish adds a unique touch to this modern instrument.",
    categoryId: 1,
    images: ["https://i.imgur.com/J9Kpem5.png"],
  },
  {
    title: "RevoShop - Tash Sultana Stratocaster®",
    price: 1250,
    description: "Tash Sultana's explosive loop-based performances, gorgeous layered guitar parts and jubilant leads rocketed the Melbourne artist from street busking to sold out shows - with a Fender in hand from the beginning.",
    categoryId: 1,
    images: ["https://i.imgur.com/NOEQcdi.png"],
  },
  {
    title: "RevoShop - Tom DeLonge Stratocaster®",
    price: 1150,
    description: "Blink-182 guitarist Tom DeLonge has teamed up with Fender once again to release The Tom DeLonge Stratocaster®. This iconic Strat® makes a comeback just in time for Blink's reunion tour and the much-anticipated release of their latest album.",
    categoryId: 1,
    images: ["https://i.imgur.com/M4Yt0L8.png"],
  },
  {
    title: "RevoShop - Player II Modified Stratocaster® HSS Floyd Rose®",
    price: 1150,
    description: "The Player II Modified Stratocaster® HSS Floyd Rose® is a classic guitar with the modern player in mind. Floyd Rose® system allows for extreme whammy bar use without going out of tune.",
    categoryId: 1,
    images: ["https://i.imgur.com/m5DeCoc.png"],
  }
];

async function uploadGuitars() {
  try {
    for (const guitar of fenderGuitars) {
      const response = await createProduct(guitar);
      console.log(`✅ Created: ${response.title} (ID: ${response.id})`);
    }
  } catch (error) {
    console.error("❌ Error uploading guitars:", error);
  }
}

uploadGuitars();