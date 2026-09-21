import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'bi_malang_learning_center_secret_jwt_2026';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function register(req, res) {
  try {
    const { name, email, password, nim, university, faculty, major, semester, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nama lengkap, email, dan password wajib diisi.'
      });
    }

    const db = getDb();
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar. Silakan gunakan email lain atau login.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users (name, email, password_hash, role, nim, university, faculty, major, semester, phone)
       VALUES (?, ?, ?, 'user', ?, ?, ?, ?, ?, ?)`,
      [name, email, passwordHash, nim || null, university || null, faculty || null, major || null, semester || null, phone || null]
    );

    const newUser = {
      id: result.insertId,
      name,
      email,
      role: 'user',
      nim: nim || null,
      university: university || null,
      faculty: faculty || null,
      major: major || null,
      semester: semester || null,
      phone: phone || null
    };

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil!',
      data: {
        user: newUser,
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat registrasi.'
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan kata sandi wajib diisi.'
      });
    }

    const db = getDb();
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email atau kata sandi salah.'
      });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email atau kata sandi salah.'
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Login berhasil!',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          nim: user.nim,
          university: user.university,
          faculty: user.faculty,
          major: user.major,
          semester: user.semester,
          phone: user.phone
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat login.'
    });
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan kata sandi admin wajib diisi.'
      });
    }

    const db = getDb();
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Kredensial admin tidak valid.'
      });
    }

    const user = users[0];
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Akses ditolak: Akun Anda tidak memiliki hak akses administrator.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Kredensial admin tidak valid.'
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Login admin berhasil!',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat login admin.'
    });
  }
}

export async function getMe(req, res) {
  try {
    const db = getDb();
    const [users] = await db.query(
      'SELECT id, name, email, role, nim, university, faculty, major, semester, phone, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.'
      });
    }

    return res.json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.'
    });
  }
}
