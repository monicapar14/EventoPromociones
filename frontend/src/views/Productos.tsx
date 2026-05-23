import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'
import api from "../api"
import type { ProductosObtenidos } from "../Interfaces/productosDisponibles"
import type { DescuentosDisponibles } from "../Interfaces/productosDisponibles"

type productoConSeleccion = ProductosObtenidos & { seleccionado?: boolean }

const Productos = () => {
    const location = useLocation();
    const foo = (location.state as { foo?: string })?.foo;
    const [seleccionados, setSeleccionados] = useState<productoConSeleccion[]>([]);

    console.log("fff " + foo);

    const [descuentos, setDescuentos] = useState<DescuentosDisponibles[]>([]);
    const [Productos, setProductos] = useState<ProductosObtenidos[]>([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await api.get('/productos')
                setProductos(response.data)
            } catch (error) {
                console.error('Error al obtener los Productos:', error)
            }
        }

        const obtenerDescuentoS = async () => {
            try {
                const response = await api.get('/productos/descuentos')
                setDescuentos(response.data)
            } catch (error) {
                console.error('Error al obtener los Productos:', error)
            }
        }

        obtenerProductos()
        obtenerDescuentoS()
    }, [])

    //revisar cuando se quitan todos
    const validaTodas = () => {
        const anyChecked = (document.getElementById('ckbTodos') as HTMLInputElement)?.checked === true;
        
        Productos.forEach((producto) => {
            const checkbox = document.getElementById(`producto_${producto.id_producto}`) as HTMLInputElement;
            if (checkbox) {
                checkbox.checked = anyChecked;
            }
        });

        const ProductosActualizados = Productos.map(producto => ({
            ...producto,
            seleccionado: anyChecked
        }));

        setProductos(ProductosActualizados);
        
        let total_seleccionados = ProductosActualizados.length;
        
        let total_precio = 0;
        ProductosActualizados.filter(s => s.seleccionado).forEach(producto => {
            total_precio += Number(producto.precio);
        })
        console.log("totl " + total_seleccionados + " precio total " + total_precio);
                
        
        console.log("sss " + ProductosActualizados);
        console.log('checkbox clickeado - todos marcados:', anyChecked);

        let descuento_total = 0;
        if(anyChecked === false){
            total_seleccionados = 0;
        }
        if(total_seleccionados === 0 && anyChecked === false){
            descuento_total = 0;
        }

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
        });
        console.log("descuento final " + descuento_total);
    }

    const seleccionada = (producto: ProductosConSeleccion, checked: boolean) => {
        const ProductosActualizados = Productos.map(item =>
            item.id_producto === producto.id_producto
            ? { ...item, seleccionado: checked }
            : item
        );
        const seleccionadosActuales = ProductosActualizados.filter(item => item.seleccionado);
        setProductos(ProductosActualizados);
        setSeleccionados(seleccionadosActuales);

        const total_seleccionados = ProductosActualizados.length;
        
        let total_precio = 0;
        ProductosActualizados.filter(s => s.seleccionado).forEach(producto => {
            total_precio += Number(producto.precio);
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

        console.log('Fila seleccionada:', producto);
        console.log('Productos seleccionados:', seleccionadosActuales);
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
                        Productos disponibles
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
                        {Productos.map(producto => (
                            <tr key={producto.id_producto} style={{ borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
                                <td style={{ padding: '9px 16px', color: 'var(--color-text-secondary)' }}>{producto.id_producto}</td>
                                <td style={{ padding: '9px 16px' }}>{producto.nombre}</td>
                                <td style={{ padding: '9px 16px', color: 'var(--color-text-secondary)' }}>{producto.descripcion}</td>
                                <td style={{ padding: '9px 16px', fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-secondary)' }}>
                                    Q {Number(producto.precio).toFixed(2)}
                                </td>
                                <td style={{ padding: '9px 16px', textAlign: 'center' }}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`producto_${producto.id_producto}`}
                                        onChange={(event) => seleccionada(producto, event.target.checked)}
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

export default Productos 