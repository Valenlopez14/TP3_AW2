import { pool } from "./BD/bd.mjs"

async function GestionarProducto(res){
    try{
        const resultado = await pool.query('SELECT * FROM Productos')
        res.send(resultado.rows)
    }
    catch(error){
        res.status(404).send("Error" , error)
    }
}

async function TraerUnProducto(res,id){
    try{
        const respuesta = await pool.query(`SELECT * FROM Productos WHERE id=${id}`)
        if (respuesta.rows.length === 0) {
            return res.status(404).send('El producto ingresado no existe.' );
        }
        res.json(respuesta.rows[0]);
    }

    catch(error)
    {
        res.status(404).send("Error en el producto", error)
    }

}

async function AgregarProducto(res, datos){
    try{

        const respuesta = await pool.query(`INSERT INTO Productos (nombre, categoria, stock, marca) VALUES ($1,$2,$3,$4)`, [datos.nombre, datos.categoria, datos.stock, datos.marca])
        // console.log(datos)
        res.status(201).json(respuesta.rows[0])
        
    }
    catch(error){
        res.status(404).send('Error en el Servidor.')
    }
}

async function ModificarProducto(req,res){

    try{
        const id = req.params.id;
        const {nombre, categoria, stock, marca} = req.body
        //console.log(nombre)
        const respuesta = await pool.query(`UPDATE Productos SET nombre=$1, categoria=$2, stock=$3, marca=$4 WHERE id=$5`, [nombre, categoria, stock, marca, id])
        console.log(respuesta.rows)
        res.status(201).send("Producto Modificado.")
    }
    catch(error){
        res.status(404).send('Error en el Servidor.')
    }
}

async function EliminarProducto(res,id){
    try{
        const respuesta = await pool.query(`DELETE FROM Productos WHERE id=${id}`)  
        res.status(200).send("Producto Eliminado.")
    }
    catch(error){
        res.status(404).send('Error al Eliminar el Producto.')
    }
}

export {GestionarProducto, TraerUnProducto, ModificarProducto, EliminarProducto, AgregarProducto}