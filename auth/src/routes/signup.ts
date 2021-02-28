import express, { Request, Response } from "express";
const { body, validationResult } = require("express-validator");
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Invalid credentials"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Invalid password credentials"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = await User.build({ email, password });

    await user.save();

    //Generate JWT

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
