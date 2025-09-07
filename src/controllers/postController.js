import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { user: { select: { name: true, email: true } } },
            orderBy: { date: "desc" }
        })
        res.status(200).json(posts)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao buscar posts." })

    }
}


export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body
        const userId = req.user.id // Obtém o ID do usuário autenticado pelo Token JWT

        const post = await prisma.post.create({
            data: { title, content, userId }
        })

        res.status(201).json(post)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro ao criar post."})
    }
}


export const updatePost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
}


export const deletePost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
}