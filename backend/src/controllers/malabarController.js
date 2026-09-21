import { getDb } from '../config/database.js';

export async function getPublicMalabarPrograms(req, res) {
  try {
    const db = getDb();
    const [rows] = await db.query(
      `SELECT id, name, description, requirements, registration_start, registration_end,
              internship_start, internship_end, quota, status, created_at, updated_at
       FROM malabar_programs
       WHERE status = 'active'
       ORDER BY id DESC`
    );

    return res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Get public malabar programs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memuat Program Malabar.'
    });
  }
}
