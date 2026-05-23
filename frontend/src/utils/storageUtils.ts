// Función para obtener la IP del cliente
export const obtenerIP = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error al obtener IP:', error);
        return 'IP_DESCONOCIDA';
    }
};

// Función para guardar datos en localStorage con IP
export const guardarEnLocalStorage = async (clave: string, datos: any): Promise<void> => {
    const ip = await obtenerIP();
    const timestamp = new Date().toISOString();
    
    const datosConIP = {
        ip,
        timestamp,
        datos
    };
    
    localStorage.setItem(clave, JSON.stringify(datosConIP));
    console.log(`Datos guardados en localStorage con IP: ${ip}`);
};

// Función para recuperar datos de localStorage
export const obtenerDelLocalStorage = (clave: string): any | null => {
    const dato = localStorage.getItem(clave);
    if (!dato) return null;
    
    try {
        return JSON.parse(dato);
    } catch (error) {
        console.error('Error al parsear localStorage:', error);
        return null;
    }
};

// Función para guardar múltiples datos con IP
export const guardarMultiplesConIP = async (datosMap: Record<string, any>): Promise<void> => {
    const ip = await obtenerIP();
    const timestamp = new Date().toISOString();
    
    Object.entries(datosMap).forEach(([clave, datos]) => {
        const datosConIP = {
            ip,
            timestamp,
            datos
        };
        localStorage.setItem(clave, JSON.stringify(datosConIP));
    });
    
    console.log(`Múltiples datos guardados en localStorage con IP: ${ip}`);
};
