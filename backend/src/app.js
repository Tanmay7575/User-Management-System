import express from 'express'

import cors from 'cors'
import authRoutes from  "./routes/auth.routes.js"
import userRoutes from "./routes/user.route.js"

const app = express();

app.use(cors({
     origin: "http://localhost:5173",
}
));
app.use(express.json())

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

export default app;

