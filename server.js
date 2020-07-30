//criando o express para criar e configurar o servidor
const express = require("express")
const server = express()

const db =  require ("./db")

//configurando formulario
/*const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, laboriosam animi suscipit earum delectus libero iusto incidunt ut illum iste repellendus deserunt atque ullam facilis nam neque cupiditate est tempore?",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, laboriosam animi suscipit earum delectus libero iusto incidunt ut illum iste repellendus deserunt atque ullam facilis nam neque cupiditate est tempore?",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Yoga",
        category: "Meditação",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, laboriosam animi suscipit earum delectus libero iusto incidunt ut illum iste repellendus deserunt atque ullam facilis nam neque cupiditate est tempore?",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Cante em casa",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, laboriosam animi suscipit earum delectus libero iusto incidunt ut illum iste repellendus deserunt atque ullam facilis nam neque cupiditate est tempore?",
        url: "https://rocketseat.com.br"
    },
]
*/

//configurando arquivos estáticos
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server, 
    noCache: true, 
 })

//criando uma rota 
//capturando o pedido do cliente para responder
    server.get("/", function(req, res){   
       
        db.all(`SELECT * FROM ideas`, function(err, rows){
            if (err) return console.log(err)
                const reverseIdeas = [...rows].reverse()

                let lastIdea = []
                for (let idea of  reverseIdeas){
                    if (lastIdea.length < 2){
                     lastIdea.push(idea)
                }
            }      
            return res.render("index.html", { ideas : lastIdea})    
        })
        

    })

    server.get("/ideias", function(req, res){          
        db.all(`SELECT * FROM ideas`, function(err, rows){
            if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
            }

            const reverseIdeas = [...rows].reverse()

            return res.render("ideias.html" , { ideas: reverseIdeas})   
        
        })

        
    })

    server.post("/", function(req, res){
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
            req.body.image,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link,
        ]

     db.run(query, values, function(err) {
            if (err) {
                console.log(err)
                return res.send("Erro no banco de dados")
            }

            return res.redirect("/ideias")
       })
    })


server.listen(3000) 