const { MongoClient } = require("mongodb");

async function getClient() {
  const client = new MongoClient("mongodb://root:root@localhost:27017");
  await client.connect();
  return client.db("beers");
}

module.exports = {
  getClient,
};
