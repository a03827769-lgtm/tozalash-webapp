'use strict';

// ═══════════════════════════════════════
//  TELEGRAM WEBAPP INIT
// ═══════════════════════════════════════
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
const U = tg.initDataUnsafe?.user || {};
if (tg.colorScheme === 'dark') document.body.classList.add('dark');

// ═══════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════
const CFG = {
  phone: '+998887887011',
  card: '5614 6817 1876 7068',
  holder: 'M.A.',
  bot: 'tozalash_servisbot',
  channel: '@tozalash_servis',
  insta: '@tozalash.servis',
};

// ═══════════════════════════════════════
//  SERVICES DATA
// ═══════════════════════════════════════
const SVC = [
  {id:'cleaning_standard', e:'🧹', n:'Oddiy tozalash', p:500000, u:'ishchi', t:'w', hot:true},
  {id:'cleaning_general', e:'🧼', n:'General tozalash', p:500000, u:'ishchi', t:'w'},
  {id:'cleaning_renovation', e:'🔨', n:'Remont keyin', p:600000, u:'ishchi', t:'w'},
  {id:'sofa', e:'🛋', n:'Divan yuvish', p:80000, u:"o'rin", mn:5, mx:50, t:'q'},
  {id:'chair', e:'💺', n:'Stul yuvish', p:50000, u:'dona', mn:5, mx:50, t:'q'},
  {id:'carpet', e:'🟫', n:'Gilam yuvish', p:27000, u:'kv.m', mn:10, mx:200, t:'q'},
  {id:'facade', e:'🏢', n:'Fasad yuvish', p:22000, u:'kv.m', mn:1, mx:500, t:'q'},
  {id:'tile', e:'🧱', n:'Plitka yuvish', p:15000, u:'kv.m', mn:1, mx:500, t:'q'},
];

const DST = [
  'Bektemir','Chilonzor','Yakkasaroy','Mirobod','Mirzo Ulugbek',
  'Sergeli','Shayxontohur','Olmazor','Uchtepa','Yashnobod','Yunusobod'
];

const HRS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

const HOL = [
  '2025-03-30','2025-03-31','2025-04-01',
  '2025-06-06','2025-06-07','2025-06-08'
];

const FAQS = [
  {q:'Narxlar qanday?', a:"Oddiy/General: 500,000/ishchi. Remont keyin: 600,000. Divan: 80,000/o'rin (min 5). Gilam: 27,000/kv.m (min 10). Stul: 50,000 (min 5)."},
  {q:'Ish vaqti?', a:'Har kuni 09:00–17:00. Bayram kunlari dam olamiz.'},
  {q:'Vositalar kimdan?', a:'Barcha Karcher apparatlari va tozalash vositalari bizdan. Siz hech narsa tayyorlashingiz shart emas.'},
  {q:"To'lov qanday?", a:"Naqd pul yoki karta orqali. Karta: 5614 6817 1876 7068 (M.A.)"},
  {q:'Qayerlarga xizmat?', a:'Toshkent shahri barcha tumanlari. Borish narxga kiritilgan - bepul.'},
  {q:'Minimal buyurtma?', a:"Tozalash: min 1 ishchi. Divan: min 5 o'rin. Stul: min 5. Gilam: min 10 kv.m."},
  {q:'Shoshilinch buyurtma?', a:'Ha! 24 soatdan kam qolsa narx 25% ga oshadi.'},
  {q:'Kafolat bormi?', a:"Ha! 48 soat ichida sifatdan norozi bo'lsangiz BEPUL qayta tozalaymiz."},
  {q:'Ishchilar soni?', a:"Siz rasm yuborasiz, admin ko'rib kerakli sonni belgilaydi (max 10)."},
  {q:'Chegirmalar?', a:'Birinchi -5%. 10+ buyurtma -10%. VIP (20+) -8%. Referral -5%. Membership -10/-20%.'},
];

const TIPS = [
  {c:'🧹 Tozalash', e:'🧹', t:'Chang artish tartibi', d:"Doim yuqoridan pastga tozalang. Avval tokchalar va shkaf ustlari, keyin pol."},
  {c:'🧹 Tozalash', e:'✨', t:'Oyna tozalash siri', d:"Gazeta bilan oynalarni artsangiz iz qoldirmaydi! Sprey + gazeta = mukammal natija."},
  {c:'🧹 Tozalash', e:'⏰', t:'Tozalash jadvali', d:"Har kun: idish yuvish, pol artish. Har hafta: hammom. Har oy: umumiy tozalash."},
  {c:'🛋 Mebel', e:'🛋', t:'Divan parvarishi', d:"Har 6 oyda professional tozalash tavsiya etiladi. Yangi dog'ni darhol sovuq suv bilan yuving."},
  {c:'🛋 Mebel', e:'🧴', t:"Dog' ketkazish", d:"Yangi dog' paydo bo'lsa darhol sovuq suv bilan yuving. Issiq suv dog'ni mustahkamlaydi!"},
  {c:'🟫 Gilam', e:'🟫', t:'Gilam hidi ketkazish', d:"Soda sepib 30 daqiqa qo'ying, keyin changyutgich bilan oling. Hid butunlay yo'qoladi!"},
];

const ACHS = [
  {i:'🎉', n:'Birinchi qadam', d:'1 buyurtma berdi'},
  {i:'⭐', n:'Doimiy mijoz', d:'3 buyurtma'},
  {i:'🌟', n:'Sodiq mijoz', d:'5 buyurtma'},
  {i:'💎', n:'Oltin mijoz', d:'10 buyurtma'},
  {i:'👑', n:'Brilliant', d:'25 buyurtma'},
  {i:'💰', n:'Millioner', d:"1M+ sarfladi"},
  {i:'🤝', n:'Taklif ustasi', d:"3 do'st taklif qildi"},
  {i:'📝', n:'Sharhchi', d:'Sharh qoldirdi'},
];

const LVLS = [
  {n:'🥉 Bronze', mn:0, mx:500},
  {n:'🥈 Silver', mn:500, mx:1500},
  {n:'🥇 Gold', mn:1500, mx:3000},
  {n:'💎 Diamond', mn:3000, mx:5000},
  {n:'👑 Legend', mn:5000, mx:99999},
];

// ═══════════════════════════════════════
//  STATE
// ═══════════════════════════════════════
let picked = null;    // Tanlangan xizmat
let step = 0;         // Buyurtma bosqichi
let ord = {};         // Buyurtma ma'lumotlari
let cSvc = SVC[0];   // Kalkulyator xizmati
let cQty = 1;         // Kalkulyator miqdori
let calM = new Date().getMonth();
let calY = new Date().getFullYear();
let savedHome = {};   // Saqlangan uy profili
let sendLocked = false; // sendData bir marta ishlashi uchun

