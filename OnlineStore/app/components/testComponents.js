module.exports.testIndex = function(req, res) {
    res.status(200).send("test index ok");
};

module.exports.testEdit = function(req, res) {
    res.status(200).send("edit ok");
};

module.exports.testEditSpecyfic = function(req, res) {
    let id = req.params.id;
    res.status(200).send("edit specyfic  "+id);
};
