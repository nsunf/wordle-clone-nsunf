"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
const index_1 = __importDefault(require("./routes/index"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'client', 'build')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'sECreT kEY',
//   resave: false,
//   saveUninitialized: true,
//   store: new FileStore()
// }))
app.use('/', index_1.default);
app.use('/api', api_1.default);
app.listen(app.get('port'), () => {
    console.log('Express server is running on ' + app.get('port'));
});
