const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(({ storage: multer.memoryStorage() }));

const articleComponent = require("../app/components/articleComponent");
const articleValidator = require("../app/validators/articleValidator");

router.get("/add", articleComponent.articleAddGet);
router.post("/add", upload.single('image'), articleValidator.validator, articleComponent.articleAddPost);
router.get("/edit", articleComponent.articleEdit);
router.get('/edit/:id', articleComponent.articleEditId);
router.post('/edit/:id', articleComponent.submitEditedArticle);
router.get('/:id', articleComponent.articleDetails);
router.get('/delete/:id', articleComponent.deleteArticle);


module.exports = router;
