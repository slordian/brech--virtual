import database from "../database/js/database.js";

async function create(classif) {
    const db = await database.connect();

    const query = `insert into classificacao (cod_dep, cod_cla, 
    cod_cat) values (?, ?, ?)`;

    const { departamento, categoria, subcategoria } = classif;

    const { lastID } = await db.run(query, [departamento, categoria, subcategoria]);

    return lastID;
}

async function read(classif) {
    const db = await database.connect();
  
    const query = `select d.nome as dep, c.nome as cat, s.nome as sub
                      from classificacao cf
                      join departamento d on cf.cod_dep = d.cod_dep
                      join categoria c on cf.cod_cat = c.cod_cat
                      join subcategoria s on cf.cod_sub = s.cod_sub
                      where cf.cod_dep = ? and
                      cf.cod_cat = ? and
                      cf.cod_sub = ?;`;

    const { departamento, categoria, subcategoria } = classif;
    
    const { dep, cat, sub } = await db.get(query, [departamento, 
    categoria, subcategoria]);
  
    return [dep, cat, sub];
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from classificacao;`;

    const classifs = await db.all(query);

    return classifs;
}

export default { create, read, readAll };