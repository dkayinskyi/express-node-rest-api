const path = require('path');
const Sequelize = require('sequelize');
// Models
const TeacherModel = require('../models/teacher');
const SubjectModel = require('../models/subject');
const GroupModel = require('../models/group');
const StudentModel = require('../models/student');

const storagePath = path.join(__dirname, 'school_db.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
});

// Sequalize models creating
const Teacher = TeacherModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);
const Group = GroupModel(sequelize, Sequelize);
const Student = StudentModel(sequelize, Sequelize);

// Associations creating
Subject.hasOne(Teacher); // Could be one to many in case of university (lecturer and assistant)
Teacher.hasMany(Group);
Group.hasMany(Student);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database was updated!');
  });

module.exports = {
  Subject, Teacher, Group, Student,
};
