import { createEnvio, deleteEnvio, showEnvio,  showTodosEnvios, showConductores, createConductor, deleteConductor, createAsignacion } from "./script.js";

const form = document.getElementById("envio-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const envio = {
        cliente: document.getElementById("cliente").value,
        destino: document.getElementById("destino").value,
        pesoKg: parseFloat(document.getElementById("pesoKg").value)
    };
    const creado = await createEnvio(envio);
    console.log(creado);

    if (creado) {
       /* document.getElementById("div-envios").innerHTML = "";*/
        /*updateData();*/
        showTodosEnvios();

    }
});

showTodosEnvios();

const formE = document.getElementById("eliminar-form");

formE.addEventListener("submit", async (e) =>{
    e.preventDefault();
    const id = document.getElementById("eliminar-id").value
    await deleteEnvio(id);
    
    showTodosEnvios();
})



showConductores();

const formC = document.getElementById("envio-form-conductores")

formC.addEventListener("submit",async (e) => {
    e.preventDefault();
    const conductor ={
     nombre : document.getElementById("nombreC").value,
     apellido : document.getElementById("apellidoC").value,
     licencia: document.getElementById("licenciaC").value,
     telefono : document.getElementById("telefonoC").value,
     contrasena : document.getElementById("contrasenaC").value
    }

    const creado = await createConductor(conductor);
        if (creado) {
       /* document.getElementById("div-envios").innerHTML = "";*/
        showConductores();

    }
    
})


const formElimCond = document.getElementById("eliminar-conductor-form");

formElimCond.addEventListener("submit", async (e) =>{
    e.preventDefault();
    const id = document.getElementById("eliminar-id-conductor").value
    await deleteConductor(id);
    showConductores();

})


const formAsigaciones = document.getElementById("envio-form-asignacion");
const URL_ASIGNACIONES = 'http://localhost:8080/api/asignaciones';
formAsigaciones.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const parametros = new URLSearchParams({
    envioId :document.getElementById("id-envio").value,
    conductorId: document.getElementById("id-conductor").value,
    responsable: document.getElementById("responsable").value
})
const observaciones= document.getElementById("observaciones").value;
if(observaciones.trim() !== ""){
    parametros.append("observaciones",observaciones)
}
const urlReq = `${URL_ASIGNACIONES}?${parametros}`;

const creada = await createAsignacion(urlReq);

if (creada) {
    await showTodosEnvios();
}

})

