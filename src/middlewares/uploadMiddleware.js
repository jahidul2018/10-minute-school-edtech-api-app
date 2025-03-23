const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/spaces");

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.DO_SPACE_BUCKET_NAME,
        acl: "public-read",
        key: (req, file, cb) => {
            cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
        },
    }),
});

module.exports = upload;
