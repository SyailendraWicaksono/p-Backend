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
exports.deleteProjectIdea = exports.updateProjectIdea = exports.createProjectIdea = exports.getProjectIdeaById = exports.getProjectIdeas = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const getProjectIdeas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ideas = yield prisma.projectIdea.findMany();
    res.json(ideas);
});
exports.getProjectIdeas = getProjectIdeas;
const getProjectIdeaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const idea = yield prisma.projectIdea.findUnique({ where: { id } });
    if (!idea) {
        res.status(404).json({ message: 'Project idea not found' });
        return;
    }
    res.json(idea);
});
exports.getProjectIdeaById = getProjectIdeaById;
const createProjectIdea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category, difficulty, adminId } = req.body;
    try {
        const newIdea = yield prisma.projectIdea.create({
            data: {
                title,
                description,
                category,
                difficulty,
                admin: { connect: { id: adminId } }
            }
        });
        res.status(201).json(newIdea);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create project idea', error });
    }
});
exports.createProjectIdea = createProjectIdea;
const updateProjectIdea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title, description } = req.body;
    try {
        const updated = yield prisma.projectIdea.update({
            where: { id },
            data: { title, description }
        });
        res.json(updated);
    }
    catch (error) {
        res.status(404).json({ message: 'Project idea not found or update failed' });
    }
});
exports.updateProjectIdea = updateProjectIdea;
const deleteProjectIdea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.projectIdea.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(404).json({ message: 'Project idea not found or delete failed' });
    }
});
exports.deleteProjectIdea = deleteProjectIdea;
