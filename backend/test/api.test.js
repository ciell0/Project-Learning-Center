import http from 'http';
import assert from 'assert';
import { initDatabase, getDb } from '../src/config/database.js';

// We will start server and test using native fetch (supported in Node 20)
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🚀 Starting Backend & MySQL Integration Tests...');

  // 1. Health Check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthJson = await healthRes.json();
  assert.strictEqual(healthRes.status, 200, 'Health check should return 200');
  assert.strictEqual(healthJson.database, 'MySQL', 'Health check database should be MySQL');
  console.log('✅ TEST 0: Health check passed');

  // 2. Admin Login
  const adminLoginRes = await fetch(`${BASE_URL}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@bi-malang.go.id',
      password: 'admin123'
    })
  });
  const adminLoginJson = await adminLoginRes.json();
  assert.strictEqual(adminLoginRes.status, 200, 'Admin login should succeed');
  assert.ok(adminLoginJson.data.token, 'Admin token should be returned');
  const adminToken = adminLoginJson.data.token;
  console.log('✅ TEST 0.1: Admin login passed');

  // 3. User Register & Login
  const testUserEmail = `test.user.${Date.now()}@student.ub.ac.id`;
  const registerRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Peserta Uji Integrasi',
      email: testUserEmail,
      password: 'password123',
      nim: '215150201111001',
      university: 'Universitas Brawijaya',
      faculty: 'FILKOM',
      major: 'Teknik Informatika',
      semester: '6',
      phone: '08123456789'
    })
  });
  const registerJson = await registerRes.json();
  assert.strictEqual(registerRes.status, 201, 'User register should return 201');
  const userToken = registerJson.data.token;
  console.log('✅ TEST 0.2: User register & login passed');

  // TEST 1 — REGULER
  // User: Pilih Magang Reguler, division = NULL
  const regAppRes = await fetch(`${BASE_URL}/internship-applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      program_type: 'regular',
      division: null,
      recommendation_number: 'TEST/REG/2026',
      start_date: '2026-07-01',
      end_date: '2026-09-30'
    })
  });
  const regAppJson = await regAppRes.json();
  assert.strictEqual(regAppRes.status, 201, 'Regular application should return 201');
  assert.strictEqual(regAppJson.data.program_type, 'regular');
  assert.strictEqual(regAppJson.data.division, null, 'Regular application division MUST be NULL');
  const regAppId = regAppJson.data.id;
  console.log(`✅ TEST 1: Regular internship submitted. ID: ${regAppId}, division: NULL`);

  // Verify Admin sees division: NULL
  const adminGetOne = await fetch(`${BASE_URL}/admin/internship-applications/${regAppId}`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const adminGetOneJson = await adminGetOne.json();
  assert.strictEqual(adminGetOneJson.data.program_type, 'regular');
  assert.strictEqual(adminGetOneJson.data.division, null, 'Admin detail division should be NULL');
  console.log('✅ TEST 1.1: Admin confirms Regular division is NULL');

  // TEST 2 — TEMPATKAN REGULER
  // Admin: Aksi -> Tempatkan Divisi -> humas -> Simpan
  const assignRes = await fetch(`${BASE_URL}/admin/internship-applications/${regAppId}/division`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({ division: 'humas' })
  });
  const assignJson = await assignRes.json();
  assert.strictEqual(assignRes.status, 200, 'Assign division should succeed');
  assert.strictEqual(assignJson.data.division, 'humas', 'Division should be updated to humas in DB');
  console.log('✅ TEST 2: Admin successfully assigned regular applicant to division "humas"');

  // TEST 3 — MALABAR
  // User: Program = Program Magang Malabar, Division = uikspur
  const malabarAppRes = await fetch(`${BASE_URL}/internship-applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      program_type: 'malabar',
      division: 'uikspur',
      recommendation_number: 'TEST/MLB/2026',
      start_date: '2026-08-01',
      end_date: '2026-10-31'
    })
  });
  const malabarAppJson = await malabarAppRes.json();
  assert.strictEqual(malabarAppRes.status, 201, 'Malabar application should succeed');
  assert.strictEqual(malabarAppJson.data.program_type, 'malabar');
  assert.strictEqual(malabarAppJson.data.division, 'uikspur', 'Malabar application division must be uikspur');
  const malabarAppId = malabarAppJson.data.id;
  console.log(`✅ TEST 3: Malabar internship submitted. ID: ${malabarAppId}, division: uikspur`);

  // Validate that assigning division to Malabar applicant is rejected
  const assignMalabarRes = await fetch(`${BASE_URL}/admin/internship-applications/${malabarAppId}/division`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({ division: 'umi' })
  });
  assert.strictEqual(assignMalabarRes.status, 400, 'Assigning division to Malabar applicant must be rejected with 400');
  console.log('✅ TEST 3.1: Confirmed Tempatkan Divisi is rejected for Malabar applicants');

  // Validate that Malabar submission without division is rejected
  const invalidMalabarRes = await fetch(`${BASE_URL}/internship-applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      program_type: 'malabar',
      division: null
    })
  });
  assert.strictEqual(invalidMalabarRes.status, 400, 'Malabar submission without division must fail');
  console.log('✅ TEST 3.2: Confirmed Malabar application without division is rejected');

  // TEST 4 — SORTING
  // Admin opens Data Pelamar: sort=registered_at&order=desc and asc
  const sortDescRes = await fetch(`${BASE_URL}/admin/internship-applications?sort=registered_at&order=desc`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const sortDescJson = await sortDescRes.json();
  assert.strictEqual(sortDescRes.status, 200);
  assert.ok(sortDescJson.data.length >= 2, 'Should return multiple applications');
  const firstDate = new Date(sortDescJson.data[0].registered_at).getTime();
  const secondDate = new Date(sortDescJson.data[1].registered_at).getTime();
  assert.ok(firstDate >= secondDate, 'Descending sort should have newest first');

  const sortAscRes = await fetch(`${BASE_URL}/admin/internship-applications?sort=registered_at&order=asc`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const sortAscJson = await sortAscRes.json();
  assert.strictEqual(sortAscRes.status, 200);
  const firstAscDate = new Date(sortAscJson.data[0].registered_at).getTime();
  const secondAscDate = new Date(sortAscJson.data[1].registered_at).getTime();
  assert.ok(firstAscDate <= secondAscDate, 'Ascending sort should have oldest first');
  console.log('✅ TEST 4: Date sorting verified for both desc (terbaru) and asc (terlama)');

  // TEST 5 — USER MELIHAT HASIL PENEMPATAN
  // User checks my applications via GET /api/internship-applications/my
  const userMyAppsRes = await fetch(`${BASE_URL}/internship-applications/my`, {
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  const userMyAppsJson = await userMyAppsRes.json();
  assert.strictEqual(userMyAppsRes.status, 200);
  const myRegularApp = userMyAppsJson.data.find(a => a.id === regAppId);
  assert.ok(myRegularApp, 'My regular app should be in my applications list');
  assert.strictEqual(myRegularApp.division, 'humas', 'User must see division: humas updated by admin!');
  console.log('✅ TEST 5: User successfully verified assigned division "humas" from backend!');

  // TEST 6 — MALABAR PROGRAM CRUD & USER VISIBILITY
  // Admin creates new Malabar program
  const newProgRes = await fetch(`${BASE_URL}/admin/internships/malabar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({
      name: 'Program Magang Malabar Batch 4 2026',
      description: 'Program akselerasi kompetensi digital BI Malang.',
      quota: 15,
      status: 'active'
    })
  });
  const newProgJson = await newProgRes.json();
  assert.strictEqual(newProgRes.status, 201);
  const newProgId = newProgJson.data.id;

  // Frontend User fetches public Malabar programs
  const publicMalabarRes = await fetch(`${BASE_URL}/internships/malabar`);
  const publicMalabarJson = await publicMalabarRes.json();
  assert.strictEqual(publicMalabarRes.status, 200);
  const foundProg = publicMalabarJson.data.find(p => p.id === newProgId);
  assert.ok(foundProg, 'Program created by admin must be visible to frontend user!');
  console.log('✅ TEST 6: Malabar Program Admin CRUD ↔ Frontend User verified!');

  console.log('\n🎉 ALL BACKEND & DATABASE INTEGRATION TESTS PASSED PERFECTLY!\n');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
