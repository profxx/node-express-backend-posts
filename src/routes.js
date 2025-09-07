import { Router } from 'express'
import { login, register } from './controllers/authController.js'
import { createPost, getPosts } from './controllers/postController.js'
import { authenticate } from './middlewares/auth.js'

const router = Router()

// Rotas Públicas
router.post('/auth/register', register)
router.post('/auth/login', login)

// Necessitam autenticação
router.get('/post', authenticate, getPosts)
router.post('/post', authenticate, createPost)


export default router