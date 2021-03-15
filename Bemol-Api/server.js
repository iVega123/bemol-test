const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express'), 
    swaggerDocument = require('./swagger.json');
const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to web application." });
});

require("./app/routes/endereco.routes")(app);

require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});