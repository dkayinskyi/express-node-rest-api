const { Subject } = require('../db/sequelize');

exports.subjectsList = (req, res) => {
  Subject.findAll().then((user) => res.json(user));
};

exports.getSubject = (req, res) => {
  Subject.findOne({
    where: { id: req.params.id },
  }).then((user) => res.json(user));
};

exports.deleteSubject = (req, res) => {
  Subject.destroy({
    where: { id: req.params.id },
  }).then((queryResult) => {
    let message = 'Subject was deleted';
    let status = 200;

    if (queryResult !== 1) {
      status = 404;
      message = 'Requested subject not exists';
    }

    res.status(status);
    res.json({ message });
  });
};

exports.createSubject = (req, res) => {
  Subject.create(req.body)
    .then((subject) => res.json(subject))
    .catch((err) => {
      const errors = err.errors.map((error) => error.message);
      res.status(400);
      res.json({ errors });
    });
};

exports.updateSubject = (req, res) => {
  Subject.update(req.body, {
    where: { id: req.params.id },
  }).then((user) => res.json(user));
};
