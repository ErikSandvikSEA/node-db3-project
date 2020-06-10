const db = require('../data/dbconfig')

function find(){
     return db('schemes as s')
}

module.exports = {
     find,
}