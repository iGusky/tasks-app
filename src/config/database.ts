import chalk from "chalk";
import mongoose, { type ConnectOptions } from "mongoose";
const uri = `mongodb+srv://gushm_dev:${process.env.PASSWORD}@colibri.ulrewcq.mongodb.net/?appName=colibri`;

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  dbName: "tasks-app"
};

export async function connectDB() {
  try {
    console.log(chalk.dim("Conectando a la base de datos."));
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db?.admin().command({ ping: 1 });
    console.log(chalk.dim("Conexión establecida a MongoDB Atlas."));
  } catch (error) {
    console.error(error);
  }
}
