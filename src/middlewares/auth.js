import jwt from 'jsonwebtoken'

const SECRET = 'minha_chave_secreta'

export const authenticate = (req, res, next) => {
    const token = req.headers["authorization"]?.split(' ')[1]
    if (!token) return res.status(401).json({error: "Token não fornecido."})

    try {
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Token inválido."})
    }
}

export const authorizeAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({error: "Acesso permitido apenas a admin."})
    }
    next()
}