import * as express from "express";
const jwt = require("jsonwebtoken");

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
  ): Promise<any> {
  
    if (securityName === "jwt") {
        const authHeader = request.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
  
      return new Promise((resolve, reject) => {
        if (!token) {
          reject(new Error("No token provided"));
        }
        jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, function (err: any, decoded: any) {
          if (err) {
              console.log(token);
              
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      
    }
    return Promise.reject({});
  }
  