import express from 'express';
import { RegisterRoutes } from "./routes/routes";
import * as swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
const db = require('./configs/database');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

const app = express();
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());

require('./models/index');


RegisterRoutes(app);

try{
    const swaggerDocument = require('../swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}catch(err){
    console.log(err);
}




db.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log('app runing on port '+ PORT);  
    });
}).catch((err: any)=>{
    console.log(err);
})


