const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
            <nav className="navbar" style={{ backgroundColor: '#1a3c5e' }}>
                <div className="container">
                    <span className="navbar-brand text-white fw-bold fs-5">AgroVerde S.A.</span>
                    <span className="text-white opacity-75">Feria de Promociones 2026</span>
                </div>
            </nav>

            <div className="container py-5">
                {children}
            </div>

            <footer style={{ backgroundColor: '#1a3c5e' }} className="py-3 mt-auto">
                <div className="container text-center text-white opacity-75" style={{ fontSize: '13px' }}>
                    Contactanos: 2223-2425
                </div>
            </footer>
        </div>
    )
}

export default Layout