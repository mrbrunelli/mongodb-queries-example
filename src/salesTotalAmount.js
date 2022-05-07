const { getClient } = require("./client");
const fs = require("node:fs/promises");

async function main() {
  const client = await getClient();
  const collection = client.collection("sales");

  const result = await collection
    .aggregate([
      {
        $group: {
          _id: "$item",
          totalSaleAmount: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          item: "$_id",
          total: {
            $trunc: ["$totalSaleAmount", 2],
          },
        },
      },
    ])
    .toArray();

  await fs.writeFile(
    "outputs/salesTotalAmount.json",
    JSON.stringify(result, null, 2)
  );

  return result;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit(1));
