import express from 'express'

import cors from 'cors'
import authRoutes from  "./routes/auth.routes.js"
import userRoutes from "./routes/user.route.js"

const app = express();

app.use(cors({
     origin: "https://user-management-system-three-inky.vercel.app",
}

));
app.use(express.json())

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

export default app;

