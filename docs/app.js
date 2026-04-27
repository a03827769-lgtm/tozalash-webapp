'use strict';

// ═══════════════════════════════════════
//  INIT
// ═══════════════════════════════════════
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
const U = tg.initDataUnsafe?.user || {};
if (tg.colorScheme === 'dark') document.body.classList.add('dark');

// ═══════════════════════════════════════
//  DATA
// ═══════════════════════════════════════
const CFG = {
  phone: '+998887887011',
  card: '5614 6817 1876 7068',
  holder: 'M.A.',
  bot: 'tozalash_servisbot',
};

const SVC = [
  { id: 'cleaning_standard', e: '🧹', n: 'Oddiy tozalash', p: 500000, u: 'ishchi', t: 'w', hot: 1 },
  { id: 'cleaning_general', e: '🧼', n: 'General tozalash', p: 500000, u: 'ishchi', t: 'w' },
  { id: 'cleaning_renovation', e: '🔨', n: 'Remont keyin', p: 600000, u: 'ishchi', t: 'w' },
  { id: 'sofa', e: '🛋', n: 'Divan yuvish', p: 80000, u: "o'rin", mn: 5, mx: 50, t: 'q' },
  { id: 'chair', e: '💺', n: 'Stul yuvish', p: 50000, u: 'dona', mn: 5, mx: 50, t: 'q' },
  { id: 'carpet', e: '🟫', n: 'Gilam yuvish', p: 27000, u: 'kv.m', mn: 10, mx: 200, t: 'q' },
  { id: 'facade', e: '🏢', n: 'Fasad yuvish', p: 22000, u: 'kv.m', mn: 1, mx: 500, t: 'q' },
  { id: 'tile', e: '🧱', n: 'Plitka yuvish', p: 15000, u: 'kv.m', mn: 1, mx: 500, t: 'q' },
];

const DST = ['Bektemir', 'Chilonzor', 'Yakkasaroy', 'Mirobod', 'Mirzo Ulugbek', 'Sergeli', 'Shayxontohur', 'Olmazor', 'Uchtepa', 'Yashnobod', 'Yunusobod'];
const HRS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const HOL = ['2025-03-30', '2025-03-31', '2025-04-01', '2025-06-06', '2025-06-07', '2025-06-08'];

const FAQ = [
  { q: 'Narxlar qanday?', a: "Oddiy/General: 500,000/ishchi. Remont keyin: 600,000. Divan: 80,000/o'rin. Gilam: 27,000/kv.m." },
  { q: 'Ish vaqti?', a: 'Har kuni 09:00–17:00. Bayram kunlari dam olamiz.' },
  { q: 'Vositalar kimdan?', a: 'Barcha Karcher apparatlari va vositalar bizdan.' },
  { q: "To'lov qanday?", a: 'Naqd yoki karta: 5614 6817 1876 7068 (M.A.)' },
  { q: 'Qayerlarga xizmat?', a: 'Toshkent shahri. Borish bepul.' },
  { q: 'Minimal buyurtma?', a: "Divan min 5 o'rin. Stul min 5. Gilam min 10 kv.m." },
  { q: 'Shoshilinch?', a: '24 soatdan kam = narx +25%.' },
  { q: 'Kafolat?', a: '48 soat ichida norozi = bepul qayta tozalash.' },
  { q: 'Ishchilar soni?', a: "Admin rasmlarni ko'rib belgilaydi (max 10)." },
  { q: 'Chegirmalar?', a: 'Birinchi -5%, 10+ -10%, VIP -8%, Referral -5%.' },
];

const TIPS = [
  { c: '🧹 Tozalash', e: '🧹', t: 'Chang artish', d: "Yuqoridan pastga. Avval tokchalar, keyin pol." },
  { c: '🧹 Tozalash', e: '✨', t: 'Oyna tozalash', d: "Gazeta + sprey = iz qoldirmaydi." },
  { c: '🛋 Mebel', e: '🛋', t: 'Divan parvarishi', d: "Har 6 oyda professional tozalash." },
  { c: '🟫 Gilam', e: '🟫', t: 'Gilam hidi', d: "Soda sepib 30 min, keyin changyutgich." },
  { c: '🧹 Tozalash', e: '⏰', t: 'Tozalash jadvali', d: "Kun: idish, pol. Hafta: hammom. Oy: general." },
  { c: '🛋 Mebel', e: '🧴', t: "Dog' ketkazish", d: "Yangi dog' = darhol sovuq suv." },
];

const ACH = [
  { i: '🎉', n: 'Birinchi qadam', d: '1 buyurtma' },
  { i: '⭐', n: 'Doimiy', d: '3 buyurtma' },
  { i: '🌟', n: 'Sodiq', d: '5 buyurtma' },
  { i: '💎', n: 'Oltin', d: '10 buyurtma' },
  { i: '👑', n: 'Brilliant', d: '25 buyurtma' },
  { i: '💰', n: 'Millioner', d: '1M+ sarfladi' },
  { i: '🤝', n: 'Taklif ustasi', d: "3 do'st" },
  { i: '📝', n: 'Sharhchi', d: 'Sharh qoldirdi' },
];

