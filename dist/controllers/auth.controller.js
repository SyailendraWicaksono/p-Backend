"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
// Register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const existing = yield client_1.default.user.findUnique({ where: { email } });
        if (existing) {
            res.status(400).json({ message: 'Email already registered' });
            return;
        }
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const user = yield client_1.default.user.create({
            data: { email, username, password: hashed }
        });
        res.status(201).json({
            message: 'User registered',
            user: { id: user.id, email: user.email, username: user.username }
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.register = register;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield client_1.default.user.findUnique({ where: { email } });
        if (!user || user.deletedAt) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = (0, generateToken_1.generateToken)({ id: user.id, email: user.email });
        res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.login = login;