// ═══════════════════════════════════════
//  UTILITY FUNCTIONS
// ═══════════════════════════════════════
function $(id) {
  return document.getElementById(id);
}

function F(n) {
  try {
    const num = Math.round(Number(n) || 0);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } catch(e) {
    return '0';
  }
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function isHoliday(d) {
  return HOL.includes(d);
}

function isUrgent(d) {
  try {
    const target = new Date(d + 'T09:00');
    const now = new Date();
    const diff = target - now;
    return diff > 0 && diff < 86400000;
  } catch(e) {
    return false;
  }
}

function isPast(d) {
  return d < todayStr();
}

function toast(msg, duration) {
  const t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(t._timer);
  t._timer = setTimeout(function() {
    t.classList.remove('on');
  }, duration || 2500);
}

function openM(html) {
  const box = $('mBox');
  const bg = $('mBg');
  if (!box || !bg) return;
  box.innerHTML = '<div class="modal-handle"></div>' + html;
  bg.classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeM() {
  const bg = $('mBg');
  if (!bg) return;
  bg.classList.remove('on');
  document.body.style.overflow = '';
}

function updateRange(el) {
  if (!el) return;
  var mn = Number(el.min);
  var mx = Number(el.max);
  var v = Number(el.value);
  var pct = ((v - mn) / (mx - mn)) * 100;
  el.style.background = 'linear-gradient(to right, var(--primary) ' + pct + '%, var(--bg-tertiary) ' + pct + '%)';
}

function sendData(data) {
  if (sendLocked) {
    toast('⏳ Yuborilmoqda...');
    return;
  }
  try {
    sendLocked = true;
    tg.sendData(JSON.stringify(data));
    setTimeout(function() { sendLocked = false; }, 3000);
  } catch(e) {
    sendLocked = false;
    console.warn('sendData error:', e);
    toast('❌ Yuborib bo\'lmadi');
  }
}

function copyText(txt) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt);
    } else {
      var ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    toast('📋 Nusxalandi!');
  } catch(e) {
    toast('❌ Nusxalab bo\'lmadi');
  }
}

function getRefCode() {
  if (U.id) {
    return 'TS' + String(U.id).slice(-6).toUpperCase();
  }
  return 'TSGUEST';
}

function getLevel(pts) {
  for (var i = 0; i < LVLS.length; i++) {
    if (pts >= LVLS[i].mn && pts < LVLS[i].mx) {
      return LVLS[i];
    }
  }
  return LVLS[0];
}

function getUserName() {
  var parts = [];
  if (U.first_name) parts.push(U.first_name);
  if (U.last_name) parts.push(U.last_name);
  return parts.join(' ') || 'Foydalanuvchi';
}

// ═══════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════
function go(pg) {
  // Sahifalarni almashtirish
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }
  var target = $('pg-' + pg);
  if (target) target.classList.add('active');

  // Nav tugmalarni yangilash
  var navs = document.querySelectorAll('.nav-item');
  for (var j = 0; j < navs.length; j++) {
    var navPg = navs[j].getAttribute('data-p');
    if (navPg === pg) {
      navs[j].classList.add('active');
    } else {
      navs[j].classList.remove('active');
    }
  }

  // Scrollni tepaga
  window.scrollTo({top: 0, behavior: 'smooth'});

  // Sahifaga mos render
  if (pg === 'home') drawHome();
  if (pg === 'calc') drawCalc();
  if (pg === 'me') drawProfile();
  if (pg === 'more') {
    drawFaq();
    drawTips();
  }
}

// ═══════════════════════════════════════
//  HOME PAGE
// ═══════════════════════════════════════
function drawHome() {
  var el = $('homeSvc');
  if (!el) return;

  var html = '';
  for (var i = 0; i < SVC.length; i++) {
    var s = SVC[i];
    if (s.id === 'tile' || s.id === 'chair') continue;

    var selClass = (picked && picked.id === s.id) ? ' sel' : '';
    var hotBadge = s.hot ? '<div class="svc-hot">TOP</div>' : '';

    html += '<div class="svc' + selClass + '" onclick="pickSvc(\'' + s.id + '\')">';
    html += hotBadge;
    html += '<span class="svc-emoji">' + s.e + '</span>';
    html += '<div class="svc-name">' + s.n + '</div>';
    html += '<div class="svc-price">' + F(s.p) + '/' + s.u + '</div>';
    html += '</div>';
  }
  el.innerHTML = html;
}

function pickSvc(id) {
  for (var i = 0; i < SVC.length; i++) {
    if (SVC[i].id === id) {
      picked = SVC[i];
      break;
    }
  }
  drawHome();
  setTimeout(function() {
    go('order');
    newOrder(false);
  }, 150);
}

// ═══════════════════════════════════════
//  CALCULATOR
// ═══════════════════════════════════════
function drawCalc() {
  drawCalcChips();
  drawCalcSlider();
  updateCalcDisplay();
  drawCalcCompare();
  drawCalcDiscounts();
}

function drawCalcChips() {
  var el = $('calcChips');
  if (!el) return;

  var html = '';
  for (var i = 0; i < SVC.length; i++) {
    var s = SVC[i];
    var cls = (cSvc.id === s.id) ? ' on' : '';
    html += '<div class="chip' + cls + '" onclick="setCalcSvc(\'' + s.id + '\')">';
    html += s.e + ' ' + s.n;
    html += '</div>';
  }
  el.innerHTML = html;
}

function setCalcSvc(id) {
  for (var i = 0; i < SVC.length; i++) {
    if (SVC[i].id === id) {
      cSvc = SVC[i];
      break;
    }
  }
  cQty = (cSvc.t === 'w') ? 1 : (cSvc.mn || 1);
  drawCalc();
}

function drawCalcSlider() {
  var el = $('calcRange');
  if (!el) return;

  var html = '';
  if (cSvc.t === 'w') {
    html += '<div class="card-title">👷 Ishchilar soni</div>';
    html += '<div class="range-display" id="cRangeVal">' + cQty + ' ishchi</div>';
    html += '<input type="range" min="1" max="10" value="' + cQty + '" id="cRangeInput"';
    html += ' oninput="cQty=Number(this.value);updateCalcDisplay();updateRange(this)">';
    html += '<div class="range-row"><span>1</span><span>10</span></div>';
  } else {
    var mn = cSvc.mn || 1;
    var mx = cSvc.mx || 100;
    html += '<div class="card-title">📊 Miqdor (' + cSvc.u + ')</div>';
    html += '<div class="range-display" id="cRangeVal">' + cQty + ' ' + cSvc.u + '</div>';
    html += '<input type="range" min="' + mn + '" max="' + mx + '" value="' + cQty + '" id="cRangeInput"';
    html += ' oninput="cQty=Number(this.value);updateCalcDisplay();updateRange(this)">';
    html += '<div class="range-row"><span>' + mn + '</span><span>' + mx + '</span></div>';
  }
  el.innerHTML = html;

  var rangeInput = $('cRangeInput');
  if (rangeInput) updateRange(rangeInput);
}

