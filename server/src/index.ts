import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./Authentication/UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./Authentication/entity/User";
import { createAccessToken, createRefreshToken } from "./Authentication/auth";
import { sendRefreshToken } from "./Authentication/sendRefreshToken";

(async () => {
  const app = express();

  app.use(cookieParser());

  app.get("/", (_req, res) => res.send("oi!"));

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });


  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start()

  apolloServer.applyMiddleware({ app });

  app.listen(4001, () => {
    console.log("express server started");
  });
})();