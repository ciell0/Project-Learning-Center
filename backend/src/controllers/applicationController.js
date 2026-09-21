import { getDb } from '../config/database.js';
import { VALID_DIVISIONS } from '../constants/divisions.js';

function generateRegistrationCode(programType) {
  const prefix = programType === 'malabar' ? 'MAG-MLB' : 'MAG-REG';
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${randomPart}`;
}

export async function createApplication(req, res) {
  try {
    const {
      program_type,
      division,
      recommendation_number,
      start_date,
      end_date,
      period,
      skills,
      tools,
      documents
    } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Silakan masuk terlebih dahulu untuk mendaftar magang.'
      });
    }

    // 1. Validasi jenis program
    if (!program_type || !['regular', 'malabar'].includes(program_type)) {
      return res.status(400).json({
        success: false,
        message: 'Jenis program magang tidak valid. Pilih "regular" atau "malabar".'
      });
    }

    // 2. Validasi divisi berdasarkan aturan program
    let targetDivision = null;

    if (program_type === 'regular') {
      // Magang Reguler: Divisi TIDAK boleh ditentukan user, harus NULL di database
      targetDivision = null;
    } else if (program_type === 'malabar') {
      // Program Malabar: Divisi WAJIB dipilih dan harus salah satu dari 7 divisi resmi
      if (!division) {
        return res.status(400).json({
          success: false,
          message: 'Divisi wajib dipilih untuk Program Magang Malabar.'
        });
      }

      const normalizedDiv = division.toLowerCase().trim();
      if (!VALID_DIVISIONS.includes(normalizedDiv)) {
        return res.status(400).json({
          success: false,
          message: `Divisi "${division}" tidak valid. Pilihan divisi resmi: ${VALID_DIVISIONS.join(', ')}.`
        });
      }

      targetDivision = normalizedDiv;
    }

    const registrationCode = generateRegistrationCode(program_type);
    const db = getDb();

    const [result] = await db.query(
      `INSERT INTO internship_applications 
       (user_id, registration_code, program_type, division, status, recommendation_number, start_date, end_date, period, skills, tools, documents, registered_at)
       VALUES (?, ?, ?, ?, 'waiting', ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        userId,
        registrationCode,
        program_type,
        targetDivision,
        recommendation_number || null,
        start_date || null,
        end_date || null,
        period || (start_date && end_date ? `${start_date} s/d ${end_date}` : null),
        skills ? JSON.stringify(skills) : null,
        tools ? JSON.stringify(tools) : null,
        documents ? JSON.stringify(documents) : null
      ]
    );

    const [createdRows] = await db.query(
      `SELECT a.*, u.name as applicant_name, u.email as applicant_email, u.nim, u.university
       FROM internship_applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran magang berhasil diajukan!',
      data: createdRows[0]
    });
  } catch (error) {
    console.error('Create application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menyimpan pendaftaran magang.'
    });
  }
}

export async function getMyApplications(req, res) {
  try {
    const userId = req.user.id;
    const db = getDb();

    const [rows] = await db.query(
      `SELECT a.id, a.user_id, a.registration_code, a.program_type, a.division, a.status,
              a.recommendation_number, a.start_date, a.end_date, a.period,
              a.skills, a.tools, a.documents, a.admin_notes,
              a.registered_at, a.updated_at,
              u.name as applicant_name, u.email as applicant_email, u.nim, u.university
       FROM internship_applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.user_id = ?
       ORDER BY a.registered_at DESC`,
      [userId]
    );

    const formatted = rows.map((r) => ({
      ...r,
      skills: r.skills ? (typeof r.skills === 'string' ? JSON.parse(r.skills) : r.skills) : [],
      tools: r.tools ? (typeof r.tools === 'string' ? JSON.parse(r.tools) : r.tools) : [],
      documents: r.documents ? (typeof r.documents === 'string' ? JSON.parse(r.documents) : r.documents) : {}
    }));

    return res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memuat riwayat pendaftaran.'
    });
  }
}

export async function getApplicationById(req, res) {
  try {
    const id = req.params.id;
    const db = getDb();

    const [rows] = await db.query(
      `SELECT a.*, u.name as applicant_name, u.email as applicant_email, u.nim, u.university, u.faculty, u.major, u.semester, u.phone
       FROM internship_applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pendaftaran tidak ditemukan.'
      });
    }

    const app = rows[0];
    if (req.user.role !== 'admin' && app.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Akses ditolak: Anda tidak memiliki izin untuk melihat pendaftaran ini.'
      });
    }

    return res.json({
      success: true,
      data: {
        ...app,
        skills: app.skills ? (typeof app.skills === 'string' ? JSON.parse(app.skills) : app.skills) : [],
        tools: app.tools ? (typeof app.tools === 'string' ? JSON.parse(app.tools) : app.tools) : [],
        documents: app.documents ? (typeof app.documents === 'string' ? JSON.parse(app.documents) : app.documents) : {}
      }
    });
  } catch (error) {
    console.error('Get application detail error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.'
    });
  }
}
