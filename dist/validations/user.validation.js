"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6)
});
exports.updateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    username: zod_1.z.string().min(3).optional()
});
