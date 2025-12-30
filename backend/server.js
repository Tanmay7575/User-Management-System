import dotenv from "dotenv"
import app from "./src/app.js"
import connectDB from "./src/config/dbConfig.js"

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));