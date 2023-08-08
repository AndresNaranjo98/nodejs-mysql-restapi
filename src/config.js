import { config } from 'dotenv'

config()

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'Ininbio.TI2022'
export const DB_DATABASE = process.env.DB_DATABASE || 'ininbiosystems'