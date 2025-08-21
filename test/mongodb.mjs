import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log('连接成功');

    const database = client.db('test');
    const collection = database.collection('test1');

    // 创建（Create）
    await collection.insertOne({
      _id: "012345",
      username: "gugugaga",
      passwordHash: "<hashed_password>",
      email: "gugugaga@example.com",
      createdAt: new Date(),
    });

    // 其他CRUD操作...

  } catch (err) {
    console.error('执行基本 CRUD 操作时发生错误:', err);
  } finally {
    await client.close();
    console.log('连接已关闭');
  }
}

main();

