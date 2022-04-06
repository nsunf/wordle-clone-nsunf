"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'client', 'build')));
app.get('/', index_1.default);
app.listen(app.get('port'), () => {
    console.log('Express server is running on ' + app.get('port'));
});
