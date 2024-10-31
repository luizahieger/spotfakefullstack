import Express from "express";
import { criarTabelas, User } from "./db.js";
import bcryptjs from "bcryptjs"

const app = Express()
app.use(Express.json())


app.post('/registro', async function (req, res) {
    try {
        const{nome, sobrenome, email, senha, dataNascimento} = req.body
        if (!nome || !sobrenome || !email || !senha || !dataNascimento){
            res.status(406).send('Todos os campos devem ser preenchidos.')
            return
        }
        if(await User.findOne ({where:{email:email}})){
            res.status(400).send('Usuário já existente no sistema!')
            return 
        }
        const senhaSegura = bcryptjs.hashSync(senha, 10)
        const novoUsuario = User.create({
            nome: nome,
            sobrenome: sobrenome,
            email: email, 
            senha: senhaSegura,
            dataNasc: dataNascimento
        })
        res.status(201).send('Ok! Usuário criado.')
    } catch (erro) {
        console.log(erro)
    }
})

