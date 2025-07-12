"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middlewares/validate");
const user_validation_1 = require("../validations/user.validation");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// ⬇️ route /me HARUS di atas /:id
router.get('/me', auth_1.authenticateToken, user_controller_1.getMe);
// List users
router.get('/', user_controller_1.getUsers);
// Get user by ID
router.get('/:id', user_controller_1.getUserById);
// Create user dengan validasi
router.post('/', (0, validate_1.validate)(user_validation_1.registerSchema), user_controller_1.createUser);
// Update user dengan validasi
router.put('/:id', (0, validate_1.validate)(user_validation_1.updateUserSchema), user_controller_1.updateUser);
// Delete user
router.delete('/:id', user_controller_1.deleteUser);
exports.default = router;
