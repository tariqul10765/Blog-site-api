const multer = require('multer');
const Post = require('../models/post');



/**
 *  for creating post
 */

const createPostController = async (req, res, next) => {
    //console.log(req.body.profile);
    // console.log(req.file);
    let approve = false;
    const baseUrl = req.protocol + '://' + req.get('host') + '/';
    const imageUrl = baseUrl + req.file.filename;
    // console.log(imageUrl);
    const postData = new Post({
        author: req.body.author,
        title: req.body.title,
        img: imageUrl,
        content: req.body.content,
        category: req.body.category,
        shortDes: req.body.shortDes,
        approved: approve
    });

    try {
        await postData.save();
        res.send('Successfully added!!');
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const approvedPostController = async (req, res, next) => {
    //console.log(req.body.profile);
    // console.log(req.file);
    console.log(req.body);
    let approve = true;

    //     const imageUrl = 'http://localhost:3000/' + req.file.filename;
    //     // console.log(imageUrl);
    //     const postData = new Post({
    //         title: req.body.title,
    //         img: imageUrl,
    //         content: req.body.content,
    //         category: req.body.category,
    //         shortDes: req.body.shortDes,
    //         approved: approve
    //     });

    try {
        if (!req.body.id) {
            const newError = new Error();
            newError.message = 'No id found';
            next(newError);
            // return;
        }
        // await postData.save();
        await Post.findOneAndUpdate({ _id: req.body.id }, { approved: true });
        res.send('Successfully Updated!!');
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const postDeleteController = async (req, res) => {
    try {
        // await postData.save();
        await Post.findOneAndDelete({ _id: req.body.id });
        res.send('Successfully Deleted!!');
    }
    catch {
        res.send('Something wrong');
    }
}

const getPostController = async (req, res) => {
    console.log('ashci');
    try {
        const data = await Post.find({ approved: true }).sort('-updatedAt');
        res.send(data);
    }
    catch {
        res.send('Error');
    }

}
// === equal sign
// 

const getApprovedPostController = async (req, res) => {
    try {
        const data = await Post.find({ approved: false });
        res.send(data);
    }
    catch {
        res.send('Error');
    }

}

const specificUserPost = async (req, res) => {
    try {
        const data = await Post.find({ author: req.body.author });
        res.json(data);
    } catch (err) {
        res.json('Error');
    }
}

const searchPost = async (req, res) => {
    console.log(req.query.q);
    try {
        const query = req.query.q;

        const searchData = await Post.find({ title: new RegExp(query, 'i') });

        res.send(searchData);
    }
    catch {
        res.send('Error');
    }
}

module.exports = {
    createPostController,
    getPostController,
    getApprovedPostController,
    approvedPostController,
    postDeleteController,
    specificUserPost,
    searchPost
};