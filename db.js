const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

//al principio estaba en false para salvar la data. una vez escribimos true, toda la data desaparece
db.sync({ force: true }).then(() => console.log("Database connected"));
//   .catch(console.error);

module.exports = db;
