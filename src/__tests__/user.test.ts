import { describe, expect, test, it, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { Express } from "express";
import { bootstrap } from "../loader/bootstrap";
import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";
//import { UserModel } from "../models/user.model";

let app: Express;

beforeAll(async () => {
  app = await bootstrap();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.getClient().close();
});

describe("GET /api/users", () => {
  it("return 200 for GET /api/users", async () => {
    // Arrange
    const expected = 200;

    // Act
    const response = await request(app).get("/api/users").send();

    // Assert
    expect(response.status).toBe(expected);
  });

  it("should return a list of users", async () => {
    // Arrange

    // Act
    const response = await request(app).get("/api/users").send();

    // Assert
    expect(response.body).toBeInstanceOf(Array);
  });
});
