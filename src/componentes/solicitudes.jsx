import { useState } from 'react';

function Solicitudes() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [respuestaApi, setRespuestaApi] = useState(null);


    async function enviarApi(e) {
        e.preventDefault();
        setMensaje('Enviando solicitud...');

        try {
            let resultado = await fetch('http://localhost:5000/solicitudes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo
                })
            });

            let datos = await resultado.json();
if (!resultado.ok) {
    setRespuestaApi(null);
    setMensaje(datos.mensaje || 'Error al enviar los datos');
} else {
    setRespuestaApi(datos);
    setMensaje(datos.mensaje || 'Solicitud enviada correctamente');
}
        } catch (error) {
            setMensaje('No se pudo conectar con el servidor');
        }
    }

    return (
        <div>
            <h2>Enviar solicitud</h2>

            <form onSubmit={enviarApi}>
                <input
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />

                <input
                    placeholder="Correo electrónico"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <button type="submit">Enviar solicitud</button>
            </form>

            <p>{mensaje}</p>
            {respuestaApi && (
    <div>
        <h3>Resultado de la solicitud</h3>
        <p>Nombre: {respuestaApi.dato_enviado}</p>
        <p>Apellido: {respuestaApi.dato_apellido}</p>
        <p>Correo: {respuestaApi.dato_correo}</p>
    </div>
)}

        </div>
    );
}

export default Solicitudes;