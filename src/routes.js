import { Router } from 'express'
import { login, register } from './controllers/authController.js'
import { createPost, deletePost, getPosts, updatePost } from './controllers/postController.js'
import { authenticate } from './middlewares/auth.js'
import { deleteUser, getUsers, updateUser } from './controllers/userController.js'

const router = Router()

// Rotas Públicas
router.post('/auth/register', register)
router.post('/auth/login', login)

// Necessitam autenticação
// Posts
router.get('/posts', authenticate, getPosts)
router.put('/posts/:id', authenticate, updatePost)
router.post('/posts', authenticate, createPost)
router.delete('/posts/:id', authenticate, deletePost)

// Users
router.get('/users', authenticate, getUsers)
router.put('/users/:id', authenticate, updateUser)
router.delete('/users/:id', authenticate, deleteUser)


export default router