// API Client for Frontend User
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('bi_user_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('bi_user_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('bi_user_token');
  localStorage.removeItem('bi_user_data');
}

export function getSavedUser() {
  const data = localStorage.getItem('bi_user_data');
  return data ? JSON.parse(data) : null;
}

export function saveUser(user: any) {
  localStorage.setItem('bi_user_data', JSON.stringify(user));
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json.message || `Request failed with status ${response.status}`);
  }

  return json;
}

// ── Auth APIs ──
export const authApi = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    nim?: string;
    university?: string;
    faculty?: string;
    major?: string;
    semester?: string;
    phone?: string;
  }) {
    const res = await request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.data?.token) {
      setAuthToken(res.data.token);
      saveUser(res.data.user);
    }
    return res.data;
  },

  async login(email: string, password: string) {
    const res = await request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.data?.token) {
      setAuthToken(res.data.token);
      saveUser(res.data.user);
    }
    return res.data;
  },

  async getMe() {
    return request<any>('/auth/me');
  }
};

// ── Application APIs ──
export const applicationApi = {
  async submitApplication(data: {
    program_type: 'regular' | 'malabar';
    division?: string | null;
    recommendation_number?: string;
    start_date?: string;
    end_date?: string;
    period?: string;
    skills?: string[];
    tools?: string[];
    documents?: Record<string, any>;
  }) {
    return request<any>('/internship-applications', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async getMyApplications() {
    return request<any>('/internship-applications/my');
  },

  async getApplicationById(id: string | number) {
    return request<any>(`/internship-applications/${id}`);
  }
};

// ── Malabar Public APIs ──
export const malabarApi = {
  async getPublicPrograms() {
    return request<any>('/internships/malabar');
  }
};
