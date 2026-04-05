/**
 * Seed script: Product catalogue
 * Usage: STRAPI_ADMIN_EMAIL=xxx STRAPI_ADMIN_PASSWORD=xxx node scripts/seed-products.js
 */

const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'admin@bmeters.com';
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || 'Admin1234!';

async function api(path, { method = 'GET', token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${STRAPI_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, data: json };
}

// ─── Product data ─────────────────────────────────────────────────────────────

const PRODUCTS = [
  // ── Water Metering ──────────────────────────────────────────────────────────
  {
    name: 'HYDRODIGIT-M1',
    slug: 'hydrodigit-m1',
    shortDescription: 'Digital multi-jet SMART meter with integrated LoRaWAN and wM-Bus transmission.',
    description: 'The HYDRODIGIT-M1 is a high-precision digital multi-jet water meter featuring integrated SMART data transmission via LoRaWAN or Wireless M-Bus. Compliant with MID Class C, it is suitable for residential and small commercial metering applications.',
    subcategory: 'SMART Meters',
    badge: 'SMART',
    specs: ['DN15–DN40', 'MID Class C', 'LoRaWAN / wM-Bus', 'IP68'],
    sortOrder: 1,
    categorySlug: 'water-metering',
    imageUrl: 'https://www.bmeters.com/wp-content/uploads/2023/07/HYDRODIGIT-M1-sopra2.png',
  },
  {
    name: 'GSD8 Ultrasonic Cold Water Meter',
    slug: 'gsd8-ultrasonic-cold-water-meter',
    shortDescription: 'Single-jet ultrasonic cold water meter for residential and commercial use.',
    description: 'The GSD8 is a single-jet ultrasonic cold water meter with no moving parts, delivering high accuracy and long-term stability. Available with wired M-Bus or Wireless M-Bus output.',
    subcategory: 'SMART Meters',
    badge: 'NEW',
    specs: ['DN15–DN40', 'MID Class C', 'Wired M-Bus / wM-Bus', 'IP68'],
    sortOrder: 2,
    categorySlug: 'water-metering',
    imageUrl: null,
  },
  {
    name: 'GSD8-H Ultrasonic Hot Water Meter',
    slug: 'gsd8-h-ultrasonic-hot-water-meter',
    shortDescription: 'Ultrasonic hot water meter suitable for temperatures up to 90°C.',
    description: 'The GSD8-H is designed for domestic hot water metering up to 90°C. It uses ultrasonic measurement technology for superior accuracy without mechanical wear.',
    subcategory: 'Residential Meters',
    badge: null,
    specs: ['DN15–DN40', 'Up to 90°C', 'MID Class C', 'Optional M-Bus'],
    sortOrder: 3,
    categorySlug: 'water-metering',
    imageUrl: null,
  },
  {
    name: 'GMDM-I Mechanical Water Meter',
    slug: 'gmdm-i-mechanical-water-meter',
    shortDescription: 'Single-jet dry dial cold water meter for residential metering.',
    description: 'The GMDM-I is a robust single-jet dry dial cold water meter for residential metering. Its sealed register protects against condensation and ensures long calibration life.',
    subcategory: 'Residential Meters',
    badge: null,
    specs: ['DN15–DN20', 'MID Class B', 'Pulse output', 'IP68'],
    sortOrder: 4,
    categorySlug: 'water-metering',
    imageUrl: null,
  },
  {
    name: 'GMSD Volumetric Water Meter',
    slug: 'gmsd-volumetric-water-meter',
    shortDescription: 'High-accuracy volumetric piston water meter, Class C.',
    description: 'The GMSD is a volumetric oscillating piston water meter that delivers Class C accuracy even at very low flow rates. Ideal for precise residential and commercial metering.',
    subcategory: 'Bulk Meters',
    badge: null,
    specs: ['DN15–DN25', 'MID Class C', 'Low start flow', 'Pulse output'],
    sortOrder: 5,
    categorySlug: 'water-metering',
    imageUrl: null,
  },
  {
    name: 'HYDRUS Multijet Water Meter',
    slug: 'hydrus-multijet-water-meter',
    shortDescription: 'Dry dial multijet water meter for larger residential and commercial installations.',
    description: 'The HYDRUS is a multi-jet dry dial water meter suitable for larger pipe sizes. Compatible with both horizontal and vertical installations.',
    subcategory: 'Bulk Meters',
    badge: null,
    specs: ['DN20–DN50', 'MID Class B', 'Horizontal/vertical', 'Pulse output'],
    sortOrder: 6,
    categorySlug: 'water-metering',
    imageUrl: null,
  },

  // ── Thermal Energy Metering ─────────────────────────────────────────────────
  {
    name: 'HYDROSPLIT Ultrasonic Heat Meter',
    slug: 'hydrosplit-ultrasonic-heat-meter',
    shortDescription: 'Split-body ultrasonic thermal energy meter for heating and cooling.',
    description: 'The HYDROSPLIT is a split-body ultrasonic heat and cooling meter conforming to EN 1434 Class 2. Available with M-Bus and Wireless M-Bus outputs for AMR/AMI integration.',
    subcategory: 'Ultrasonic Meters',
    badge: 'SMART',
    specs: ['DN15–DN50', 'EN 1434 Class 2', 'M-Bus / wM-Bus', 'Heating & cooling'],
    sortOrder: 1,
    categorySlug: 'thermal-energy-metering',
    imageUrl: 'https://www.bmeters.com/wp-content/uploads/2022/07/hcW4-aspect-ratio-450-450-1.png',
  },
  {
    name: 'HYDROSPLIT-A Compact Heat Meter',
    slug: 'hydrosplit-a-compact-heat-meter',
    shortDescription: 'Compact ultrasonic heat meter with integrated flow sensor for apartment metering.',
    description: 'The HYDROSPLIT-A integrates the calculator and flow sensor in a compact body, ideal for apartment-level heat metering in multi-family buildings.',
    subcategory: 'Ultrasonic Meters',
    badge: null,
    specs: ['DN15–DN25', 'EN 1434 Class 2', 'Integrated calculator', 'MID approved'],
    sortOrder: 2,
    categorySlug: 'thermal-energy-metering',
    imageUrl: null,
  },
  {
    name: 'HYDROSET Calculator Unit',
    slug: 'hydroset-calculator-unit',
    shortDescription: 'Standalone heat meter calculator for integration with flow and temperature sensors.',
    description: 'The HYDROSET calculator unit processes flow and temperature data from compatible sensors to calculate thermal energy. Supports M-Bus communication for data collection.',
    subcategory: 'Thermal Energy Meters Accessories',
    badge: null,
    specs: ['M-Bus output', 'EN 1434 Class 2', 'Compatible sensors', 'Battery powered'],
    sortOrder: 3,
    categorySlug: 'thermal-energy-metering',
    imageUrl: null,
  },
  {
    name: 'HCA-A Heat Cost Allocator',
    slug: 'hca-a-heat-cost-allocator',
    shortDescription: 'Electronic heat cost allocator for radiator-based billing in multi-family buildings.',
    description: 'The HCA-A heat cost allocator measures heat output from radiators and enables proportional billing of heating costs in multi-family residential buildings.',
    subcategory: 'Heat cost allocators/Sensors',
    badge: null,
    specs: ['EN 834', 'DEHA certified', 'wM-Bus / M-Bus', 'Battery: 10 years'],
    sortOrder: 4,
    categorySlug: 'thermal-energy-metering',
    imageUrl: null,
  },

  // ── Remote Reading Systems ───────────────────────────────────────────────────
  {
    name: 'RRS-LW LoRaWAN Concentrator',
    slug: 'rrs-lw-lorawan-concentrator',
    shortDescription: 'LoRaWAN-based remote reading system for large-scale meter networks.',
    description: 'The RRS-LW is a LoRaWAN concentrator designed for collecting data from B METERS LoRaWAN-enabled meters. Supports B METERING Cloud integration for real-time monitoring.',
    subcategory: 'LoRaWan',
    badge: 'SMART',
    specs: ['LoRaWAN Class A/C', 'Up to 2000 meters', 'Cloud ready', 'IP65'],
    sortOrder: 1,
    categorySlug: 'remote-reading-systems',
    imageUrl: 'https://www.bmeters.com/wp-content/uploads/2021/07/rrs-03-1-aspect-ratio-450-450.jpg',
  },
  {
    name: 'RRS-WMB Wireless M-Bus Module',
    slug: 'rrs-wmb-wireless-mbus-module',
    shortDescription: 'Wireless M-Bus module for meter data collection via walk-by or drive-by reading.',
    description: 'The RRS-WMB system enables wireless M-Bus meter reading via walk-by or drive-by methods. Compatible with all B METERS wM-Bus meters operating at 868 MHz.',
    subcategory: 'M-BUS Wireless',
    badge: null,
    specs: ['868 MHz wM-Bus', 'Walk-by / Drive-by', 'EN 13757-4', 'AES-128 encrypted'],
    sortOrder: 2,
    categorySlug: 'remote-reading-systems',
    imageUrl: null,
  },
  {
    name: 'RRS-MB M-Bus Data Logger',
    slug: 'rrs-mb-mbus-data-logger',
    shortDescription: 'Wired M-Bus data logger for fixed network AMR installations.',
    description: 'The RRS-MB data logger connects up to 250 M-Bus slave devices and transmits collected data via Ethernet, GPRS or RS-485. Ideal for fixed network AMR deployments.',
    subcategory: 'M-BUS',
    badge: null,
    specs: ['Up to 250 slaves', 'Ethernet / GPRS', 'EN 13757-2', 'DIN rail mount'],
    sortOrder: 3,
    categorySlug: 'remote-reading-systems',
    imageUrl: null,
  },
  {
    name: 'PULSE-INT Pulse Interface Module',
    slug: 'pulse-int-pulse-interface-module',
    shortDescription: 'Pulse output interface for integrating legacy meters into AMR systems.',
    description: 'The PULSE-INT converts pulse output signals from mechanical meters into M-Bus or wM-Bus data, enabling legacy meters to participate in modern AMR/AMI networks.',
    subcategory: 'Pulse Output',
    badge: null,
    specs: ['Pulse input: 0.5–30V', 'wM-Bus output', 'IP54', 'Battery: 10 years'],
    sortOrder: 4,
    categorySlug: 'remote-reading-systems',
    imageUrl: null,
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱 Seeding products...\n');

  // 1. Admin login
  const loginRes = await api('/admin/login', {
    method: 'POST',
    body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  if (loginRes.status !== 200) {
    console.error('Login failed:', JSON.stringify(loginRes.data));
    process.exit(1);
  }
  const adminJwt = loginRes.data.data?.token;
  console.log('✓ Logged in\n');

  // 2. Create full-access API Token
  const tokenRes = await api('/admin/api-tokens', {
    method: 'POST',
    token: adminJwt,
    body: { name: `SeedProducts-${Date.now()}`, description: 'Auto seed', type: 'full-access', lifespan: null },
  });
  const apiToken = tokenRes.data.data?.accessKey;
  const apiTokenId = tokenRes.data.data?.id;
  console.log(`✓ API Token created\n`);

  // 3. Fetch existing product categories to get their IDs
  const catRes = await api('/api/product-categories?pagination[limit]=100', { token: apiToken });
  const categories = catRes.data?.data ?? [];
  const catBySlug = {};
  for (const cat of categories) {
    const attrs = cat.attributes ?? cat;
    catBySlug[attrs.slug] = cat.id;
  }
  console.log(`Found ${categories.length} categories:`, Object.keys(catBySlug).join(', '), '\n');

  // 4. Seed products
  console.log('Seeding products...');
  let created = 0, failed = 0;

  for (const p of PRODUCTS) {
    const categoryId = catBySlug[p.categorySlug];
    if (!categoryId) {
      console.log(`  ⚠ Category not found for slug "${p.categorySlug}", skipping ${p.name}`);
      failed++;
      continue;
    }

    const body = {
      data: {
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription,
        description: p.description,
        subcategory: p.subcategory,
        badge: p.badge,
        specs: p.specs,
        sortOrder: p.sortOrder,
        category: categoryId,
        publishedAt: new Date().toISOString(),
      },
    };

    const r = await api('/api/products', { method: 'POST', token: apiToken, body });
    if (r.status < 400) {
      console.log(`  ✓ ${p.name} (${p.categorySlug})`);
      created++;
    } else {
      console.log(`  ✗ ${p.name}: ${JSON.stringify(r.data).slice(0, 100)}`);
      failed++;
    }
  }
  console.log(`\n  Created: ${created}, Failed: ${failed}\n`);

  // 5. Set public permissions via SQLite (Strapi v4 uses action strings like api::product.product.find)
  console.log('Setting public permissions for products...');
  try {
    const sqlite3 = require('better-sqlite3');
    const path = require('path');
    const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');
    const db = sqlite3(dbPath);

    // Actions that should be public
    const publicActions = [
      'api::product.product.find',
      'api::product.product.findOne',
      'api::product-category.product-category.find',
      'api::product-category.product-category.findOne',
      'api::homepage.homepage.find',
      'api::news-article.news-article.find',
      'api::news-article.news-article.findOne',
      'plugin::upload.content-api.find',
      'plugin::upload.content-api.findOne',
    ];

    // Get public role id
    const publicRole = db.prepare("SELECT id FROM up_roles WHERE type = 'public'").get();
    if (!publicRole) { console.log('  ⚠ Public role not found'); return; }

    const now = Date.now();
    for (const action of publicActions) {
      // Upsert permission
      let perm = db.prepare('SELECT id FROM up_permissions WHERE action = ?').get(action);
      if (!perm) {
        const res = db.prepare('INSERT INTO up_permissions (action, created_at, updated_at) VALUES (?, ?, ?)').run(action, now, now);
        perm = { id: res.lastInsertRowid };
      }
      // Link to public role if not already linked
      const link = db.prepare('SELECT id FROM up_permissions_role_links WHERE permission_id = ? AND role_id = ?').get(perm.id, publicRole.id);
      if (!link) {
        const maxOrder = db.prepare('SELECT MAX(permission_order) as m FROM up_permissions_role_links WHERE role_id = ?').get(publicRole.id);
        db.prepare('INSERT INTO up_permissions_role_links (permission_id, role_id, permission_order) VALUES (?, ?, ?)').run(perm.id, publicRole.id, (maxOrder?.m ?? 0) + 1);
      }
      console.log(`  ✓ ${action}`);
    }
    db.close();
    console.log('  ✓ Permissions set via SQLite');
  } catch (err) {
    console.warn('  ⚠ Could not set permissions via SQLite:', err.message);
    console.warn('  → Set permissions manually in Strapi Admin: Settings → Users & Permissions → Roles → Public');
  }

  // 6. Cleanup
  if (apiTokenId) {
    await api(`/admin/api-tokens/${apiTokenId}`, { method: 'DELETE', token: adminJwt });
    console.log('\n  ✓ Seed token removed');
  }

  console.log('\n✅ Products seeded!\n');
  console.log('→ Test: curl "http://localhost:1337/api/products?populate=category,image&pagination[limit]=20"\n');
}

main().catch(err => {
  console.error('\n❌ Seed failed:', err);
  process.exit(1);
});
