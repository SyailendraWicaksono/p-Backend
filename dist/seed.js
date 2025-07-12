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
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("./prisma/client"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🚮 Menghapus semua data lama...');
        yield client_1.default.property.deleteMany();
        yield client_1.default.user.deleteMany();
        console.log('🔐 Hashing password...');
        const pw1 = yield bcrypt_1.default.hash('270703', 10);
        const pw2 = yield bcrypt_1.default.hash('123456', 10);
        const pw3 = yield bcrypt_1.default.hash('345678', 10);
        console.log('👤 Menambahkan data user...');
        yield client_1.default.user.createMany({
            data: [
                { email: 'syailendrawicaksono29@gmail.com', username: 'Syailendra', password: pw1 },
                { email: 'nameisdonald@gmail.com', username: 'Donald', password: pw2 },
                { email: 'celementine@gmail.com', username: 'Jeremy', password: pw3 },
            ],
        });
        console.log('🏡 Menambahkan data property...');
        yield client_1.default.property.createMany({
            data: [
                {
                    title: 'House 1',
                    price: 1500000000,
                    imageUrl: 'uploads/house1.jpg',
                    ownerId: 1,
                },
                {
                    title: 'House 2',
                    price: 2000000000,
                    imageUrl: 'uploads/house2.jpg',
                    ownerId: 2,
                },
                {
                    title: 'House 3',
                    price: 1000000000,
                    imageUrl: 'uploads/house3.jpg',
                    ownerId: 3,
                },
                {
                    title: 'House 4',
                    price: 3500000000,
                    imageUrl: 'uploads/house4.jpg',
                    ownerId: 1,
                },
                {
                    title: 'House 5',
                    price: 500000000,
                    imageUrl: 'uploads/house5.jpg',
                    ownerId: 2,
                },
            ],
        });
        console.log('✅ Sukses seeding data dummy untuk User dan Property');
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => client_1.default.$disconnect());
