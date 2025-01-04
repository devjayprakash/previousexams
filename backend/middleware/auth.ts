import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import prisma from "database";

export const isAdminValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  const type = authorizationHeader?.split(" ")[0];
  const token = authorizationHeader?.split(" ")[1];

  console.log({
    type,
    token,
  });

  if (!authorizationHeader || type !== "Bearer" || !token) {
    return res.status(401).send({
      msg: "Token not found",
    });
  }

  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(401).send({
        msg: "Invalid token",
      });
    }

    const user = await prisma.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).send({
        msg: "Invalid token",
      });
    }
    req.body.user = user;
    next();
    return;
  } catch (error) {
    return res.status(401).send({
      msg: "Invalid token",
    });
  }
};
