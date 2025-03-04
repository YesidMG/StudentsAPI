const express = require("express");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Obtener todos los estudiantes
app.get("/students", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM students");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un estudiante por ID
app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, carrera } = req.body;
        const result = await pool.query(
            "UPDATE students SET nombre = $1, edad = $2, carrera = $3 WHERE id = $4",
            [nombre, edad, carrera, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        res.json({ message: "Estudiante actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un estudiante por ID
app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Agregar un estudiante
app.post("/students", async (req, res) => {
    try {
        const { nombre, edad, carrera } = req.body;
        await pool.query("INSERT INTO students (nombre, edad, carrera) VALUES ($1, $2, $3)", [nombre, edad, carrera]);
        res.json({ message: "Estudiante agregado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un estudiante por ID
app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        res.json({ message: "Estudiante eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar todos los estudiantes
app.delete("/students", async (req, res) => {
    try {
        await pool.query("DELETE FROM students");
        res.json({ message: "Todos los estudiantes eliminados" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
