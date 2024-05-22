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
exports.getUser = exports.addUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const nameExists = yield User_1.default.findOne({ name });
        if (nameExists) {
            return res.status(400).json({
                status: "failed",
                msg: "User with the name exists",
            });
        }
        const newUser = yield User_1.default.create({
            name,
        });
        res.status(201).json({
            status: "success",
            msg: "User added successfully",
            newUser,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            msg: "Server error, please try again",
        });
    }
});
exports.addUser = addUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const nameExists = yield User_1.default.findOne({ name });
        if (!nameExists) {
            return res.status(400).json({
                status: "failed",
                msg: "User with the name does not exists",
            });
        }
        res.status(201).json({
            status: "success",
            msg: "User fetched successfully",
            nameExists,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            msg: "Server error, please try again",
        });
    }
});
exports.getUser = getUser;
