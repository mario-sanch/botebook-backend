import express from "express";
import validateSchema from "../middleware/zodValidation.middleware";
import {
  registerUserSchema,
  activateUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginUserSchema,
  changeOldPasswordSchema,
} from "../validation/auth.validation";
import {
  registerUser,
  activateUser,
  forgotPassword,
  resetPasswordHandler,
  login,
  changePassword,
} from "../controllers/auth/index.auth.controller";

import { AuthJWT } from "../middleware/authJWT.middleware";

const router = express.Router();

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

router.post("/refresh", refreshToken);

/* router.post(
  "/changePassword",
  AuthJWT,
  validateSchema(changeOldPasswordSchema),
  changePassword
); */

export default router;
