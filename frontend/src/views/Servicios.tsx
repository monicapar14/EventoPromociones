import { useEffect, useState } from "react"
import type { FormEvent} from "react"
import { useLocation } from 'react-router-dom'
import api from "../api"
import type { ServiciosObtenidos } from "../Interfaces/serviciosDisponibles"
import type { DescuentosDisponibles } from "../Interfaces/serviciosDisponibles"
import { useNavigate } from 'react-router-dom'
import type { ObtenidosSeleccionados } from '../Interfaces/serviciosDisponibles'
import Layout from '../components/Layout'

type ServicioConSeleccion = ServiciosObtenidos & { seleccionado?: boolean }


const Servicios = () => {

    const navigate = useNavigate()

    const location = useLocation();

    const id_Sesion = (location.state as { foo?: string })?.foo || localStorage.getItem('idSesion');

    const [seleccionados, setSeleccionados] = useState<ServicioConSeleccion[]>([]);    

    const [descuentos, setDescuentos] = useState<DescuentosDisponibles[]>([]);    

    const [descuento_total, setDescuento_total] = useState(0)
    
    const [servicios, setServicios] = useState<ServicioConSeleccion[]>([]);

    const [obtenidos, setObtenidos] = useState<ObtenidosSeleccionados[]>([]);

    const calcularDescuento = (
        serviciosActualizados: ServicioConSeleccion[]
    ) => {

        const totalSeleccionados = serviciosActualizados.filter(s => s.seleccionado).length;

        let totalPrecio = 0;

        serviciosActualizados
            .filter(s => s.seleccionado)
            .forEach(servicio => {
                totalPrecio += Number(servicio.precio);
            });

        let descuentoCalculado = 0;

        descuentos.forEach((descuento) => {
            if(totalSeleccionados >= Number(descuento.campoC)) {
                if(descuento.campoP !== null) {

                    if(totalPrecio > Number(descuento.campoP)) {
                        if(descuentoCalculado < Number(descuento.descuento)) {
                            descuentoCalculado = Number(descuento.descuento);
                        }
                    }
                } else {
                    if(descuentoCalculado < Number(descuento.descuento)) {
                        descuentoCalculado = Number(descuento.descuento);
                    }
                }
            }
        });

        return descuentoCalculado;
    }

    useEffect(() => {
        if(id_Sesion) {
            const obtenerSeleccionados = async () => {
                try {
                    const response = await api.get(`/servicios/${id_Sesion}`)
                    setObtenidos(response.data.servicios)
                } catch (error) {
                    console.error('Error al obtener los seleccionados:', error)
                }
            }
            obtenerSeleccionados()
        }

        const obtenerServicios = async () => {
            try {
                const response = await api.get('/servicios')
                setServicios(response.data)
            } catch (error) {
                console.error('Error al obtener los servicios:', error)
            }
        }
        
        const obtenerDescuentoS = async () => {
            try {
                const response = await api.get('/servicios/descuentos')
                setDescuentos(response.data)
            } catch (error) {
                console.error('Error al obtener los servicios:', error)
            }
        }

        console.log("fff " + id_Sesion)
        obtenerServicios()
        obtenerDescuentoS()
    }, [])

    useEffect(() => {
        if(servicios.length > 0 && obtenidos.length > 0) {
            const serviciosActualizados = servicios.map(servicio => ({
                ...servicio,
                seleccionado: obtenidos.some(o => o.id_servicio === servicio.id_servicio)
            }))
            setServicios(serviciosActualizados)
            const seleccionadosIniciales = serviciosActualizados.filter(s => s.seleccionado)
            setSeleccionados(seleccionadosIniciales)
            
            setSeleccionados(serviciosActualizados.filter(s => s.seleccionado))
        }
    }, [servicios.length, obtenidos.length])

    const validaTodas = () => {
        setDescuento_total(0);
        const anyChecked = (document.getElementById('ckbTodos') as HTMLInputElement)?.checked === true;
        
        servicios.forEach((servicio) => {
            const checkbox = document.getElementById(`servicio_${servicio.id_servicio}`) as HTMLInputElement;
            if (checkbox) {
                checkbox.checked = anyChecked;
            }
        });

        const serviciosActualizados = servicios.map(servicio => ({
            ...servicio,
            seleccionado: anyChecked
        }));

        setSeleccionados(serviciosActualizados);
        
        let total_seleccionados = serviciosActualizados.length;
        
        let total_precio = 0;
        serviciosActualizados.filter(s => s.seleccionado).forEach(servicio => {
            total_precio += Number(servicio.precio);
        })
        console.log("totl " + total_seleccionados + " precio total " + total_precio);
                
        
        console.log("sss " + serviciosActualizados);
        console.log('checkbox clickeado - todos marcados:', anyChecked);

        if(anyChecked === false){
            total_seleccionados = 0;
            setSeleccionados([]);
        }
        if(total_seleccionados === 0 && anyChecked === false){
            setDescuento_total(0);
        }

        const descuentoCalculado = calcularDescuento(serviciosActualizados);
        setDescuento_total(descuentoCalculado);

        console.log("descuento final " + descuentoCalculado);
    }

    const seleccionada = (servicio: ServicioConSeleccion, checked: boolean) => {
        setDescuento_total(0);
        const serviciosActualizados = servicios.map(item =>
            item.id_servicio === servicio.id_servicio
            ? { ...item, seleccionado: checked }
            : item
        );
        const seleccionadosActuales = serviciosActualizados.filter(item => item.seleccionado);
        setServicios(serviciosActualizados);
        setSeleccionados(seleccionadosActuales);

        const total_seleccionados = seleccionadosActuales.length;
        
        let total_precio = 0;
        serviciosActualizados.filter(s => s.seleccionado).forEach(servicio => {
            total_precio += Number(servicio.precio);
        })
        console.log("totl " + total_seleccionados + " precio total " + total_precio);                

        const descuentoCalculado = calcularDescuento(serviciosActualizados);
        setDescuento_total(descuentoCalculado);

        console.log("descuento final " + descuentoCalculado);

        console.log('Fila seleccionada:', servicio);
        console.log('Servicios seleccionados:', seleccionadosActuales);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        navigate('/productos', { state: {foo: id_Sesion }})
        const descuentoCalculado = calcularDescuento(servicios);
        enviarDatos(descuentoCalculado);
    }

    const enviarDatos = async (descuento: number) => {
        console.log("descuento " + descuento);

        const idsSeleccionados = seleccionados.map(s => s.id_servicio).sort()
        const idsObtenidos = obtenidos.map(o => o.id_servicio).sort()
        const cambiaron = JSON.stringify(idsSeleccionados) !== JSON.stringify(idsObtenidos)

        console.log("cambiaron: " + cambiaron)

        if(cambiaron) {
            try {
                await api.post('/servicios/updateServicios', {
                    id_confirmacion: id_Sesion,
                    servicios: seleccionados.map(s => s.id_servicio)
                })
            } catch (error) {
                console.error('Error al actualizar servicios:', error)
            }
        } else if(obtenidos.length === 0 && seleccionados.length > 0) {
            try {
                const enviarS = seleccionados.map((sel) =>
                    api.post('/servicios/agregarServicio', {
                        id_confirmacion: id_Sesion,
                        id_servicio: sel.id_servicio,
                    })
                )
                await Promise.all(enviarS)
            } catch (error) {
                console.error('Error al insertar servicios:', error)
            }
        }

        // Siempre actualiza el descuento
        try {
            const respuesta = await api.post('/confirmaciones/updateS', {
                id_confirmacion: id_Sesion,
                descuento_servicio: descuento
            })
            console.log(respuesta.data)
        } catch(error) {
            console.error('Error al actualizar descuento:', error)
        }
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card shadow-sm" style={{ width: '100%', maxWidth: '700px' }}>
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Paso 2 — Servicios disponibles</h5>
                        <span className="badge bg-white text-primary">
                            {seleccionados.length} seleccionado{seleccionados.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="card-body p-0">
                        <form onSubmit={handleSubmit}>
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ padding: '10px 16px' }}>#</th>
                                        <th style={{ padding: '10px 16px' }}>Nombre</th>
                                        <th style={{ padding: '10px 16px' }}>Descripción</th>
                                        <th style={{ padding: '10px 16px' }}>Precio</th>
                                        <th style={{ padding: '10px 16px', textAlign: 'center' }}>
                                            <input
                                                type="checkbox"
                                                id="ckbTodos"
                                                onClickCapture={validaTodas}
                                                style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicios.map(servicio => (
                                        <tr key={servicio.id_servicio}>
                                            <td style={{ padding: '10px 16px' }}>{servicio.id_servicio}</td>
                                            <td style={{ padding: '10px 16px' }}>{servicio.nombre}</td>
                                            <td style={{ padding: '10px 16px', color: 'var(--color-text-secondary)' }}>{servicio.descripcion}</td>
                                            <td style={{ padding: '10px 16px' }}>Q {Number(servicio.precio).toFixed(2)}</td>
                                            <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`servicio_${servicio.id_servicio}`}
                                                    checked={(servicio as ServicioConSeleccion).seleccionado || false}
                                                    onChange={(event) => seleccionada(servicio, event.target.checked)}
                                                    style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between p-3 border-top">
                                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate('/')}>
                                    ← Regresar
                                </button>
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

export default Servicios 