const LVL = [
  { n: '🥉 Bronze', mn: 0, mx: 500 },
  { n: '🥈 Silver', mn: 500, mx: 1500 },
  { n: '🥇 Gold', mn: 1500, mx: 3000 },
  { n: '💎 Diamond', mn: 3000, mx: 5000 },
  { n: '👑 Legend', mn: 5000, mx: 99999 },
];

// ═══════════════════════════════════════
//  STATE
// ═══════════════════════════════════════
let picked = null;
let step = 0;
let ord = {};
let cSvc = SVC[0];
let cQty = 1;
let calM = new Date().getMonth();
let calY = new Date().getFullYear();
let home = {};

// ═══════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════
const $ = id => document.getElementById(id);
const F = n => Math.round(n).toLocaleString('uz-UZ');
const td = () => new Date().toISOString().split('T')[0];
const isHol = d => HOL.includes(d);
const isUrg = d => {
  try { const diff = new Date(d + 'T09:00') - new Date(); return diff > 0 && diff < 86400000; }
  catch { return false; }
};

function toast(m, ms = 2500) {
  const t = $('toast'); t.textContent = m; t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), ms);
}

function openM(h) {
  $('mBox').innerHTML = '<div class="modal-handle"></div>' + h;
  $('mBg').classList.add('on'); document.body.style.overflow = 'hidden';
}

function closeM() {
  $('mBg').classList.remove('on'); document.body.style.overflow = '';
}

function uR(el) {
  const mn = +el.min, mx = +el.max, v = +el.value;
  el.style.background = `linear-gradient(to right,var(--primary) ${(v - mn) / (mx - mn) * 100}%,var(--bg-tertiary) ${(v - mn) / (mx - mn) * 100}%)`;
}

function send(d) { try { tg.sendData(JSON.stringify(d)); } catch (e) { console.warn(e); } }

function copy(t) {
  try { navigator.clipboard.writeText(t); } catch {
    const a = document.createElement('textarea'); a.value = t;
    document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove();
  }
  toast('📋 Nusxalandi!');
}

function refCode() { return U.id ? 'TS' + String(U.id).slice(-6).toUpperCase() : 'TSGUEST'; }
function getLvl(p) { return LVL.find(l => p >= l.mn && p < l.mx) || LVL[0]; }

// ═══════════════════════════════════════
//  NAV
// ═══════════════════════════════════════
function go(pg) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = $('pg-' + pg); if (el) el.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.p === pg));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pg === 'home') drawHome();
  if (pg === 'calc') drawCalc();
  if (pg === 'me') drawProf();
  if (pg === 'more') { drawFaq(); drawTips(); }
}

// ═══════════════════════════════════════
//  HOME
// ═══════════════════════════════════════
function drawHome() {
  const el = $('homeSvc');
  if (!el) return;
  el.innerHTML = SVC.filter(s => !['tile', 'chair'].includes(s.id)).map(s => `
    <div class="svc${picked?.id === s.id ? ' sel' : ''}" onclick="pick('${s.id}')">
      ${s.hot ? '<div class="svc-hot">TOP</div>' : ''}
      <span class="svc-emoji">${s.e}</span>
      <div class="svc-name">${s.n}</div>
      <div class="svc-price">${F(s.p)}/${s.u}</div>
    </div>`).join('');
}

function pick(id) {
  picked = SVC.find(s => s.id === id); drawHome();
  setTimeout(() => { go('order'); newOrder(); }, 150);
}

// ═══════════════════════════════════════
//  CALCULATOR
// ═══════════════════════════════════════
function drawCalc() {
  const ch = $('calcChips');
  if (ch) ch.innerHTML = SVC.map(s => `
    <div class="chip${cSvc.id === s.id ? ' on' : ''}"
      onclick="cSvc=SVC.find(x=>x.id==='${s.id}');cQty=cSvc.t==='w'?1:(cSvc.mn||1);drawCalc()">
      ${s.e} ${s.n}
    </div>`).join('');

  const sl = $('calcRange');
  if (sl) {
    if (cSvc.t === 'w') {
      sl.innerHTML = `<div class="card-title">👷 Ishchilar</div>
        <div class="range-display" id="cRv">${cQty} ishchi</div>
        <input type="range" min="1" max="10" value="${cQty}" id="cR"
          oninput="cQty=+this.value;calcUpd();uR(this)">
        <div class="range-row"><span>1</span><span>10</span></div>`;
    } else {
      sl.innerHTML = `<div class="card-title">📊 Miqdor (${cSvc.u})</div>
        <div class="range-display" id="cRv">${cQty} ${cSvc.u}</div>
        <input type="range" min="${cSvc.mn || 1}" max="${cSvc.mx || 100}" value="${cQty}" id="cR"
          oninput="cQty=+this.value;calcUpd();uR(this)">
        <div class="range-row"><span>${cSvc.mn || 1}</span><span>${cSvc.mx || 100}</span></div>`;
    }
    uR($('cR'));
  }
  calcUpd();
}

