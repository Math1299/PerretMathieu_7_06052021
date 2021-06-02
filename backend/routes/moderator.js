//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const moderatorCtrl = require("../controllers/moderator");

//importation des middlewares de vérification
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

try {
    router.get("/comments", auth, moderatorCtrl.getAllComments);
    router.delete("/comment/:id", auth, moderatorCtrl.deleteComment);

    router.get("/posts", auth, moderatorCtrl.getAllPosts);
    router.delete("/post/:id", auth, moderatorCtrl.deletePost);
} catch (error) {
    console.log(error);
}

module.exports = router;
