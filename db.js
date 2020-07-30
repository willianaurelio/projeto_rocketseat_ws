const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){
    //Criar  tabela
    db.run(`    
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        )   ;
    `)
/*
    //inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
  const values = [        
        "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        "Exercícios",
        "Saúde",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, laboriosam animi suscipit earum delectus libero iusto incidunt ut illum iste repellendus deserunt atque ullam facilis nam neque cupiditate est tempore?",
        "https://rocketseat.com.br"

    ]



    db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    })

 */
    //Consultar dados na tabela
 /*   db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })
*/
    //Deletar um dado na tabela
 /*   db.run(`DELETE FROM ideas where id = ?`, [], function(err){
        if (err) return console.log(err)

        console.log("DELETEI", this)
   })
*/  
})

module.exports = db