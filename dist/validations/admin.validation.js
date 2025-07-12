"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminSchema = exports.loginSchema = exports.registerAdminSchema = void 0;
const zod_1 = require("zod");
exports.registerAdminSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
// ✅ Tambahkan schema validasi untuk update admin
exports.updateAdminSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional()
});
