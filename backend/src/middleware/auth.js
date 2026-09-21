import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'bi_malang_learning_center_secret_jwt_2026';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak: Token autentikasi tidak ditemukan.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak: Token tidak valid atau telah kedaluwarsa.'
    });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak: Autentikasi diperlukan.'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak: Endpoint ini hanya dapat diakses oleh Administrator.'
    });
  }

  next();
}
