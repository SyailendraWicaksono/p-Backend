"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectIdeaSchema = exports.createProjectIdeaSchema = void 0;
const zod_1 = require("zod");
exports.createProjectIdeaSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(10),
    category: zod_1.z.string(),
    difficulty: zod_1.z.enum(['Easy', 'Medium', 'Hard']),
    adminId: zod_1.z.number(),
});
exports.updateProjectIdeaSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
