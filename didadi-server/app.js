
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // 解析cookie
const logger = require('morgan');
// 路由工具
const indexRouter = require('./routes/index');
const managementRouter = require('./routes/management');

// 应用程序
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用各种中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());// 解析cookie
app.use(cors({
    origin: ['http://localhost:8080', 'https://lightshadow.xyz'],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    alloweHeaders: ['Conten-Type', 'Authorization'],
    credentials: true
}));

// 静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

// 启用路由工具
app.use('/api/v1/didadi', indexRouter);
app.use('/api/v2/didadi', managementRouter);

module.exports = app;
