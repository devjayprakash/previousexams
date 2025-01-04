import { Router } from "express";
import { object, string, ZodError } from "zod";
import { isAdminValid } from "../middleware/auth";
import prisma from "database";

const universityRouter = Router();

// create , update , delete , get , getAll

const createUniversityValidation = object({
  name: string().min(2).max(300),
  state: string().min(2).max(100),
  pinCode: string().min(2).max(6),
  establishmentYear: string().min(4).max(4),
  country: string().min(2).max(100),
  tier: string().min(1).max(100),
});

// @ts-ignore
universityRouter.post("/create", isAdminValid, async (req, res, next) => {
  try {
    const { name, state, pinCode, establishmentYear, country, tier } =
      createUniversityValidation.parse(req.body);

    const new_university = await prisma.university.create({
      data: {
        name,
        state,
        pinCode,
        establishmentYear,
        country,
        updatedAt: new Date(),
        tier,
      },
    });

    console.log(`New university created: ${new_university}`);

    res.send({
      msg: "New university created",
      result: true,
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

universityRouter.get(
  "/allUniversities",
  // @ts-ignore
  isAdminValid,
  async (_req, res, next) => {
    try {
      const universities = await prisma.university.findMany();
      res.send({
        result: true,
        universities,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default universityRouter;
