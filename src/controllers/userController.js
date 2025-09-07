import { PrismaClient } from "@prisma/client"

// Instância do Prisma para acessar o banco de dados
const prisma = new PrismaClient()

// Buscar todos os usuários
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { name: "asc" } // Ordena os usuários pelo nome
        })    

        res.status(200).json(users) // Retorna a lista de usuários
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar usuários." })
    }
}

// Atualizar um usuário específico
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, role } = req.body

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) }, // Converte o id da URL para número
            data: { name, email, role } // Campos que serão atualizados
        })

        res.status(200).json(updatedUser) // Retorna o usuário atualizado
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao atualizar usuário." })
    }
}

// Deletar um usuário específico
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        // Deleta o usuário do banco de dados
        await prisma.user.delete({
            where: { id: Number(id) } // Garante que o id é um número
        })

        res.status(200).json({ message: "Usuário deletado com sucesso." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao deletar usuário." })
    }
}
