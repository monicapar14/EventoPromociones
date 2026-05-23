import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'
import api from "../api"
import type { ServiciosObtenidos } from "../Interfaces/serviciosDisponibles"
import type { DescuentosDisponibles } from "../Interfaces/serviciosDisponibles"
import type { ChangeEvent } from "react"

type ServicioConSeleccion = ServiciosObtenidos & { seleccionado?: boolean }

interface Props {
  seleccionados: (serviciosSeleccionados: ServicioConSeleccion[]) => void
}

const Servicios = () => {
    const location = useLocation();
    const foo = (location.state as { foo?: string })?.foo;
    const [seleccionados, setSeleccionados] = useState<ServicioConSeleccion[]>([]);

    console.log("fff " + foo);

    const [descuentos, setDescuentos] = useState<DescuentosDisponibles[]>([])
    const [servicios, setServicios] = useState<ServiciosObtenidos[]>([])

    useEffect(() => {
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

        obtenerServicios()
        obtenerDescuentoS()
    }, [])

    //revisar cuando se quitan todos
    const validaTodas = () => {
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

        setServicios(serviciosActualizados);
        
        const total_seleccionados = serviciosActualizados.length;
        
        let total_precio = 0;
        serviciosActualizados.filter(s => s.seleccionado).forEach(servicio => {
            total_precio += Number(servicio.precio);
        })
        console.log("totl " + total_seleccionados + " precio total " + total_precio);
                
        
        console.log("sss " + serviciosActualizados);
        console.log('checkbox clickeado - todos marcados:', anyChecked);

        let descuento_total = 0;
        descuentos.forEach((descuento) => {
            console.log(" c " + total_seleccionados + " " + descuento.campoC + " " + total_precio + " " + descuento.campoP + " " +descuento_total + " " + descuento.descuento);
            if(total_seleccionados >= Number(descuento.campoC)){
                if(descuento.campoP !== null){
                    if(total_precio > Number(descuento.campoP)){
                        console.log("sii1 " + total_seleccionados + " " + descuento.campoC + " " + total_precio + " " + descuento.campoP + " " +descuento_total);
                        if(descuento_total < Number(descuento.descuento)){
                            descuento_total = descuento.descuento;
                        }
                    }
                }else{
                    
                        console.log("sii2 " + total_seleccionados + " " + descuento.campoC + " " + total_precio + " " + descuento.campoP + " " +descuento_total);
                    if(descuento_total < Number(descuento.descuento)){
                        descuento_total = descuento.descuento;
                    }
                }
            }
            console.log("descuento final " + descuento_total);

        });
    }

    //revisar cuando se quita uno
    const seleccionada = (servicio: ServicioConSeleccion, checked: boolean) => {
        const serviciosActualizados = servicios.map(item =>
            item.id_servicio === servicio.id_servicio
            ? { ...item, seleccionado: checked }
            : item
        );
        const seleccionadosActuales = serviciosActualizados.filter(item => item.seleccionado);
        setServicios(serviciosActualizados);
        setSeleccionados(seleccionadosActuales);

        const total_seleccionados = serviciosActualizados.length;
        
        let total_precio = 0;
        serviciosActualizados.filter(s => s.seleccionado).forEach(servicio => {
            total_precio += Number(servicio.precio);
        })
        console.log("totl " + total_seleccionados + " precio total " + total_precio);                

        let descuento_total = 0;
        descuentos.forEach((descuento) => {
            console.log(" c " + total_seleccionados + " " + descuento.campoC + " " + total_precio + " " + descuento.campoP + " " +descuento_total + " " + descuento.descuento);
            if(total_seleccionados >= Number(descuento.campoC)){
                if(descuento.campoP !== null){
                    if(total_precio > Number(descuento.campoP)){
                        console.log("sii1 " + total_seleccionados + " " + descuento.campoC + " " + total_precio + " " + descuento.campoP + " " +descuento_total);
                        if(descuento_total < Number(descuento.descuento)){
                            descuento_total = descuento.descuento;
                        }
                    }
                }else{
                    
                        console.log("sii2 " + total_seleccionados + " " + descuento.campoC + " " + total_precio + " " + descuento.campoP + " " +descuento_total);
                    if(descuento_total < Number(descuento.descuento)){
                        descuento_total = descuento.descuento;
                    }
                }
            }
            console.log("descuento final " + descuento_total);

        });

        console.log('Fila seleccionada:', servicio);
        console.log('Servicios seleccionados:', seleccionadosActuales);
    }

    return (
        <div className="card" style={{ padding: '1rem 0', maxWidth: '661px', margin: '0 auto', marginTop: '20px'}}>
            <div style={{
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: '12px',
                overflow: 'hidden'
            }}>
                <div style={{
                    padding: '14px 20px',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <p style={{ fontSize: '15px', fontWeight: 500, margin: 0 }}>
                        Servicios disponibles
                    </p>
                    <span style={{
                        fontSize: '12px',
                        border: '0.5px solid var(--color-border-tertiary)',
                        borderRadius: '8px',
                        padding: '3px 10px'
                    }}>
                        {seleccionados.length} seleccionado{seleccionados.length !== 1 ? 's' : ''} // revisar cuando se seleccionand todos
                    </span>
                </div>

                {/* Tabla */}
                <table className="table" style={{ margin: 0, fontSize: '13px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px 16px', fontWeight: 500 }}>#</th>
                            <th style={{ padding: '8px 16px', fontWeight: 500 }}>Nombre</th>
                            <th style={{ padding: '8px 16px', fontWeight: 500 }}>Descripción</th>
                            <th style={{ padding: '8px 16px', fontWeight: 500 }}>Precio</th>
                            <th style={{ padding: '8px 16px', textAlign: 'center' }}>
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
                            <tr key={servicio.id_servicio} style={{ borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
                                <td style={{ padding: '9px 16px', color: 'var(--color-text-secondary)' }}>{servicio.id_servicio}</td>
                                <td style={{ padding: '9px 16px' }}>{servicio.nombre}</td>
                                <td style={{ padding: '9px 16px', color: 'var(--color-text-secondary)' }}>{servicio.descripcion}</td>
                                <td style={{ padding: '9px 16px', fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-secondary)' }}>
                                    Q {Number(servicio.precio).toFixed(2)}
                                </td>
                                <td style={{ padding: '9px 16px', textAlign: 'center' }}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`servicio_${servicio.id_servicio}`}
                                        onChange={(event) => seleccionada(servicio, event.target.checked)}
                                        style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Servicios 