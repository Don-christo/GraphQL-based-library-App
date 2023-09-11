import express, {Request, Response, NextFunction} from "express";
// import dotenv from 'dotenv'
import {connectDatabase} from './config/database'
import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone'
import { GraphQLError } from 'graphql';
import resolvers from './schema/resolvers'
import typeDefs from './schema/type-defs'
import { verifyToken } from "./utility/auth";


// .config();
const app = express();
connectDatabase();



// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     const token = req.headers.authorization || '';
    
//     const userData = verifyToken(token);
//     console.log("Token", userData)

//     return token
//   },
// });
// console.log(`Running at ${url}`);

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// (async () => {
//   const {url} = await startStandaloneServer(server);
//   console.log(`Running at ${url}`)
// })();

const server = new ApolloServer({
  typeDefs,
  resolvers
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return { req, res };
  },
});
console.log(`Running at ${url}`);