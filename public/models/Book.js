const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');


class Book extends Model { }
/**
 * Helper method for defining associations.
 * This method is not a part of Sequelize lifecycle.
 * The `models/index` file will call this method automatically.
 */
  Book.associate = function(params) {
    
  }
Book.init({
  //book title
  bookTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        // custom error message
        msg: 'Please provide a value for "title"',
      }
    },
  },

  //book author
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        // custom error message
        msg: 'Please provide a value for "author"',
      }
    },
  },

  //book genre
  genre: {
    type: DataTypes.STRING,
  },

  //book publishing year
  year: {
    type: DataTypes.INTEGER
  },
},
  {
    sequelize,
    modelName: 'Book',
  });

module.exports = Book