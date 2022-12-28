const express = require('express');
const authenticate = require('../authenticate');
const cors = require("./cors");

const multer = require('multer');

const uploadRouter = express.Router().use(express.json());
var arrivals = "public/images";
var storage = multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, arrivals);
        }, 
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
});

const imageFileFilter =  (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image file!'), false)
    } else {
        cb(null, true);
    }
}

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

uploadRouter
    .route('/')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
        .post(cors.corsWithOptions, authenticate.verifyUser, upload.single("imageFile"), (req, res) => {
            res.status(200).setHeader("Content-Type", "application/json").json( req.file );
        })
        
        .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
            res.status(403).end("GET Operation not supported on /imageUpload")
        }, err => next(err))

        .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
            res.status(403).end("PUT Operation not supported on /imageUpload")
        }, err => next(err))

        .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
            res.status(403).end("DELETE Operation not supported on /imageUpload")
        }, err => next(err));

module.exports = uploadRouter;