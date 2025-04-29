"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
exports.ResponseUtil = {
    success: (data, message) => {
        return {
            success: true,
            data,
            message,
        };
    },
    error: (error) => {
        return {
            success: false,
            error,
        };
    },
};
