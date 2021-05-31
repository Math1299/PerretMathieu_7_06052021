const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

const Posts = require("../models/Post");
let posts = new Posts();

//********************************************POSTS******************************************************************* */

//middleware pour récupérer tous les posts des utilisateurs

exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    posts
        .getAllPosts(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};

//middleware pour créer un POST

exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let sqlInserts = [userId, title, content];
    posts.createPost(sqlInserts).then((response) => {
        res.status(201).json(JSON.stringify(response));
    });
};

//middleware pour modifier un POST

exports.updatePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [title, content, postId, userId];
    console.log(sqlInserts2);
    posts
        .updatePost(sqlInserts1, sqlInserts2)
        .then((response) => {
            console.log(response);
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};

//middleware pour supprimer un POST

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [postId, userId];
    console.log(sqlInserts2);
    posts
        .deletePost(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};
