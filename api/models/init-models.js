
var Cours_Matieres = require("./Cours_Matieres")
var Cours = require("./Cours")
var Matieres = require("./Matieres")
var Eval = require("./Eval")
var Type_Eval = require("./Type_Eval")
var Profil = require("./Profils")
var Users = require("./Users")
var Users_Matieres = require("./Users_Matieres")
var Notes = require("./Notes")

function initModels() {

  /***définition des relations***/

  //Profil user 1 n
  Users.belongsTo(Profil)
  Profil.hasMany(Users, {foreignKey: "Profils_Id"})
  // User User_Matiere 1 n
  Users_Matieres.belongsTo(Users);
  Users.hasMany(Users_Matieres, {foreignKey: "UM_Users_Id"})
  // User_Matiere Matiere 1 n
  Users_Matieres.belongsTo(Matieres)
  Matieres.hasMany(Users_Matieres, {foreignKey: "UM_Matieres_Id"})
  //Matiere Cours_Matieres 1 n
  Cours_Matieres.belongsTo(Matieres)
  Matieres.hasMany(Cours_Matieres, {foreignKey: "CM_Matieres_Id"})
  //Cours Cours_Matieres 1 n
  Cours_Matieres.belongsTo(Cours)
  Cours.hasMany(Cours_Matieres, {foreignKey: "CM_Cours_Id"})
  //Cours Eval 1 n 
  Eval.belongsTo(Cours)
  Cours.hasMany(Eval, {foreignKey: "Cours_Eval_Id"})
  //eval type_elval 1 n
  Eval.belongsTo(Type_Eval)
  Type_Eval.hasMany(Eval, {foreignKey: "Eval_Type_Eval_id"})
  //eval notes 1 n
  Notes.belongsTo(Eval)
  Eval.hasMany(Notes, {foreignKey: "Notes_Eval_Id"})
  // users notes 1 n et la boucle est bouclée 
  Notes.belongsTo(Users)
  Users.hasMany(Notes, {foreignKey: "Notes_Users_Id"})

  return {
    Profil,
    Users,
    Users_Matieres,
    Matieres,
    Cours_Matieres,
    Cours,    
    Eval,
    Type_Eval,
    Notes    
  }
}

module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
