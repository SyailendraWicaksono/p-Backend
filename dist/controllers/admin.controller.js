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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.deleteAdmin = exports.updateAdmin = exports.createAdmin = exports.getAdminById = exports.getAdmins = void 0;
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield prisma.admin.findMany();
    res.json(admins);
});
exports.getAdmins = getAdmins;
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const admin = yield prisma.admin.findUnique({ where: { id } });
    if (!admin) {
        res.status(404).json({ message: 'Admin not found' });
        return;
    }
    res.json(admin);
});
exports.getAdminById = getAdminById;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashed = yield (0, hash_1.hashPassword)(password);
        const newAdmin = yield prisma.admin.create({
            data: { username, email, password: hashed }
        });
        res.status(201).json(newAdmin);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create admin', error });
    }
});
exports.createAdmin = createAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const updatedAdmin = yield prisma.admin.update({
            where: { id },
            data: req.body
        });
        res.json(updatedAdmin);
    }
    catch (error) {
        res.status(404).json({ message: 'Admin not found or update failed' });
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.admin.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(404).json({ message: 'Admin not found or delete failed' });
    }
});
exports.deleteAdmin = deleteAdmin;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const existing = yield prisma.admin.findUnique({ where: { email } });
    if (existing) {
        res.status(400).json({ message: 'Email already in use' });
        return;
    }
    const hashed = yield (0, hash_1.hashPassword)(password);
    const newAdmin = yield prisma.admin.create({
        data: { username, email, password: hashed }
    });
    res.status(201).json({ id: newAdmin.id, username: newAdmin.username, email: newAdmin.email });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const admin = yield prisma.admin.findUnique({ where: { email } });
    if (!admin || !(yield (0, hash_1.comparePasswords)(password, admin.password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    const token = (0, jwt_1.generateToken)({ id: admin.id, email: admin.email });
    res.json({ token });
});
exports.login = login;
