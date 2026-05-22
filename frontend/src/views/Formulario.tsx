import { useState } from "react"
import type { DatosIngresados } from "../Interfaces/DatosPersona"
import type { ChangeEvent, FormEvent} from "react"

const Formulario = () => {
    const [formData, setFormData] = useState<DatosIngresados>({
        nombres: '',
        apellidos: '',
        email: '',
        fecha_hora: new Date()
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    }

    const enviarDatos = async () => {
        const respuesta = await fetch("http://localhost:8080/api/confirmaciones/agregarConfirmacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombres: formData.nombres, 
                apellidos: formData.apellidos, 
                email: formData.email, 
                fecha_hora: formData.fecha_hora
            })
        });

        const data = await respuesta.json();
        console.log(data);
    };

    return (
        <form action="" className="form" onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input onChange = {handleInputChange} value={formData.nombres} type="text" placeholder="Ingrese su nombre"  name="nombres"/>
            <label>Apellidos:</label>
            <input onChange = {handleInputChange} type="text" placeholder="Ingrese sus apellidos" value={formData.apellidos}  name="apellidos"/>
            <label>Email:</label>
            <input onChange = {handleInputChange} type="email" placeholder="Ingrese su email" value={formData.email}  name="email"/>
            <label>Fecha y Hora:</label>
            <input onChange = {handleInputChange} type="datetime-local"  name="fecha"/>                
            <button onClick={enviarDatos} type="submit" className="btn btn-primary">Confirmar</button>
        </form>
    )
}

export default Formulario