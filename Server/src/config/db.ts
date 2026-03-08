import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI as string;

const client = new MongoClient(uri);

let db: Db;

export const connectDB = async () => {
  await client.connect();
  db = client.db("jobportal");
  console.log("MongoDB connected");
};

export const getDB = () => db;
