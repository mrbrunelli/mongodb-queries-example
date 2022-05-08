const { getClient } = require("./client");
const fs = require("node:fs/promises");

async function main() {
  const client = await getClient();
  const collection = client.collection("sales");

  const result = await collection
    .aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$date",
              format: "%Y-%m",
            },
          },
          totalSaleAmount: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
          items: {
            $push: {
              item: "$item",
              price: "$price",
              quantity: "$quantity",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          total: {
            $trunc: ["$totalSaleAmount", 2],
          },
          items: "$items",
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ])
    .toArray();

  await fs.writeFile(
    "outputs/salesTotalAmountPerMonth.json",
    JSON.stringify(result, null, 2)
  );

  return result;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit(1));
