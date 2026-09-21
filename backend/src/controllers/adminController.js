import { getDb } from '../config/database.js';
import { VALID_DIVISIONS } from '../constants/divisions.js';

export async function getAllApplications(req, res) {
  try {
    const {
      sort = 'registered_at',
      order = 'desc',
      status,
      program_type,
      division,
      search
    } = req.query;

    const db = getDb();

    // Whitelist sort fields & order to prevent SQL injection
    const allowedSortFields = {
      registered_at: 'a.registered_at',
      id: 'a.id',
      name: 'u.name',
      status: 'a.status'
    };

    const sortColumn = allowedSortFields[sort] || 'a.registered_at';
    const sortDirection = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    let query = `
      SELECT a.id, a.user_id, a.registration_code, a.program_type, a.division, a.status,
             a.recommendation_number, a.start_date, a.end_date, a.period,
             a.skills, a.tools, a.documents, a.admin_notes,
             a.registered_at, a.updated_at,
             u.name as applicant_name, u.email as applicant_email, u.nim, u.university,
             u.faculty, u.major, u.semester, u.phone
      FROM internship_applications a
      JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    if (program_type) {
      query += ' AND a.program_type = ?';
      params.push(program_type);
    }
    if (division) {
      query += ' AND a.division = ?';
      params.push(division);
    }
    if (search) {
      query += ' AND (u.name LIKE ? OR u.nim LIKE ? OR u.university LIKE ? OR a.registration_code LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ` ORDER BY ${sortColumn} ${sortDirection}`;

    const [rows] = await db.query(query, params);

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
    console.error('Get all applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memuat data pelamar.'
    });
  }
}

export async function getApplicationDetail(req, res) {
  try {
    const id = req.params.id;
    const db = getDb();

    const [rows] = await db.query(
      `SELECT a.*, u.name as applicant_name, u.email as applicant_email, u.nim, u.university,
              u.faculty, u.major, u.semester, u.phone
       FROM internship_applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pelamar tidak ditemukan.'
      });
    }

    const app = rows[0];
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

export async function updateApplicationStatus(req, res) {
  try {
    const id = req.params.id;
    const { status, admin_notes } = req.body;

    const validStatuses = ['waiting', 'review', 'accepted', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status tidak valid. Pilih salah satu: ${validStatuses.join(', ')}.`
      });
    }

    const db = getDb();
    const [existing] = await db.query('SELECT id FROM internship_applications WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data pelamar tidak ditemukan.'
      });
    }

    let query = 'UPDATE internship_applications SET status = ?, updated_at = NOW()';
    const params = [status];

    if (admin_notes !== undefined) {
      query += ', admin_notes = ?';
      params.push(admin_notes);
    }
    query += ' WHERE id = ?';
    params.push(id);

    await db.query(query, params);

    const [updated] = await db.query(
      `SELECT a.*, u.name as applicant_name, u.email as applicant_email
       FROM internship_applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [id]
    );

    return res.json({
      success: true,
      message: 'Status pelamar berhasil diperbarui!',
      data: updated[0]
    });
  } catch (error) {
    console.error('Update status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memperbarui status.'
    });
  }
}