function calcUpd() {
  const t = cSvc.p * cQty;
  const d = $('calcTop');
  if (d) d.innerHTML = `<div class="calc-label">Taxminiy narx</div>
    <div class="calc-price">${F(t)} <span>so'm</span></div>
    <div class="calc-detail">${cQty} ${cSvc.u} × ${F(cSvc.p)}</div>`;
  const rv = $('cRv');
  if (rv) rv.textContent = `${cQty} ${cSvc.u}`;
  if ($('cd5')) $('cd5').textContent = F(Math.round(t * .95));
  if ($('cd10')) $('cd10').textContent = F(Math.round(t * .90));
  if ($('cdU')) $('cdU').textContent = '+' + F(Math.round(t * .25));
  if ($('cdP')) $('cdP').textContent = F(Math.round(t * .90));

  const cmp = $('calcCmp');
  if (cmp) cmp.innerHTML = `<table class="cmp-table">
    <tr><th></th><th style="color:var(--primary)">🏆 Biz</th><th>A</th><th>B</th></tr>
    <tr><td>Narx</td><td class="cmp-us">${F(t)}</td><td>${F(Math.round(t * 1.2))}</td><td>${F(Math.round(t * 1.1))}</td></tr>
    <tr><td>-5%</td><td class="cmp-hl">${F(Math.round(t * .95))}</td><td>—</td><td>—</td></tr>
    <tr><td>Borish</td><td class="cmp-hl">Bepul</td><td>+20K</td><td>+15K</td></tr>
    <tr><td>Kafolat</td><td class="cmp-hl">48 soat</td><td>Yo'q</td><td>24s</td></tr>
    </table>`;
}

function calcOrder() { picked = cSvc; ord.qty = cQty; go('order'); newOrder(true); }

// ═══════════════════════════════════════
//  ORDER
// ═══════════════════════════════════════
function newOrder(fromCalc) {
  if (!picked) picked = SVC[0];
  step = 0;
  const s = picked;
  ord = {
    srv: s, qty: fromCalc ? (ord.qty || (s.t === 'w' ? 1 : s.mn || 1)) : (s.t === 'w' ? 1 : s.mn || 1),
    dist: '', addr: home.addr || '', date: '', time: '09:00', phone: '', pay: '',
  };
  drawOrd();
}

