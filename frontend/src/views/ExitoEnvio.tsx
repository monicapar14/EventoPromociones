import type { FormEvent} from "react"
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const Exito = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const id_Sesion = (location.state as { foo?: string })?.foo || localStorage.getItem('idSesion')
    const sinCupo = (location.state as { sinCupo?: boolean })?.sinCupo || false

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate('/', { state: { foo: id_Sesion }})
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card shadow-sm text-center" style={{ width: '100%', maxWidth: '500px' }}>
                    <div className={`card-header ${sinCupo ? 'bg-danger' : 'bg-success'} text-white`}>
                        <h5 className="mb-0">{sinCupo ? 'Sin cupo disponible' : '¡Confirmación exitosa!'}</h5>
                    </div>
                    <div className="card-body py-4">
                        <form onSubmit={handleSubmit}>
                            {sinCupo ? (
                                <>
                                    <div className="fs-1 mb-3">😔</div>
                                    <p className="text-danger fw-medium">Lo sentimos</p>
                                    <p className="text-secondary">El evento ya no tiene cupo disponible.</p>
                                </>
                            ) : (
                                <>
                                    <div className="fs-1 mb-3">🎉</div>
                                    <p className="text-success fw-medium">¡Tu asistencia ha sido confirmada!</p>
                                    <p className="text-secondary">Nos vemos en el evento. Pronto recibirás más información.</p>
                                </>
                            )}
                            <button type="submit" className="btn btn-primary px-4 mt-2">
                                Regresar al inicio
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>        
    )
}

export default Exito