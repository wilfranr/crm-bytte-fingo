import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
import moment from 'moment-timezone';

dotenv.config();

// Configuración de la conexión a MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
  ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
  timezone: '-05:00' // Establece la zona horaria a UTC-5 (Bogotá)
};

// Log de configuración (sin mostrar password)
console.log('🔍 Configuración MySQL:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  ssl: dbConfig.ssl ? 'enabled' : 'disabled',
  timezone: dbConfig.timezone // Añade la zona horaria al log
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

    // Obtener la fecha actual en la zona horaria de Bogotá
    const todayBogota = moment().tz('America/Bogota').format('YYYY-MM-DD');

    // Consultas en paralelo para obtener los datos
    const [
      [totalTransacciones],
      [transaccionesExitosas],
      [totalClientes],
      [clientesExitosos],
      [detalleTransacciones]
    ] = await Promise.all([
      // Total de transacciones de hoy
      connection.execute(`
        SELECT COUNT(*) as total 
        FROM log_process_enroll 
        WHERE DATE(LP_CREATION_DATE) = ?
      `, [todayBogota]),

      // Transacciones exitosas de hoy
      connection.execute(`
        SELECT COUNT(*) as total 
        FROM log_process_enroll 
        WHERE DATE(LP_CREATION_DATE) = ?
        AND LP_STATUS_PROCESS = 1
      `, [todayBogota]),
      
      // Total de clientes únicos de hoy
      connection.execute(`
        SELECT COUNT(DISTINCT PER_ID) as total 
        FROM log_process_enroll 
        WHERE DATE(LP_CREATION_DATE) = ?
      `, [todayBogota]),
      
      // Clientes con al menos una transacción exitosa hoy
      connection.execute(`
        SELECT COUNT(DISTINCT PER_ID) as total 
        FROM log_process_enroll 
        WHERE DATE(LP_CREATION_DATE) = ?
        AND LP_STATUS_PROCESS = 1
      `, [todayBogota]),

      // Detalle de transacciones de hoy con documento del cliente
      connection.execute(`
        SELECT 
          lpe.lp_creation_date,
          lpe.per_id,
          lpe.lp_status_process,
          lpe.ec_id,
          ec.EC_NAME AS ec_name,
          p.PER_DOCUMENT_NUMBER AS per_document_number,
          p.PER_FIRST_NAME AS per_first_name,
          p.PER_LAST_NAME AS per_last_name
        FROM log_process_enroll lpe
        JOIN person p ON lpe.PER_ID = p.PER_ID
        JOIN enterprise_client ec ON lpe.EC_ID = ec.EC_ID
        WHERE DATE(lpe.LP_CREATION_DATE) = ?
        ORDER BY lpe.lp_creation_date DESC
      `, [todayBogota])
    ]);
    
    // Mostrar resultados en consola para depuración
    // Calcular transacciones negadas (total - exitosas)
    const totalTransaccionesCount = totalTransacciones[0]?.total || 0;
    const transaccionesExitosasCount = transaccionesExitosas[0]?.total || 0;
    const transaccionesNegadas = totalTransaccionesCount - transaccionesExitosasCount;
    const totalClientesCount = totalClientes[0]?.total || 0;
    const clientesExitososCount = clientesExitosos[0]?.total || 0;
    const clientesNegadosCount = totalClientesCount - clientesExitososCount;
    
    // Calcular porcentajes
    const porcentajeExitoTransacciones = totalTransaccionesCount > 0 
      ? (transaccionesExitosasCount / totalTransaccionesCount) * 100 
      : 0;
      
    const porcentajeExitoClientes = totalClientesCount > 0
      ? (clientesExitososCount / totalClientesCount) * 100
      : 0;
      
    // Calcular promedio de intentos por cliente
    const promedioIntentos = totalClientesCount > 0
      ? totalTransaccionesCount / totalClientesCount
      : 0;
    
    console.log('📊 Resultados de consultas:');
    console.log('1. Total transacciones hoy:', totalTransacciones[0]);
    console.log('2. Transacciones exitosas hoy:', transaccionesExitosas[0]);
    console.log('3. Transacciones negadas hoy:', transaccionesNegadas);
    console.log('4. Total clientes únicos hoy:', totalClientesCount);
    console.log('5. Clientes exitosos hoy:', clientesExitososCount);
    console.log('6. Clientes negados hoy (calculado):', clientesNegadosCount);
    console.log('7. % Éxito transacciones:', porcentajeExitoTransacciones.toFixed(2) + '%');
    console.log('8. % Éxito clientes:', porcentajeExitoClientes.toFixed(2) + '%');
    console.log('9. Promedio de intentos por cliente:', promedioIntentos.toFixed(2));
    
    // Mostrar detalle de transacciones de hoy
    console.log('🔍 Detalle de transacciones de hoy:');
    console.log('Total registros encontrados:', detalleTransacciones.length);
    if (detalleTransacciones.length > 0) {
      console.log('Primeros 5 registros:');
      detalleTransacciones.slice(0, 5).forEach((transaccion, index) => {
        console.log(`  ${index + 1}. Fecha: ${transaccion.lp_creation_date}, Cliente: ${transaccion.per_id}, Estado: ${transaccion.lp_status_process}`);
      });
      if (detalleTransacciones.length > 5) {
        console.log(`  ... y ${detalleTransacciones.length - 5} registros más`);
      }
    } else {
      console.log('  No se encontraron transacciones para hoy');
    }
    
    return {
      totalTransacciones: totalTransaccionesCount,
      transaccionesExitosas: transaccionesExitosasCount,
      transaccionesNegadas: transaccionesNegadas,
      totalClientes: totalClientesCount,
      clientesExitosos: clientesExitososCount,
      clientesNegados: clientesNegadosCount,
      porcentajeExitoTransacciones: parseFloat(porcentajeExitoTransacciones.toFixed(2)),
      porcentajeExitoClientes: parseFloat(porcentajeExitoClientes.toFixed(2)),
      promedioIntentos: parseFloat(promedioIntentos.toFixed(2)),
      transaccionesDetalle: detalleTransacciones // Agregar el detalle de transacciones
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

// Controlador para explorar la estructura de la base de datos
export const exploreDatabase = async (req, res) => {
  let connection;
  try {
    console.log('🔍 Explorando estructura de la base de datos...');
    
    connection = await createConnection(dbConfig);
    
    // Obtener todas las tablas
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Tablas encontradas:', tables);
    
    // Obtener información detallada de cada tabla
    const tableDetails = {};
    
    for (const tableRow of tables) {
      const tableName = Object.values(tableRow)[0];
      console.log(`🔍 Analizando tabla: ${tableName}`);
      
      // Obtener estructura de la tabla
      const [columns] = await connection.execute(`DESCRIBE ${tableName}`);
      tableDetails[tableName] = columns;
      
      // Obtener conteo de registros
      const [countResult] = await connection.execute(`SELECT COUNT(*) as total FROM ${tableName}`);
      tableDetails[tableName].recordCount = countResult.total;
      
      // Obtener muestra de datos (primeros 3 registros)
      const [sampleData] = await connection.execute(`SELECT * FROM ${tableName} LIMIT 3`);
      tableDetails[tableName].sampleData = sampleData;
    }
    
    res.json({
      success: true,
      message: 'Estructura de la base de datos explorada',
      database: process.env.MYSQL_DATABASE,
      tables: tableDetails
    });
    
  } catch (error) {
    console.error('❌ Error al explorar la base de datos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al explorar la base de datos',
      error: error.message
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
