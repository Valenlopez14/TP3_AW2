const url = new URL(location.href)
const id_producto = url.searchParams.get('id')
const contenedor = document.getElementById('contenedor-Modificar')
const buttonEliminar = document.getElementById('button-eliminar')

function renderizarformulario(producto){
    let html = ''
    const categorias = ['Hardware', 'Periféricos', 'Sonido'];

        let opcionesCategoria = categorias.map(categoria => {
            if (categoria !== producto.categoria) {
                return `<option value="${categoria}">${categoria}</option>`
            }else{
                return `<option value="${categoria}" disabled selected>${categoria}</option>`
            }
        }).join('');

    html = `
    <form id="Modificar" method="POST" action="http://localhost:3000/productos">
        <label for="nombre">Nombre:</label><br>
        <input type="text" id="nombre" name="nombre" value="${producto.nombre}"><br><br>
        <label for="categoria">Categoría:</label><br>
        <select id="categoria" name="categoria" value="${producto.categoria}">
            <option value="Perifericos">Perifericos</option>
            <option value="Hardware">Hardware</option>
            <option value="Monitores">Monitores</option>
            <option value="Sonido">Sonido</option>
        </select><br><br>
        <label for="marca">Marca:</label><br>
        <input type="text" id="marca" name="marca" value="${producto.marca}"><br><br>
        <label for="stock">Stock:</label><br>
        <input type="number" id="stock" name="stock" value= "${producto.stock}"><br><br>
        <button type="submit" >MODIFICAR</button>
    </form>
    
    `
    contenedor.innerHTML = html

    const formulario = document.getElementById('Modificar')

    formulario.addEventListener('submit', async (e)=>{
        e.preventDefault() //Previene evento de enviar
        let datosformulario = new FormData(formulario) //tipo de objeto que guarda los datos que tiene el formulario
        let datosdelFormulario = Object.fromEntries(datosformulario)
        
        const cuerpo = JSON.stringify(datosdelFormulario) // Convierte los datos en cadena de texto 
        try{
            const respuesta = await fetch(`http://localhost:3000/productos/${id_producto}`, //Fetch hace peticiones al servidor 
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    body: cuerpo  //carga los datos del formulario 
                })
        }catch(error){
            console.log(error)
        }
       
    })
    
}   

const TraerInfoProducto = async()=>{
    try{
        const traerProducto = await fetch(`http://localhost:3000/productos/${id_producto}`)
        const producto = await traerProducto.json()
        renderizarformulario(producto)
    }
    catch(error){
        console.error('Error:', error)
    }

}

TraerInfoProducto(id_producto)