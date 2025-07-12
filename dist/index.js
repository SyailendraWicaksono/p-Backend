"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // ⬅️ import cors
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
// ⬇️ Pasang middleware cors dulu sebelum route
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001', // frontend Next.js
    credentials: true
}));
app.use(express_1.default.json());
// ⬇️ Baru kemudian semua route
app.use('/api/users', user_routes_1.default);
app.use('/api/properties', property_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/uploads', express_1.default.static('uploads'));
app.get('/', (req, res) => {
    res.send('Server is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
