const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUrl = process.env.MONGO_URL;
  //   console.log(mongoUrl);

  try {
    mongoose.connect(
      mongoUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("MongoDb connected");
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