function updateCalcDisplay() {
  var total = cSvc.p * cQty;

  var disp = $('calcTop');
  if (disp) {
    disp.innerHTML =
      '<div class="calc-label">Taxminiy narx</div>' +
      '<div class="calc-price">' + F(total) + ' <span>so\'m</span></div>' +
      '<div class="calc-detail">' + cQty + ' ' + cSvc.u + ' × ' + F(cSvc.p) + '</div>';
  }

  var rv = $('cRangeVal');
  if (rv) rv.textContent = cQty + ' ' + cSvc.u;

  drawCalcDiscounts();
  drawCalcCompare();
}

function drawCalcDiscounts() {
  var total = cSvc.p * cQty;
  var d5 = $('cd5');
  var d10 = $('cd10');
  var dU = $('cdU');
  var dP = $('cdP');
  if (d5) d5.textContent = F(Math.round(total * 0.95));
  if (d10) d10.textContent = F(Math.round(total * 0.90));
  if (dU) dU.textContent = '+' + F(Math.round(total * 0.25));
  if (dP) dP.textContent = F(Math.round(total * 0.90));
}

function drawCalcCompare() {
  var el = $('calcCmp');
  if (!el) return;
  var t = cSvc.p * cQty;

  el.innerHTML =
    '<table class="cmp-table">' +
    '<tr><th></th><th style="color:var(--primary)">🏆 Biz</th><th>Komp. A</th><th>Komp. B</th></tr>' +
    '<tr><td>Narx</td><td class="cmp-us">' + F(t) + '</td><td>' + F(Math.round(t*1.2)) + '</td><td>' + F(Math.round(t*1.1)) + '</td></tr>' +
    '<tr><td>-5% bilan</td><td class="cmp-hl">' + F(Math.round(t*0.95)) + '</td><td>—</td><td>—</td></tr>' +
    '<tr><td>Borish</td><td class="cmp-hl">Bepul</td><td>+20K</td><td>+15K</td></tr>' +
    '<tr><td>Kafolat</td><td class="cmp-hl">48 soat</td><td>Yo\'q</td><td>24 soat</td></tr>' +
    '</table>';
}

function calcOrder() {
  picked = cSvc;
  go('order');
  newOrder(true);
}

// ═══════════════════════════════════════
//  ORDER FLOW
// ═══════════════════════════════════════
function newOrder(fromCalc) {
  if (!picked) picked = SVC[0];
  step = 0;
  var s = picked;
  ord = {
    srv: s,
    qty: fromCalc ? cQty : (s.t === 'w' ? 1 : (s.mn || 1)),
    dist: '',
    addr: savedHome.addr || '',
    date: '',
    time: '09:00',
    phone: '',
    pay: ''
  };
  drawOrder();
}