export async function assignDivision(req, res) {
  try {
    const id = req.params.id;
    const { division } = req.body;

    if (!division) {
      return res.status(400).json({
        success: false,
        message: 'Divisi wajib dipilih.'
      });
    }

    const normalizedDiv = division.toLowerCase().trim();
    if (!VALID_DIVISIONS.includes(normalizedDiv)) {
      return res.status(400).json({
        success: false,
        message: `Divisi "${division}" tidak valid. Pilihan divisi resmi: ${VALID_DIVISIONS.join(', ')}.`
      });
    }

    const db = getDb();
    const [existing] = await db.query(
      'SELECT id, program_type, division FROM internship_applications WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data pelamar tidak ditemukan.'
      });
    }

    const app = existing[0];
    if (app.program_type !== 'regular') {
      return res.status(400).json({
        success: false,
        message: 'Penempatan divisi oleh admin hanya diperuntukkan bagi peserta Magang Reguler.'
      });
    }

    await db.query(
      'UPDATE internship_applications SET division = ?, updated_at = NOW() WHERE id = ?',
      [normalizedDiv, id]
    );

    const [updatedRows] = await db.query(
      `SELECT a.*, u.name as applicant_name, u.email as applicant_email
       FROM internship_applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [id]
    );

    return res.json({
      success: true,
      message: `Berhasil menempatkan pelamar ke divisi "${normalizedDiv}"!`,
      data: updatedRows[0]
    });
  } catch (error) {
    console.error('Assign division error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menempatkan divisi.'
    });
  }
}

// ── Admin Program Malabar CRUD ──
export async function getAdminMalabarPrograms(req, res) {
  try {
    const db = getDb();
    const [rows] = await db.query('SELECT * FROM malabar_programs ORDER BY id DESC');
    return res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Get admin malabar error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.'
    });
  }
}

export async function createMalabarProgram(req, res) {
  try {
    const {
      name,
      description,
      requirements,
      registration_start,
      registration_end,
      internship_start,
      internship_end,
      quota,
      status
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Nama Program Malabar wajib diisi.'
      });
    }

    const db = getDb();
    const [result] = await db.query(
      `INSERT INTO malabar_programs 
       (name, description, requirements, registration_start, registration_end, internship_start, internship_end, quota, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        name,
        description || null,
        requirements || null,
        registration_start || null,
        registration_end || null,
        internship_start || null,
        internship_end || null,
        quota || 14,
        status || 'active'
      ]
    );

    const [created] = await db.query('SELECT * FROM malabar_programs WHERE id = ?', [result.insertId]);

    return res.status(201).json({
      success: true,
      message: 'Program Malabar berhasil ditambahkan!',
      data: created[0]
    });
  } catch (error) {
    console.error('Create malabar error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat membuat Program Malabar.'
    });
  }
}

export async function updateMalabarProgram(req, res) {
  try {
    const id = req.params.id;
    const {
      name,
      description,
      requirements,
      registration_start,
      registration_end,
      internship_start,
      internship_end,
      quota,
      status
    } = req.body;

    const db = getDb();
    const [existing] = await db.query('SELECT id FROM malabar_programs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Program Malabar tidak ditemukan.'
      });
    }

    await db.query(
      `UPDATE malabar_programs SET
       name = COALESCE(?, name),
       description = COALESCE(?, description),
       requirements = COALESCE(?, requirements),
       registration_start = COALESCE(?, registration_start),
       registration_end = COALESCE(?, registration_end),
       internship_start = COALESCE(?, internship_start),
       internship_end = COALESCE(?, internship_end),
       quota = COALESCE(?, quota),
       status = COALESCE(?, status),
       updated_at = NOW()
       WHERE id = ?`,
      [
        name,
        description,
        requirements,
        registration_start,
        registration_end,
        internship_start,
        internship_end,
        quota,
        status,
        id
      ]
    );

    const [updated] = await db.query('SELECT * FROM malabar_programs WHERE id = ?', [id]);

    return res.json({
      success: true,
      message: 'Program Malabar berhasil diperbarui!',
      data: updated[0]
    });
  } catch (error) {
    console.error('Update malabar error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memperbarui Program Malabar.'
    });
  }
}

export async function deleteMalabarProgram(req, res) {
  try {
    const id = req.params.id;
    const db = getDb();
    const [existing] = await db.query('SELECT id FROM malabar_programs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Program Malabar tidak ditemukan.'
      });
    }

    await db.query('DELETE FROM malabar_programs WHERE id = ?', [id]);

    return res.json({
      success: true,
      message: 'Program Malabar berhasil dihapus!'
    });
  } catch (error) {
    console.error('Delete malabar error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menghapus Program Malabar.'
    });
  }
}
