const API_URL = "https://practica-springboot-b71d0.containers.snapdeploy.app/api/envios";

export async function getData(page = 0, size = 5) {
    try{
        const response = await fetch(`${API_URL}?page=${page}&size=${size}`);
        const data= await response.json();
        return data;
    }catch(error){
        alert(`Error en el fetch de envios: ${error.message}`);
    }
}

export async function createEnvio(envio) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(envio)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        alert("envio creado correctamente")
        return await response.json();
        
    } catch (error) {
        alert(`Error creando envio: ${error.message}`);
    }
}


export function showEnvio(envio, idDiv){
    const div = document.getElementById(idDiv);
    div.innerHTML += `<p>${envio.cliente} - ${envio.destino} - ${envio.pesoKg} kg - $${envio.costo} - ${envio.estado}</p>`;
}


let paginaActual = 0;
const TAMANO = 5;

export async function showTodosEnvios() {
    const envios = await getData(paginaActual, TAMANO);
    const div = document.getElementById("div-todos-envios");

    div.innerHTML = "";
    envios.forEach((envio) => {
        showEnvio(envio, "div-todos-envios");
    });
    document.getElementById("btn-anterior").disabled = paginaActual === 0;
    document.getElementById("btn-siguiente").disabled = envios.length < TAMANO;
}

document.getElementById("btn-anterior").addEventListener("click", () => {
    paginaActual--;
    showTodosEnvios();
});

document.getElementById("btn-siguiente").addEventListener("click", () => {
    paginaActual++;
    showTodosEnvios();
});



export async function deleteEnvio(id) {
    try{
        const response = await fetch(`${API_URL}/${id}`, {method: "DELETE"})
        if(!response.ok){
            throw new Error(`Código de error HTTP: {response.status}`)
    }   alert("envio eliminado")
        return true;
    }catch(error){
        alert(`Error eliminando envio: ${error.message}`);
        return false
}
}

const URL_CONDUCTORES = "http://localhost:8080/api/conductores";

export async function getConductores() {
    try{
        const response = await fetch(URL_CONDUCTORES)
        const data= await response.json();
        return data;

    }catch(error){
        alert(`Error en el fetch de data conductores: ${error.message}`);
    }
}

export async function showConductores() {
    const conductores = await getConductores();
    const divC = document.getElementById("todos-conductores")
    divC.innerHTML="";
    conductores.forEach(conductor => {
        divC.innerHTML+= `
        <p>${conductor.nombre} - ${conductor.apellido} - ${conductor.licencia} - ${conductor.telefono}</p>
        `
  
        
    });
    
}


export async function createConductor(conductor) {
    try{
    const response = await fetch(URL_CONDUCTORES,{
        method:"POST",
        headers: {
                "Content-Type": "application/json"
    },body:JSON.stringify(conductor) });
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        } alert("conductor creado correctamente")
    return await response.json();  
    }catch(error){
        alert(`Error creando conductor: ${error.message}`);

    }
}

export async function deleteConductor(id) {
    try{
        const response = await fetch(`${URL_CONDUCTORES}/${id}`, {method: "DELETE"})
        if(!response.ok){
            throw new Error(`Código de error HTTP: {response.status}`)
        }
        alert("conductor eliminado")
        return true;
    }catch(error){
        alert(`Error eliminando conductor: ${error.message}`);
        return false
}
}

export async function createAsignacion(url) {
  try{
        const response = await fetch(url
            , {method: "POST"})
        if(!response.ok){
            throw new Error(`Código de error HTTP: ${response.status}`)
        }
        alert("Conductor Asignado correctamente")
        return true;
    }catch(error){
        alert(`Error asignando conductor: ${error.message}`);
        return false
    }
}

/*export function updateData(){
    window.location.reload();
}*/