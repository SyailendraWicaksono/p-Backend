"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded; // pastikan sudah extend di `index.d.ts`
        next();
    }
    catch (_a) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const router = express_1.default.Router();
exports.default = router;
