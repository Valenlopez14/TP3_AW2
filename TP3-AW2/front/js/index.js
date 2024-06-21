const formulario = document.getElementById('contenedor-productos')

const ProdJSON= async()=>{
    const datos = await fetch("http://localhost:3000/productos")
    const productos = await datos.json()
   renderizar(productos)
}



const renderizar  = (productos)=>{
    let html = ''
    console.log(productos)
    productos.forEach((producto)=>{
        html += `
        <article> 
           <h2> Nombre: ${producto.nombre} </h2>
           <br>
           <a href="administrar.html?id=${producto.id}"> Administrar</a>
           <br>
           <p> Marca: ${producto.marca}</p>
           <br>
           <p>Categoria: ${producto.categoria}</p>
           <br>
           <p> Stock:${producto.stock}</p>
          <button type="submit" value="${producto.id}" class="button-Eliminar">Eliminar</button>
           <h3>**********************************************************************************</h3>
        </article>
        `
    })
    
    formulario.innerHTML=html

    const botonEliminar = document.querySelectorAll('.button-Eliminar')
    botonEliminar.forEach((boton)=>{

        boton.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log(e.target.value)
       eliminarProducto(e.target.value)
       
    })
    }) 

}
async function eliminarProducto(producto){
    const productoPeticion = fetch(`http://localhost:3000/productos/${producto}`,
        {
            method:'DELETE'
    
        })
        //Para redirigir al index
        window.location.href= './' 
        
    }

ProdJSON()