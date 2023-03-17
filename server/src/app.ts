import express,  {Express, Request, Response, urlencoded, json} from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from "dotenv";
// import router from './routes/routes';
// import { errorHandler } from './middlewares/errorHandler.middleware';
// import { NotFoundHandler } from './middlewares/notFoundHandler.middleware';

const app: Express = express()

// config
dotenv.config()

// Middleware
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())
app.use(morgan("dev"))


// app.use(router)

// // Error handler
// app.use(errorHandler)
// app.use(NotFoundHandler)

app.get('/health', (req: Request, res: Response) => {
     res.send('API working')
})

export default app