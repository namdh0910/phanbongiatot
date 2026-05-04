const https = require('https');

function makeRequest(method, hostname, path, data, token) {
  return new Promise((resolve, reject) => {
    const body = data ? JSON.stringify(data) : null;
    const options = {
      hostname,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body ? Buffer.byteLength(body) : 0,
        ...(token ? { 'Authorization': 'Bearer ' + token } : {})
      }
    };

    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, raw: raw.slice(0, 200) }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function discoverApiUrl() {
  // Try common backend URLs
  const candidates = [
    'phanbongiatot-backend.onrender.com',
    'phanbongiatot-api.onrender.com',
    'phan-bon-backend.onrender.com',
    'namdh0910-backend.onrender.com',
    'pbg-backend.onrender.com',
  ];
  
  for (const host of candidates) {
    try {
      const r = await makeRequest('GET', host, '/api/products?limit=1', null, null);
      if (r.status !== 404 && r.status !== 502) {
        console.log('FOUND API at:', host, '| Status:', r.status);
        return host;
      }
    } catch(e) {}
  }
  return null;
}

async function runTests() {
  console.log('============================================================');
  console.log('PRO TESTER - PHANBONGIATOT SYSTEM AUDIT');
  console.log('============================================================\n');

  // Step 1: Find the API
  console.log('[STEP 1] Discovering backend API URL...');
  const apiHost = await discoverApiUrl();
  if (!apiHost) {
    console.log('Could not auto-discover API. Trying from env...');
    // Try to get from .env
    require('dotenv').config({ path: '.env' });
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log('NEXT_PUBLIC_API_URL:', apiUrl || 'NOT SET in frontend .env');
    return;
  }
  console.log('API Host:', apiHost, '\n');

  // Step 2: Public products endpoint (should be empty)
  console.log('[TEST 1] Homepage products - should be EMPTY after cleanup...');
  const t1 = await makeRequest('GET', apiHost, '/api/products', null, null);
  const sp = t1.data && t1.data.data ? t1.data.data : [];
  console.log('  HTTP Status:', t1.status);
  console.log('  So san pham hien thi:', sp.length);
  console.log('  Ket qua:', sp.length === 0 ? 'PASS - DB sach' : 'FAIL - Con ' + sp.length + ' SP');
  sp.forEach(p => console.log('    -', p.name));

  // Step 3: Admin login
  console.log('\n[TEST 2] Admin dang nhap...');
  const t2 = await makeRequest('POST', apiHost, '/api/auth/login', 
    { username: 'admin', password: 'PhanBon@2026' }, null);
  console.log('  HTTP Status:', t2.status);
  console.log('  Role:', t2.data && t2.data.role);
  const token = t2.data && t2.data.token;
  console.log('  Ket qua:', t2.status === 200 ? 'PASS' : 'FAIL - ' + (t2.data && t2.data.message));

  if (!token) {
    console.log('\n  Khong co token, dung test tai day.');
    return;
  }

  // Step 4: Admin get all products
  console.log('\n[TEST 3] Admin xem danh sach san pham...');
  const t3 = await makeRequest('GET', apiHost, '/api/products/admin/all', null, token);
  console.log('  HTTP Status:', t3.status);
  console.log('  So SP trong DB:', Array.isArray(t3.data) ? t3.data.length : 'Loi: ' + JSON.stringify(t3.data).slice(0,100));
  console.log('  Ket qua:', t3.status === 200 ? 'PASS' : 'FAIL - ' + t3.status);

  // Step 5: Create product as admin
  console.log('\n[TEST 4] Admin tao san pham moi (isFeatured=true)...');
  const t4 = await makeRequest('POST', apiHost, '/api/products', {
    name: 'Acti Rooti - Sieu Kich Re 500ml',
    price: 120000,
    originalPrice: 150000,
    category: 'Kich re',
    category_id: 'kich-re',
    description: 'San pham kich re the he moi, phuc hoi bo re cuc nhanh',
    stock: 100,
    isFeatured: true,
    is_featured: true,
    slug: 'acti-rooti-sieu-kich-re-500ml-' + Date.now()
  }, token);
  console.log('  HTTP Status:', t4.status);
  if (t4.data && t4.data._id) {
    console.log('  San pham ID:', t4.data._id);
    console.log('  approval_status:', t4.data.approval_status);
    console.log('  status:', t4.data.status);
    console.log('  is_featured:', t4.data.is_featured, '| isFeatured:', t4.data.isFeatured);
    console.log('  Ket qua: PASS - San pham da duoc tao');
  } else {
    console.log('  Loi:', JSON.stringify(t4.data || t4.raw).slice(0, 200));
    console.log('  Ket qua: FAIL');
  }

  // Step 6: Check homepage after adding product
  console.log('\n[TEST 5] Trang chu sau khi them SP...');
  const t5 = await makeRequest('GET', apiHost, '/api/products', null, null);
  const sp2 = t5.data && t5.data.data ? t5.data.data : [];
  console.log('  So SP hien trang chu:', sp2.length);
  const hasNew = sp2.some(p => p.name && p.name.includes('Acti Rooti'));
  console.log('  SP moi co hien khong:', hasNew ? 'CO - PASS' : 'KHONG - FAIL (check is_featured/approval_status)');
  if (!hasNew && sp2.length === 0) {
    // Debug: Check why product not showing
    const debugAll = await makeRequest('GET', apiHost, '/api/products/admin/all', null, token);
    const allSP = Array.isArray(debugAll.data) ? debugAll.data : [];
    if (allSP.length > 0) {
      console.log('  DEBUG - SP trong admin/all:');
      allSP.slice(0, 3).forEach(p => {
        console.log('    -', p.name, '| status:', p.status, '| approval_status:', p.approval_status, '| stock:', p.stock, '| is_featured:', p.is_featured);
      });
    }
  }

  // Step 7: Seller portal check
  console.log('\n[TEST 6] Kiem tra Seller Portal login...');
  const t6 = await makeRequest('POST', apiHost, '/api/auth/login',
    { username: 'admin', password: 'PhanBon@2026' }, null);
  const role = t6.data && t6.data.role;
  const allowed = ['vendor', 'admin', 'super_admin'].includes(role);
  console.log('  Role tra ve:', role);
  console.log('  Duoc phep vao Seller Portal:', allowed ? 'PASS' : 'FAIL');

  console.log('\n============================================================');
  console.log('TONG KET:');
  console.log('  DB sach:', sp.length === 0 ? 'PASS' : 'FAIL');
  console.log('  Admin login:', t2.status === 200 ? 'PASS' : 'FAIL');
  console.log('  Admin xem SP:', t3.status === 200 ? 'PASS' : 'FAIL');
  console.log('  Admin tao SP:', t4.status === 201 ? 'PASS' : 'FAIL');
  console.log('  SP hien trang chu:', hasNew ? 'PASS' : 'FAIL - check is_featured/stock');
  console.log('  Seller login:', allowed ? 'PASS' : 'FAIL');
  console.log('============================================================\n');
}

runTests().catch(err => console.error('ERROR:', err.message));
