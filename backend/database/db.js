import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-jr1nqlq-shard-00-00.hiqxp5p.mongodb.net:27017,ac-jr1nqlq-shard-00-01.hiqxp5p.mongodb.net:27017,ac-jr1nqlq-shard-00-02.hiqxp5p.mongodb.net:27017/mernstack?ssl=true&replicaSet=atlas-g8vb7j-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.log(`error while connecting to the database`, error);
  }
};

export default Connection;
