const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

module.exports = {
  mochaHooks: {
    async beforeAll() {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
      }
    },
    async afterAll() {
      await mongoose.connection.close();
    },
  },
};
