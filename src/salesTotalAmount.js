const { getClient } = require("./client");
const fs = require("node:fs/promises");

async function main() {
  const client = await getClient();
  const collection = client.collection("sales");

  const result = await collection
    .aggregate([
      {
        $group: {
          _id: null,
          totalSaleAmount: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
          averageQuantity: {
            $avg: "$quantity",
          },
          totalRows: {
            $sum: 1,
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
