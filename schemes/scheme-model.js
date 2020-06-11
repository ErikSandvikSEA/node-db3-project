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

function add(scheme){
     return db('schemes')
          .insert(scheme)
               .then(newScheme => {
                    return findById(newScheme[0])
               })
}

function update(changes, id){
     return db('schemes')
          .where('id', id)
          .update(changes)
               .then(updatedScheme => {
                    return changes
               })
}

async function remove(id){
     try {
          const deletedScheme = await findById(id)
          return db('schemes')
          .where('id', id)
          .first()
          .del(id)
               .then(deleted => {
                    return deletedScheme
               })
     }
     catch(err){
          console.log(err)
     }
}

function addStep(step, scheme_id){
     const newStep = {
          ...step,
          scheme_id: scheme_id
     }
     return db('steps')
     .join('schemes')
     .where('schemes.id', scheme_id)
     .insert(newStep)
          .then(newScheme => {
               console.log(newScheme)
          })
          .catch(err => {
               console.log(err)
          })
}

module.exports = {
     find,
     findById,
     findSteps,
     add,
     update,
     remove,
     addStep
}