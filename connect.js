const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

module.exports = {
  connectToServer: () => {
    database = client.db("blogData");
  },
  getDb: () => {
    return database;
  },
};

/*
async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);*/
