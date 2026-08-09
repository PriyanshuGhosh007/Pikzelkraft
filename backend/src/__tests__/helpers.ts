import type { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

let mongoServer: MongoMemoryServer;

export async function connectTestDB(): Promise<void> {
  const { MongoMemoryServer: MongoMemoryServerImpl } = await import("mongodb-memory-server");
  mongoServer = await MongoMemoryServerImpl.create();
  await mongoose.connect(mongoServer.getUri());
}

export async function disconnectTestDB(): Promise<void> {
  await mongoose.disconnect();
  await mongoServer?.stop();
}

export async function clearTestDB(): Promise<void> {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}

export const testAgent = request(app);

export interface RegisterPayload {
  fullName?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function registerPayload(overrides: RegisterPayload = {}): Record<string, unknown> {
  return {
    fullName: "Jane Doe",
    companyName: "Acme Corp",
    phone: "+10000000000",
    email: "jane@example.com",
    password: "password123",
    confirmPassword: "password123",
    ...overrides,
  };
}

export async function registerUser(payload: RegisterPayload = {}): Promise<request.Response> {
  return testAgent.post("/api/auth/register").send(registerPayload(payload));
}
