import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import * as fs from 'fs';
import { RouteDTO } from './RouteDTO';
var cors = require('cors')
dotenv.config();

const app: Express = express();
app.use(cors())
const port = process.env.PORT;
const dbPath =  join(process.cwd() , 'server')
const filePath = join(dbPath, 'routes.json')

let routes: RouteDTO[] = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
 
 const handleheaders = ( response: Response , route: RouteDTO ) => {
    if (route.headers != null) {
      route.headers.map((header) => {
        response.setHeader(header.key, header.value)
      })
    }
 }

routes.map((item) => {
  if (item.type === 'GET'){
    app.get(item.endpoint, (req, res) => {
      handleheaders(res, item)
      return res.status(item.statusCode).json(JSON.parse(item.response));
    })
  }  else if (item.type === 'POST') {
    app.post(item.endpoint,(req, res) =>{
      handleheaders(res, item)
      return res.status(item.statusCode).json(JSON.parse(item.response));
    })
  } else if (item.type === 'PUT') {
    app.put(item.endpoint,(req, res) =>{
      handleheaders(res, item)
      return res.status(item.statusCode).json(JSON.parse(item.response));
    })
  } else if (item.type === 'PATCH') {
    app.patch(item.endpoint,(req, res) =>{
      handleheaders(res, item)
      return res.status(item.statusCode).json(JSON.parse(item.response));
    })
  } else if (item.type === 'DELETE') {
    app.delete(item.endpoint,(req, res) =>{
      handleheaders(res, item)
      return  res.status(item.statusCode).json(JSON.parse(item.response));
    })
  } else {
    console.log("Invalid HTTP Request type")
  }
})

app.listen(5000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(dbPath)
  console.log(filePath)
});