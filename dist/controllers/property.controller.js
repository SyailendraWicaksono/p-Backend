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
exports.deleteProperty = exports.updateProperty = exports.createProperty = exports.getPropertyById = exports.getProperties = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// 📌 Get all active properties
const getProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield client_1.default.property.findMany({
            where: { status: true, deletedAt: null }
        });
        const safeProperties = properties.map((p) => (Object.assign(Object.assign({}, p), { price: p.price.toString() })));
        // 👉 kirim ke klien:
        res.json(safeProperties);
    }
    catch (err) {
        console.error('Error in getProperties:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getProperties = getProperties;
// 📌 Get property by ID
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const property = yield client_1.default.property.findFirst({
            where: { id, deletedAt: null }
        });
        if (property) {
            // convert BigInt price to string
            const safeProperty = Object.assign(Object.assign({}, property), { price: property.price.toString() });
            res.json(safeProperty);
        }
        else {
            res.status(404).json({ message: 'Property not found' });
        }
    }
    catch (err) {
        console.error('Error in getPropertyById:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPropertyById = getPropertyById;
// 📌 Create new property
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const property = yield client_1.default.property.create({
            data: {
                title,
                description,
                price: Number(price),
                imageUrl,
                ownerId: 1 // sementara
            }
        });
        res.status(201).json({ message: 'Property created', property });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createProperty = createProperty;
// 📌 Update property
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title, description, price, status } = req.body;
    try {
        const property = yield client_1.default.property.update({
            where: { id },
            data: { title, description, price, status }
        });
        res.json({ message: 'Property updated', property });
    }
    catch (err) {
        const e = err;
        if (e.code === 'P2025') {
            res.status(404).json({ message: 'Property not found' });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
exports.updateProperty = updateProperty;
// 📌 Soft delete property
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const property = yield client_1.default.property.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
        res.json({ message: 'Property soft deleted', property });
    }
    catch (err) {
        const e = err;
        if (e.code === 'P2025') {
            res.status(404).json({ message: 'Property not found' });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
exports.deleteProperty = deleteProperty;
