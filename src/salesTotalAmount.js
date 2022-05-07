const { getClient } = require("./client");

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

  return result;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit(1));
