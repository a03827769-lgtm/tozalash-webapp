'use strict';

// ═══════════════════════════════════════
//  TELEGRAM INIT
// ═══════════════════════════════════════
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
const TGU = tg.initDataUnsafe?.user || {};
if (tg.colorScheme === 'dark') document.body.classList.add('dark');

// ═══════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════
const C = {
  phone: '+998887887011',
  card: '5614 6817 1876 7068',
  holder: 'M.A.',
  channel: '@tozalash_servis',
  insta: '@tozalash.servis',
  bot: 'tozalash_servisbot',
};

const SRV = [
  { id: 'cleaning_standard', i: '🧹', n: 'Oddiy tozalash', p: 500000, u: 'ishchi', t: 'w', hot: 1 },
  { id: 'cleaning_general', i: '🧼', n: 'General tozalash', p: 500000, u: 'ishchi', t: 'w' },
  { id: 'cleaning_renovation', i: '🔨', n: 'Remont keyin', p: 600000, u: 'ishchi', t: 'w' },
  { id: 'sofa', i: '🛋', n: 'Divan yuvish', p: 80000, u: "o'rin", mn: 5, mx: 50, t: 'q' },
  { id: 'chair', i: '💺', n: 'Stul yuvish', p: 50000, u: 'dona', mn: 5, mx: 50, t: 'q' },
  { id: 'carpet', i: '🟫', n: 'Gilam yuvish', p: 27000, u: 'kv.m', mn: 10, mx: 200, t: 'q' },
  { id: 'facade', i: '🏢', n: 'Fasad yuvish', p: 22000, u: 'kv.m', mn: 1, mx: 500, t: 'q' },
  { id: 'tile', i: '🧱', n: 'Plitka yuvish', p: 15000, u: 'kv.m', mn: 1, mx: 500, t: 'q' },
];

const DIST = ['Bektemir', 'Chilonzor', 'Yakkasaroy', 'Mirobod', 'Mirzo Ulugbek', 'Sergeli', 'Shayxontohur', 'Olmazor', 'Uchtepa', 'Yashnobod', 'Yunusobod'];
const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const HDAYS = ['2025-03-30', '2025-03-31', '2025-04-01', '2025-06-06', '2025-06-07', '2025-06-08'];

const FAQS = [
  { q: 'Narxlar qanday?', a: "Oddiy/General: 500,000/ishchi. Remont keyin: 600,000. Divan: 80,000/o'rin (min 5). Gilam: 27,000/kv.m (min 10)." },
  { q: 'Ish vaqti?', a: 'Har kuni 09:00–17:00. Bayram kunlari dam olamiz.' },
  { q: 'Vositalar kimdan?', a: 'Barcha Karcher apparatlari va tozalash vositalari bizdan.' },
  { q: "To'lov usullari?", a: 'Naqd yoki karta: 5614 6817 1876 7068 (M.A.)' },
  { q: 'Qayerlarga xizmat?', a: 'Toshkent shahri barcha tumanlari. Borish bepul.' },
  { q: 'Minimal buyurtma?', a: "Divan: min 5 o'rin. Stul: min 5. Gilam: min 10 kv.m." },
  { q: 'Shoshilinch buyurtma?', a: '24 soatdan kam qolsa narx +25%.' },
  { q: 'Kafolat?', a: "48 soat ichida norozi = bepul qayta tozalash." },
  { q: 'Nechta ishchi keladi?', a: 'Admin rasmlarni ko\'rib belgilaydi (max 10).' },
  { q: 'Chegirmalar?', a: 'Birinchi -5%. 10+ buyurtma -10%. VIP -8%. Referral -5%.' },
];

const TIPS = [
  { cat: '🧹 Tozalash', i: '🧹', t: 'Chang artish', d: "Yuqoridan pastga. Avval tokchalar, keyin pol." },
  { cat: '🧹 Tozalash', i: '✨', t: 'Oyna tozalash', d: "Gazeta + sprey = iz qoldirmaydi." },
  { cat: '🛋 Mebel', i: '🛋', t: 'Divan parvarishi', d: "Har 6 oyda professional tozalash tavsiya etiladi." },
  { cat: '🟫 Gilam', i: '🟫', t: 'Gilam hidi', d: "Soda sepib 30 daqiqa qo'ying, keyin changyutgich." },
  { cat: '🧹 Tozalash', i: '⏰', t: 'Tozalash jadvali', d: "Kun: idish, pol. Hafta: hammom. Oy: general." },
  { cat: '🛋 Mebel', i: '🧴', t: "Dog' ketkazish", d: "Yangi dog'ni darhol sovuq suv bilan yuving." },
];

const ACHS = [
  { id: 'first', i: '🎉', n: 'Birinchi qadam', d: '1 buyurtma' },
  { id: 'loyal3', i: '⭐', n: 'Doimiy', d: '3 buyurtma' },
  { id: 'loyal5', i: '🌟', n: 'Sodiq', d: '5 buyurtma' },
  { id: 'loyal10', i: '💎', n: 'Oltin', d: '10 buyurtma' },
  { id: 'loyal25', i: '👑', n: 'Brilliant', d: '25 buyurtma' },
  { id: 'spent1m', i: '💰', n: 'Millioner', d: "1M+ sarfladi" },
  { id: 'ref3', i: '🤝', n: 'Taklif ustasi', d: '3 do\'st' },
  { id: 'reviewer', i: '📝', n: 'Sharhchi', d: 'Sharh qoldirdi' },
];

