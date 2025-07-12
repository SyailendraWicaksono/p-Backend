"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const admin_routes_1 = __importDefault(require("./admin.routes"));
const projectIdea_routes_1 = __importDefault(require("./projectIdea.routes"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Welcome to the API root!');
});
router.use('/admins', admin_routes_1.default); // ✅ tambahkan admin routes
router.use('/project-ideas', projectIdea_routes_1.default);
exports.default = router;
