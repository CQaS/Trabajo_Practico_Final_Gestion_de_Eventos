import dotenv from 'dotenv'

dotenv.config()

export const HOST = process.env.HOST
export const USER = process.env.USER
export const PASSWORD = process.env.PASSWORD
export const DATABASE = process.env.DATABASE
export const PORT = process.env.PORT
export const salt = process.env.salt
export const SECRET_KEY = process.env.SECRET_KEY


/* VALIDADORES */

export const pattern_Nombre = /^[A-Z]*[a-z]{2,}[a-zA-ZñÑáÁéÉíÍúÚóÓ. ]*$/
export const pattern_Direccion = /^[a-zA-Z0-9\-.,:*+()sàèìòùáéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ!?\s/]+$/
export const pattern_soloNumeros = /^[0-9][0-9,.]*$/
export const pattern_soloLetras = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓA-Z- ]*$/
export const pattern_imagen = /\.(jpg|jpeg|png|gif)$/i
export const pattern_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const pattern_fecha = /^\d{4}-\d{2}-\d{2}$/

/* VALIDADORES PARA USERS */

export const usernamePattern = /^[a-zA-Z0-9_]+$/
export const namePattern = /^[a-zA-Z]+$/
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/