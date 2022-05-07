const { getClient } = require("./client");

async function main() {
  const client = await getClient();
  const collection = client.collection("sales");
}

main();
