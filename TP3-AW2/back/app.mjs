import express from 'express'
import cors from 'cors'

import { GestionarProducto, TraerUnProducto, ModificarProducto, AgregarProducto, EliminarProducto} from './funciones.mjs'

const PUERTO = 3000 
const app = express()

app.use(express.static('front'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.route('/productos')
    .get(async(req, res)=>{
        GestionarProducto(res)
    })

.post((req, res)=>{
    const {nombre, marca, categoria, stock} = req.body
    const DatosProducto = {
        nombre: nombre,
        marca: marca,
        categoria: categoria,
        stock: stock
    }
    AgregarProducto(res, DatosProducto)
})

app.get('/productos/:id', (req, res)=>{
    const id = req.params.id
    TraerUnProducto(res,id)

})

app.delete('/productos/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
    EliminarProducto(res, id)
})
app.put('/productos/:id', (req, res)=>{
    ModificarProducto(req,res)
})
app.listen(PUERTO)