function drawOrder() {
  var stepsEl = $('oSteps');
  var labelEl = $('oLabel');
  var bodyEl = $('oBody');
  if (!stepsEl || !bodyEl) return;

  // Steps indicator
  var titles = ['Xizmat', 'Manzil', 'Sana', "To'lov", 'Tasdiqlash'];
  var stepsHtml = '';
  for (var i = 0; i < 5; i++) {
    var cls = 'step';
    if (i < step) cls += ' done';
    else if (i === step) cls += ' now';
    stepsHtml += '<div class="' + cls + '"></div>';
  }
  stepsEl.innerHTML = stepsHtml;
  if (labelEl) labelEl.textContent = (step+1) + '/5 — ' + titles[step];

  var S = ord.srv;
  var html = '';

  switch (step) {

    // ═══ STEP 0: XIZMAT VA MIQDOR ═══
    case 0:
      html += '<div class="card"><div class="card-title">🛠 Xizmat tanlang</div>';
      html += '<div class="svc-grid" style="margin-bottom:14px">';
      for (var a = 0; a < SVC.length; a++) {
        var sv = SVC[a];
        var selCls = (ord.srv.id === sv.id) ? ' sel' : '';
        html += '<div class="svc' + selCls + '" onclick="changeOrderSvc(\'' + sv.id + '\')">';
        html += '<span class="svc-emoji">' + sv.e + '</span>';
        html += '<div class="svc-name">' + sv.n + '</div>';
        html += '<div class="svc-price">' + F(sv.p) + '/' + sv.u + '</div></div>';
      }
      html += '</div>';

      if (S.t === 'w') {
        html += '<div class="card-title">👷 Ishchilar soni</div>';
        html += '<div class="range-display" id="oQtyVal">' + ord.qty + ' ishchi</div>';
        html += '<input type="range" min="1" max="10" value="' + ord.qty + '" id="oQtyRange"';
        html += ' oninput="ord.qty=Number(this.value);$(\'oQtyVal\').textContent=this.value+\' ishchi\';updateRange(this)">';
        html += '<div class="range-row"><span>1</span><span>10</span></div>';
        html += '<div class="input-hint">💰 ' + F(S.p) + " so'm/ishchi/kun</div>";
      } else {
        html += '<div class="card-title">📊 Miqdor (' + S.u + ')</div>';
        html += '<div class="field">';
        html += '<input class="input" type="number" id="qtyInput" value="' + ord.qty + '" min="' + (S.mn||1) + '">';
        html += '<div class="input-hint">Min: ' + (S.mn||1) + ' ' + S.u + ' • ' + F(S.p) + " so'm/" + S.u + '</div>';
        html += '</div>';
      }
      html += '</div>';
      html += '<div class="btn-row">';
      html += '<button class="btn btn-outline" onclick="go(\'home\')">❌ Bekor</button>';
      html += '<button class="btn btn-primary" onclick="validateStep0()">Davom ▶</button>';
      html += '</div>';
      break;

    // ═══ STEP 1: MANZIL ═══
    case 1:
      html += '<div class="card"><div class="card-title">📍 Manzil</div>';
      html += '<div class="field"><label class="label">📍 Tuman <span class="req">*</span></label>';
      html += '<select class="input" id="distSelect">';
      for (var b = 0; b < DST.length; b++) {
        var sel = (ord.dist === DST[b]) ? ' selected' : '';
        html += '<option' + sel + '>' + DST[b] + '</option>';
      }
      html += '</select></div>';
      html += '<div class="field"><label class="label">🏠 Manzil <span class="req">*</span></label>';
      html += '<input class="input" id="addrInput" placeholder="Ko\'cha, uy, mo\'ljal..." value="' + (ord.addr || '') + '">';
      html += '<div class="input-hint">To\'liq manzil kiriting (min 5 belgi)</div></div>';

      if (savedHome.addr) {
        html += '<div style="padding:8px 10px;background:var(--primary-subtle);border-radius:var(--radius-sm);';
        html += 'font-size:12px;cursor:pointer;border:1px solid var(--primary-light);margin-top:4px"';
        html += ' onclick="$(\'addrInput\').value=\'' + savedHome.addr.replace(/'/g, "\\'") + '\';toast(\'✅\')">';
        html += '📌 Saqlangan: <b>' + savedHome.addr.substring(0, 30) + '</b></div>';
      }
      html += '</div>';
      html += '<div class="btn-row">';
      html += '<button class="btn btn-outline" onclick="step--;drawOrder()">◀ Orqaga</button>';
      html += '<button class="btn btn-primary" onclick="validateStep1()">Davom ▶</button>';
      html += '</div>';
      break;

    // ═══ STEP 2: SANA VA VAQT ═══
    case 2:
      html += '<div class="card"><div class="card-title">📅 Sanani tanlang</div>';
      html += '<div id="calendarBox"></div></div>';
      html += '<div class="card"><div class="card-title">⏰ Boshlanish vaqti</div>';
      html += '<div class="chips" id="timeChips"></div></div>';

      if (ord.date && isUrgent(ord.date)) {
        html += '<div class="urgent-card">';
        html += '<div class="urgent-label">SHOSHILINCH BUYURTMA</div>';
        html += '<div class="urgent-value">+25%</div>';
        html += '<div class="urgent-desc">24 soatdan kam vaqt qolgan</div></div>';
      }

      html += '<div class="btn-row">';
      html += '<button class="btn btn-outline" onclick="step--;drawOrder()">◀ Orqaga</button>';
      html += '<button class="btn btn-primary" onclick="validateStep2()">Davom ▶</button>';
      html += '</div>';
      break;

    // ═══ STEP 3: TELEFON VA TO'LOV ═══
    case 3:
      html += '<div class="card"><div class="card-title">📱 Aloqa</div>';
      html += '<div class="field"><label class="label">📞 Telefon <span class="req">*</span></label>';
      html += '<div class="input-wrap"><span class="input-icon">📱</span>';
      html += '<input class="input" type="tel" id="phoneInput" placeholder="+998 90 123 45 67" value="' + (ord.phone || '') + '">';
      html += '</div></div></div>';

      html += '<div class="card"><div class="card-title">💳 To\'lov usuli</div>';
      html += '<div class="chips" style="margin-bottom:10px">';
      html += '<div class="chip' + (ord.pay === 'cash' ? ' on' : '') + '" onclick="ord.pay=\'cash\';drawOrder()">💵 Naqd pul</div>';
      html += '<div class="chip' + (ord.pay === 'card' ? ' on' : '') + '" onclick="ord.pay=\'card\';drawOrder()">💳 Karta</div>';
      html += '</div>';

      if (ord.pay === 'card') {
        html += '<div class="pay-card"><div class="pay-card-logo">💳</div>';
        html += '<div class="pay-card-label">TO\'LOV KARTASI</div>';
        html += '<div class="pay-card-num">' + CFG.card + '</div>';
        html += '<div class="pay-card-name">' + CFG.holder + '</div></div>';
        html += '<div class="input-hint">Buyurtma tasdiqlangach kartaga o\'tkazing</div>';
      }
      html += '</div>';
      html += '<div class="btn-row">';
      html += '<button class="btn btn-outline" onclick="step--;drawOrder()">◀ Orqaga</button>';
      html += '<button class="btn btn-primary" onclick="validateStep3()">Davom ▶</button>';
      html += '</div>';
      break;

    // ═══ STEP 4: TASDIQLASH ═══
    case 4:
      var basePrice = S.p * ord.qty;
      var urg = isUrgent(ord.date);
      var urgAmount = urg ? Math.round(basePrice * 0.25) : 0;
      var finalPrice = basePrice + urgAmount;

      html += '<div class="summary">';
      html += '<div class="summary-head">📋 Buyurtma xulosasi</div>';
      html += '<div class="summary-row"><span class="lbl">Xizmat</span><span class="val">' + S.e + ' ' + S.n + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">Miqdor</span><span class="val">' + ord.qty + ' ' + S.u + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">Tuman</span><span class="val">📍 ' + ord.dist + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">Manzil</span><span class="val">' + ord.addr + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">Sana</span><span class="val">📅 ' + ord.date + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">Vaqt</span><span class="val">⏰ ' + ord.time + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">Telefon</span><span class="val">📱 ' + ord.phone + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">To\'lov</span><span class="val">' + (ord.pay === 'card' ? '💳 Karta' : '💵 Naqd') + '</span></div>';
      html += '<div class="summary-row"><span class="lbl">Asosiy narx</span><span class="val">' + F(basePrice) + ' so\'m</span></div>';

      if (urg) {
        html += '<div class="summary-row"><span class="lbl" style="color:var(--danger)">⚡ Shoshilinch</span>';
        html += '<span class="val" style="color:var(--danger)">+' + F(urgAmount) + ' so\'m</span></div>';
      }

      html += '<div class="summary-row summary-total"><span>JAMI</span><span>' + F(finalPrice) + ' so\'m</span></div>';
      html += '</div>';

      html += '<button class="btn btn-success" onclick="submitOrder(' + finalPrice + ')" style="font-size:16px;padding:16px">✅ BUYURTMA BERISH</button>';
      html += '<button class="btn btn-ghost" onclick="step--;drawOrder()">◀ Orqaga</button>';
      break;
  }

  bodyEl.innerHTML = html;

  // Range init
  if (step === 0) {
    var oRange = $('oQtyRange');
    if (oRange) updateRange(oRange);
  }

  // Calendar va Time init
  if (step === 2) {
    drawCalendar();
    drawTimeChips();
  }
}

function changeOrderSvc(id) {
  for (var i = 0; i < SVC.length; i++) {
    if (SVC[i].id === id) {
      ord.srv = SVC[i];
      ord.qty = SVC[i].t === 'w' ? 1 : (SVC[i].mn || 1);
      break;
    }
  }
  drawOrder();
}

// ═══ VALIDATORS ═══
function validateStep0() {
  var S = ord.srv;
  if (S.t === 'q') {
    var input = $('qtyInput');
    var v = input ? Number(input.value) : ord.qty;
    if (isNaN(v) || v <= 0) { toast('❌ Son kiriting'); return; }
    if (S.mn && v < S.mn) {
      toast('❌ Minimal ' + S.mn + ' ' + S.u);
      if (input) input.classList.add('err');
      return;
    }
    if (S.mx && v > S.mx) {
      toast('❌ Maksimal ' + S.mx + ' ' + S.u);
      return;
    }
    ord.qty = v;
  }
  step++;
  drawOrder();
}

function validateStep1() {
  var addrEl = $('addrInput');
  var distEl = $('distSelect');
  var addr = addrEl ? addrEl.value.trim() : '';

  if (!addr || addr.length < 5) {
    toast('❌ Manzil kiriting (min 5 belgi)');
    if (addrEl) addrEl.classList.add('err');
    return;
  }

  ord.dist = distEl ? distEl.value : DST[0];
  ord.addr = addr;
  step++;
  drawOrder();
}

function validateStep2() {
  if (!ord.date) {
    toast('❌ Sanani tanlang');
    return;
  }
  if (!ord.time) {
    ord.time = '09:00';
  }
  step++;
  drawOrder();
}

function validateStep3() {
  var phoneEl = $('phoneInput');
  var phone = phoneEl ? phoneEl.value.trim() : '';

  if (!phone || phone.length < 9) {
    toast('❌ Telefon raqam kiriting');
    if (phoneEl) phoneEl.classList.add('err');
    return;
  }
  if (!ord.pay) {
    toast("❌ To'lov usulini tanlang");
    return;
  }

  ord.phone = phone;
  step++;
  drawOrder();
}

function submitOrder(price) {
  sendData({
    action: 'order',
    service: ord.srv.id,
    qty: ord.qty,
    district: ord.dist,
    address: ord.addr,
    date: ord.date,
    time: ord.time,
    phone: ord.phone,
    payment: ord.pay,
    urgent: isUrgent(ord.date),
    final_price: price
  });

  var bodyEl = $('oBody');
  if (bodyEl) {
    bodyEl.innerHTML =
      '<div class="success">' +
      '<span class="success-emoji">🎉</span>' +
      '<div class="success-title">Buyurtma qabul qilindi!</div>' +
      '<div class="success-desc">Operator tez orada bog\'lanadi va kerakli ishchilar sonini belgilaydi.</div>' +
      '<div class="success-pill">📞 ' + CFG.phone + '</div>' +
      '<button class="btn btn-primary" style="margin-top:16px" onclick="go(\'home\')">🏠 Asosiy sahifa</button>' +
      '</div>';
  }

  var stepsEl = $('oSteps');
  if (stepsEl) stepsEl.innerHTML = '';
  var labelEl = $('oLabel');
  if (labelEl) labelEl.textContent = '';

  toast('✅ Buyurtma yuborildi!');
}

// ═══════════════════════════════════════
//  CALENDAR
// ═══════════════════════════════════════
function drawCalendar() {
  var box = $('calendarBox');
  if (!box) return;

  var months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
  var dayNames = ['Du','Se','Ch','Pa','Ju','Sh','Ya'];
  var firstDay = (new Date(calY, calM, 1).getDay() + 6) % 7;
  var totalDays = new Date(calY, calM + 1, 0).getDate();
  var today = todayStr();

  var html = '<div class="cal">';
  html += '<div class="cal-head">';
  html += '<div class="cal-arr" onclick="calPrev()">‹</div>';
  html += '<div class="cal-month">' + months[calM] + ' ' + calY + '</div>';
  html += '<div class="cal-arr" onclick="calNext()">›</div>';
  html += '</div>';
  html += '<div class="cal-grid">';

  for (var i = 0; i < dayNames.length; i++) {
    html += '<div class="cal-dn">' + dayNames[i] + '</div>';
  }

  for (var e = 0; e < firstDay; e++) {
    html += '<div class="cal-d empty"></div>';
  }

  for (var d = 1; d <= totalDays; d++) {
    var ds = calY + '-' + String(calM + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    var past = isPast(ds);
    var hol = isHoliday(ds);
    var selected = (ord.date === ds);
    var isToday = (ds === today);

    var cls = 'cal-d';
    if (past || hol) cls += ' off';
    else if (selected) cls += ' sel';
    else if (isToday) cls += ' today';
    if (hol) cls += ' hol';

    var click = '';
    if (!past && !hol) {
      click = ' onclick="selectDate(\'' + ds + '\')"';
    }

    html += '<div class="' + cls + '"' + click + '>' + d + '</div>';
  }

  html += '</div>';

  if (ord.date) {
    var urg = isUrgent(ord.date);
    var bgColor = urg ? 'var(--danger-light)' : 'var(--success-light)';
    var textColor = urg ? 'var(--danger)' : 'var(--success)';
    var statusText = urg ? '⚡ Shoshilinch! Narx +25%' : '✅ Tanlangan: ' + ord.date;

    html += '<div style="margin-top:8px;padding:8px 10px;background:' + bgColor + ';';
    html += 'border-radius:var(--radius-sm);font-size:11px;font-weight:500;color:' + textColor + '">';
    html += statusText + '</div>';
  }

  html += '</div>';
  box.innerHTML = html;
}

function selectDate(ds) {
  ord.date = ds;
  drawCalendar();
  // Urgent bo'lsa step ni qayta chizish
  drawOrder();
}

function calPrev() {
  calM--;
  if (calM < 0) { calM = 11; calY--; }
  drawCalendar();
}

function calNext() {
  calM++;
  if (calM > 11) { calM = 0; calY++; }
  drawCalendar();
}

function drawTimeChips() {
  var box = $('timeChips');
  if (!box) return;

  var html = '';
  for (var i = 0; i < HRS.length; i++) {
    var t = HRS[i];
    var cls = (ord.time === t) ? ' on' : '';
    html += '<div class="chip' + cls + '" onclick="selectTime(\'' + t + '\')">🕐 ' + t + '</div>';
  }
  box.innerHTML = html;
}

function selectTime(t) {
  ord.time = t;
  drawTimeChips();
}

// ═══════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════
function drawProfile() {
  var name = getUserName();
  var pts = 150; // Demo
  var lvl = getLevel(pts);
  var pct = Math.min(100, Math.round(((pts - lvl.mn) / (lvl.mx - lvl.mn)) * 100));
  var refC = getRefCode();

  // Profile card
  var pc = $('profCard');
  if (pc) {
    var initial = U.first_name ? U.first_name.charAt(0).toUpperCase() : '👤';
    pc.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">' +
      '<div style="width:48px;height:48px;background:linear-gradient(135deg,var(--primary),var(--secondary));' +
      'border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;' +
      'flex-shrink:0;font-weight:700;box-shadow:var(--shadow-primary)">' + initial + '</div>' +
      '<div style="flex:1"><div style="font-size:15px;font-weight:700">' + name + '</div>' +
      '<div style="font-size:11px;color:var(--text-tertiary)">@' + (U.username || 'N/A') + '</div></div>' +
      '<span class="badge badge-blue">' + lvl.n + '</span></div>' +

      '<div class="level-card">' +
      '<div class="level-emoji">' + lvl.n.split(' ')[0] + '</div>' +
      '<div class="level-info"><div class="level-name">' + lvl.n + '</div>' +
      '<div class="level-sub">' + F(lvl.mx - pts) + ' ball → keyingi level</div>' +
      '<div class="progress" style="margin-top:6px;background:rgba(255,255,255,.15)">' +
      '<div class="progress-bar" style="width:' + pct + '%;background:rgba(255,255,255,.7)"></div></div>' +
      '</div><div class="level-pts">' + pts + '<small> ball</small></div></div>' +

      '<div class="stat-row" style="margin-top:6px">' +
      '<div class="stat"><span class="stat-emoji">📋</span><div class="stat-num">0</div><div class="stat-text">Buyurtma</div></div>' +
      '<div class="stat"><span class="stat-emoji">💰</span><div class="stat-num">0</div><div class="stat-text">Sarflagan</div></div>' +
      '<div class="stat"><span class="stat-emoji">👥</span><div class="stat-num">0</div><div class="stat-text">Taklif</div></div></div>';
  }

  // Achievements
  var achBox = $('achBox');
  if (achBox) {
    var achHtml = '';
    for (var i = 0; i < ACHS.length; i++) {
      var a = ACHS[i];
      achHtml += '<div class="ach locked"><div class="ach-emoji">' + a.i + '</div>' +
        '<div><div class="ach-name">' + a.n + '</div>' +
        '<div class="ach-desc">🔒 ' + a.d + '</div></div></div>';
    }
    achBox.innerHTML = achHtml;
  }

  // Referral
  var refEl = $('refC');
  if (refEl) refEl.textContent = refC;
}

function copyRef() {
  var code = getRefCode();
  copyText('https://t.me/' + CFG.bot + '?start=ref_' + code);
}

function shareRef() {
  var code = getRefCode();
  var url = 'https://t.me/' + CFG.bot + '?start=ref_' + code;
  var text = 'Tozalash Servis — professional tozalash! Birinchi buyurtmaga -5%!';
  try {
    tg.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text));
  } catch(e) {
    copyText(url);
  }
}

