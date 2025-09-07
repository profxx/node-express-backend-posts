import {PrismaClient} from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET = 'minha_chave_secreta'


// Método REGISTER - Cadastrar usuário
export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)


        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword, role}
        })

        res.status(201).json({message: "Usuário cadastrado com sucesso", user})

    } catch (error) {
        res.status(500).json({error: "Erro ao cadastrar usuário: " + error})
        console.log(error)
    }

}

// Método LOGIN - Realizar o login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ where: {email} })

        if (!user) return res.status(404).json({error: "Usuário ou senha incorretos"})

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(401).json({error: "Usuário ou senha incorretos"})
        
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email }, 
            SECRET, 
            { expiresIn: '1h'})

        res.status(200).json({message: "Login bem sucedido", token})

    } catch (error) {
        // Log o erro para fins de depuração no servidor
        console.error(error) 

        // Retorna um erro genérico de servidor para o cliente
        res.status(500).json({error: "Erro no servidor. Tente novamente mais tarde."})
    }

}