const LVLS = [
  { n: '🥉 Bronze', mn: 0, mx: 500 },
  { n: '🥈 Silver', mn: 500, mx: 1500 },
  { n: '🥇 Gold', mn: 1500, mx: 3000 },
  { n: '💎 Diamond', mn: 3000, mx: 5000 },
  { n: '👑 Legend', mn: 5000, mx: 99999 },
];

// ═══════════════════════════════════════
//  STATE
// ═══════════════════════════════════════
let curPage = 'home';
let selSrv = null;
let oStep = 0;
let oData = {};
let cSrv = SRV[0];
let cVal = 1;
let calMo = new Date().getMonth();
let calYr = new Date().getFullYear();
let homeData = {};

// ═══════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════
const $ = id => document.getElementById(id);
const F = n => Math.round(n).toLocaleString('uz');
const todayStr = () => new Date().toISOString().split('T')[0];
const isHol = d => HDAYS.includes(d);
const isUrg = d => { try { return (new Date(d + 'T09:00') - new Date()) < 86400000 && (new Date(d + 'T09:00') - new Date()) > 0; } catch (e) { return false; } };

function toast(msg, ms = 2500) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), ms);
}

function openModal(html) {
  $('modalBox').innerHTML = '<div class="modal-handle"></div>' + html;
  $('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('modalBg').classList.remove('open');
  document.body.style.overflow = '';
}

function updateRange(el) {
  const mn = +el.min, mx = +el.max, v = +el.value;
  const pct = ((v - mn) / (mx - mn)) * 100;
  el.style.background = `linear-gradient(to right,var(--p) ${pct}%,var(--bg3) ${pct}%)`;
}

function send(data) {
  try { tg.sendData(JSON.stringify(data)); } catch (e) { console.warn('send err', e); }
}

function copyTxt(t) {
  if (navigator.clipboard) navigator.clipboard.writeText(t);
  else { const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); }
  toast('📋 Nusxalandi!');
}

function getRefCode() {
  return TGU.id ? 'TS' + String(TGU.id).slice(-6).toUpperCase() : 'TSGUEST';
}

function getLvl(pts) {
  return LVLS.find(l => pts >= l.mn && pts < l.mx) || LVLS[0];
}

