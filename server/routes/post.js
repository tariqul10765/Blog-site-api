const multer = require('multer');
const router = require('express').Router();
const Post = require('../controller/post');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // console.log(file);
        cb(null, './uploads/');
     },
    filename: function (req, file, cb) {
        //console.log(file);
        cb(null , file.originalname);
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000, // 1MB
      },
    fileFilter: (req, file, cb) => {
        //if (file.fieldname === "avatar") {
          if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
          ) {
            cb(null, true);
          } else {
            cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
          }
    //     } else if (file.fieldname === "doc") {
    //       if (file.mimetype === "application/pdf") {
    //         cb(null, true);
    //       } else {
    //         cb(new Error("Only .pdf format allowed!"));
    //       }
    //     } else {
    //       cb(new Error("There was an unknown error!"));
    // console.log(file);
    //     }
       },
    });

router.post('/create-post', upload.single('profile'), Post.createPostController); // '/api/create-post'
router.post('/approved-posts', Post.approvedPostController); // '/api/approved-posts'
router.post('/delete-posts', Post.postDeleteController); // '/api/delete-posts'
router.get('/search-posts', Post.searchPost); // '/api/search-posts'


router.get('/posts', Post.getPostController); // '/api/posts'
router.get('/approved-posts', Post.getApprovedPostController); // '/api/approved'
router.post('/specific-user-posts', Post.specificUserPost); // '/api/specific-user-posts'

module.exports = router;