import { pool } from '../db.js'

import libExcel from 'xlsx-js-style'
  
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

export const getEmployeeXLSX = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM ininbiosystems.monitoreo"
    );
    let workBook = libExcel.utils.book_new()
    const workSheet = libExcel.utils.json_to_sheet(rows)
    workSheet["A1"].s = {
      font: {
        name: "Calibri",
        bold: true,
        color: { rgb: "ff000000" },
      },
      fill: {
        fgColor: { rgb: "ff48c9b0" },
      },
    };
    workSheet["B1"].s = {
      font: {
        name: "Calibri",
        bold: true,
        color: { rgb: "ff000000" },
      },
      fill: {
        fgColor: { rgb: "ff48c9b0" },
      },
    };
    const rango = libExcel.utils.decode_range(workSheet["!ref"]);
    const filaInicial = rango.s.r;
    const columna = 'F';
    for (let i = filaInicial + 1; i < rango.e.r; i++) {
      const direccionCelda = columna + i;
      const celda = workSheet[direccionCelda];
      const valorCelda = celda.v;
      if (valorCelda >= 5) {
        const estiloCelda = { fill: { fgColor: { rgb: "FFFF0000" } } };
        celda.s = estiloCelda;
      }
    }
    libExcel.utils.book_append_sheet(workBook, workSheet, 'prueba')
    const excelBuffer = libExcel.write(workBook, { bookType: 'xlsx', type: 'buffer' })
    res.setHeader('Content-Disposition', 'attachment; filename=pruebaExcel.xlsx')
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.send(excelBuffer)
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
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