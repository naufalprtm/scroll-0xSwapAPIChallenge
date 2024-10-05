"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not defined in .env file");
}
if (!process.env.SCROLL_CHAIN_ID) {
    throw new Error("SCROLL_CHAIN_ID is not defined in .env file");
}
exports.default = {
    solidity: "0.8.27",
    networks: {
        scroll: {
            url: "https://rpc.scroll.io/",
            accounts: [process.env.PRIVATE_KEY],
            chainId: Number(process.env.SCROLL_CHAIN_ID),
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
