
import { useState } from 'react';

function Informacion() {
    const [mensaje, setMensaje] = useState('');

    async function consultarApi() {
        try {
            let resultado = await fetch('http://localhost:5000/informacion');
            let datos = await resultado.json();

            if (!resultado.ok) {
                setMensaje('Error al consultar la información');
            } else {
                setMensaje(datos.mensaje);
            }
        } catch (error) {
            setMensaje('No se pudo conectar con el servidor');
        }
    }

    return (
        <div>
            <h2>Información de TetoCore</h2>

            <button onClick={consultarApi}>
                Consultar información
            </button>

            <p>{mensaje}</p>
        </div>
    );
}

export default Informacion;
