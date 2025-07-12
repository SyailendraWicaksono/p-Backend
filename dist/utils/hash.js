"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => bcrypt_1.default.hash(password, 10);
exports.hashPassword = hashPassword;
const comparePasswords = (input, hashed) => bcrypt_1.default.compare(input, hashed);
exports.comparePasswords = comparePasswords;
