const db = require('../data/dbconfig')

function find(){
     return db('schemes')
}

function findById(id){
     return db('schemes')
          .where('id', id)
          .first()
}

function findSteps(id){
     return db('steps')
          .join('schemes', 'steps.scheme_id', 'schemes.id')
          .where('schemes.id', id)
          .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
          .orderBy('steps.step_number')
}



module.exports = {
     find,
     findById,
     findSteps
}