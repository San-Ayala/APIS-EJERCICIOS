import { useState } from "react";
function Inicio() { 
    const [mensaje, setMensaje] = useState('');

    async function consultarApi() {
        let resultado = await fetch('localhost:5000/inicio');
        let datos = await resultado.json();

        setMensaje(datos.mensaje);
    }

    return (
        <div>
            <h2>Inicio de TetoCore</h2>

            <button onClick={consultarApi}>
                Consultar inicio
            </button>

            <p>{mensaje}</p>
        </div>
    );
}

export default Inicio;

