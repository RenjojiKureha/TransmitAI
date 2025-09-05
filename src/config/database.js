import mongoose from 'mongoose';

/**
 * 异步连接到 MongoDB 数据库。
 * 使用环境变量中的 MONGODB_URI 进行连接。
 * 连接成功时打印成功信息，失败时打印错误并退出进程。
 */
const connectDB = async () => {
  try {
    // 尝试使用 Mongoose 连接数据库
    await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 6.x 之后，这些选项默认就是 true，可以省略
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    // 如果连接失败，打印错误信息
    console.error('MongoDB connection failed:', error.message);
    // 退出 Node.js 进程，状态码为 1 表示异常退出
    process.exit(1);
  }
};

export default connectDB;