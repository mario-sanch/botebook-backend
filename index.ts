import app from "./src/app";
import { connectToDB } from "./src/config/mongoose";

connectToDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
