import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
  ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: true } : undefined
};

// Log de configuración (sin mostrar password)
console.log('🔍 Configuración MySQL:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  ssl: dbConfig.ssl ? 'enabled' : 'disabled'
});

/**
 * Obtiene los datos para el dashboard
 * @returns {Promise<Object>} Datos del dashboard
 */
export const getDashboardData = async () => {
  let connection;
  try {
    // Establecer conexión a la base de datos
    console.log('🔌 Intentando conectar a MySQL...');
    connection = await createConnection(dbConfig);
    console.log('✅ Conexión a MySQL establecida exitosamente');

    // Consultas en paralelo para obtener los datos
    const [
      [totalClientes],
      [ventasHoy],
      [ticketsPendientes],
      [ingresosMensuales],
      [ultimasTransacciones]
    ] = await Promise.all([
      // Total de clientes
      connection.execute('SELECT COUNT(*) as total FROM clientes'),
      
      // Ventas de hoy
      connection.execute(
        `SELECT IFNULL(SUM(monto), 0) as total 
         FROM ventas 
         WHERE DATE(fecha_venta) = CURDATE()`
      ),
      
      // Tickets pendientes
      connection.execute(
        `SELECT COUNT(*) as total 
         FROM tickets 
         WHERE estado = 'pendiente'`
      ),
      
      // Ingresos mensuales
      connection.execute(
        `SELECT IFNULL(SUM(monto), 0) as total 
         FROM ventas 
         WHERE MONTH(fecha_venta) = MONTH(CURRENT_DATE()) 
         AND YEAR(fecha_venta) = YEAR(CURRENT_DATE())`
      ),
      
      // Últimas transacciones
      connection.execute(
        `SELECT v.id, c.nombre as cliente, v.monto, v.fecha_venta as fecha
         FROM ventas v
         JOIN clientes c ON v.cliente_id = c.id
         ORDER BY v.fecha_venta DESC
         LIMIT 5`
      )
    ]);

    return {
      totalClientes: totalClientes?.total || 0,
      ventasHoy: parseFloat(ventasHoy?.total) || 0,
      ticketsPendientes: ticketsPendientes?.total || 0,
      ingresosMensuales: parseFloat(ingresosMensuales?.total) || 0,
      ultimasTransacciones: ultimasTransacciones || []
    };
  } catch (error) {
    console.error('Error al obtener datos del dashboard:', error);
    throw new Error('Error al obtener los datos del dashboard');
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      try {
        await connection.end();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
};

// Controlador para la ruta GET /api/dashboard
export const getDashboard = async (req, res) => {
  try {
    const dashboardData = await getDashboardData();
    res.json(dashboardData);
  } catch (error) {
    console.error('Error en el controlador del dashboard:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controlador para probar solo la conexión a MySQL
export const testMySQLConnection = async (req, res) => {
  let connection;
  try {
    console.log('🧪 Probando conexión a MySQL...');
    
    // Mostrar configuración
    console.log('🔍 Configuración MySQL:', {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT || 3306,
      ssl: process.env.MYSQL_SSL === 'true' ? 'enabled' : 'disabled'
    });
    
    // Intentar conexión
    connection = await createConnection(dbConfig);
    console.log('✅ Conexión exitosa a MySQL');
    
    // Probar una consulta simple
    const [result] = await connection.execute('SELECT 1 as test');
    console.log('✅ Consulta de prueba ejecutada:', result);
    
    res.json({ 
      success: true, 
      message: 'Conexión a MySQL exitosa',
      config: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT || 3306
      },
      testQuery: result
    });
    
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al conectar a MySQL',
      error: error.message,
      config: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT || 3306
      }
    });
  } finally {
    if (connection) {
      try {
        await connection.end();
        console.log('🔌 Conexión cerrada');
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
};
