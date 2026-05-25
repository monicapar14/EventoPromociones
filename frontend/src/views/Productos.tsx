import { useEffect, useState, useRef } from "react"
import type { FormEvent} from "react"
import { useLocation } from 'react-router-dom'
import api from "../api"
import type { ProductosObtenidos } from "../Interfaces/productosDisponibles"
import type { DescuentosDisponibles } from "../Interfaces/productosDisponibles"
import { useNavigate } from 'react-router-dom'
import type { ObtenidosSeleccionados } from '../Interfaces/productosDisponibles'
import Layout from '../components/Layout'

type ProductoConSeleccion = ProductosObtenidos & { seleccionado?: boolean }

const Productos = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const id_Sesion = (location.state as { foo?: string })?.foo || localStorage.getItem('idSesion');

    const [seleccionados, setSeleccionados] = useState<ProductoConSeleccion[]>([]);    

    const [descuentos, setDescuentos] = useState<DescuentosDisponibles[]>([]);
    const [productos, setProductos] = useState<ProductoConSeleccion[]>([]);

    const [descuento_total, setDescuento_total] = useState(0)

    const descuento_ref = useRef(0);

    const [obtenidos, setObtenidos] = useState<ObtenidosSeleccionados[]>([])

    useEffect(() => {
        if(id_Sesion) {
            const obtenerSeleccionados = async () => {
                try {
                    const response = await api.get(`/productos/${id_Sesion}`)
                    setObtenidos(response.data.productos)
                } catch (error) {
                    console.error('Error al obtener los seleccionados:', error)
                }
            }
            obtenerSeleccionados()
        }

        const obtenerProductos = async () => {
            try {
                const response = await api.get('/productos')
                setProductos(response.data)
            } catch (error) {
                console.error('Error al obtener los productos:', error)
            }
        }

        const obtenerDescuentoS = async () => {
            try {
                const response = await api.get('/productos/descuentos')
                setDescuentos(response.data)
            } catch (error) {
                console.error('Error al obtener los productos:', error)
            }
        }

        console.log("fff " + id_Sesion)
        obtenerProductos()
        obtenerDescuentoS()
    }, [])

    useEffect(() => {
        if(productos.length > 0 && obtenidos.length > 0) {
            const productosActualizados = productos.map(producto => ({
                ...producto,
                seleccionado: obtenidos.some(o => o.id_producto === producto.id_producto)
            }))
            setProductos(productosActualizados)
            const seleccionadosIniciales = productosActualizados.filter(s => s.seleccionado)
            setSeleccionados(seleccionadosIniciales)

            descuento_ref.current = 0
            descuentos.forEach((descuento) => {
                if(seleccionadosIniciales.length >= Number(descuento.campoC)){
                    if(descuento_ref.current < Number(descuento.descuento)){
                        descuento_ref.current = Number(descuento.descuento)
                    }
                }
            })
            setDescuento_total(descuento_ref.current)
        }
    }, [productos.length, obtenidos.length])

    const validaTodas = () => {
        const anyChecked = (document.getElementById('ckbTodos') as HTMLInputElement)?.checked === true;
        
        productos.forEach((producto) => {
            const checkbox = document.getElementById(`producto_${producto.id_producto}`) as HTMLInputElement;
            if (checkbox) checkbox.checked = anyChecked;
        });

        const productosActualizados = productos.map(producto => ({
            ...producto,
            seleccionado: anyChecked
        }));

        setProductos(productosActualizados);

        const seleccionadosActuales = anyChecked ? productosActualizados : [];
        setSeleccionados(seleccionadosActuales);

        let total_seleccionados = seleccionadosActuales.length;

        // Resetea el ref antes de calcular
        descuento_ref.current = 0;

        console.log("sss " + productosActualizados);
        console.log('checkbox clickeado - todos marcados:', anyChecked);

        if(anyChecked === false){
            total_seleccionados = 0;
            setSeleccionados([]);
        }
        if(total_seleccionados === 0 && anyChecked === false){
            setDescuento_total(0);
        }

        if(total_seleccionados > 0) {
            descuentos.forEach((descuento) => {
                if(total_seleccionados >= Number(descuento.campoC)){
                    if(descuento_ref.current < Number(descuento.descuento)){
                        descuento_ref.current = Number(descuento.descuento)
                    }
                }
            })
        }

        setDescuento_total(descuento_ref.current);
        console.log("descuento final " + descuento_total);
    }

    const seleccionada = (producto: ProductoConSeleccion, checked: boolean) => {
        const productosActualizados = productos.map(item =>
            item.id_producto === producto.id_producto
            ? { ...item, seleccionado: checked }
            : item
        );
        const seleccionadosActuales = productosActualizados.filter(item => item.seleccionado);
        setProductos(productosActualizados);
        setSeleccionados(seleccionadosActuales);

        const total_seleccionados = seleccionadosActuales.length;
        
        let total_precio = 0;
        seleccionadosActuales.forEach(producto => {
            total_precio += Number(producto.precio);
        })

        // Resetea el ref antes de calcular
        descuento_ref.current = 0;

        console.log("totl " + total_seleccionados + " precio total " + total_precio); 

        descuentos.forEach((descuento) => {
            if(Number(total_seleccionados) >= Number(descuento.campoC)){
                if(descuento_ref.current < Number(descuento.descuento)){
                    descuento_ref.current = Number(descuento.descuento)
                }
            }
        })

        setDescuento_total(descuento_ref.current);

        console.log('Fila seleccionada:', producto);
        console.log('productos seleccionados:', seleccionadosActuales);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await enviarDatos();

        navigate('/confirmacion', { state: { foo: id_Sesion } });
    }

    const enviarDatos = async () => {
        console.log("descuento " + descuento_ref.current);

        const idsSeleccionados = seleccionados.map(s => s.id_producto).sort()
        const idsObtenidos = obtenidos.map(o => o.id_producto).sort()
        const cambiaron = JSON.stringify(idsSeleccionados) !== JSON.stringify(idsObtenidos)

        console.log("cambiaron: " + cambiaron)

        if(cambiaron) {
            try {
                await api.post('/productos/updateProductos', {
                    id_confirmacion: id_Sesion,
                    productos: seleccionados.map(s => s.id_producto)
                })
            } catch (error) {
                console.error('Error al actualizar productos:', error)
            }
        } else if(obtenidos.length === 0 && seleccionados.length > 0) {
            try {
                const enviarS = seleccionados.map((sel) =>
                    api.post('/productos/agregarProducto', {
                        id_confirmacion: id_Sesion,
                        id_producto: sel.id_producto,
                    })
                )
                await Promise.all(enviarS)
            } catch (error) {
                console.error('Error al insertar productos:', error)
            }
        }

        // Siempre actualiza el descuento
        try {
            const respuesta = await api.post('/confirmaciones/updateP', {
                id_confirmacion: id_Sesion,
                descuento_producto: descuento_ref.current
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
                        <h5 className="mb-0">Paso 3 — Productos disponibles</h5>
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
                                    {productos.map(producto => (
                                        <tr key={producto.id_producto}>
                                            <td style={{ padding: '10px 16px' }}>{producto.id_producto}</td>
                                            <td style={{ padding: '10px 16px' }}>{producto.nombre}</td>
                                            <td style={{ padding: '10px 16px', color: '#6c757d' }}>{producto.descripcion}</td>
                                            <td style={{ padding: '10px 16px' }}>Q {Number(producto.precio).toFixed(2)}</td>
                                            <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`producto_${producto.id_producto}`}
                                                    checked={(producto as ProductoConSeleccion).seleccionado || false}
                                                    onChange={(event) => seleccionada(producto, event.target.checked)}
                                                    style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between p-3 border-top">
                                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate('/servicios')}>
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

export default Productos 