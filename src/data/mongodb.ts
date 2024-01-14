import { MongoClient } from "mongodb";

const getMongoDB = async () => {
  const client: MongoClient = new MongoClient(
    "mongodb://127.0.0.1:27017/cenarios_e_lexicos"
  );
  await client.connect();
  return client.db("cenarios_e_lexicos");
};

export { getMongoDB };
