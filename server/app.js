const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userAuth = require('./routes/userAuth');
const Post = require('./routes/post');
const errorHandler = require('./Middleware/error-handler');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/uploads/`));
app.use(cors());

app.use('/auth', userAuth);
app.use('/api', Post);

//Error Handelar..
app.use(errorHandler.extra);

mongoose.connect('mongodb://localhost:27017/BlogSite', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    app.listen(3000, () => {
        console.log('Server running...');
    });
    console.log('DB connected!');
});

