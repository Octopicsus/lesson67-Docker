import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    this.client = new MongoClient(process.env.MONGO_URI);
    await this.client.connect();
    this.db = this.client.db('lesson67');
    return this.db;
  }

  getCollection(name) {
    return this.db.collection(name);
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
  }
}

export default new Database();
