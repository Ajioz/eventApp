import { MongoClient } from "mongodb";

export const connectDB = async () => {
  return await MongoClient.connect(process.env.MONGODB_URL);
};

export const insertDoc = async (client, collection, doc) => {
  const db = client.db();
  return await db.collection(collection).insertOne(doc);
};

export const getAllDocs = async (client, collection, sort, filter) => {
  const db = client.db();
  return await db.collection(collection).find(filter).sort(sort).toArray();
};
