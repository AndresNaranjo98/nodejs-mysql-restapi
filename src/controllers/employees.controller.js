import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT nombre_usuario, id_tequilera FROM ininbiosystems.registros"
    )
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    })
  }
}

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT nombre_usuario, id_tequilera FROM ininbiosystems.registros WHERE id = ?",
      [req.params.id]
    )
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      })
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    })
  }
}

export const postEmployees = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      correo,
      contrasena,
      pass,
      nombre_usuario,
      id_tequilera,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO ininbiosystems.registros (nombre, apellidos, correo, contrasena, pass, nombre_usuario, id_tequilera) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        apellidos,
        correo,
        contrasena,
        pass,
        nombre_usuario,
        id_tequilera,
      ]
    )
    res.send({
      id: rows.insertId,
      nombre,
      apellidos,
      correo,
      contrasena,
      pass,
      nombre_usuario,
      id_tequilera,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    })
  }
}

export const putEmployees = async (req, res) => {
  const { id } = req.params;
  const { nombre_usuario } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE ininbiosystems.registros SET nombre_usuario = ? WHERE id = ?",
      [nombre_usuario, id]
    )
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      })
    const [rows] = await pool.query(
      "SELECT nombre_usuario, id_tequilera FROM ininbiosystems.registros WHERE id = ?",
      [id]
    )
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    })
  }
}

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM ininbiosystems.registros WHERE nombre_usuario = ?",
      [req.params.nombre_usuario]
    )
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      })
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    })
  }
}