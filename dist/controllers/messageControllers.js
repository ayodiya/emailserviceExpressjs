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
exports.setMessageRead = exports.getUserMessages = exports.sendMessage = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const User_1 = __importDefault(require("../models/User"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiver, subject, content, isRead, sender } = req.body;
    try {
        const receiverExist = yield User_1.default.findOne({ name: receiver.toLowerCase() });
        if (!receiverExist) {
            return res.status(400).json({
                status: "failed",
                msg: "Receiver with the name does not exists",
            });
        }
        const newMessage = yield Message_1.default.create({
            receiver,
            subject,
            content,
            isRead,
            sender,
        });
        receiverExist.totalMessages += 1;
        receiverExist.totalUnreadMessages += 1;
        yield receiverExist.save();
        res.status(201).json({
            status: "success",
            msg: "Message sent successfully",
            newMessage,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            msg: "Server error, please try again",
        });
    }
});
exports.sendMessage = sendMessage;
const getUserMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.params;
    try {
        const allMessages = yield Message_1.default.find({ receiver: user.toLowerCase() });
        res.status(200).json({
            status: "success",
            msg: `${user} messages fetched successfully`,
            allMessages,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            msg: "Server error, please try again",
        });
    }
});
exports.getUserMessages = getUserMessages;
const setMessageRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const messageExists = yield Message_1.default.findById(id);
        if (!messageExists) {
            return res.status(400).json({
                status: "failed",
                msg: "Message does not exists",
            });
        }
        const findUser = yield User_1.default.findOne({ name: messageExists === null || messageExists === void 0 ? void 0 : messageExists.receiver });
        if (!findUser) {
            return res.status(400).json({
                status: "failed",
                msg: "User not found",
            });
        }
        findUser.totalUnreadMessages -= 1;
        messageExists.isRead = true;
        yield messageExists.save();
        yield findUser.save();
        res.status(200).json({
            status: "success",
            msg: `Message fetched successfully`,
            messageExists,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            msg: "Server error, please try again",
        });
    }
});
exports.setMessageRead = setMessageRead;