function drawOrd() {
  const st = $('oSteps'), lb = $('oLabel'), bd = $('oBody');
  if (!st || !bd) return;

  const titles = ['Xizmat & miqdor', 'Manzil', 'Sana & vaqt', "To'lov", 'Tasdiqlash'];
  st.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<div class="step ${i < step ? 'done' : i === step ? 'now' : ''}"></div>`).join('');
  lb.textContent = `${step + 1}/5 — ${titles[step]}`;

  const S = ord.srv;

  switch (step) {

    case 0:
      bd.innerHTML = `
        <div class="card"><div class="card-title">🛠 Xizmat tanlang</div>
          <div class="svc-grid" style="margin-bottom:14px">${SVC.map(s => `
            <div class="svc${ord.srv.id === s.id ? ' sel' : ''}"
              onclick="ord.srv=SVC.find(x=>x.id==='${s.id}');ord.qty=${s.t === 'w' ? 1 : s.mn || 1};drawOrd()">
              <span class="svc-emoji">${s.e}</span>
              <div class="svc-name">${s.n}</div>
              <div class="svc-price">${F(s.p)}/${s.u}</div>
            </div>`).join('')}
          </div>
          ${S.t === 'w' ? `
            <div class="card-title">👷 Ishchilar soni</div>
            <div class="range-display" id="oRv">${ord.qty} ishchi</div>
            <input type="range" min="1" max="10" value="${ord.qty}" id="oR"
              oninput="ord.qty=+this.value;$('oRv').textContent=this.value+' ishchi';uR(this)">
            <div class="range-row"><span>1</span><span>10</span></div>
            <div class="input-hint">💰 ${F(S.p)} so'm/ishchi/kun</div>
          ` : `
            <div class="card-title">📊 Miqdor (${S.u})</div>
            <div class="field"><input class="input" type="number" id="qI" value="${ord.qty}" min="${S.mn || 1}">
            <div class="input-hint">Min: ${S.mn || 1} ${S.u} • ${F(S.p)} so'm/${S.u}</div></div>
          `}
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="go('home')">❌ Bekor</button>
          <button class="btn btn-primary" onclick="s0()">Davom ▶</button>
        </div>`;
      if ($('oR')) uR($('oR'));
      break;

    case 1:
      bd.innerHTML = `
        <div class="card"><div class="card-title">📍 Manzil</div>
          <div class="field"><label class="label">📍 Tuman <span class="req">*</span></label>
            <select class="input" id="oD">${DST.map(d => `<option${ord.dist === d ? ' selected' : ''}>${d}</option>`).join('')}</select></div>
          <div class="field"><label class="label">🏠 Manzil <span class="req">*</span></label>
            <input class="input" id="oA" placeholder="Ko'cha, uy, mo'ljal..." value="${ord.addr}">
            <div class="input-hint">To'liq manzil kiriting</div></div>
          ${home.addr ? `<div style="padding:8px 10px;background:var(--primary-subtle);border-radius:var(--radius-sm);font-size:12px;cursor:pointer;border:1px solid var(--primary-light)"
            onclick="$('oA').value='${home.addr}';toast('✅')">📌 ${home.addr.slice(0, 35)}</div>` : ''}
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="step--;drawOrd()">◀</button>
          <button class="btn btn-primary" onclick="s1()">Davom ▶</button>
        </div>`;
      break;

    case 2:
      bd.innerHTML = `
        <div class="card"><div class="card-title">📅 Sana</div><div id="calBox"></div></div>
        <div class="card"><div class="card-title">⏰ Vaqt</div><div class="chips" id="tChips"></div></div>
        ${ord.date && isUrg(ord.date) ? `<div class="urgent-card"><div class="urgent-label">Shoshilinch buyurtma</div><div class="urgent-value">+25%</div><div class="urgent-desc">24 soatdan kam vaqt</div></div>` : ''}
        <div class="btn-row">
          <button class="btn btn-outline" onclick="step--;drawOrd()">◀</button>
          <button class="btn btn-primary" onclick="s2()">Davom ▶</button>
        </div>`;
      drawCal(); drawTime();
      break;

    case 3:
      bd.innerHTML = `
        <div class="card"><div class="card-title">📱 Aloqa</div>
          <div class="field"><label class="label">📞 Telefon <span class="req">*</span></label>
            <div class="input-wrap"><span class="input-icon">📱</span>
            <input class="input" type="tel" id="oPh" placeholder="+998 90 123 45 67" value="${ord.phone}"></div></div>
        </div>
        <div class="card"><div class="card-title">💳 To'lov</div>
          <div class="chips" style="margin-bottom:10px">
            <div class="chip${ord.pay === 'cash' ? ' on' : ''}" onclick="ord.pay='cash';drawOrd()">💵 Naqd</div>
            <div class="chip${ord.pay === 'card' ? ' on' : ''}" onclick="ord.pay='card';drawOrd()">💳 Karta</div>
          </div>
          ${ord.pay === 'card' ? `
            <div class="pay-card"><div class="pay-card-logo">💳</div>
              <div class="pay-card-label">TO'LOV KARTASI</div>
              <div class="pay-card-num">${CFG.card}</div>
              <div class="pay-card-name">${CFG.holder}</div>
            </div>
            <div class="input-hint">Tasdiqlangach kartaga o'tkazing</div>` : ''}
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="step--;drawOrd()">◀</button>
          <button class="btn btn-primary" onclick="s3()">Davom ▶</button>
        </div>`;
      break;

    case 4:
      const base = S.p * ord.qty;
      const urg = isUrg(ord.date);
      const urgA = urg ? Math.round(base * .25) : 0;
      const fin = base + urgA;
      bd.innerHTML = `
        <div class="summary">
          <div class="summary-head">📋 Buyurtma xulosasi</div>
          <div class="summary-row"><span class="lbl">Xizmat</span><span class="val">${S.e} ${S.n}</span></div>
          <div class="summary-row"><span class="lbl">Miqdor</span><span class="val">${ord.qty} ${S.u}</span></div>
          <div class="summary-row"><span class="lbl">Tuman</span><span class="val">📍 ${ord.dist}</span></div>
          <div class="summary-row"><span class="lbl">Manzil</span><span class="val">${ord.addr}</span></div>
          <div class="summary-row"><span class="lbl">Sana</span><span class="val">📅 ${ord.date}</span></div>
          <div class="summary-row"><span class="lbl">Vaqt</span><span class="val">⏰ ${ord.time}</span></div>
          <div class="summary-row"><span class="lbl">Telefon</span><span class="val">📱 ${ord.phone}</span></div>
          <div class="summary-row"><span class="lbl">To'lov</span><span class="val">${ord.pay === 'card' ? '💳 Karta' : '💵 Naqd'}</span></div>
          <div class="summary-row"><span class="lbl">Narx</span><span class="val">${F(base)} so'm</span></div>
          ${urg ? `<div class="summary-row"><span class="lbl" style="color:var(--danger)">⚡ Shoshilinch</span><span class="val" style="color:var(--danger)">+${F(urgA)}</span></div>` : ''}
          <div class="summary-row summary-total"><span>JAMI</span><span>${F(fin)} so'm</span></div>
        </div>
        <button class="btn btn-success" onclick="submit(${fin})" style="font-size:16px;padding:16px">✅ BUYURTMA BERISH</button>
        <button class="btn btn-ghost" onclick="step--;drawOrd()">◀ Orqaga</button>`;
      break;
  }
}

// Validators
function s0() {
  const S = ord.srv;
  if (S.t === 'q') {
    const v = +($('qI')?.value || ord.qty);
    if (S.mn && v < S.mn) { toast(`❌ Min ${S.mn} ${S.u}`); $('qI')?.classList.add('err'); return; }
    if (S.mx && v > S.mx) { toast(`❌ Max ${S.mx}`); return; }
    ord.qty = v;
  }
  step++; drawOrd();
}
function s1() {
  const a = $('oA')?.value?.trim();
  if (!a || a.length < 5) { toast('❌ Manzil kiriting (min 5)'); $('oA')?.classList.add('err'); return; }
  ord.dist = $('oD')?.value || DST[0]; ord.addr = a;
  step++; drawOrd();
}
function s2() {
  if (!ord.date) { toast('❌ Sanani tanlang'); return; }
  if (!ord.time) ord.time = '09:00';
  step++; drawOrd();
}
function s3() {
  const ph = $('oPh')?.value?.trim();
  if (!ph || ph.length < 9) { toast('❌ Telefon kiriting'); $('oPh')?.classList.add('err'); return; }
  if (!ord.pay) { toast("❌ To'lov tanlang"); return; }
  ord.phone = ph; step++; drawOrd();
}

function submit(price) {
  send({
    action: 'order', service: ord.srv.id, qty: ord.qty,
    district: ord.dist, address: ord.addr,
    date: ord.date, time: ord.time,
    phone: ord.phone, payment: ord.pay,
    urgent: isUrg(ord.date), final_price: price,
  });
  $('oBody').innerHTML = `
    <div class="success">
      <span class="success-emoji">🎉</span>
      <div class="success-title">Buyurtma qabul qilindi!</div>
      <div class="success-desc">Operator tez orada bog'lanadi va kerakli ishchilar sonini belgilaydi.</div>
      <div class="success-pill">📞 ${CFG.phone}</div>
      <button class="btn btn-primary" style="margin-top:16px" onclick="go('home')">🏠 Asosiy sahifa</button>
    </div>`;
  $('oSteps').innerHTML = ''; $('oLabel').textContent = '';
  toast('✅ Buyurtma yuborildi!');
}

// ═══════════════════════════════════════
//  CALENDAR
// ═══════════════════════════════════════
function drawCal() {
  const box = $('calBox'); if (!box) return;
  const MO = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
  const DN = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
  const first = (new Date(calY, calM, 1).getDay() + 6) % 7;
  const days = new Date(calY, calM + 1, 0).getDate();
  const now = td();

  let h = `<div class="cal"><div class="cal-head">
    <div class="cal-arr" onclick="calM--;if(calM<0){calM=11;calY--}drawCal()">‹</div>
    <div class="cal-month">${MO[calM]} ${calY}</div>
    <div class="cal-arr" onclick="calM++;if(calM>11){calM=0;calY++}drawCal()">›</div>
    </div><div class="cal-grid">`;

  h += DN.map(d => `<div class="cal-dn">${d}</div>`).join('');
  h += Array(first).fill('<div class="cal-d empty"></div>').join('');

  for (let d = 1; d <= days; d++) {
    const ds = `${calY}-${String(calM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const past = ds < now, hol = isHol(ds), sel = ord.date === ds, today = ds === now;
    let cls = 'cal-d';
    if (past || hol) cls += ' off';
    else if (sel) cls += ' sel';
    else if (today) cls += ' today';
    if (hol) cls += ' hol';
    const click = past || hol ? '' : `onclick="ord.date='${ds}';drawCal();drawOrd()"`;
    h += `<div class="${cls}" ${click}>${d}</div>`;
  }

  h += '</div>';
  if (ord.date) {
    const u = isUrg(ord.date);
    h += `<div style="margin-top:8px;padding:8px 10px;background:${u ? 'var(--danger-light)' : 'var(--success-light)'};
      border-radius:var(--radius-sm);font-size:11px;font-weight:500;color:${u ? 'var(--danger)' : 'var(--success)'}">
      ${u ? '⚡ Shoshilinch! Narx +25%' : '✅ ' + ord.date}</div>`;
  }
  h += '</div>';
  box.innerHTML = h;
}

function drawTime() {
  const box = $('tChips'); if (!box) return;
  box.innerHTML = HRS.map(t => `
    <div class="chip${ord.time === t ? ' on' : ''}" onclick="ord.time='${t}';drawTime()">🕐 ${t}</div>`).join('');
}

// ═══════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════
function drawProf() {
  const name = [U.first_name, U.last_name].filter(Boolean).join(' ') || 'Foydalanuvchi';
  const pts = 150, lvl = getLvl(pts);
  const pct = Math.min(100, ((pts - lvl.mn) / (lvl.mx - lvl.mn)) * 100);

  const pc = $('profCard');
  if (pc) pc.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <div style="width:48px;height:48px;background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:14px;
        display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;flex-shrink:0;font-weight:700;
        box-shadow:var(--shadow-primary)">${U.first_name ? U.first_name[0].toUpperCase() : '👤'}</div>
      <div style="flex:1"><div style="font-size:15px;font-weight:700">${name}</div>
        <div style="font-size:11px;color:var(--text-tertiary)">@${U.username || 'N/A'}</div></div>
      <span class="badge badge-blue">${lvl.n}</span>
    </div>
    <div class="level-card">
      <div class="level-emoji">${lvl.n.split(' ')[0]}</div>
      <div class="level-info"><div class="level-name">${lvl.n}</div>
        <div class="level-sub">${F(lvl.mx - pts)} ball → keyingi</div>
        <div class="progress" style="margin-top:6px;background:rgba(255,255,255,.15)">
          <div class="progress-bar" style="width:${pct}%;background:rgba(255,255,255,.7)"></div></div>
      </div>
      <div class="level-pts">${pts}<small> ball</small></div>
    </div>
    <div class="stat-row" style="margin-top:6px">
      <div class="stat"><span class="stat-emoji">📋</span><div class="stat-num">0</div><div class="stat-text">Buyurtma</div></div>
      <div class="stat"><span class="stat-emoji">💰</span><div class="stat-num">0</div><div class="stat-text">Sarflagan</div></div>
      <div class="stat"><span class="stat-emoji">👥</span><div class="stat-num">0</div><div class="stat-text">Taklif</div></div>
    </div>`;

  const ab = $('achBox');
  if (ab) ab.innerHTML = ACH.map(a => `
    <div class="ach locked"><div class="ach-emoji">${a.i}</div>
      <div><div class="ach-name">${a.n}</div><div class="ach-desc">🔒 ${a.d}</div></div>
    </div>`).join('');

  const rf = $('refC'); if (rf) rf.textContent = refCode();
}

function copyRef() { copy(`https://t.me/${CFG.bot}?start=ref_${refCode()}`); }
function shareRef() {
  const url = `https://t.me/${CFG.bot}?start=ref_${refCode()}`;
  try { tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Tozalash Servis — birinchi buyurtmaga -5%!')}`); }
  catch { copy(url); }
}

// ═══════════════════════════════════════
//  FAQ & TIPS
// ═══════════════════════════════════════
function drawFaq(q) {
  const box = $('faqBox'); if (!box) return;
  const s = (q || '').toLowerCase().trim();
  const list = s ? FAQ.filter(f => f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s)) : FAQ;
  if (!list.length) { box.innerHTML = `<div class="empty" style="padding:20px"><span class="empty-emoji">🔍</span><div class="empty-title">Topilmadi</div></div>`; return; }
  box.innerHTML = list.map(f => `
    <div class="faq" onclick="this.classList.toggle('open')">
      <div class="faq-q">${f.q}<span class="faq-icon">▼</span></div>
      <div class="faq-a">${f.a}</div>
    </div>`).join('');
}

function drawTips(c) {
  const box = $('tipBox'); if (!box) return;
  const list = !c || c === 'all' ? TIPS : TIPS.filter(t => t.c === c);
  box.innerHTML = list.map(t => `
    <div class="card" style="cursor:pointer" onclick="openM('<div class=\\'modal-title\\'>${t.t}</div><p style=\\'font-size:13px;line-height:1.6;color:var(--text-secondary)\\'>${t.d}</p><button class=\\'btn btn-primary\\' style=\\'margin-top:14px\\' onclick=\\'closeM()\\'>OK</button>')">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="font-size:22px">${t.e}</div>
        <div style="flex:1"><div style="font-size:13px;font-weight:600">${t.t}</div>
          <div style="font-size:11px;color:var(--text-tertiary);margin-top:1px">${t.d.slice(0, 40)}...</div></div>
        <div style="color:var(--text-quaternary)">→</div>
      </div>
    </div>`).join('');
}

function pickTipTab(el, c) {
  document.querySelectorAll('#tipTabs .tab').forEach(t => t.classList.remove('on'));
  el.classList.add('on'); drawTips(c);
}

// ═══════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════
function openWarranty() {
  openM(`<div class="modal-title">🛡 Kafolat</div>
    <div class="card" style="background:var(--success-light);border:1.5px solid rgba(0,168,107,.15);text-align:center">
      <div style="font-size:32px;margin-bottom:6px">🛡</div>
      <div style="font-size:15px;font-weight:700">48 SOAT KAFOLAT</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-top:3px">Norozi = bepul qayta tozalash!</div>
    </div>
    <div class="feat"><div class="feat-icon">✅</div><div class="feat-text">48 soat ichida murojaat</div></div>
    <div class="feat"><div class="feat-icon">📸</div><div class="feat-text">Muammo rasmini yuboring</div></div>
    <div class="feat"><div class="feat-icon">📝</div><div class="feat-text">Sabab yozing</div></div>
    <div class="feat"><div class="feat-icon">🔄</div><div class="feat-text">Bepul qayta tozalash</div></div>
    <button class="btn btn-primary" style="margin-top:12px" onclick="send({action:'warranty'});closeM();toast('✅ Yuborildi!')">🛡 Kafolat talabi</button>
    <button class="btn btn-ghost" onclick="closeM()">Yopish</button>`);
}

function openGift() {
  openM(`<div class="modal-title">🎁 Sovg'a sertifikat</div>
    <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px">Do'stingizga tozalash sovg'a qiling!</p>
    <div class="svc-grid">${[500000, 1000000, 2000000, 5000000].map(a => `
      <div class="svc" onclick="send({action:'gift',amount:${a}});closeM();toast('✅ ${F(a)} sertifikat!')">
        <span class="svc-emoji">🎁</span><div class="svc-name">${F(a)}</div><div class="svc-price">so'm</div>
      </div>`).join('')}</div>
    <div class="field" style="margin-top:10px"><label class="label">🎟 Kodni ishlatish</label>
      <div style="display:flex;gap:6px"><input class="input" id="gC" placeholder="GIFT****" style="text-transform:uppercase">
      <button class="btn btn-primary" style="width:auto;padding:12px 16px" onclick="send({action:'gift_use',code:$('gC')?.value});closeM();toast('✅ Tekshirilmoqda...')">✅</button></div>
    </div>
    <button class="btn btn-ghost" onclick="closeM()">Yopish</button>`);
}

function openPromos() {
  openM(`<div class="modal-title">🎄 Aksiyalar</div>
    <div class="disc-grid" style="margin-bottom:12px">
      ${[
    { e: '🎉', t: 'Birinchi', v: '-5%', d: '1-buyurtma' }, { e: '🏆', t: 'Sodiq', v: '-10%', d: '10+' },
    { e: '🌟', t: 'VIP', v: '-8%', d: '20+' }, { e: '👥', t: 'Referral', v: '-5%', d: "Do'st" },
    { e: '📦', t: 'Paket', v: '-10%', d: '2+ xizmat' }, { e: '💎', t: 'Premium', v: '-20%', d: "A'zolik" },
  ].map(x => `<div class="disc"><span class="disc-emoji">${x.e}</span><div class="disc-label">${x.t}</div><div class="disc-value">${x.v}</div><div class="disc-desc">${x.d}</div></div>`).join('')}
    </div>
    <div class="card-title">🎟 Promo kod</div>
    <div class="promo-row"><input class="input" id="pC" placeholder="KOD...">
      <button class="btn btn-primary" onclick="send({action:'promo',code:$('pC')?.value});toast('✅')">✅</button></div>
    <button class="btn btn-ghost" onclick="closeM()" style="margin-top:6px">Yopish</button>`);
}

function openPartner() {
  openM(`<div class="modal-title">🤝 Hamkorlik</div>
    <div class="card" style="background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;text-align:center;border:none">
      <div style="font-size:28px;font-weight:800">10%</div>
      <div style="font-size:13px;font-weight:600">Har buyurtmadan komissiya!</div>
    </div>
    <div class="feat"><div class="feat-icon">1️⃣</div><div class="feat-text">Ariza bering</div></div>
    <div class="feat"><div class="feat-icon">2️⃣</div><div class="feat-text">Shaxsiy link oling</div></div>
    <div class="feat"><div class="feat-icon">3️⃣</div><div class="feat-text">Mijozlarni yo'naltiring</div></div>
    <div class="feat"><div class="feat-icon">4️⃣</div><div class="feat-text">10% komissiya oling</div></div>
    <div class="field" style="margin-top:12px"><label class="label">🏢 Biznes</label><input class="input" id="pB" placeholder="Mebel do'koni..."></div>
    <div class="field"><label class="label">📱 Telefon</label><input class="input" type="tel" id="pP" placeholder="+998..."></div>
    <button class="btn btn-success" onclick="if(!$('pB')?.value||!$('pP')?.value){toast('❌ Kiriting');return}send({action:'partner',business:$('pB').value,phone:$('pP').value});closeM();toast('✅ Yuborildi!')">📤 Ariza</button>`);
}

function openMember() {
  openM(`<div class="modal-title">💎 A'zolik</div>
    ${[{ n: 'Basic', p: 200000, d: 10, pk: ['Har buyurtma -10%', 'Ustuvor xizmat'] },
    { n: 'Premium', p: 500000, d: 20, pk: ['Har buyurtma -20%', 'Ustuvor xizmat', 'Bepul konsultatsiya', 'VIP support'], r: 1 }].map(m => `
      <div class="card" style="border:${m.r ? '2px solid var(--primary)' : '1.5px solid var(--border-primary)'}">
        ${m.r ? '<span class="badge badge-blue" style="margin-bottom:6px">⭐ TAVSIYA</span>' : ''}
        <div class="card-title">${m.r ? '💎' : '🥈'} ${m.n}</div>
        <div style="font-size:22px;font-weight:800;color:var(--primary);margin-bottom:6px">${F(m.p)} <span style="font-size:11px;color:var(--text-tertiary)">so'm/oy</span></div>
        <div style="font-size:18px;font-weight:800;color:var(--success);margin-bottom:8px">-${m.d}%</div>
        ${m.pk.map(p => `<div class="feat" style="padding:4px 0"><div class="feat-icon">✅</div><div class="feat-text">${p}</div></div>`).join('')}
        <button class="btn ${m.r ? 'btn-primary' : 'btn-outline'}" style="margin-top:10px"
          onclick="send({action:'membership',plan:'${m.n.toLowerCase()}',price:${m.p}});closeM();toast('✅ Yuborildi!')">
          ${m.r ? '💎' : '🥈'} ${m.n} — ${F(m.p)}</button>
      </div>`).join('')}
    <button class="btn btn-ghost" onclick="closeM()">Yopish</button>`);
}

function openCompare() {
  openM(`<div class="modal-title">📊 Taqqoslash</div>
    <div style="overflow-x:auto;margin-bottom:12px"><table class="cmp-table">
      <tr><th></th><th style="color:var(--primary)">🏆 Biz</th><th>A</th><th>B</th></tr>
      <tr><td>Tozalash</td><td class="cmp-us">500K</td><td>600K</td><td>550K</td></tr>
      <tr><td>Divan</td><td class="cmp-us">80K</td><td>100K</td><td>90K</td></tr>
      <tr><td>Gilam</td><td class="cmp-us">27K</td><td>35K</td><td>30K</td></tr>
      <tr><td>Borish</td><td class="cmp-hl">Bepul</td><td>+20K</td><td>+15K</td></tr>
      <tr><td>Kafolat</td><td class="cmp-hl">48s</td><td>Yo'q</td><td>24s</td></tr>
    </table></div>
    <button class="btn btn-primary" onclick="closeM();go('order');newOrder()">📝 Buyurtma</button>
    <button class="btn btn-ghost" onclick="closeM()">Yopish</button>`);
}

function openHome() {
  openM(`<div class="modal-title">🏠 Uy profili</div>
    <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:10px">Saqlang — keyingi buyurtmalarda tezroq!</p>
    <div class="field"><label class="label">🚪 Xonalar</label><input class="input" id="hR" value="${home.rooms || ''}" placeholder="3"></div>
    <div class="field"><label class="label">📐 Maydon</label><input class="input" id="hA" value="${home.area || ''}" placeholder="80 kv.m"></div>
    <div class="field"><label class="label">🏢 Qavat</label><input class="input" id="hF" value="${home.floor || ''}" placeholder="5"></div>
    <div class="field"><label class="label">📍 Manzil</label><input class="input" id="hAd" value="${home.addr || ''}" placeholder="Ko'cha, uy..."></div>
    <div class="field"><label class="label">🔑 Eslatma</label><textarea class="input" id="hN" placeholder="Eshik kodi, lift...">${home.notes || ''}</textarea></div>
    <button class="btn btn-success" onclick="saveHome()">💾 Saqlash</button>`);
}

function saveHome() {
  home = { rooms: $('hR')?.value, area: $('hA')?.value, floor: $('hF')?.value, addr: $('hAd')?.value, notes: $('hN')?.value };
  send({ action: 'home_profile', ...home }); closeM(); toast('✅ Saqlandi!');
}

function openPrivacy() {
  openM(`<div class="modal-title">🔐 Maxfiylik</div>
    <div class="feat"><div class="feat-icon">✅</div><div class="feat-text">Telefon — faqat aloqa</div></div>
    <div class="feat"><div class="feat-icon">✅</div><div class="feat-text">Manzil — faqat xizmat</div></div>
    <div class="feat"><div class="feat-icon">❌</div><div class="feat-text">3-shaxslarga berilmaydi</div></div>
    <div class="feat"><div class="feat-icon">❌</div><div class="feat-text">Reklama uchun ishlatilmaydi</div></div>
    <button class="btn btn-danger" style="margin-top:12px" onclick="if(confirm('Barcha ma\\'lumotlar o\\'chiriladi!')){send({action:'delete_data'});closeM();toast('✅ Yuborildi')}">🗑 O'chirish</button>
    <button class="btn btn-ghost" onclick="closeM()">Yopish</button>`);
}

function openSettings() {
  openM(`<div class="modal-title">⚙️ Sozlamalar</div>
    <div class="sw-row"><div class="sw-body"><div class="sw-name">🌙 Dark rejim</div><div class="sw-desc">Qorang'i mavzu</div></div>
      <div class="sw-toggle${document.body.classList.contains('dark') ? ' on' : ''}" onclick="toggleTheme();this.classList.toggle('on')"></div></div>
    <div class="sw-row"><div class="sw-body"><div class="sw-name">🔔 Bildirishnomalar</div><div class="sw-desc">Eslatmalar</div></div>
      <div class="sw-toggle on" onclick="this.classList.toggle('on')"></div></div>
    <div class="sw-row"><div class="sw-body"><div class="sw-name">🌐 Til</div><div class="sw-desc">O'zbek</div></div>
      <div style="font-size:16px">🇺🇿</div></div>
    <button class="btn btn-primary" style="margin-top:12px" onclick="closeM();toast('✅ Saqlandi')">Saqlash</button>`);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const btn = $('themeBtn');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// ═══════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════
function boot() {
  drawHome(); drawCalc(); drawFaq(); drawTips(); go('home');
  $('mBg')?.addEventListener('click', e => { if (e.target === $('mBg')) closeM(); });
  try { tg.MainButton.setText('📝 Buyurtma berish'); tg.MainButton.show();
    tg.MainButton.onClick(() => { go('order'); newOrder(); }); } catch { }
}

document.addEventListener('DOMContentLoaded', boot);
