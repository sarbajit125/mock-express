"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const fs = __importStar(require("fs"));
var cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors());
const port = process.env.PORT;
const dbPath = (0, path_1.join)(process.cwd(), 'server');
const filePath = (0, path_1.join)(dbPath, 'routes.json');
let routes = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
const handleheaders = (response, route) => {
    if (route.headers != null) {
        route.headers.map((header) => {
            response.setHeader(header.key, header.value);
        });
    }
};
routes.map((item) => {
    if (item.type === 'GET') {
        app.get(item.endpoint, (req, res) => {
            handleheaders(res, item);
            return res.status(item.statusCode).json(JSON.parse(item.response));
        });
    }
    else if (item.type === 'POST') {
        app.post(item.endpoint, (req, res) => {
            handleheaders(res, item);
            return res.status(item.statusCode).json(JSON.parse(item.response));
        });
    }
    else if (item.type === 'PUT') {
        app.put(item.endpoint, (req, res) => {
            handleheaders(res, item);
            return res.status(item.statusCode).json(JSON.parse(item.response));
        });
    }
    else if (item.type === 'PATCH') {
        app.patch(item.endpoint, (req, res) => {
            handleheaders(res, item);
            return res.status(item.statusCode).json(JSON.parse(item.response));
        });
    }
    else if (item.type === 'DELETE') {
        app.delete(item.endpoint, (req, res) => {
            handleheaders(res, item);
            return res.status(item.statusCode).json(JSON.parse(item.response));
        });
    }
    else {
        console.log("Invalid HTTP Request type");
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
