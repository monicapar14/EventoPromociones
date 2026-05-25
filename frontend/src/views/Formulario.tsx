import { useEffect, useState } from "react"
import type { DatosIngresados } from "../Interfaces/DatosPersona"
import type { ChangeEvent, FormEvent} from "react"
import api from "../api"
import { useNavigate } from 'react-router-dom'
import type { infoConfirmacion } from '../Interfaces/DatosConfirmacion'
import Layout from '../components/Layout'

const Formulario = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<DatosIngresados>({
        nombres: '',
        apellidos: '',
        email: '',
        fecha_hora: new Date()
    });
    
    const idSesion = localStorage.getItem('idSesion')

    const [confirmacion, setConfirmacion] = useState<infoConfirmacion | null>(null)

    const formatearFecha = (fecha: Date) => {
        const d = new Date(fecha)
        return d.toISOString().slice(0, 16)
    }

    useEffect(() => {
        const iniciarSesion = async () => {
            const idGuardado = localStorage.getItem('idSesion')
            
            if(idGuardado) {
                try {
                    const response = await api.get(`/confirmaciones/${idGuardado}`)
                    const datos = response.data.confirmacion
                    setConfirmacion(datos)
                    
                    // Llena el formulario aquí directamente
                    if(datos) {
                        setFormData({
                            nombres: datos.nombres,
                            apellidos: datos.apellidos,
                            email: datos.email,
                            fecha_hora: new Date(datos.fecha_confirmacion)
                        })

                        const inputFecha = document.querySelector('input[name="fecha"]') as HTMLInputElement
                        if(inputFecha) {
                            inputFecha.value = formatearFecha(new Date(datos.fecha_confirmacion))
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener la confirmacion:', error)
                }
                } else {
                    const response = await api.post('/confirmaciones/getId')
                const { idSesion } = response.data
                localStorage.setItem('idSesion', String(idSesion))
                console.log('Nueva sesión:', idSesion)
            }
        }

        iniciarSesion()
    }, [])
    
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

        navigate('/servicios', { state: {foo: idSesion }})
        if(confirmacion){
            updateDatos();
        }else{
            enviarDatos();
        }
    }

    const updateDatos = async () => {
        try{
            const respuesta = await api.post('/confirmaciones/updateDatos', {
                id_confirmacion: idSesion,
                nombres: formData.nombres, 
                apellidos: formData.apellidos, 
                email: formData.email, 
                fecha_hora: formData.fecha_hora
            })
            console.log(respuesta.data)
        }catch(error){
            console.error('Error al enviar los datos:', error);
        }
    }

    const enviarDatos = async () => {
        try{
            const respuesta = await api.post('/confirmaciones/agregarConfirmacion', {
                id_confirmacion: idSesion,
                nombres: formData.nombres, 
                apellidos: formData.apellidos, 
                email: formData.email, 
                fecha_hora: formData.fecha_hora,
                descuento_Servicio: 0,
                descuento_producto: 0,
                estado: 0
            })
            console.log(respuesta.data)
        }catch(error){
            console.error('Error al enviar los datos:', error);
        }
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Paso 1 — Datos personales</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-medium">Nombres:</label>
                                <input onChange={handleInputChange} value={formData.nombres} type="text" className="form-control" name="nombres" placeholder="Ingrese sus nombres"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-medium">Apellidos:</label>
                                <input onChange={handleInputChange} value={formData.apellidos} type="text" className="form-control" name="apellidos" placeholder="Ingrese sus apellidos"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-medium">Email:</label>
                                <input onChange={handleInputChange} value={formData.email} type="email" className="form-control" name="email" placeholder="Ingrese su email"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-medium">Fecha y Hora:</label>
                                <input onChange={handleInputChange} type="datetime-local" className="form-control" name="fecha"/>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary px-4">
                                    Siguiente →
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
        
    )
}

export default Formulario