const app = require("./src/app");
const PORT = process.env.APP_PORT || 5500;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
