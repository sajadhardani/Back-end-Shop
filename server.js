const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = require("./app");
const isProductionMode = process.env.NODE_ENV === "production";
if (!isProductionMode) {
  dotenv.config();
}

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.log(`error in mongoose connection: ${err}`);
    process.exit(1);
  }
}

async function startServer() {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(
      `Server running on port ${isProductionMode ? "production" : "development"}mode on port ${port}`,
    );
  });
}

async function run() {
  await connectToDB;
  await startServer;
}

run();
