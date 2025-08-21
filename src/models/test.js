import mongoose from "mongoose";
import { User } from "./models.js";

const url = 'mongodb://localhost:27017/test'; // 注意加上数据库名

async function main() {
  try {
    await mongoose.connect(url);
    console.log('Mongoose连接成功');

    await User.create({
      username: "testuser",
      passwordHash: "xxxx",
      email: "test@example.com"
    });

    console.log('用户创建成功');
  } catch (err) {
    console.error('执行时发生错误:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Mongoose连接已关闭');
  }
}

main();

