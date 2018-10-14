"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Post_1 = require("../models/Post");
var PostRouter = /** @class */ (function () {
    function PostRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    PostRouter.prototype.GetPosts = function (req, res) {
        Post_1.default.find({})
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    PostRouter.prototype.GetPost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOne({ slug: slug })
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    PostRouter.prototype.CreatePost = function (req, res) {
        var title = req.body.title;
        var slug = req.body.slug;
        var content = req.body.content;
        var featuredImage = req.body.featuredImage;
        var post = new Post_1.default({
            title: title,
            slug: slug,
            content: content,
            featuredImage: featuredImage
        });
        post.save()
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            console.log('entra en el error');
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    PostRouter.prototype.UpdatePost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOneAndUpdate({ slug: slug }, req.body)
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    PostRouter.prototype.DeletePost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOneAndDelete({ slug: slug })
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    PostRouter.prototype.routes = function () {
        this.router.get('/', this.GetPosts);
        this.router.get('/:slug', this.GetPost);
        this.router.post('/:', this.CreatePost);
        this.router.put('/:slug', this.UpdatePost);
        this.router.delete('/:slug', this.DeletePost);
    };
    return PostRouter;
}());
//export
var postRoutes = new PostRouter();
postRoutes.routes();
exports.default = postRoutes.router;
