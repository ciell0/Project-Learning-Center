import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const DB_CONFIG = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bi_learning_center',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+07:00'
};

let pool = null;

export async function initDatabase() {
  try {
    // 1. Connect without database to ensure DB exists
    const rootConn = await mysql.createConnection({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password
    });

    await rootConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await rootConn.end();

    // 2. Initialize connection pool
    pool = mysql.createPool(DB_CONFIG);

    // 3. Create tables if not exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        nim VARCHAR(50) DEFAULT NULL,
        university VARCHAR(255) DEFAULT NULL,
        faculty VARCHAR(255) DEFAULT NULL,
        major VARCHAR(255) DEFAULT NULL,
        semester VARCHAR(20) DEFAULT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS malabar_programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        requirements TEXT DEFAULT NULL,
        registration_start DATE DEFAULT NULL,
        registration_end DATE DEFAULT NULL,
        internship_start DATE DEFAULT NULL,
        internship_end DATE DEFAULT NULL,
        quota INT DEFAULT 14,
        status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS internship_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        registration_code VARCHAR(50) NOT NULL UNIQUE,
        program_type ENUM('regular', 'malabar') NOT NULL,
        division ENUM('uikspur', 'uippur', 'umi', 'humas', 'fppu', 'fdsek', 'malabar') DEFAULT NULL,
        status ENUM('waiting', 'review', 'accepted', 'rejected') NOT NULL DEFAULT 'waiting',
        recommendation_number VARCHAR(100) DEFAULT NULL,
        start_date DATE DEFAULT NULL,
        end_date DATE DEFAULT NULL,
        period VARCHAR(100) DEFAULT NULL,
        skills TEXT DEFAULT NULL,
        tools TEXT DEFAULT NULL,
        documents TEXT DEFAULT NULL,
        admin_notes TEXT DEFAULT NULL,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_internship_apps_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Seed initial essential data if empty
    await seedInitialData(pool);

    console.log(`[DB] MySQL database "${DB_CONFIG.database}" initialized successfully.`);
    return pool;
  } catch (error) {
    console.error('[DB Error] Failed to initialize MySQL database:', error.message);
    throw error;
  }
}

async function seedInitialData(db) {
  // Check Admin User
  const [adminRows] = await db.query('SELECT id FROM users WHERE email = ?', ['admin@bi-malang.go.id']);
  let adminId = adminRows[0]?.id;
  if (!adminId) {
    const adminPassHash = await bcrypt.hash('admin123', 10);
    const [res] = await db.query(
      `INSERT INTO users (name, email, password_hash, role, phone)
       VALUES (?, ?, ?, 'admin', '08123456789')`,
      ['Administrator BI Malang', 'admin@bi-malang.go.id', adminPassHash]
    );
    adminId = res.insertId;
  }

  // Check Default User (Ciello)
  const [userRows] = await db.query('SELECT id FROM users WHERE email = ?', ['ciellobelleza@student.ub.ac.id']);
  let cielloId = userRows[0]?.id;
  if (!cielloId) {
    const userPassHash = await bcrypt.hash('user123', 10);
    const [res] = await db.query(
      `INSERT INTO users (name, email, password_hash, role, nim, university, faculty, major, semester, phone)
       VALUES (?, ?, ?, 'user', '195020300111042', 'Universitas Brawijaya', 'Fakultas Ilmu Komputer', 'Teknologi Informasi', '7', '081234567890')`,
      ['Ciello Belleza Zukhrufi Susilantoro', 'ciellobelleza@student.ub.ac.id', userPassHash]
    );
    cielloId = res.insertId;
  }

  // Check additional sample users
  const [budiRows] = await db.query('SELECT id FROM users WHERE email = ?', ['budi.santoso@student.um.ac.id']);
  let budiId = budiRows[0]?.id;
  if (!budiId) {
    const budiPassHash = await bcrypt.hash('user123', 10);
    const [res] = await db.query(
      `INSERT INTO users (name, email, password_hash, role, nim, university, faculty, major, semester, phone)
       VALUES (?, ?, ?, 'user', '205150400111008', 'Universitas Negeri Malang', 'Ekonomi', 'Akuntansi', '5', '082345678901')`,
      ['Budi Santoso', 'budi.santoso@student.um.ac.id', budiPassHash]
    );
    budiId = res.insertId;
  }

  // Check Malabar Program
  const [progRows] = await db.query('SELECT id FROM malabar_programs LIMIT 1');
  if (progRows.length === 0) {
    await db.query(
      `INSERT INTO malabar_programs (name, description, requirements, registration_start, registration_end, internship_start, internship_end, quota, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Program Magang Malabar 2026',
        'Program magang kompetitif berbasis divisi Bank Indonesia Kantor Perwakilan Malang dengan proses seleksi komprehensif untuk mahasiswa berprestasi.',
        'Mahasiswa aktif S1/S2 terakreditasi A, IPK minimal 3.25, usia maksimal 25 tahun, bersedia ditempatkan di divisi pilihan.',
        '2026-06-10',
        '2026-06-30',
        '2026-08-01',
        '2026-10-31',
        14,
        'active'
      ]
    );
  }

  // Seed sample initial applications if empty
  const [appRows] = await db.query('SELECT id FROM internship_applications LIMIT 1');
  if (appRows.length === 0) {
    // 1. Regular application (division = NULL, waiting)
    await db.query(
      `INSERT INTO internship_applications 
       (user_id, registration_code, program_type, division, status, recommendation_number, start_date, end_date, period, skills, tools, registered_at)
       VALUES (?, ?, 'regular', NULL, 'waiting', '101/UN10/AK/2026', '2026-07-01', '2026-09-30', '1 Jul – 30 Sep 2026', ?, ?, '2026-09-20 09:10:00')`,
      [
        budiId,
        'MAG-REG-001',
        JSON.stringify(['Excel', 'Analisis Data', 'Teamwork']),
        JSON.stringify(['Excel', 'SPSS'])
      ]
    );

    // 2. Malabar application (division = 'humas', waiting)
    await db.query(
      `INSERT INTO internship_applications 
       (user_id, registration_code, program_type, division, status, recommendation_number, start_date, end_date, period, skills, tools, registered_at)
       VALUES (?, ?, 'malabar', 'humas', 'waiting', '102/UN10/AK/2026', '2026-08-01', '2026-10-31', '1 Agu – 31 Okt 2026', ?, ?, '2026-09-20 09:15:00')`,
      [
        cielloId,
        'MAG-MLB-002',
        JSON.stringify(['Public Speaking', 'Writing', 'Communication']),
        JSON.stringify(['Canva', 'Figma', 'Photoshop'])
      ]
    );
  }
}

export function getDb() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initDatabase() first.');
  }
  return pool;
}
