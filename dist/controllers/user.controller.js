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
exports.getMe = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// 📌 Get all users (tidak menampilkan password)
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield client_1.default.user.findMany({
            where: { deletedAt: null },
            select: { id: true, email: true, username: true, status: true, createdAt: true }
        });
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUsers = getUsers;
// 📌 Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield client_1.default.user.findFirst({
            where: { id, deletedAt: null },
            select: { id: true, email: true, username: true, status: true, createdAt: true }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUserById = getUserById;
// 📌 Register user baru
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const existing = yield client_1.default.user.findUnique({ where: { email } });
        if (existing) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield client_1.default.user.create({
            data: { email, username, password: hashed }
        });
        res.status(201).json({
            message: 'User created',
            user: { id: newUser.id, email: newUser.email, username: newUser.username }
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createUser = createUser;
// 📌 Update user data
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { email, username } = req.body;
    try {
        const user = yield client_1.default.user.update({
            where: { id },
            data: { email, username }
        });
        res.json({
            message: 'User updated',
            user: { id: user.id, email: user.email, username: user.username }
        });
    }
    catch (err) {
        const e = err;
        if (e.code === 'P2025') {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
exports.updateUser = updateUser;
// 📌 Soft delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield client_1.default.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
        res.json({
            message: 'User soft deleted',
            user: { id: user.id, email: user.email }
        });
    }
    catch (err) {
        const e = err;
        if (e.code === 'P2025') {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
exports.deleteUser = deleteUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.user:', req.user);
        const { id } = req.user;
        const user = yield client_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                status: true // kalau ada field status di database
            }
        });
        res.json(user);
    }
    catch (error) {
        console.error('Error in getMe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getMe = getMe;
