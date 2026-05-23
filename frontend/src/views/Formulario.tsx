import { useState } from "react"
import type { DatosIngresados } from "../Interfaces/DatosPersona"
import type { ChangeEvent, FormEvent} from "react"
import api from "../api"
import { useNavigate } from 'react-router-dom'

const Formulario = () => {

    const navigate = useNavigate()

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

        if(formData.nombres.trim() === '') {
            alert('Debe ingresar su nombre');
            return;
        }else if(formData.apellidos.trim() === '') {
            alert('Debe ingresar su apellido');
            return;
        }else if(formData.email.trim() === '') {
            alert('Debe ingresar su email');
            return;
        }
        console.log(formData);

        navigate('/servicios', { state: {foo: formData }})
    }

    /*const enviarDatos = async () => {
        try{
            const respuesta = await api.post('/confirmaciones/agregarConfirmacion', {
                nombres: formData.nombres, 
                apellidos: formData.apellidos, 
                email: formData.email, 
                fecha_hora: formData.fecha_hora
            })
            console.log(respuesta.data)
        }catch(error){
            console.error('Error al enviar los datos:', error);
        }

    };*/

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombres:</label>
                <input onChange = {handleInputChange} value={formData.nombres} type="text" className="form-control" name="nombres"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Apellidos:</label>
                <input onChange = {handleInputChange} value={formData.apellidos} type="text" className="form-control" name="apellidos"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input onChange = {handleInputChange} value={formData.email} type="email" className="form-control" name="email"/>
            </div>
            <label>Fecha y Hora:</label>
            <input onChange = {handleInputChange} type="datetime-local"  name="fecha"/>             
            <button type="submit" className="btn btn-primary">Siguiente</button>
        </form>
    )
}

export default Formulario