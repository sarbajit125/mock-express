import express, { Express } from "express";
import dotenv from "dotenv";
import { HttpType } from "@prisma/client";
import prisma from "./lib/prisma";
var cors = require("cors");
dotenv.config();
const app: Express = express();
app.use(cors());
const port = Number(process.env.PORT) || 5000;
app.use("*", async (req, res, next) => {
  try {
    console.log(`Base Request URL: ${req.baseUrl}`);
    const requestMethod: HttpType =
      HttpType[req.method as keyof typeof HttpType];
    const response = await prisma.post.findFirstOrThrow({
      where: {
        mockURL: {
          search: req.baseUrl,
        },
        type: requestMethod,
      },
      include : {
        CustomHeaders: true
      }
    });
    if (response.CustomHeaders.length != 0 ) {
      response.CustomHeaders.map((item) => res.setHeader(item.key, item.value))
    }
    res.status(response.statusCode).json(JSON.parse(response.response));
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Mock does not exist",
    });
    next();
  }
});

app.listen(port, () => {
  console.log(`⚡️[db]: Database running at http://localhost:${port}`);
});
