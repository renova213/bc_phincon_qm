import app from "./app.js";
import config from "./configs/config.js";
import sequelize from "./configs/database.js";

const port = config.listenPort;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