// ═══════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════
function navigate(pg) {
  curPage = pg;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = $('pg-' + pg);
  if (target) target.classList.add('active');

  document.querySelectorAll('.bnav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.page === pg);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pg === 'me') renderProfile();
  if (pg === 'calc') renderCalc();
  if (pg === 'home') renderHome();
  if (pg === 'more') { renderFaq(); renderTips(); }
}

// ═══════════════════════════════════════
//  HOME
// ═══════════════════════════════════════
function renderHome() {
  const el = $('homeServices');
  if (!el) return;
  el.innerHTML = SRV.filter(s => !['tile', 'chair'].includes(s.id)).map(s => `
    <div class="service-card${selSrv?.id === s.id ? ' selected' : ''}" onclick="pickService('${s.id}')">
      ${s.hot ? '<div class="hot-badge">TOP</div>' : ''}
      <span class="service-icon">${s.i}</span>
      <div class="service-name">${s.n}</div>
      <div class="service-price">${F(s.p)}/${s.u}</div>
    </div>`).join('');
}

function pickService(id) {
  selSrv = SRV.find(s => s.id === id);
  renderHome();
  setTimeout(() => { navigate('order'); initOrder(); }, 150);
}

// ═══════════════════════════════════════
//  CALCULATOR
// ═══════════════════════════════════════
function renderCalc() {
  // Chips
  const chips = $('calcChips');
  if (chips) chips.innerHTML = SRV.map(s => `
    <div class="chip${cSrv.id === s.id ? ' active' : ''}"
      onclick="cSrv=SRV.find(x=>x.id==='${s.id}');cVal=cSrv.t==='w'?1:(cSrv.mn||1);renderCalc()">
      ${s.i} ${s.n}
    </div>`).join('');

  // Slider
  const sl = $('calcSlider');
  if (sl) {
    if (cSrv.t === 'w') {
      sl.innerHTML = `
        <div class="card-header">👷 Ishchilar soni</div>
        <div class="range-value" id="crv">${cVal} ishchi</div>
        <input type="range" min="1" max="10" value="${cVal}" id="cRange"
          oninput="cVal=+this.value;updCalc();updateRange(this)">
        <div class="range-labels"><span>1</span><span>10</span></div>`;
    } else {
      sl.innerHTML = `
        <div class="card-header">📊 Miqdor (${cSrv.u})</div>
        <div class="range-value" id="crv">${cVal} ${cSrv.u}</div>
        <input type="range" min="${cSrv.mn || 1}" max="${cSrv.mx || 100}" value="${cVal}" id="cRange"
          oninput="cVal=+this.value;updCalc();updateRange(this)">
        <div class="range-labels"><span>${cSrv.mn || 1}</span><span>${cSrv.mx || 100}</span></div>`;
    }
    const r = $('cRange');
    if (r) updateRange(r);
  }
  updCalc();
}

function updCalc() {
  const total = cSrv.p * cVal;
  const d = $('calcDisplay');
  if (d) d.innerHTML = `
    <div class="calc-display-label">Taxminiy narx</div>
    <div class="calc-display-price">${F(total)} <span>so'm</span></div>
    <div class="calc-display-detail">${cVal} ${cSrv.u} × ${F(cSrv.p)} so'm</div>`;

  const rv = $('crv');
  if (rv) rv.textContent = `${cVal} ${cSrv.u}`;

  // Discount values
  const e = id => $(id);
  if (e('dv5')) e('dv5').textContent = F(Math.round(total * 0.95));
  if (e('dv10')) e('dv10').textContent = F(Math.round(total * 0.90));
  if (e('dvU')) e('dvU').textContent = '+' + F(Math.round(total * 0.25));
  if (e('dvP')) e('dvP').textContent = F(Math.round(total * 0.90));

  // Compare
  const cmp = $('calcCompare');
  if (cmp) cmp.innerHTML = `
    <table class="compare-table">
      <tr><th></th><th style="color:var(--p)">🏆 Biz</th><th>Kompaniya A</th><th>Kompaniya B</th></tr>
      <tr><td>Narx</td><td class="compare-us">${F(total)}</td><td>${F(Math.round(total * 1.2))}</td><td>${F(Math.round(total * 1.1))}</td></tr>
      <tr><td>-5%</td><td class="compare-highlight">${F(Math.round(total * .95))}</td><td>—</td><td>—</td></tr>
      <tr><td>Borish</td><td class="compare-highlight">Bepul</td><td>+20,000</td><td>+15,000</td></tr>
      <tr><td>Kafolat</td><td class="compare-highlight">48 soat</td><td>Yo'q</td><td>24 soat</td></tr>
    </table>`;
}

function calcToOrder() {
  selSrv = cSrv;
  oData.qty = cVal;
  navigate('order');
  initOrder(true);
}

// ═══════════════════════════════════════
//  ORDER FLOW
// ═══════════════════════════════════════
function initOrder(fromCalc) {
  if (!selSrv) selSrv = SRV[0];
  oStep = 0;
  const s = selSrv;
  oData = {
    srv: s,
    qty: fromCalc ? (oData.qty || (s.t === 'w' ? 1 : s.mn || 1)) : (s.t === 'w' ? 1 : s.mn || 1),
    dist: '', addr: homeData.addr || '', date: '', time: '09:00',
    phone: '', pay: '', lat: null, lng: null,
  };
  renderOrd();
}

function renderOrd() {
  const stEl = $('orderSteps');
  const cont = $('orderContent');
  if (!stEl || !cont) return;

  // Steps
  stEl.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<div class="step ${i < oStep ? 'done' : i === oStep ? 'current' : ''}"></div>`
  ).join('');

  const S = oData.srv;
  const labels = ['Xizmat', 'Manzil', 'Sana', "To'lov", 'Tasdiqlash'];
  const sub = `<div style="text-align:center;font-size:11px;color:var(--text3);margin-bottom:12px;font-weight:500">${oStep + 1}/5 — ${labels[oStep]}</div>`;

  switch (oStep) {

    // ── STEP 0: Service & Quantity ──
    case 0:
      cont.innerHTML = sub + `
        <div class="card">
          <div class="card-header">🛠 Xizmat tanlang</div>
          <div class="service-grid" style="margin-bottom:14px">${SRV.map(s => `
            <div class="service-card${oData.srv.id === s.id ? ' selected' : ''}"
              onclick="oData.srv=SRV.find(x=>x.id==='${s.id}');oData.qty=${s.t === 'w' ? 1 : s.mn || 1};renderOrd()">
              <span class="service-icon">${s.i}</span>
              <div class="service-name">${s.n}</div>
              <div class="service-price">${F(s.p)}/${s.u}</div>
            </div>`).join('')}
          </div>
          ${S.t === 'w' ? `
            <div class="card-header">👷 Ishchilar soni</div>
            <div class="range-value" id="oqv">${oData.qty} ishchi</div>
            <input type="range" min="1" max="10" value="${oData.qty}" id="oRange"
              oninput="oData.qty=+this.value;$('oqv').textContent=this.value+' ishchi';updateRange(this)">
            <div class="range-labels"><span>1</span><span>10</span></div>
            <div class="form-hint">💰 ${F(S.p)} so'm / ishchi / kun</div>
          ` : `
            <div class="card-header">📊 Miqdor (${S.u})</div>
            <div class="form-group">
              <input class="form-input" type="number" id="qtyIn" value="${oData.qty}" min="${S.mn || 1}">
              <div class="form-hint">Min: ${S.mn || 1} ${S.u} • ${F(S.p)} so'm/${S.u}</div>
            </div>
          `}
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="navigate('home')">❌ Bekor</button>
          <button class="btn btn-primary" onclick="ordStep0()">Davom ▶</button>
        </div>`;
      const oR = $('oRange');
      if (oR) updateRange(oR);
      break;

    // ── STEP 1: Address ──
    case 1:
      cont.innerHTML = sub + `
        <div class="card">
          <div class="card-header">📍 Manzil</div>
          <div class="form-group">
            <label class="form-label">📍 Tuman <span class="required">*</span></label>
            <select class="form-input" id="oDist">
              ${DIST.map(d => `<option${oData.dist === d ? ' selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">🏠 Manzil <span class="required">*</span></label>
            <input class="form-input" id="oAddr" placeholder="Ko'cha, uy, mo'ljal..." value="${oData.addr}">
            <div class="form-hint">To'liq manzil kiriting</div>
          </div>
          ${homeData.addr ? `
            <div style="padding:8px 10px;background:var(--p-bg);border-radius:var(--r-sm);font-size:11px;cursor:pointer;margin-top:4px;border:1px solid var(--p-bg2)"
              onclick="$('oAddr').value='${homeData.addr}';toast('✅')">
              📌 Saqlangan: <b>${homeData.addr.slice(0, 30)}</b>
            </div>` : ''}
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="oStep--;renderOrd()">◀ Orqaga</button>
          <button class="btn btn-primary" onclick="ordStep1()">Davom ▶</button>
        </div>`;
      break;

    // ── STEP 2: Date & Time ──
    case 2:
      cont.innerHTML = sub + `
        <div class="card">
          <div class="card-header">📅 Sanani tanlang</div>
          <div id="calendarBox"></div>
        </div>
        <div class="card">
          <div class="card-header">⏰ Boshlanish vaqti</div>
          <div class="chips" id="timeChips"></div>
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="oStep--;renderOrd()">◀ Orqaga</button>
          <button class="btn btn-primary" onclick="ordStep2()">Davom ▶</button>
        </div>`;
      drawCal('calendarBox');
      drawTimes();
      break;

    // ── STEP 3: Payment ──
    case 3:
      cont.innerHTML = sub + `
        <div class="card">
          <div class="card-header">📱 Aloqa</div>
          <div class="form-group">
            <label class="form-label">📞 Telefon <span class="required">*</span></label>
            <div class="form-input-icon">
              <span class="icon">📱</span>
              <input class="form-input" type="tel" id="oPhone"
                placeholder="+998 90 123 45 67" value="${oData.phone}">
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">💳 To'lov usuli</div>
          <div class="chips" style="margin-bottom:10px">
            <div class="chip${oData.pay === 'cash' ? ' active' : ''}" onclick="oData.pay='cash';renderOrd()">💵 Naqd pul</div>
            <div class="chip${oData.pay === 'card' ? ' active' : ''}" onclick="oData.pay='card';renderOrd()">💳 Karta</div>
          </div>
          ${oData.pay === 'card' ? `
            <div class="pay-card">
              <div class="pay-card-label">TO'LOV KARTASI</div>
              <div class="pay-card-number">${C.card}</div>
              <div class="pay-card-holder">${C.holder}</div>
            </div>
            <div class="form-hint">Buyurtma tasdiqlangach karta raqamiga o'tkazing</div>` : ''}
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="oStep--;renderOrd()">◀ Orqaga</button>
          <button class="btn btn-primary" onclick="ordStep3()">Davom ▶</button>
        </div>`;
      break;

    // ── STEP 4: Confirm ──
    case 4:
      const base = S.p * oData.qty;
      const urg = isUrg(oData.date);
      const urgAmt = urg ? Math.round(base * 0.25) : 0;
      const final = base + urgAmt;

      cont.innerHTML = sub + `
        <div class="summary">
          <div style="text-align:center;font-weight:700;font-size:14px;margin-bottom:10px">📋 Buyurtma xulosasi</div>
          <div class="summary-row"><span class="label">Xizmat</span><span class="value">${S.i} ${S.n}</span></div>
          <div class="summary-row"><span class="label">Miqdor</span><span class="value">${oData.qty} ${S.u}</span></div>
          <div class="summary-row"><span class="label">Tuman</span><span class="value">📍 ${oData.dist}</span></div>
          <div class="summary-row"><span class="label">Manzil</span><span class="value">${oData.addr}</span></div>
          <div class="summary-row"><span class="label">Sana</span><span class="value">📅 ${oData.date}</span></div>
          <div class="summary-row"><span class="label">Vaqt</span><span class="value">⏰ ${oData.time}</span></div>
          <div class="summary-row"><span class="label">Telefon</span><span class="value">📱 ${oData.phone}</span></div>
          <div class="summary-row"><span class="label">To'lov</span><span class="value">${oData.pay === 'card' ? '💳 Karta' : '💵 Naqd'}</span></div>
          <div class="summary-row"><span class="label">Asosiy</span><span class="value">${F(base)} so'm</span></div>
          ${urg ? `<div class="summary-row"><span class="label" style="color:var(--err)">⚡ Shoshilinch</span><span class="value" style="color:var(--err)">+${F(urgAmt)}</span></div>` : ''}
          <div class="summary-row total"><span>JAMI</span><span>${F(final)} so'm</span></div>
        </div>
        ${urg ? `<div class="timer-card"><div class="timer-title">⚡ SHOSHILINCH BUYURTMA</div><div class="timer-value">+25%</div><div class="timer-desc">24 soatdan kam vaqt</div></div>` : ''}
        <button class="btn btn-success" onclick="submitOrder(${final})" style="font-size:15px;padding:15px">✅ BUYURTMA BERISH</button>
        <button class="btn btn-outline" onclick="oStep--;renderOrd()">◀ Orqaga</button>`;
      break;
  }
}

// Step validators
function ordStep0() {
  const S = oData.srv;
  if (S.t === 'q') {
    const v = +($('qtyIn')?.value || oData.qty);
    if (S.mn && v < S.mn) { toast(`❌ Min ${S.mn} ${S.u}`); $('qtyIn')?.classList.add('error'); return; }
    if (S.mx && v > S.mx) { toast(`❌ Max ${S.mx} ${S.u}`); return; }
    oData.qty = v;
  }
  oStep++; renderOrd();
}

function ordStep1() {
  const a = $('oAddr')?.value?.trim();
  if (!a || a.length < 5) { toast('❌ Manzilni kiriting (min 5 belgi)'); $('oAddr')?.classList.add('error'); return; }
  oData.dist = $('oDist')?.value || DIST[0];
  oData.addr = a;
  oStep++; renderOrd();
}

function ordStep2() {
  if (!oData.date) { toast('❌ Sanani tanlang'); return; }
  if (!oData.time) oData.time = '09:00';
  oStep++; renderOrd();
}

function ordStep3() {
  const ph = $('oPhone')?.value?.trim();
  if (!ph || ph.length < 9) { toast('❌ Telefon raqam kiriting'); $('oPhone')?.classList.add('error'); return; }
  if (!oData.pay) { toast("❌ To'lov usulini tanlang"); return; }
  oData.phone = ph;
  oStep++; renderOrd();
}

function submitOrder(price) {
  send({
    action: 'order',
    service: oData.srv.id,
    qty: oData.qty,
    district: oData.dist,
    address: oData.addr,
    date: oData.date,
    time: oData.time,
    phone: oData.phone,
    payment: oData.pay,
    urgent: isUrg(oData.date),
    final_price: price,
  });

  $('orderContent').innerHTML = `
    <div class="success-state">
      <span class="success-icon">🎉</span>
      <div class="success-title">Buyurtma qabul qilindi!</div>
      <div class="success-desc">Operator tez orada bog'lanadi va kerakli ishchilar sonini belgilaydi.</div>
      <div class="success-id">📞 ${C.phone}</div>
      <button class="btn btn-primary" style="margin-top:16px" onclick="navigate('home')">🏠 Asosiy sahifa</button>
    </div>`;
  $('orderSteps').innerHTML = '';
  toast('✅ Buyurtma yuborildi!');
}

// ═══════════════════════════════════════
//  CALENDAR
// ═══════════════════════════════════════
function drawCal(containerId) {
  const box = $(containerId);
  if (!box) return;

  const moNames = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
  const dayNames = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
  const firstDay = (new Date(calYr, calMo, 1).getDay() + 6) % 7;
  const totalDays = new Date(calYr, calMo + 1, 0).getDate();
  const td = todayStr();

  let h = `<div class="calendar">
    <div class="cal-header">
      <div class="cal-nav" onclick="calMo--;if(calMo<0){calMo=11;calYr--}drawCal('${containerId}')">‹</div>
      <div class="cal-title">${moNames[calMo]} ${calYr}</div>
      <div class="cal-nav" onclick="calMo++;if(calMo>11){calMo=0;calYr++}drawCal('${containerId}')">›</div>
    </div>
    <div class="cal-grid">
      ${dayNames.map(d => `<div class="cal-day-name">${d}</div>`).join('')}
      ${Array(firstDay).fill('<div class="cal-day empty"></div>').join('')}`;

  for (let d = 1; d <= totalDays; d++) {
    const ds = `${calYr}-${String(calMo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const past = ds < td;
    const hol = isHol(ds);
    const sel = oData.date === ds;
    const isToday = ds === td;

    let cls = 'cal-day';
    if (past || hol) cls += ' disabled';
    else if (sel) cls += ' selected';
    else if (isToday) cls += ' today';
    if (hol) cls += ' holiday';

    const click = past || hol ? '' : `onclick="oData.date='${ds}';drawCal('${containerId}')"`;
    h += `<div class="${cls}" ${click}>${d}</div>`;
  }

  h += `</div>`;
  if (oData.date) {
    const u = isUrg(oData.date);
    h += `<div style="margin-top:8px;padding:8px 10px;background:${u ? 'var(--err-bg)' : 'var(--ok-bg)'};
      border-radius:var(--r-sm);font-size:11px;font-weight:500;color:${u ? 'var(--err)' : 'var(--ok)'}">
      ${u ? '⚡ Shoshilinch! Narx +25% oshadi' : '✅ Tanlangan: ' + oData.date}</div>`;
  }
  h += '</div>';
  box.innerHTML = h;
}

function drawTimes() {
  const box = $('timeChips');
  if (!box) return;
  box.innerHTML = HOURS.map(t => `
    <div class="chip${oData.time === t ? ' active' : ''}" onclick="oData.time='${t}';drawTimes()">
      🕐 ${t}
    </div>`).join('');
}

// ═══════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════
function renderProfile() {
  const name = [TGU.first_name, TGU.last_name].filter(Boolean).join(' ') || 'Foydalanuvchi';
  const pts = 150;
  const lvl = getLvl(pts);
  const pct = Math.min(100, ((pts - lvl.mn) / (lvl.mx - lvl.mn)) * 100);
  const rc = getRefCode();

  const pc = $('profileCard');
  if (pc) pc.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <div style="width:50px;height:50px;background:var(--grad-primary);border-radius:14px;
        display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;flex-shrink:0;
        box-shadow:0 4px 12px rgba(37,99,235,.25);font-weight:700">
        ${TGU.first_name ? TGU.first_name[0].toUpperCase() : '👤'}
      </div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700">${name}</div>
        <div style="font-size:11px;color:var(--text3)">@${TGU.username || 'N/A'}</div>
      </div>
      <span class="badge badge-blue">${lvl.n}</span>
    </div>
    <div class="level-card">
      <div class="level-icon">${lvl.n.split(' ')[0]}</div>
      <div class="level-info">
        <div class="level-name">${lvl.n}</div>
        <div class="level-sub">${F(lvl.mx - pts)} ball → keyingi level</div>
        <div class="progress" style="margin-top:6px;background:rgba(255,255,255,.15)">
          <div class="progress-fill" style="width:${pct}%;background:rgba(255,255,255,.7)"></div>
        </div>
      </div>
      <div class="level-points">${pts}<small> ball</small></div>
    </div>
    <div class="stat-grid" style="margin-top:6px">
      <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-value">0</div><div class="stat-label">Buyurtma</div></div>
      <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-value">0</div><div class="stat-label">Sarflagan</div></div>
      <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">0</div><div class="stat-label">Taklif</div></div>
    </div>`;

  const al = $('achievementsList');
  if (al) al.innerHTML = ACHS.map(a => `
    <div class="achievement locked">
      <div class="achievement-icon">${a.i}</div>
      <div class="achievement-info">
        <div class="achievement-name">${a.n}</div>
        <div class="achievement-desc">🔒 ${a.d}</div>
      </div>
    </div>`).join('');

  const rf = $('refCode');
  if (rf) rf.textContent = rc;
}

function copyRefCode() {
  copyTxt(`https://t.me/${C.bot}?start=ref_${getRefCode()}`);
}

function shareRefCode() {
  const url = `https://t.me/${C.bot}?start=ref_${getRefCode()}`;
  const text = 'Tozalash Servis — professional tozalash! Birinchi buyurtmaga -5%!';
  try {
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
  } catch (e) {
    copyTxt(url);
  }
}

// ═══════════════════════════════════════
//  FAQ
// ═══════════════════════════════════════
function renderFaq(query) {
  const box = $('faqList');
  if (!box) return;
  const q = (query || '').toLowerCase().trim();
  const filtered = q ? FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) : FAQS;

  if (!filtered.length) {
    box.innerHTML = `<div class="empty" style="padding:20px"><span class="empty-icon">🔍</span>
      <div class="empty-title">Topilmadi</div><div class="empty-desc">"${q}" bo'yicha natija yo'q</div></div>`;
    return;
  }
  box.innerHTML = filtered.map((f, i) => `
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-question">${f.q}<span class="faq-arrow">▼</span></div>
      <div class="faq-answer">${f.a}</div>
    </div>`).join('');
}

// ═══════════════════════════════════════
//  TIPS
// ═══════════════════════════════════════
function renderTips(cat) {
  const box = $('tipsList');
  if (!box) return;
  const list = !cat || cat === 'all' ? TIPS : TIPS.filter(t => t.cat === cat);
  box.innerHTML = list.map(t => `
    <div class="card" style="cursor:pointer" onclick="openModal(
      '<div class=\\'modal-title\\'>${t.t}</div><p style=\\'font-size:13px;line-height:1.6;color:var(--text2)\\'>${t.d}</p><button class=\\'btn btn-primary\\' style=\\'margin-top:14px\\' onclick=\\'closeModal()\\'>OK</button>')">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="font-size:22px">${t.i}</div>
        <div style="flex:1"><div style="font-size:13px;font-weight:600">${t.t}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:1px">${t.d.slice(0, 45)}...</div></div>
        <div style="color:var(--text4)">→</div>
      </div>
    </div>`).join('');
}

function selectTipTab(el, cat) {
  document.querySelectorAll('#tipTabs .tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderTips(cat);
}

// ═══════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════
function openWarranty() {
  openModal(`
    <div class="modal-title">🛡 Kafolat siyosati</div>
    <div class="card" style="background:var(--ok-bg);border:1.5px solid var(--ok-bg2);text-align:center">
      <div style="font-size:32px;margin-bottom:6px">🛡</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:3px">48 SOAT KAFOLAT</div>
      <div style="font-size:12px;color:var(--text2)">Norozi = bepul qayta tozalash!</div>
    </div>
    <div class="feature"><div class="feature-icon">✅</div><div class="feature-text">48 soat ichida murojaat qiling</div></div>
    <div class="feature"><div class="feature-icon">📸</div><div class="feature-text">Muammo joylarini rasmga oling</div></div>
    <div class="feature"><div class="feature-icon">📝</div><div class="feature-text">Sabab yozib qoldiring</div></div>
    <div class="feature"><div class="feature-icon">🔄</div><div class="feature-text">Bepul qayta tozalash</div></div>
    <button class="btn btn-primary" style="margin-top:12px" onclick="send({action:'warranty'});closeModal();toast('✅ Kafolat so\\'rovi yuborildi!')">🛡 Kafolat talabi</button>
    <button class="btn btn-outline" onclick="closeModal()">Yopish</button>`);
}

function openGift() {
  openModal(`
    <div class="modal-title">🎁 Sovg'a sertifikat</div>
    <p style="font-size:12px;color:var(--text2);margin-bottom:12px">Do'stingizga tozalash xizmati sovg'a qiling!</p>
    <div class="service-grid">${[500000, 1000000, 2000000, 5000000].map(a => `
      <div class="service-card" onclick="send({action:'gift',amount:${a}});closeModal();toast('✅ ${F(a)} so\\'m sertifikat so\\'raldi!')">
        <span class="service-icon">🎁</span>
        <div class="service-name">${F(a)}</div>
        <div class="service-price">so'm</div>
      </div>`).join('')}</div>
    <div class="form-group" style="margin-top:10px">
      <label class="form-label">🎟 Kodni ishlatish</label>
      <div style="display:flex;gap:6px"><input class="form-input" id="giftCode" placeholder="GIFT****" style="text-transform:uppercase">
      <button class="btn btn-primary" style="width:auto;padding:11px 14px" onclick="send({action:'gift_use',code:$('giftCode')?.value});closeModal();toast('✅ Tekshirilmoqda...')">✅</button></div>
    </div>
    <button class="btn btn-outline" onclick="closeModal()" style="margin-top:6px">Yopish</button>`);
}

function openPromos() {
  openModal(`
    <div class="modal-title">🎄 Aksiyalar</div>
    <div class="discount-grid" style="margin-bottom:12px">
      ${[
    { i: '🎉', t: 'Birinchi', v: '-5%', d: '1-buyurtma' },
    { i: '🏆', t: 'Sodiq', v: '-10%', d: '10+ buyurtma' },
    { i: '🌟', t: 'VIP', v: '-8%', d: '20+ buyurtma' },
    { i: '👥', t: 'Referral', v: '-5%', d: "Do'st taklif" },
    { i: '📦', t: 'Paket', v: '-10%', d: '2+ xizmat' },
    { i: '💎', t: 'Premium', v: '-20%', d: "A'zolik" },
  ].map(x => `<div class="discount-card"><div class="discount-icon">${x.i}</div><div class="discount-title">${x.t}</div><div class="discount-value">${x.v}</div><div class="discount-desc">${x.d}</div></div>`).join('')}
    </div>
    <div class="card-header">🎟 Promo kod</div>
    <div style="display:flex;gap:6px;margin-bottom:6px">
      <input class="form-input" id="promoIn" placeholder="PROMO kod...">
      <button class="btn btn-primary" style="width:auto;padding:11px 14px" onclick="send({action:'promo',code:$('promoIn')?.value});toast('✅ Tekshirilmoqda...')">✅</button>
    </div>
    <button class="btn btn-outline" onclick="closeModal()">Yopish</button>`);
}

function openPartner() {
  openModal(`
    <div class="modal-title">🤝 Hamkorlik</div>
    <div class="card" style="background:var(--grad-primary);color:#fff;text-align:center;border:none">
      <div style="font-size:28px;font-weight:800">10%</div>
      <div style="font-size:13px;font-weight:600">Har buyurtmadan komissiya!</div>
    </div>
    <div class="feature"><div class="feature-icon">1️⃣</div><div class="feature-text">Ariza bering</div></div>
    <div class="feature"><div class="feature-icon">2️⃣</div><div class="feature-text">Shaxsiy link oling</div></div>
    <div class="feature"><div class="feature-icon">3️⃣</div><div class="feature-text">Mijozlarni yo'naltiring</div></div>
    <div class="feature"><div class="feature-icon">4️⃣</div><div class="feature-text">Har buyurtmadan 10% oling</div></div>
    <div class="form-group" style="margin-top:12px">
      <label class="form-label">🏢 Biznes turi</label>
      <input class="form-input" id="partBiz" placeholder="Mebel do'koni, remont...">
    </div>
    <div class="form-group">
      <label class="form-label">📱 Telefon</label>
      <input class="form-input" type="tel" id="partPh" placeholder="+998...">
    </div>
    <button class="btn btn-success" onclick="if(!$('partBiz')?.value||!$('partPh')?.value){toast('❌ Ma\\'lumot kiriting');return}send({action:'partner',business:$('partBiz').value,phone:$('partPh').value});closeModal();toast('✅ Ariza yuborildi!')">📤 Ariza berish</button>`);
}

function openMembership() {
  openModal(`
    <div class="modal-title">💎 A'zolik rejalari</div>
    ${[
    { n: 'Basic', p: 200000, d: 10, perks: ['Har buyurtmada -10%', 'Ustuvor xizmat'] },
    { n: 'Premium', p: 500000, d: 20, perks: ['Har buyurtmada -20%', 'Ustuvor xizmat', 'Bepul konsultatsiya', 'VIP support'], rec: 1 },
  ].map(m => `
      <div class="card" style="margin-bottom:10px;border:${m.rec ? '2px solid var(--p)' : '1.5px solid var(--border)'}">
        ${m.rec ? '<span class="badge badge-blue" style="margin-bottom:6px">⭐ TAVSIYA</span>' : ''}
        <div class="card-header">${m.rec ? '💎' : '🥈'} ${m.n}</div>
        <div style="font-size:20px;font-weight:800;color:var(--p);margin-bottom:6px">${F(m.p)} <span style="font-size:11px;color:var(--text3)">so'm/oy</span></div>
        <div style="font-size:16px;font-weight:800;color:var(--ok);margin-bottom:8px">-${m.d}% <span style="font-size:11px;color:var(--text3)">har buyurtmada</span></div>
        ${m.perks.map(p => `<div class="feature" style="padding:4px 0"><div class="feature-icon">✅</div><div class="feature-text">${p}</div></div>`).join('')}
        <button class="btn ${m.rec ? 'btn-primary' : 'btn-outline'}" style="margin-top:10px"
          onclick="send({action:'membership',plan:'${m.n.toLowerCase()}',price:${m.p}});closeModal();toast('✅ So\\'rov yuborildi!')">
          💎 ${m.n} — ${F(m.p)} so'm</button>
      </div>`).join('')}
    <button class="btn btn-outline" onclick="closeModal()">Yopish</button>`);
}

function openCompare() {
  openModal(`
    <div class="modal-title">📊 Narx taqqoslash</div>
    <div style="overflow-x:auto;margin-bottom:12px">
      <table class="compare-table">
        <tr><th>Xizmat</th><th style="color:var(--p)">🏆 Biz</th><th>A</th><th>B</th></tr>
        <tr><td>Tozalash</td><td class="compare-us">500,000</td><td>600,000</td><td>550,000</td></tr>
        <tr><td>Divan</td><td class="compare-us">80,000</td><td>100,000</td><td>90,000</td></tr>
        <tr><td>Gilam</td><td class="compare-us">27,000</td><td>35,000</td><td>30,000</td></tr>
        <tr><td>Fasad</td><td class="compare-us">22,000</td><td>28,000</td><td>25,000</td></tr>
        <tr><td>Borish</td><td class="compare-highlight">BEPUL</td><td>+20,000</td><td>+15,000</td></tr>
        <tr><td>Kafolat</td><td class="compare-highlight">48 soat</td><td>Yo'q</td><td>24 soat</td></tr>
      </table>
    </div>
    <button class="btn btn-primary" onclick="closeModal();navigate('order');initOrder()">📝 Buyurtma berish</button>
    <button class="btn btn-outline" onclick="closeModal()">Yopish</button>`);
}

function openHomeProfile() {
  openModal(`
    <div class="modal-title">🏠 Uy profili</div>
    <p style="font-size:11px;color:var(--text3);margin-bottom:10px">Saqlang — keyingi buyurtmalarda tezroq!</p>
    <div class="form-group"><label class="form-label">🚪 Xonalar</label><input class="form-input" id="hRooms" value="${homeData.rooms || ''}" placeholder="3"></div>
    <div class="form-group"><label class="form-label">📐 Maydon (kv.m)</label><input class="form-input" id="hArea" value="${homeData.area || ''}" placeholder="80"></div>
    <div class="form-group"><label class="form-label">🏢 Qavat</label><input class="form-input" id="hFloor" value="${homeData.floor || ''}" placeholder="5"></div>
    <div class="form-group"><label class="form-label">📍 Manzil</label><input class="form-input" id="hAddr" value="${homeData.addr || ''}" placeholder="Ko'cha, uy..."></div>
    <div class="form-group"><label class="form-label">🔑 Eslatma</label><textarea class="form-input" id="hNotes" placeholder="Eshik kodi, lift...">${homeData.notes || ''}</textarea></div>
    <button class="btn btn-success" onclick="saveHomeProfile()">💾 Saqlash</button>`);
}

function saveHomeProfile() {
  homeData = {
    rooms: $('hRooms')?.value || '',
    area: $('hArea')?.value || '',
    floor: $('hFloor')?.value || '',
    addr: $('hAddr')?.value || '',
    notes: $('hNotes')?.value || '',
  };
  send({ action: 'home_profile', ...homeData });
  closeModal();
  toast('✅ Uy profili saqlandi!');
}

function openPrivacy() {
  openModal(`
    <div class="modal-title">🔐 Maxfiylik</div>
    <div class="feature"><div class="feature-icon">✅</div><div class="feature-text">Telefon — faqat aloqa uchun</div></div>
    <div class="feature"><div class="feature-icon">✅</div><div class="feature-text">Manzil — faqat xizmat uchun</div></div>
    <div class="feature"><div class="feature-icon">✅</div><div class="feature-text">Rasmlar — narx aniqlash uchun</div></div>
    <div class="feature"><div class="feature-icon">❌</div><div class="feature-text">Uchinchi shaxslarga berilmaydi</div></div>
    <div class="feature"><div class="feature-icon">❌</div><div class="feature-text">Reklama uchun ishlatilmaydi</div></div>
    <button class="btn btn-danger" style="margin-top:12px" onclick="if(confirm('Barcha ma\\'lumotlar o\\'chiriladi!')){send({action:'delete_data'});closeModal();toast('✅ So\\'rov yuborildi')}">🗑 Ma'lumotlarni o'chirish</button>
    <button class="btn btn-outline" onclick="closeModal()">Yopish</button>`);
}

function openSettings() {
  openModal(`
    <div class="modal-title">⚙️ Sozlamalar</div>
    <div class="switch-row">
      <div class="switch-info"><div class="switch-name">🌙 Dark rejim</div><div class="switch-desc">Qorang'i interfeys</div></div>
      <div class="switch-toggle${document.body.classList.contains('dark') ? ' on' : ''}" onclick="toggleDark();this.classList.toggle('on')"></div>
    </div>
    <div class="switch-row">
      <div class="switch-info"><div class="switch-name">🔔 Bildirishnomalar</div><div class="switch-desc">Eslatmalar</div></div>
      <div class="switch-toggle on" onclick="this.classList.toggle('on')"></div>
    </div>
    <div class="switch-row">
      <div class="switch-info"><div class="switch-name">🌐 Til</div><div class="switch-desc">O'zbek tili</div></div>
      <div style="font-size:16px">🇺🇿</div>
    </div>
    <button class="btn btn-primary" style="margin-top:12px" onclick="closeModal();toast('✅ Saqlandi')">Saqlash</button>`);
}

function toggleDark() {
  document.body.classList.toggle('dark');
  const btn = $('themeBtn');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// ═══════════════════════════════════════
//  INIT
// ═══════════════════════════════════════
function init() {
  renderHome();
  renderCalc();
  renderFaq();
  renderTips();
  navigate('home');

  // Modal close on overlay click
  $('modalBg')?.addEventListener('click', e => {
    if (e.target === $('modalBg')) closeModal();
  });

  // Telegram MainButton
  try {
    tg.MainButton.setText('📝 Buyurtma berish');
    tg.MainButton.show();
    tg.MainButton.onClick(() => { navigate('order'); initOrder(); });
  } catch (e) { }
}

document.addEventListener('DOMContentLoaded', init);
