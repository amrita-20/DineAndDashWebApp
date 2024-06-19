"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', auth_1.jwtCheck, auth_1.jwtParse, UserController_1.default.getUser);
router.post('/', auth_1.jwtCheck, UserController_1.default.createUser);
router.put('/', auth_1.jwtCheck, auth_1.jwtParse, UserController_1.default.updateUser);
exports.default = router;
