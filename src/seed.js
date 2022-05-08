const { getClient } = require("./client");

async function main() {
  const db = await getClient();
  const salesCollection = db.collection("sales");
  const itemsCollection = db.collection("items");

  await itemsCollection.insertMany([
    {
      item: "Antarctica Boa 350ml",
      costPrice: 1.29,
      inStock: 200,
    },
    {
      item: "Spaten Munich 350ml",
      costPrice: 2.44,
      inStock: 200,
    },
    {
      item: "Brahma Duplo Malte 350ml",
      costPrice: 1.59,
      inStock: 200,
    },
    {
      item: "Heineken 355mll",
      costPrice: 4.29,
      inStock: 200,
    },
    {
      item: "Eisenbahn Pilsen 355ml",
      costPrice: 3.99,
      inStock: 200,
    },
    {
      item: "Eisenbahn Pale Ale 355ml",
      costPrice: 3.99,
      inStock: 200,
    },
    {
      item: "Colorado Ribeirão Lager 600ml",
      costPrice: 9.89,
      inStock: 200,
    },
    {
      item: "Baden Baden IPA Maracujá 600ml",
      costPrice: 9.49,
      inStock: 200,
    },
  ]);

  await salesCollection.insertMany([
    {
      item: "Antarctica Boa 350ml",
      price: 2.99,
      quantity: 9,
      date: new Date("2014-03-01T08:00:00Z"),
    },
    {
      item: "Spaten Munich 350ml",
      price: 3.79,
      quantity: 11,
      date: new Date("2014-03-01T09:00:00Z"),
    },
    {
      item: "Brahma Duplo Malte 350ml",
      price: 3.59,
      quantity: 10,
      date: new Date("2014-03-15T09:00:00Z"),
    },
    {
      item: "Heineken 355ml",
      price: 5.69,
      quantity: 21,
      date: new Date("2014-04-04T11:21:39.736Z"),
    },
    {
      item: "Eisenbahn Pilsen 355ml",
      price: 5.19,
      quantity: 10,
      date: new Date("2014-04-04T21:23:13.331Z"),
    },
    {
      item: "Eisenbahn Pale Ale 355ml",
      price: 5.29,
      quantity: 16,
      date: new Date("2015-06-04T05:08:13Z"),
    },
    {
      item: "Colorado Ribeirão Lager 600ml",
      price: 12.8,
      quantity: 12,
      date: new Date("2015-09-10T08:43:00Z"),
    },
    {
      item: "Baden Baden IPA Maracujá 600ml",
      price: 11.9,
      quantity: 7,
      date: new Date("2016-02-06T20:20:13Z"),
    },
  ]);

  await itemsCollection.createIndex(
    {
      item: 1,
    },
    {
      unique: true,
    }
  );
}

main().finally(() => process.exit(1));
