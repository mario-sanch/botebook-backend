import { describe, expect, test, it, beforeAll, afterAll } from "@jest/globals";
import supertest from "supertest";
import { Express } from "express";
import { bootstrap } from "../loader/bootstrap";
import mongoose from "mongoose";

let app: Express;

beforeAll(async () => {
  app = await bootstrap();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.getClient().close();
});

/*test("posts response with 200 status code", async () => {
  await api.get("/api/role").expect(200);
});*/

test("test testing framework", () => {
  expect("hola").toBe("hola");
});
