import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// Buscar todos os posts
export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { 
                user: { select: { name: true, email: true } } // Inclui informações básicas do usuário dono do post
            },
            orderBy: { date: "desc" } // Ordena do mais recente para o mais antigo
        })
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar posts." })
    }
}

// Criar um novo post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body
        const userId = req.user.id // Obtém o ID do usuário autenticado via JWT

        const post = await prisma.post.create({
            data: { title, content, userId }
        })

        res.status(201).json(post)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao criar post." })
    }
}

// Atualizar um post específico
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) }, // Converte o id da URL para número
            data: { title, content }   // Campos que serão atualizados
        })

        res.status(200).json(updatedPost) // Retorna o post atualizado
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao atualizar post." })
    }
}

// Deletar um post específico
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        await prisma.post.delete({
            where: { id: Number(id) } // Converte o id da URL para número
        })

        res.status(200).json({ message: "Post deletado com sucesso." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao deletar post." })
    }
}
