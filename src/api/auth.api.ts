import express, { NextFunction, Request, Response, Router } from "express";
import { IUserMessage } from "../middleware/authJWT.middleware";
import validateSchema from "../middleware/zodValidation.middleware";
import {
  registerUserSchema,
  activateUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginUserSchema,
  changeOldPasswordSchema,
  refreshTokenSchema,
} from "../validation/auth.validation";

import {
  registerUser,
  activateUser,
  forgotPassword,
  resetPasswordHandler,
  login,
  changePassword,
  refreshToken,
} from "../controllers/auth/index.auth.controller";

import { AuthJWT } from "../middleware/authJWT.middleware";

const router: Router = express.Router();

router.post("/register", validateSchema(registerUserSchema), registerUser);
router.post("/activate", validateSchema(activateUserSchema), activateUser);
router.post(
  "/forgotPassword",
  validateSchema(forgotPasswordSchema),
  forgotPassword
);
router.post(
  "/resetPassword",
  validateSchema(resetPasswordSchema),
  resetPasswordHandler
);
router.post("/login", validateSchema(loginUserSchema), login);

router.post("/refresh", validateSchema(refreshTokenSchema), refreshToken);

router.post(
  "/changePassword",
  AuthJWT,
  validateSchema(changeOldPasswordSchema),
  changePassword
);

export default router;
