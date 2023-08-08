import { pool } from '../db.js'

export const getPing =  async (req, res) => {
    const [result] = await pool.query('SELECT * FROM ininbiosystems.registros')
    res.json(result)
}