// ═══════════════════════════════════════
//  FAQ
// ═══════════════════════════════════════
function drawFaq(query) {
  var box = $('faqBox');
  if (!box) return;

  var q = (query || '').toLowerCase().trim();
  var list = [];

  for (var i = 0; i < FAQS.length; i++) {
    var f = FAQS[i];
    if (!q || f.q.toLowerCase().indexOf(q) !== -1 || f.a.toLowerCase().indexOf(q) !== -1) {
      list.push(f);
    }
  }

  if (list.length === 0) {
    box.innerHTML =
      '<div class="empty" style="padding:20px">' +
      '<span class="empty-emoji">🔍</span>' +
      '<div class="empty-title">Topilmadi</div>' +
      '<div class="empty-desc">"' + q + '" bo\'yicha natija yo\'q</div></div>';
    return;
  }

  var html = '';
  for (var j = 0; j < list.length; j++) {
    html += '<div class="faq" onclick="this.classList.toggle(\'open\')">';
    html += '<div class="faq-q">' + list[j].q + '<span class="faq-icon">▼</span></div>';
    html += '<div class="faq-a">' + list[j].a + '</div></div>';
  }
  box.innerHTML = html;
}

// ═══════════════════════════════════════
//  TIPS
// ═══════════════════════════════════════
function drawTips(cat) {
  var box = $('tipBox');
  if (!box) return;

  var list = [];
  for (var i = 0; i < TIPS.length; i++) {
    if (!cat || cat === 'all' || TIPS[i].c === cat) {
      list.push(TIPS[i]);
    }
  }

  var html = '';
  for (var j = 0; j < list.length; j++) {
    var tip = list[j];
    html += '<div class="card" style="cursor:pointer" onclick="showTip(\'' +
      tip.t.replace(/'/g, "\\'") + '\',\'' +
      tip.d.replace(/'/g, "\\'") + '\')">';
    html += '<div style="display:flex;align-items:center;gap:10px">';
    html += '<div style="font-size:22px">' + tip.e + '</div>';
    html += '<div style="flex:1"><div style="font-size:13px;font-weight:600">' + tip.t + '</div>';
    html += '<div style="font-size:11px;color:var(--text-tertiary);margin-top:1px">' + tip.d.substring(0, 40) + '...</div></div>';
    html += '<div style="color:var(--text-quaternary)">→</div></div></div>';
  }
  box.innerHTML = html;
}

function showTip(title, text) {
  openM(
    '<div class="modal-title">' + title + '</div>' +
    '<p style="font-size:13px;line-height:1.6;color:var(--text-secondary)">' + text + '</p>' +
    '<button class="btn btn-primary" style="margin-top:14px" onclick="closeM()">OK</button>'
  );
}

function pickTipTab(el, cat) {
  var tabs = document.querySelectorAll('#tipTabs .tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('on');
  }
  el.classList.add('on');
  drawTips(cat);
}

// ═══════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════
function openWarranty() {
  openM(
    '<div class="modal-title">🛡 Kafolat siyosati</div>' +
    '<div class="card" style="background:var(--success-light);border:1.5px solid rgba(0,168,107,.15);text-align:center">' +
    '<div style="font-size:32px;margin-bottom:6px">🛡</div>' +
    '<div style="font-size:15px;font-weight:700">48 SOAT KAFOLAT</div>' +
    '<div style="font-size:12px;color:var(--text-secondary);margin-top:3px">Norozi = bepul qayta tozalash!</div></div>' +
    '<div class="feat"><div class="feat-icon">✅</div><div class="feat-text">48 soat ichida murojaat qiling</div></div>' +
    '<div class="feat"><div class="feat-icon">📸</div><div class="feat-text">Muammo rasmini yuboring</div></div>' +
    '<div class="feat"><div class="feat-icon">📝</div><div class="feat-text">Sabab yozib qoldiring</div></div>' +
    '<div class="feat"><div class="feat-icon">🔄</div><div class="feat-text">Bepul qayta tozalash</div></div>' +
    '<button class="btn btn-primary" style="margin-top:12px" onclick="sendData({action:\'warranty\'});closeM();toast(\'✅ Kafolat talabi yuborildi!\')">🛡 Kafolat talabi</button>' +
    '<button class="btn btn-ghost" onclick="closeM()">Yopish</button>'
  );
}

function openGift() {
  var amounts = [500000, 1000000, 2000000, 5000000];
  var svcHtml = '';
  for (var i = 0; i < amounts.length; i++) {
    var a = amounts[i];
    svcHtml += '<div class="svc" onclick="sendData({action:\'gift\',amount:' + a + '});closeM();toast(\'✅ ' + F(a) + ' sertifikat!\')">';
    svcHtml += '<span class="svc-emoji">🎁</span><div class="svc-name">' + F(a) + '</div><div class="svc-price">so\'m</div></div>';
  }

  openM(
    '<div class="modal-title">🎁 Sovg\'a sertifikat</div>' +
    '<p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px">Do\'stingizga tozalash xizmati sovg\'a qiling!</p>' +
    '<div class="svc-grid">' + svcHtml + '</div>' +
    '<div class="field" style="margin-top:10px"><label class="label">🎟 Kodni ishlatish</label>' +
    '<div style="display:flex;gap:6px"><input class="input" id="giftCodeInput" placeholder="GIFT****" style="text-transform:uppercase">' +
    '<button class="btn btn-primary" style="width:auto;padding:12px 16px" ' +
    'onclick="var c=$(\'giftCodeInput\');if(c)sendData({action:\'gift_use\',code:c.value});closeM();toast(\'✅ Tekshirilmoqda...\')">✅</button></div></div>' +
    '<button class="btn btn-ghost" onclick="closeM()">Yopish</button>'
  );
}

function openPromos() {
  var discs = [
    {e:'🎉', t:'Birinchi', v:'-5%', d:'1-buyurtma'},
    {e:'🏆', t:'Sodiq', v:'-10%', d:'10+ buyurtma'},
    {e:'🌟', t:'VIP', v:'-8%', d:'20+ buyurtma'},
    {e:'👥', t:'Referral', v:'-5%', d:"Do'st taklif"},
    {e:'📦', t:'Paket', v:'-10%', d:'2+ xizmat'},
    {e:'💎', t:'Premium', v:'-20%', d:"A'zolik"},
  ];

  var discHtml = '';
  for (var i = 0; i < discs.length; i++) {
    var x = discs[i];
    discHtml += '<div class="disc"><span class="disc-emoji">' + x.e + '</span>';
    discHtml += '<div class="disc-label">' + x.t + '</div>';
    discHtml += '<div class="disc-value">' + x.v + '</div>';
    discHtml += '<div class="disc-desc">' + x.d + '</div></div>';
  }

  openM(
    '<div class="modal-title">🎄 Aksiyalar</div>' +
    '<div class="disc-grid" style="margin-bottom:12px">' + discHtml + '</div>' +
    '<div class="card-title">🎟 Promo kod</div>' +
    '<div style="display:flex;gap:6px;margin-bottom:6px">' +
    '<input class="input" id="promoInput" placeholder="PROMO kod...">' +
    '<button class="btn btn-primary" style="width:auto;padding:12px 16px" ' +
    'onclick="var p=$(\'promoInput\');if(p&&p.value)sendData({action:\'promo\',code:p.value});toast(\'✅ Tekshirilmoqda...\')">✅</button></div>' +
    '<button class="btn btn-ghost" onclick="closeM()">Yopish</button>'
  );
}

function openPartner() {
  openM(
    '<div class="modal-title">🤝 Hamkorlik dasturi</div>' +
    '<div class="card" style="background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;text-align:center;border:none">' +
    '<div style="font-size:28px;font-weight:800">10%</div>' +
    '<div style="font-size:13px;font-weight:600">Har buyurtmadan komissiya!</div></div>' +
    '<div class="feat"><div class="feat-icon">1️⃣</div><div class="feat-text">Ariza bering</div></div>' +
    '<div class="feat"><div class="feat-icon">2️⃣</div><div class="feat-text">Shaxsiy link oling</div></div>' +
    '<div class="feat"><div class="feat-icon">3️⃣</div><div class="feat-text">Mijozlarni yo\'naltiring</div></div>' +
    '<div class="feat"><div class="feat-icon">4️⃣</div><div class="feat-text">10% komissiya oling</div></div>' +
    '<div class="field" style="margin-top:12px"><label class="label">🏢 Biznes turi</label>' +
    '<input class="input" id="partBizInput" placeholder="Mebel do\'koni, remont..."></div>' +
    '<div class="field"><label class="label">📱 Telefon</label>' +
    '<input class="input" type="tel" id="partPhoneInput" placeholder="+998..."></div>' +
    '<button class="btn btn-success" onclick="submitPartner()">📤 Ariza berish</button>'
  );
}

function submitPartner() {
  var biz = $('partBizInput');
  var ph = $('partPhoneInput');
  if (!biz || !biz.value || !ph || !ph.value) {
    toast("❌ Ma'lumotlarni kiriting");
    return;
  }
  sendData({action: 'partner', business: biz.value, phone: ph.value});
  closeM();
  toast('✅ Ariza yuborildi!');
}

function openMember() {
  var plans = [
    {n:'Basic', p:200000, d:10, perks:['Har buyurtmada -10%', 'Ustuvor xizmat'], rec:false},
    {n:'Premium', p:500000, d:20, perks:['Har buyurtmada -20%', 'Ustuvor xizmat', 'Bepul konsultatsiya', 'VIP support'], rec:true},
  ];

  var html = '<div class="modal-title">💎 A\'zolik rejalari</div>';

  for (var i = 0; i < plans.length; i++) {
    var m = plans[i];
    var borderStyle = m.rec ? '2px solid var(--primary)' : '1.5px solid var(--border-primary)';
    var btnClass = m.rec ? 'btn-primary' : 'btn-outline';
    var icon = m.rec ? '💎' : '🥈';

    html += '<div class="card" style="border:' + borderStyle + '">';
    if (m.rec) html += '<span class="badge badge-blue" style="margin-bottom:6px">⭐ TAVSIYA</span>';
    html += '<div class="card-title">' + icon + ' ' + m.n + '</div>';
    html += '<div style="font-size:22px;font-weight:800;color:var(--primary);margin-bottom:6px">' + F(m.p) + ' <span style="font-size:11px;color:var(--text-tertiary)">so\'m/oy</span></div>';
    html += '<div style="font-size:18px;font-weight:800;color:var(--success);margin-bottom:8px">-' + m.d + '%</div>';

    for (var j = 0; j < m.perks.length; j++) {
      html += '<div class="feat" style="padding:4px 0"><div class="feat-icon">✅</div><div class="feat-text">' + m.perks[j] + '</div></div>';
    }

    html += '<button class="btn ' + btnClass + '" style="margin-top:10px" ' +
      'onclick="sendData({action:\'membership\',plan:\'' + m.n.toLowerCase() + '\',price:' + m.p + '});closeM();toast(\'✅ Yuborildi!\')">' +
      icon + ' ' + m.n + ' — ' + F(m.p) + ' so\'m</button></div>';
  }

  html += '<button class="btn btn-ghost" onclick="closeM()">Yopish</button>';
  openM(html);
}

function openCompare() {
  openM(
    '<div class="modal-title">📊 Narx taqqoslash</div>' +
    '<div style="overflow-x:auto;margin-bottom:12px">' +
    '<table class="cmp-table">' +
    '<tr><th></th><th style="color:var(--primary)">🏆 Biz</th><th>Komp. A</th><th>Komp. B</th></tr>' +
    '<tr><td>Tozalash</td><td class="cmp-us">500K</td><td>600K</td><td>550K</td></tr>' +
    '<tr><td>Divan</td><td class="cmp-us">80K</td><td>100K</td><td>90K</td></tr>' +
    '<tr><td>Gilam</td><td class="cmp-us">27K</td><td>35K</td><td>30K</td></tr>' +
    '<tr><td>Fasad</td><td class="cmp-us">22K</td><td>28K</td><td>25K</td></tr>' +
    '<tr><td>Borish</td><td class="cmp-hl">Bepul</td><td>+20K</td><td>+15K</td></tr>' +
    '<tr><td>Kafolat</td><td class="cmp-hl">48 soat</td><td>Yo\'q</td><td>24 soat</td></tr>' +
    '</table></div>' +
    '<button class="btn btn-primary" onclick="closeM();go(\'order\');newOrder(false)">📝 Buyurtma berish</button>' +
    '<button class="btn btn-ghost" onclick="closeM()">Yopish</button>'
  );
}

function openHome() {
  var h = savedHome;
  openM(
    '<div class="modal-title">🏠 Uy profili</div>' +
    '<p style="font-size:11px;color:var(--text-tertiary);margin-bottom:10px">Saqlang — keyingi buyurtmalarda tezroq!</p>' +
    '<div class="field"><label class="label">🚪 Xonalar soni</label>' +
    '<input class="input" id="homeRooms" value="' + (h.rooms || '') + '" placeholder="3"></div>' +
    '<div class="field"><label class="label">📐 Maydon (kv.m)</label>' +
    '<input class="input" id="homeArea" value="' + (h.area || '') + '" placeholder="80"></div>' +
    '<div class="field"><label class="label">🏢 Qavat</label>' +
    '<input class="input" id="homeFloor" value="' + (h.floor || '') + '" placeholder="5"></div>' +
    '<div class="field"><label class="label">📍 Manzil</label>' +
    '<input class="input" id="homeAddr" value="' + (h.addr || '') + '" placeholder="Ko\'cha, uy..."></div>' +
    '<div class="field"><label class="label">🔑 Eslatma</label>' +
    '<textarea class="input" id="homeNotes" placeholder="Eshik kodi, lift...">' + (h.notes || '') + '</textarea></div>' +
    '<button class="btn btn-success" onclick="saveHomeProfile()">💾 Saqlash</button>'
  );
}

function saveHomeProfile() {
  savedHome = {
    rooms: $('homeRooms') ? $('homeRooms').value : '',
    area: $('homeArea') ? $('homeArea').value : '',
    floor: $('homeFloor') ? $('homeFloor').value : '',
    addr: $('homeAddr') ? $('homeAddr').value : '',
    notes: $('homeNotes') ? $('homeNotes').value : ''
  };
  sendData({action: 'home_profile', rooms: savedHome.rooms, area: savedHome.area, floor: savedHome.floor, addr: savedHome.addr, notes: savedHome.notes});
  closeM();
  toast('✅ Uy profili saqlandi!');
}

function openPrivacy() {
  openM(
    '<div class="modal-title">🔐 Maxfiylik siyosati</div>' +
    '<div class="feat"><div class="feat-icon">✅</div><div class="feat-text">Telefon — faqat aloqa uchun</div></div>' +
    '<div class="feat"><div class="feat-icon">✅</div><div class="feat-text">Manzil — faqat xizmat uchun</div></div>' +
    '<div class="feat"><div class="feat-icon">✅</div><div class="feat-text">Rasmlar — narx aniqlash uchun</div></div>' +
    '<div class="feat"><div class="feat-icon">❌</div><div class="feat-text">Uchinchi shaxslarga berilmaydi</div></div>' +
    '<div class="feat"><div class="feat-icon">❌</div><div class="feat-text">Reklama uchun ishlatilmaydi</div></div>' +
    '<button class="btn btn-danger" style="margin-top:12px" onclick="confirmDeleteData()">🗑 Ma\'lumotlarni o\'chirish</button>' +
    '<button class="btn btn-ghost" onclick="closeM()">Yopish</button>'
  );
}

function confirmDeleteData() {
  openM(
    '<div style="text-align:center;padding:20px 0">' +
    '<div style="font-size:44px;margin-bottom:12px">⚠️</div>' +
    '<div style="font-size:15px;font-weight:700;margin-bottom:8px">Ishonchingiz komilmi?</div>' +
    '<p style="font-size:12px;color:var(--text-secondary);margin-bottom:16px">Barcha ma\'lumotlaringiz o\'chiriladi va bu amalni qaytarib bo\'lmaydi.</p>' +
    '<button class="btn btn-danger" onclick="sendData({action:\'delete_data\'});closeM();toast(\'✅ So\\\'rov yuborildi\')">Ha, o\'chirish</button>' +
    '<button class="btn btn-ghost" onclick="closeM()" style="margin-top:6px">Bekor qilish</button></div>'
  );
}

function openSettings() {
  var isDark = document.body.classList.contains('dark');
  openM(
    '<div class="modal-title">⚙️ Sozlamalar</div>' +
    '<div class="sw-row">' +
    '<div class="sw-body"><div class="sw-name">🌙 Dark rejim</div><div class="sw-desc">Qorang\'i interfeys</div></div>' +
    '<div class="sw-toggle' + (isDark ? ' on' : '') + '" onclick="toggleTheme();this.classList.toggle(\'on\')"></div></div>' +
    '<div class="sw-row">' +
    '<div class="sw-body"><div class="sw-name">🔔 Bildirishnomalar</div><div class="sw-desc">Eslatmalar olish</div></div>' +
    '<div class="sw-toggle on" onclick="this.classList.toggle(\'on\')"></div></div>' +
    '<div class="sw-row">' +
    '<div class="sw-body"><div class="sw-name">🌐 Til</div><div class="sw-desc">O\'zbek tili</div></div>' +
    '<div style="font-size:16px">🇺🇿</div></div>' +
    '<button class="btn btn-primary" style="margin-top:12px" onclick="closeM();toast(\'✅ Saqlandi\')">Saqlash</button>'
  );
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  var btn = $('themeBtn');
  if (btn) {
    btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }
}

// ═══════════════════════════════════════
//  INIT
// ═══════════════════════════════════════
function boot() {
  drawHome();
  drawCalc();
  drawFaq();
  drawTips();
  go('home');

  // Modal close
  var mBg = $('mBg');
  if (mBg) {
    mBg.addEventListener('click', function(e) {
      if (e.target === mBg) closeM();
    });
  }

  // Telegram MainButton
  try {
    tg.MainButton.setText('📝 Buyurtma berish');
    tg.MainButton.show();
    tg.MainButton.onClick(function() {
      go('order');
      newOrder(false);
    });
  } catch(e) {
    // MainButton qo'llab-quvvatlanmasa
  }
}

// DOM tayyor bo'lganda ishga tushirish
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
