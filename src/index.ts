import express, {Request, Response} from 'express';
import { RegisterRoutes } from "./routes/routes";
import * as swaggerUi from "swagger-ui-express";
require('dotenv').config();


const PORT = process.env.PORT || 3000;

const app = express();

RegisterRoutes(app);

try{
    const swaggerDocument = require('../swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}catch(err){
    console.log(err);
}
  


app.listen(PORT,()=>{
    console.log('app runing on port '+ PORT);
    
});

