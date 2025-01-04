import { Router } from "express";
import { object, string, ZodError } from "zod";
import bcrypt from "bcrypt";
import prisma from "database";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

const adminRouter = Router();

const createAdminValidation = object({
  name: string(),
  email: string(),
  password: string(),
});

adminRouter.post("/create", async (req, res, next) => {
  try {
    const { name, email, password } = createAdminValidation.parse(req.body);

    const hash = bcrypt.hashSync(password, 10);

    const new_user = await prisma.admin.create({
      data: {
        name: name,
        email: email,
        password: hash,
        updatedAt: new Date(),
      },
    });

    console.log(`New user created: ${new_user}`);

    res.send({
      msg: "New user created",
      data: new_user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({
        msg: "Validation failed",
        data: error.errors,
      });
    }
    next(error);
  }
});

const signInValidation = object({
  email: string(),
  password: string(),
});

adminRouter.post("/sign_in", async (req, res, next) => {
  try {
    const { email, password } = signInValidation.parse(req.body);

    console.log(email);

    const user = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user);

    if (!user) {
      res.status(404).send({
        msg: "User not found",
        code: 404,
      });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    if (!isPasswordValid) {
      res.status(401).send({
        msg: "Invalid password",
        code: 401,
      });
      return;
    }

    res.send({
      msg: "Sign in success",
      token: token,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).send({
        msg: "Validation failed",
        data: err.errors,
        code: 400,
      });
    }
    next(err);
  }
});

export default adminRouter;
