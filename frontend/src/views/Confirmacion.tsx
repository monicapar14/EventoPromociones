import { useEffect, useState, useRef } from "react"
import type { FormEvent} from "react"
import { useLocation } from 'react-router-dom'
import api from "../api"
import { useNavigate } from 'react-router-dom'
import type { infoConfirmacion } from '../Interfaces/DatosConfirmacion'
import type { ServiciosSeleccionados } from '../Interfaces/serviciosDisponibles'
import type { ProductosSeleccionados } from '../Interfaces/productosDisponibles'
import Layout from '../components/Layout'

const Confirmacion = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const id_Sesion = (location.state as { foo?: string })?.foo || localStorage.getItem('idSesion');

    const [confirmacion, setConfirmacion] = useState<infoConfirmacion | null>(null)
    const [servicios, setServicios] = useState<ServiciosSeleccionados[]>([])
    const [productos, setProductos] = useState<ProductosSeleccionados[]>([])

    const [cupoDisponible, setCupoDisponible] = useState(true)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const obtenerConfirmacion = async () => {
            try {
                const response = await api.get(`/confirmaciones/${id_Sesion}`)
                setConfirmacion(response.data.confirmacion)
            } catch (error) {
                console.error('Error al obtener la confirmacion:', error)
            }
        }

        const obtenerServicios = async () => {
            try {
                const response = await api.get(`/servicios/${id_Sesion}`)
                setServicios(response.data.servicios)
            } catch (error) {
                console.error('Error al obtener los servicios:', error)
            }
        }

        const obtenerProductos = async () => {
            try {
                const response = await api.get(`/productos/${id_Sesion}`)
                setProductos(response.data.productos)
            } catch (error) {
                console.error('Error al obtener los productos:', error)
            }
        }
            
        const verificarCupo = async () => {
            try {
                const [resCantidad, resCupo] = await Promise.all([
                    api.get('/confirmaciones'),
                    api.get('/confirmaciones/getCupo')
                ])

                const cantidad = resCantidad.data[0].cantidad
                const cupo = resCupo.data[0].cupo_maximo

                console.log("cantidad: " + cantidad + " cupo: " + cupo)

                if(Number(cantidad) >= Number(cupo)) {
                    setCupoDisponible(false)
                }
            } catch (error) {
                console.error('Error al verificar cupo:', error)
            } finally {
                setCargando(false)
            }
        }

        if(id_Sesion) {
            obtenerConfirmacion()
            obtenerServicios()
            obtenerProductos()
            verificarCupo()
        }
    }, [])

   
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        enviarDatos();
    }

    const enviarDatos = async () => {
        try {
            const [resCantidad, resCupo] = await Promise.all([
                api.get('/confirmaciones'),
                api.get('/confirmaciones/getCupo')
            ])

            const cantidad = resCantidad.data[0].cantidad
            const cupo = resCupo.data[0].cupo_maximo

            if(Number(cantidad) >= Number(cupo)) {
                setCupoDisponible(false)
                navigate('/enviadosC', { state: { foo: id_Sesion, sinCupo: true }})
                return 
            }

            const respuesta = await api.post('/confirmaciones/updateE', {
                id_confirmacion: id_Sesion,
                estado: 1
            })

            console.log(respuesta.data)
            navigate('/enviadosC', { state: { foo: id_Sesion, sinCupo: false }})

        } catch(error: any) {
            if(error.response?.status === 409) {
                setCupoDisponible(false)
                navigate('/enviadosC', { state: { foo: id_Sesion, sinCupo: true }})
            }
            console.error('Error al confirmar:', error)
        }
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card shadow-sm" style={{ width: '100%', maxWidth: '600px' }}>
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Resumen de tu confirmación</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {confirmacion && (
                                <>
                                    <div className="mb-3">
                                        <p className="mb-1"><span className="fw-medium">Nombre:</span> {confirmacion.nombres} {confirmacion.apellidos}</p>
                                        <p className="mb-1"><span className="fw-medium">Email:</span> {confirmacion.email}</p>
                                        <p className="mb-1"><span className="fw-medium">Fecha:</span> {confirmacion.fecha_confirmacion ? new Date(confirmacion.fecha_confirmacion).toLocaleString('es-GT') : 'Sin fecha'}</p>
                                    </div>

                                    <div className="d-flex gap-3 mb-3">
                                        <span className="badge bg-success fs-6">Descuento servicios: {confirmacion.descuento_servicio}%</span>
                                        <span className="badge bg-success fs-6">Descuento productos: {confirmacion.descuento_producto}%</span>
                                    </div>

                                    <div className="mb-3">
                                        <h6 className="fw-medium border-bottom pb-2">Servicios seleccionados</h6>
                                        {servicios.length > 0 ? servicios.map((a, index) => (
                                            <p key={index} className="mb-1 text-secondary">• {a.nombre} — Q {Number(a.precio).toFixed(2)}</p>
                                        )) : <p className="text-secondary">Ninguno</p>}
                                    </div>

                                    <div className="mb-3">
                                        <h6 className="fw-medium border-bottom pb-2">Productos seleccionados</h6>
                                        {productos.length > 0 ? productos.map((p, index) => (
                                            <p key={index} className="mb-1 text-secondary">• {p.nombre} — Q {Number(p.precio).toFixed(2)}</p>
                                        )) : <p className="text-secondary">Ninguno</p>}
                                    </div>
                                </>
                            )}

                            {confirmacion?.estado === 1 && (
                                <div className="alert alert-success">✓ Ya confirmaste tu asistencia</div>
                            )}

                            {!cargando && !cupoDisponible && confirmacion?.estado === 0 && (
                                <div className="alert alert-danger">Lo sentimos, el evento ya no tiene cupo disponible</div>
                            )}

                            <div className="d-flex justify-content-between border-top pt-3">
                                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate('/productos')}>
                                    ← Regresar
                                </button>
                                {!cargando && confirmacion?.estado === 0 && cupoDisponible && (
                                    <button type="submit" className="btn btn-success px-4">
                                        Confirmar asistencia ✓
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>        
    )
}

export default Confirmacion 