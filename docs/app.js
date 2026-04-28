'use strict';

// ═══════════════════════════════════════
//  TELEGRAM INIT
// ═══════════════════════════════════════
var tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
var U = tg.initDataUnsafe ? tg.initDataUnsafe.user || {} : {};
if (tg.colorScheme === 'dark') document.body.classList.add('dark');

// Haptic feedback
function haptic(type) {
  try {
    if (type === 'light') tg.HapticFeedback.impactOccurred('light');
    else if (type === 'medium') tg.HapticFeedback.impactOccurred('medium');
    else if (type === 'heavy') tg.HapticFeedback.impactOccurred('heavy');
    else if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
    else if (type === 'error') tg.HapticFeedback.notificationOccurred('error');
  } catch(e) {}
}

// ═══════════════════════════════════════
//  CONFIG & DATA
// ═══════════════════════════════════════
var CFG = {
  phone: '+998887887011',
  card: '5614 6817 1876 7068',
  holder: 'M.A.',
  bot: 'tozalash_servisbot',
};

var SVC = [
  {id:'cleaning_standard', e:'🧹', n:'Oddiy tozalash', p:500000, u:'ishchi', t:'w', hot:true},
  {id:'cleaning_general', e:'🧼', n:'General tozalash', p:500000, u:'ishchi', t:'w'},
  {id:'cleaning_renovation', e:'🔨', n:'Remont keyin', p:600000, u:'ishchi', t:'w'},
  {id:'sofa', e:'🛋', n:'Divan yuvish', p:80000, u:"o'rin", mn:5, mx:50, t:'q'},
  {id:'chair', e:'💺', n:'Stul yuvish', p:50000, u:'dona', mn:5, mx:50, t:'q'},
  {id:'carpet', e:'🟫', n:'Gilam yuvish', p:27000, u:'kv.m', mn:10, mx:200, t:'q'},
  {id:'facade', e:'🏢', n:'Fasad yuvish', p:22000, u:'kv.m', mn:1, mx:500, t:'q'},
  {id:'tile', e:'🧱', n:'Plitka yuvish', p:15000, u:'kv.m', mn:1, mx:500, t:'q'}
];

var DST = ['Bektemir','Chilonzor','Yakkasaroy','Mirobod','Mirzo Ulugbek','Sergeli','Shayxontohur','Olmazor','Uchtepa','Yashnobod','Yunusobod'];
var HRS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
var HOL = ['2025-03-30','2025-03-31','2025-04-01','2025-06-06','2025-06-07','2025-06-08'];

var FAQS = [
  {q:'Narxlar qanday?', a:"Oddiy/General: 500,000/ishchi. Remont keyin: 600,000. Divan: 80,000/o'rin (min 5). Gilam: 27,000/kv.m (min 10)."},
  {q:'Ish vaqti?', a:'Har kuni 09:00-17:00. Bayram kunlari dam olamiz.'},
  {q:'Vositalar kimdan?', a:'Barcha Karcher apparatlari va tozalash vositalari bizdan.'},
  {q:"To'lov qanday?", a:'Naqd yoki karta: 5614 6817 1876 7068 (M.A.)'},
  {q:'Qayerlarga xizmat?', a:'Toshkent shahri. Borish bepul.'},
  {q:'Minimal buyurtma?', a:"Divan min 5 o'rin. Stul min 5. Gilam min 10 kv.m."},
  {q:'Shoshilinch?', a:'24 soatdan kam = narx +25%.'},
  {q:'Kafolat?', a:'48 soat ichida norozi = bepul qayta tozalash.'},
  {q:'Ishchilar soni?', a:"Admin rasmlarni ko'rib belgilaydi (max 10)."},
  {q:'Chegirmalar?', a:'Birinchi -5%, 10+ -10%, VIP -8%, Referral -5%.'}
];

var TIPS = [
  {c:'🧹 Tozalash', e:'🧹', t:'Chang artish', d:"Yuqoridan pastga. Avval tokchalar, keyin pol."},
  {c:'🧹 Tozalash', e:'✨', t:'Oyna siri', d:"Gazeta + sprey = iz qoldirmaydi."},
  {c:'🧹 Tozalash', e:'⏰', t:'Tozalash jadvali', d:"Kun: idish, pol. Hafta: hammom. Oy: general."},
  {c:'🛋 Mebel', e:'🛋', t:'Divan parvarishi', d:"Har 6 oyda professional tozalash tavsiya etiladi."},
  {c:'🛋 Mebel', e:'🧴', t:"Dog' ketkazish", d:"Yangi dog' = darhol sovuq suv."},
  {c:'🟫 Gilam', e:'🟫', t:'Gilam hidi', d:"Soda sepib 30 daqiqa, keyin changyutgich."}
];

var ACHS = [
  {i:'🎉', n:'Birinchi qadam', d:'1 buyurtma'},
  {i:'⭐', n:'Doimiy', d:'3 buyurtma'},
  {i:'🌟', n:'Sodiq', d:'5 buyurtma'},
  {i:'💎', n:'Oltin', d:'10 buyurtma'},
  {i:'👑', n:'Brilliant', d:'25 buyurtma'},
  {i:'💰', n:'Millioner', d:'1M+ sarfladi'},
  {i:'🤝', n:'Taklif ustasi', d:"3 do'st"},
  {i:'📝', n:'Sharhchi', d:'Sharh qoldirdi'}
];

var LVLS = [
  {n:'🥉 Bronze', mn:0, mx:500},
  {n:'🥈 Silver', mn:500, mx:1500},
  {n:'🥇 Gold', mn:1500, mx:3000},
  {n:'💎 Diamond', mn:3000, mx:5000},
  {n:'👑 Legend', mn:5000, mx:99999}
];

// ═══════════════════════════════════════
//  STATE
// ═══════════════════════════════════════
var picked = null;
var step = 0;
var ord = {};
var cSvc = SVC[0];
var cQty = 1;
var calM = new Date().getMonth();
var calY = new Date().getFullYear();
var savedHome = {};
var sendLock = false;

// ═══════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════
function $(id) { return document.getElementById(id); }

function F(n) {
  try {
    var num = Math.round(Number(n) || 0);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } catch(e) { return '0'; }
}

function todayStr() { return new Date().toISOString().split('T')[0]; }
function isHol(d) { return HOL.indexOf(d) !== -1; }
function isPast(d) { return d < todayStr(); }

function isUrg(d) {
  try {
    var diff = new Date(d + 'T09:00') - new Date();
    return diff > 0 && diff < 86400000;
  } catch(e) { return false; }
}

function toast(msg, dur) {
  var t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(t._tm);
  t._tm = setTimeout(function() { t.classList.remove('on'); }, dur || 2500);
}

function openM(html) {
  var box = $('mBox');
  var bg = $('mBg');
  if (!box || !bg) return;
  box.innerHTML = '<div class="m-bar"></div>' + html;
  bg.classList.add('on');
  document.body.style.overflow = 'hidden';
  haptic('light');
}

function closeM() {
  var bg = $('mBg');
  if (bg) bg.classList.remove('on');
  document.body.style.overflow = '';
}

function uR(el) {
  if (!el) return;
  var mn = Number(el.min), mx = Number(el.max), v = Number(el.value);
  var pct = ((v - mn) / (mx - mn)) * 100;
  el.style.background = 'linear-gradient(to right, var(--p) ' + pct + '%, var(--bg3) ' + pct + '%)';
}

function sendD(data) {
  if (sendLock) return;
  try {
    sendLock = true;
    tg.sendData(JSON.stringify(data));
    setTimeout(function() { sendLock = false; }, 3000);
  } catch(e) {
    sendLock = false;
    toast('❌ Yuborib bo\'lmadi');
  }
}

function cpTxt(t) {
  try {
    if (navigator.clipboard) { navigator.clipboard.writeText(t); }
    else {
      var ta = document.createElement('textarea');
      ta.value = t; ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    toast('📋 Nusxalandi!');
    haptic('success');
  } catch(e) { toast('❌ Xato'); }
}

function refCode() { return U.id ? 'TS' + String(U.id).slice(-6).toUpperCase() : 'TSGUEST'; }
function getLvl(p) {
  for (var i = 0; i < LVLS.length; i++) {
    if (p >= LVLS[i].mn && p < LVLS[i].mx) return LVLS[i];
  }
  return LVLS[0];
}
function userName() {
  var parts = [];
  if (U.first_name) parts.push(U.first_name);
  if (U.last_name) parts.push(U.last_name);
  return parts.join(' ') || 'Foydalanuvchi';
}

// Confetti
function showConfetti() {
  var wrap = $('confetti');
  if (!wrap) return;
  wrap.style.display = 'block';
  wrap.innerHTML = '';
  var colors = ['#6C5CE7','#00CEC9','#FF6B6B','#F9CA24','#A855F7','#55EFC4'];
  for (var i = 0; i < 40; i++) {
    var piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    piece.style.animationDuration = 2 + Math.random() * 1.5 + 's';
    wrap.appendChild(piece);
  }
  setTimeout(function() { wrap.style.display = 'none'; }, 4000);
}

// ═══════════════════════════════════════
//  NAV
// ═══════════════════════════════════════
function go(pg) {
  var pages = document.querySelectorAll('.pg');
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove('on');
  var target = $('pg-' + pg);
  if (target) target.classList.add('on');

  var navs = document.querySelectorAll('.ni');
  for (var j = 0; j < navs.length; j++) {
    navs[j].classList.toggle('on', navs[j].getAttribute('data-p') === pg);
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
  haptic('light');

  if (pg === 'home') drawHome();
  if (pg === 'calc') drawCalc();
  if (pg === 'me') drawProf();
  if (pg === 'more') { drawFaq(); drawTips(); }
}

// ═══════════════════════════════════════
//  HOME
// ═══════════════════════════════════════
function drawHome() {
  var el = $('homeSvc');
  if (!el) return;
  var html = '';
  for (var i = 0; i < SVC.length; i++) {
    var s = SVC[i];
    if (s.id === 'tile' || s.id === 'chair') continue;
    var sel = (picked && picked.id === s.id) ? ' sel' : '';
    var hot = s.hot ? '<div class="sv-hot">TOP</div>' : '';
    html += '<div class="sv' + sel + '" onclick="pickSvc(\'' + s.id + '\')">';
    html += hot + '<span class="sv-e">' + s.e + '</span>';
    html += '<div class="sv-n">' + s.n + '</div>';
    html += '<div class="sv-p">' + F(s.p) + '/' + s.u + '</div></div>';
  }
  el.innerHTML = html;
}

function pickSvc(id) {
  for (var i = 0; i < SVC.length; i++) {
    if (SVC[i].id === id) { picked = SVC[i]; break; }
  }
  haptic('medium');
  drawHome();
  setTimeout(function() { go('order'); newOrd(false); }, 150);
}

// ═══════════════════════════════════════
//  CALCULATOR
// ═══════════════════════════════════════
function drawCalc() {
  drawCalcChips();
  drawCalcRange();
  updCalc();
}

function drawCalcChips() {
  var el = $('cCh');
  if (!el) return;
  var html = '';
  for (var i = 0; i < SVC.length; i++) {
    var s = SVC[i];
    var cls = (cSvc.id === s.id) ? ' on' : '';
    html += '<div class="ch' + cls + '" onclick="setCSvc(\'' + s.id + '\')">' + s.e + ' ' + s.n + '</div>';
  }
  el.innerHTML = html;
}

function setCSvc(id) {
  for (var i = 0; i < SVC.length; i++) {
    if (SVC[i].id === id) { cSvc = SVC[i]; break; }
  }
  cQty = (cSvc.t === 'w') ? 1 : (cSvc.mn || 1);
  haptic('light');
  drawCalc();
}

function drawCalcRange() {
  var el = $('cRng');
  if (!el) return;
  var html = '';
  if (cSvc.t === 'w') {
    html += '<div class="cd-t">👷 Ishchilar</div>';
    html += '<div class="rv" id="cRV">' + cQty + ' ishchi</div>';
    html += '<input type="range" min="1" max="10" value="' + cQty + '" id="cRI" oninput="cQty=Number(this.value);updCalc();uR(this)">';
    html += '<div class="rr"><span>1</span><span>10</span></div>';
  } else {
    var mn = cSvc.mn || 1, mx = cSvc.mx || 100;
    html += '<div class="cd-t">📊 Miqdor (' + cSvc.u + ')</div>';
    html += '<div class="rv" id="cRV">' + cQty + ' ' + cSvc.u + '</div>';
    html += '<input type="range" min="' + mn + '" max="' + mx + '" value="' + cQty + '" id="cRI" oninput="cQty=Number(this.value);updCalc();uR(this)">';
    html += '<div class="rr"><span>' + mn + '</span><span>' + mx + '</span></div>';
  }
  el.innerHTML = html;
  uR($('cRI'));
}

function updCalc() {
  var t = cSvc.p * cQty;
  var d = $('cD');
  if (d) d.innerHTML = '<div class="calc-lb">Taxminiy narx</div><div class="calc-pr">' + F(t) + ' <span>so\'m</span></div><div class="calc-dt">' + cQty + ' ' + cSvc.u + ' × ' + F(cSvc.p) + '</div>';
  var rv = $('cRV');
  if (rv) rv.textContent = cQty + ' ' + cSvc.u;
  if ($('cd5')) $('cd5').textContent = F(Math.round(t * 0.95));
  if ($('cd10')) $('cd10').textContent = F(Math.round(t * 0.90));
  if ($('cdU')) $('cdU').textContent = '+' + F(Math.round(t * 0.25));
  if ($('cdP')) $('cdP').textContent = F(Math.round(t * 0.90));

  var cmp = $('cCmp');
  if (cmp) {
    cmp.innerHTML = '<table class="cmp"><tr><th></th><th style="color:var(--p)">🏆 Biz</th><th>A</th><th>B</th></tr>' +
      '<tr><td>Narx</td><td class="cmp-us">' + F(t) + '</td><td>' + F(Math.round(t*1.2)) + '</td><td>' + F(Math.round(t*1.1)) + '</td></tr>' +
      '<tr><td>-5%</td><td class="cmp-hl">' + F(Math.round(t*0.95)) + '</td><td>—</td><td>—</td></tr>' +
      '<tr><td>Borish</td><td class="cmp-hl">Bepul</td><td>+20K</td><td>+15K</td></tr>' +
      '<tr><td>Kafolat</td><td class="cmp-hl">48s</td><td>Yo\'q</td><td>24s</td></tr></table>';
  }
}

function calcOrd() { picked = cSvc; go('order'); newOrd(true); haptic('medium'); }

// ═══════════════════════════════════════
//  ORDER FLOW
// ═══════════════════════════════════════
function newOrd(fromCalc) {
  if (!picked) picked = SVC[0];
  step = 0;
  var s = picked;
  ord = {
    srv: s,
    qty: fromCalc ? cQty : (s.t === 'w' ? 1 : (s.mn || 1)),
    dist: '', addr: savedHome.addr || '',
    date: '', time: '09:00', phone: '', pay: ''
  };
  drawOrd();
}

function drawOrd() {
  var stEl = $('oSt'), lbEl = $('oLb'), bd = $('oC');
  if (!stEl || !bd) return;

  var titles = ['Xizmat', 'Manzil', 'Sana', "To'lov", 'Tasdiqlash'];
  var stHtml = '';
  for (var i = 0; i < 5; i++) {
    var cls = 'stp';
    if (i < step) cls += ' d';
    else if (i === step) cls += ' c';
    stHtml += '<div class="' + cls + '"></div>';
  }
  stEl.innerHTML = stHtml;
  if (lbEl) lbEl.textContent = (step + 1) + '/5 — ' + titles[step];

  var S = ord.srv;
  var html = '';

  switch (step) {

    // ═══ STEP 0 ═══
    case 0:
      html += '<div class="cd"><div class="cd-t">🛠 Xizmat tanlang</div><div class="sg" style="margin-bottom:14px">';
      for (var a = 0; a < SVC.length; a++) {
        var sv = SVC[a];
        var sc = (ord.srv.id === sv.id) ? ' sel' : '';
        html += '<div class="sv' + sc + '" onclick="chgSvc(\'' + sv.id + '\')">';
        html += '<span class="sv-e">' + sv.e + '</span><div class="sv-n">' + sv.n + '</div>';
        html += '<div class="sv-p">' + F(sv.p) + '/' + sv.u + '</div></div>';
      }
      html += '</div>';
      if (S.t === 'w') {
        html += '<div class="cd-t">👷 Ishchilar</div>';
        html += '<div class="rv" id="oQV">' + ord.qty + ' ishchi</div>';
        html += '<input type="range" min="1" max="10" value="' + ord.qty + '" id="oQR" oninput="ord.qty=Number(this.value);$(\'oQV\').textContent=this.value+\' ishchi\';uR(this)">';
        html += '<div class="rr"><span>1</span><span>10</span></div>';
        html += '<div class="fi-hint">💰 ' + F(S.p) + " so'm/ishchi/kun</div>";
      } else {
        html += '<div class="cd-t">📊 Miqdor (' + S.u + ')</div>';
        html += '<div class="fg"><input class="fi" type="number" id="qI" value="' + ord.qty + '" min="' + (S.mn||1) + '">';
        html += '<div class="fi-hint">Min: ' + (S.mn||1) + ' ' + S.u + ' • ' + F(S.p) + " so'm/" + S.u + '</div></div>';
      }
      html += '</div><div class="br"><button class="btn btn-o" onclick="go(\'home\')">❌</button>';
      html += '<button class="btn btn-p" onclick="v0()">Davom ▶</button></div>';
      break;

    // ═══ STEP 1 ═══
    case 1:
      html += '<div class="cd"><div class="cd-t">📍 Manzil</div>';
      html += '<div class="fg"><label class="fl">📍 Tuman <span class="rq">*</span></label>';
      html += '<select class="fi" id="oD">';
      for (var b = 0; b < DST.length; b++) {
        var sel2 = (ord.dist === DST[b]) ? ' selected' : '';
        html += '<option' + sel2 + '>' + DST[b] + '</option>';
      }
      html += '</select></div>';
      html += '<div class="fg"><label class="fl">🏠 Manzil <span class="rq">*</span></label>';
      html += '<input class="fi" id="oA" placeholder="Ko\'cha, uy, mo\'ljal..." value="' + (ord.addr || '') + '">';
      html += '<div class="fi-hint">To\'liq manzil (min 5 belgi)</div></div>';
      if (savedHome.addr) {
        html += '<div style="padding:8px 10px;background:var(--p-bg);border-radius:var(--r3);font-size:12px;cursor:pointer;border:1px solid var(--p-bg2);margin-top:4px" ';
        html += 'onclick="$(\'oA\').value=\'' + savedHome.addr.replace(/'/g, '') + '\';toast(\'✅\')">📌 ' + savedHome.addr.substring(0, 30) + '</div>';
      }
      html += '</div><div class="br"><button class="btn btn-o" onclick="step--;drawOrd()">◀</button>';
      html += '<button class="btn btn-p" onclick="v1()">Davom ▶</button></div>';
      break;

    // ═══ STEP 2 ═══
    case 2:
      html += '<div class="cd"><div class="cd-t">📅 Sana</div><div id="calBox"></div></div>';
      html += '<div class="cd"><div class="cd-t">⏰ Vaqt</div><div class="chs" id="tCh"></div></div>';
      if (ord.date && isUrg(ord.date)) {
        html += '<div class="urg"><div class="urg-lb">SHOSHILINCH</div><div class="urg-v">+25%</div><div class="urg-d">24 soatdan kam</div></div>';
      }
      html += '<div class="br"><button class="btn btn-o" onclick="step--;drawOrd()">◀</button>';
      html += '<button class="btn btn-p" onclick="v2()">Davom ▶</button></div>';
      break;

    // ═══ STEP 3 ═══
    case 3:
      html += '<div class="cd"><div class="cd-t">📱 Aloqa</div>';
      html += '<div class="fg"><label class="fl">📞 Telefon <span class="rq">*</span></label>';
      html += '<div class="fi-wrap"><span class="fi-ico">📱</span>';
      html += '<input class="fi" type="tel" id="oPh" placeholder="+998 90 123 45 67" value="' + (ord.phone || '') + '"></div></div></div>';
      html += '<div class="cd"><div class="cd-t">💳 To\'lov</div><div class="chs" style="margin-bottom:10px">';
      html += '<div class="ch' + (ord.pay === 'cash' ? ' on' : '') + '" onclick="ord.pay=\'cash\';haptic(\'light\');drawOrd()">💵 Naqd</div>';
      html += '<div class="ch' + (ord.pay === 'card' ? ' on' : '') + '" onclick="ord.pay=\'card\';haptic(\'light\');drawOrd()">💳 Karta</div></div>';
      if (ord.pay === 'card') {
        html += '<div class="payc"><div class="payc-logo">💳</div><div class="payc-lb">TO\'LOV KARTASI</div>';
        html += '<div class="payc-num">' + CFG.card + '</div><div class="payc-name">' + CFG.holder + '</div></div>';
        html += '<div class="fi-hint">Tasdiqlangach kartaga o\'tkazing</div>';
      }
      html += '</div><div class="br"><button class="btn btn-o" onclick="step--;drawOrd()">◀</button>';
      html += '<button class="btn btn-p" onclick="v3()">Davom ▶</button></div>';
      break;

    // ═══ STEP 4 ═══
    case 4:
      var base = S.p * ord.qty;
      var urg = isUrg(ord.date);
      var urgA = urg ? Math.round(base * 0.25) : 0;
      var fin = base + urgA;

      html += '<div class="sum"><div class="sum-h">📋 Buyurtma xulosasi</div>';
      html += '<div class="sr"><span class="lb">Xizmat</span><span class="vl">' + S.e + ' ' + S.n + '</span></div>';
      html += '<div class="sr"><span class="lb">Miqdor</span><span class="vl">' + ord.qty + ' ' + S.u + '</span></div>';
      html += '<div class="sr"><span class="lb">Tuman</span><span class="vl">📍 ' + ord.dist + '</span></div>';
      html += '<div class="sr"><span class="lb">Manzil</span><span class="vl">' + ord.addr + '</span></div>';
      html += '<div class="sr"><span class="lb">Sana</span><span class="vl">📅 ' + ord.date + '</span></div>';
      html += '<div class="sr"><span class="lb">Vaqt</span><span class="vl">⏰ ' + ord.time + '</span></div>';
      html += '<div class="sr"><span class="lb">Telefon</span><span class="vl">📱 ' + ord.phone + '</span></div>';
      html += '<div class="sr"><span class="lb">To\'lov</span><span class="vl">' + (ord.pay === 'card' ? '💳 Karta' : '💵 Naqd') + '</span></div>';
      html += '<div class="sr"><span class="lb">Narx</span><span class="vl">' + F(base) + '</span></div>';
      if (urg) html += '<div class="sr"><span class="lb" style="color:var(--ac)">⚡ Shoshilinch</span><span class="vl" style="color:var(--ac)">+' + F(urgA) + '</span></div>';
      html += '<div class="sr tot"><span>JAMI</span><span>' + F(fin) + ' so\'m</span></div></div>';
      html += '<button class="btn btn-ok" onclick="submit(' + fin + ')" style="font-size:16px;padding:16px">✅ BUYURTMA BERISH</button>';
      html += '<button class="btn btn-gh" onclick="step--;drawOrd()">◀ Orqaga</button>';
      break;
  }

  bd.innerHTML = html;
  if (step === 0 && $('oQR')) uR($('oQR'));
  if (step === 2) { drawCal(); drawTime(); }
}

function chgSvc(id) {
  for (var i = 0; i < SVC.length; i++) {
    if (SVC[i].id === id) {
      ord.srv = SVC[i];
      ord.qty = SVC[i].t === 'w' ? 1 : (SVC[i].mn || 1);
      break;
    }
  }
  haptic('light');
  drawOrd();
}

function v0() {
  var S = ord.srv;
  if (S.t === 'q') {
    var inp = $('qI');
    var v = inp ? Number(inp.value) : ord.qty;
    if (!v || v <= 0) { toast('❌ Son kiriting'); haptic('error'); return; }
    if (S.mn && v < S.mn) { toast('❌ Min ' + S.mn + ' ' + S.u); haptic('error'); if (inp) inp.classList.add('err'); return; }
    ord.qty = v;
  }
  step++; haptic('light'); drawOrd();
}

function v1() {
  var aEl = $('oA'), dEl = $('oD');
  var addr = aEl ? aEl.value.trim() : '';
  if (!addr || addr.length < 5) { toast('❌ Manzil kiriting'); haptic('error'); if (aEl) aEl.classList.add('err'); return; }
  ord.dist = dEl ? dEl.value : DST[0];
  ord.addr = addr;
  step++; haptic('light'); drawOrd();
}

function v2() {
  if (!ord.date) { toast('❌ Sana tanlang'); haptic('error'); return; }
  if (!ord.time) ord.time = '09:00';
  step++; haptic('light'); drawOrd();
}

function v3() {
  var phEl = $('oPh');
  var ph = phEl ? phEl.value.trim() : '';
  if (!ph || ph.length < 9) { toast('❌ Telefon kiriting'); haptic('error'); if (phEl) phEl.classList.add('err'); return; }
  if (!ord.pay) { toast("❌ To'lov tanlang"); haptic('error'); return; }
  ord.phone = ph;
  step++; haptic('light'); drawOrd();
}

function submit(price) {
  sendD({
    action: 'order', service: ord.srv.id, qty: ord.qty,
    district: ord.dist, address: ord.addr,
    date: ord.date, time: ord.time,
    phone: ord.phone, payment: ord.pay,
    urgent: isUrg(ord.date), final_price: price
  });

  showConfetti();
  haptic('success');

  $('oC').innerHTML =
    '<div class="succ"><span class="succ-e">🎉</span>' +
    '<div class="succ-t">Buyurtma qabul qilindi!</div>' +
    '<div class="succ-d">Operator tez orada bog\'lanadi va kerakli ishchilar sonini belgilaydi.</div>' +
    '<div class="succ-id">📞 ' + CFG.phone + '</div>' +
    '<button class="btn btn-p" style="margin-top:16px" onclick="go(\'home\')">🏠 Asosiy sahifa</button></div>';
  $('oSt').innerHTML = '';
  if ($('oLb')) $('oLb').textContent = '';
  toast('✅ Buyurtma yuborildi!');
}

// ═══════════════════════════════════════
//  CALENDAR
// ═══════════════════════════════════════
function drawCal() {
  var box = $('calBox');
  if (!box) return;
  var MO = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avg','Sen','Okt','Noy','Dek'];
  var DN = ['Du','Se','Ch','Pa','Ju','Sh','Ya'];
  var first = (new Date(calY, calM, 1).getDay() + 6) % 7;
  var days = new Date(calY, calM + 1, 0).getDate();
  var now = todayStr();

  var h = '<div class="cal"><div class="cal-h">';
  h += '<div class="cal-ar" onclick="calM--;if(calM<0){calM=11;calY--}drawCal()">‹</div>';
  h += '<div class="cal-mo">' + MO[calM] + ' ' + calY + '</div>';
  h += '<div class="cal-ar" onclick="calM++;if(calM>11){calM=0;calY++}drawCal()">›</div></div>';
  h += '<div class="cal-g">';
  for (var i = 0; i < DN.length; i++) h += '<div class="cal-dn">' + DN[i] + '</div>';
  for (var e = 0; e < first; e++) h += '<div class="cal-d empty"></div>';

  for (var d = 1; d <= days; d++) {
    var ds = calY + '-' + String(calM + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    var past = isPast(ds), hol = isHol(ds), sel = (ord.date === ds), today = (ds === now);
    var cls = 'cal-d';
    if (past || hol) cls += ' off';
    else if (sel) cls += ' sel';
    else if (today) cls += ' today';
    if (hol) cls += ' hol';
    var click = (past || hol) ? '' : ' onclick="selDate(\'' + ds + '\')"';
    h += '<div class="' + cls + '"' + click + '>' + d + '</div>';
  }
  h += '</div>';

  if (ord.date) {
    var u = isUrg(ord.date);
    h += '<div style="margin-top:8px;padding:8px 10px;background:' + (u ? 'var(--err-bg)' : 'var(--ok-bg)') + ';border-radius:var(--r3);font-size:11px;font-weight:500;color:' + (u ? 'var(--ac)' : 'var(--ok)') + '">' + (u ? '⚡ Shoshilinch! +25%' : '✅ ' + ord.date) + '</div>';
  }
  h += '</div>';
  box.innerHTML = h;
}

function selDate(ds) { ord.date = ds; haptic('light'); drawCal(); drawOrd(); }
function drawTime() {
  var box = $('tCh');
  if (!box) return;
  var h = '';
  for (var i = 0; i < HRS.length; i++) {
    var t = HRS[i];
    h += '<div class="ch' + (ord.time === t ? ' on' : '') + '" onclick="ord.time=\'' + t + '\';haptic(\'light\');drawTime()">🕐 ' + t + '</div>';
  }
  box.innerHTML = h;
}

// ═══════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════
function drawProf() {
  var name = userName();
  var pts = 150;
  var lvl = getLvl(pts);
  var pct = Math.min(100, Math.round(((pts - lvl.mn) / (lvl.mx - lvl.mn)) * 100));
  var init = U.first_name ? U.first_name.charAt(0).toUpperCase() : '👤';

  var pc = $('profCd');
  if (pc) {
    pc.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">' +
      '<div style="width:50px;height:50px;background:var(--p-g);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;flex-shrink:0;font-weight:700;box-shadow:0 4px 14px rgba(108,92,231,.3)">' + init + '</div>' +
      '<div style="flex:1"><div style="font-size:15px;font-weight:700">' + name + '</div>' +
      '<div style="font-size:11px;color:var(--t3)">@' + (U.username || 'N/A') + '</div></div>' +
      '<span class="bdg bdg-p">' + lvl.n + '</span></div>' +
      '<div class="lvl"><div class="lvl-e">' + lvl.n.split(' ')[0] + '</div>' +
      '<div class="lvl-info"><div class="lvl-n">' + lvl.n + '</div>' +
      '<div class="lvl-sub">' + F(lvl.mx - pts) + ' ball kerak</div>' +
      '<div class="prog" style="margin-top:6px;background:rgba(255,255,255,.15)"><div class="prog-f" style="width:' + pct + '%;background:rgba(255,255,255,.7)"></div></div></div>' +
      '<div class="lvl-pts">' + pts + '<small> ball</small></div></div>' +
      '<div class="stg" style="margin-top:6px">' +
      '<div class="st"><span class="st-e">📋</span><div class="st-v">0</div><div class="st-l">Buyurtma</div></div>' +
      '<div class="st"><span class="st-e">💰</span><div class="st-v">0</div><div class="st-l">Sarflagan</div></div>' +
      '<div class="st"><span class="st-e">👥</span><div class="st-v">0</div><div class="st-l">Taklif</div></div></div>';
  }

  var ab = $('achBox');
  if (ab) {
    var ah = '';
    for (var i = 0; i < ACHS.length; i++) {
      var a = ACHS[i];
      ah += '<div class="ach locked"><div class="ach-e">' + a.i + '</div><div><div class="ach-n">' + a.n + '</div><div class="ach-d">🔒 ' + a.d + '</div></div></div>';
    }
    ab.innerHTML = ah;
  }
  var rf = $('refC');
  if (rf) rf.textContent = refCode();
}

function cpRef() { cpTxt('https://t.me/' + CFG.bot + '?start=ref_' + refCode()); }
function shRef() {
  var url = 'https://t.me/' + CFG.bot + '?start=ref_' + refCode();
  try { tg.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent('Tozalash Servis — birinchi buyurtmaga -5%!')); }
  catch(e) { cpTxt(url); }
}

// ═══════════════════════════════════════
//  FAQ & TIPS
// ═══════════════════════════════════════
function drawFaq(q) {
  var box = $('faqBox');
  if (!box) return;
  var s = (q || '').toLowerCase().trim();
  var list = [];
  for (var i = 0; i < FAQS.length; i++) {
    var f = FAQS[i];
    if (!s || f.q.toLowerCase().indexOf(s) !== -1 || f.a.toLowerCase().indexOf(s) !== -1) list.push(f);
  }
  if (!list.length) {
    box.innerHTML = '<div class="emp" style="padding:20px"><span class="emp-e">🔍</span><div class="emp-t">Topilmadi</div></div>';
    return;
  }
  var h = '';
  for (var j = 0; j < list.length; j++) {
    h += '<div class="fq" onclick="this.classList.toggle(\'open\');haptic(\'light\')">';
    h += '<div class="fq-q">' + list[j].q + '<span class="fq-ic">▼</span></div>';
    h += '<div class="fq-a">' + list[j].a + '</div></div>';
  }
  box.innerHTML = h;
}

function drawTips(c) {
  var box = $('tipBox');
  if (!box) return;
  var list = [];
  for (var i = 0; i < TIPS.length; i++) {
    if (!c || c === 'all' || TIPS[i].c === c) list.push(TIPS[i]);
  }
  var h = '';
  for (var j = 0; j < list.length; j++) {
    var tip = list[j];
    var safeD = tip.d.replace(/'/g, '');
    var safeT = tip.t.replace(/'/g, '');
    h += '<div class="cd" style="cursor:pointer" onclick="showTip(\'' + safeT + '\',\'' + safeD + '\')">';
    h += '<div style="display:flex;align-items:center;gap:10px">';
    h += '<div style="font-size:22px">' + tip.e + '</div>';
    h += '<div style="flex:1"><div style="font-size:13px;font-weight:600">' + tip.t + '</div>';
    h += '<div style="font-size:11px;color:var(--t3);margin-top:1px">' + tip.d.substring(0, 40) + '...</div></div>';
    h += '<div style="color:var(--t4)">→</div></div></div>';
  }
  box.innerHTML = h;
}

function showTip(t, d) {
  openM('<div class="m-t">' + t + '</div><p style="font-size:13px;line-height:1.6;color:var(--t2)">' + d + '</p><button class="btn btn-p" style="margin-top:14px" onclick="closeM()">OK</button>');
}

function pickTab(el, c) {
  var tabs = document.querySelectorAll('#tipTabs .tab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('on');
  el.classList.add('on');
  haptic('light');
  drawTips(c);
}

// ═══════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════
function openWarranty() {
  openM(
    '<div class="m-t">🛡 Kafolat</div>' +
    '<div class="cd" style="background:var(--ok-bg);border:1.5px solid var(--ok-bg2);text-align:center">' +
    '<div style="font-size:34px;margin-bottom:6px">🛡</div>' +
    '<div style="font-size:16px;font-weight:700">48 SOAT KAFOLAT</div>' +
    '<div style="font-size:12px;color:var(--t2);margin-top:3px">Norozi = bepul qayta tozalash!</div></div>' +
    '<div class="ft"><div class="ft-i">✅</div><div class="ft-t">48 soat ichida murojaat</div></div>' +
    '<div class="ft"><div class="ft-i">📸</div><div class="ft-t">Muammo rasmini yuboring</div></div>' +
    '<div class="ft"><div class="ft-i">📝</div><div class="ft-t">Sabab yozing</div></div>' +
    '<div class="ft"><div class="ft-i">🔄</div><div class="ft-t">Bepul qayta tozalash</div></div>' +
    '<button class="btn btn-p" style="margin-top:12px" onclick="sendD({action:\'warranty\'});closeM();toast(\'✅ Yuborildi!\');haptic(\'success\')">🛡 Kafolat talabi</button>' +
    '<button class="btn btn-gh" onclick="closeM()">Yopish</button>'
  );
}

function openGift() {
  var amounts = [500000, 1000000, 2000000, 5000000];
  var sg = '';
  for (var i = 0; i < amounts.length; i++) {
    var a = amounts[i];
    sg += '<div class="sv" onclick="sendD({action:\'gift\',amount:' + a + '});closeM();toast(\'✅ ' + F(a) + ' sertifikat!\');haptic(\'success\')">';
    sg += '<span class="sv-e">🎁</span><div class="sv-n">' + F(a) + '</div><div class="sv-p">so\'m</div></div>';
  }
  openM(
    '<div class="m-t">🎁 Sovg\'a</div>' +
    '<p style="font-size:12px;color:var(--t2);margin-bottom:12px">Do\'stingizga sovg\'a qiling!</p>' +
    '<div class="sg">' + sg + '</div>' +
    '<div class="fg" style="margin-top:10px"><label class="fl">🎟 Kodni ishlatish</label>' +
    '<div style="display:flex;gap:6px"><input class="fi" id="gC" placeholder="GIFT****" style="text-transform:uppercase">' +
    '<button class="btn btn-p" style="width:auto;padding:13px 18px" onclick="var c=$(\'gC\');if(c&&c.value)sendD({action:\'gift_use\',code:c.value});closeM();toast(\'✅ Tekshirilmoqda...\')">✅</button></div></div>' +
    '<button class="btn btn-gh" onclick="closeM()">Yopish</button>'
  );
}

function openPromos() {
  var discs = [
    {e:'🎉',t:'Birinchi',v:'-5%',d:'1-buyurtma'},{e:'🏆',t:'Sodiq',v:'-10%',d:'10+'},
    {e:'🌟',t:'VIP',v:'-8%',d:'20+'},{e:'👥',t:'Referral',v:'-5%',d:"Do'st"},
    {e:'📦',t:'Paket',v:'-10%',d:'2+ xizmat'},{e:'💎',t:'Premium',v:'-20%',d:"A'zolik"}
  ];
  var dh = '';
  for (var i = 0; i < discs.length; i++) {
    var x = discs[i];
    dh += '<div class="di"><span class="di-e">' + x.e + '</span><div class="di-l">' + x.t + '</div><div class="di-v">' + x.v + '</div><div class="di-d">' + x.d + '</div></div>';
  }
  openM(
    '<div class="m-t">🎄 Aksiyalar</div><div class="dg" style="margin-bottom:12px">' + dh + '</div>' +
    '<div class="cd-t">🎟 Promo kod</div>' +
    '<div class="prm"><input class="fi" id="pC" placeholder="KOD...">' +
    '<button class="btn btn-p" onclick="var p=$(\'pC\');if(p&&p.value)sendD({action:\'promo\',code:p.value});toast(\'✅\')">✅</button></div>' +
    '<button class="btn btn-gh" onclick="closeM()" style="margin-top:6px">Yopish</button>'
  );
}

function openPartner() {
  openM(
    '<div class="m-t">🤝 Hamkorlik</div>' +
    '<div class="cd" style="background:var(--p-g);color:#fff;text-align:center;border:none;box-shadow:0 8px 32px rgba(108,92,231,.25)">' +
    '<div style="font-size:30px;font-weight:800">10%</div>' +
    '<div style="font-size:14px;font-weight:600">Har buyurtmadan komissiya!</div></div>' +
    '<div class="ft"><div class="ft-i">1️⃣</div><div class="ft-t">Ariza bering</div></div>' +
    '<div class="ft"><div class="ft-i">2️⃣</div><div class="ft-t">Shaxsiy link oling</div></div>' +
    '<div class="ft"><div class="ft-i">3️⃣</div><div class="ft-t">Mijozlarni yo\'naltiring</div></div>' +
    '<div class="ft"><div class="ft-i">4️⃣</div><div class="ft-t">10% komissiya oling</div></div>' +
    '<div class="fg" style="margin-top:12px"><label class="fl">🏢 Biznes</label><input class="fi" id="pB" placeholder="Mebel, remont..."></div>' +
    '<div class="fg"><label class="fl">📱 Telefon</label><input class="fi" type="tel" id="pP" placeholder="+998..."></div>' +
    '<button class="btn btn-ok" onclick="var b=$(\'pB\'),p=$(\'pP\');if(!b||!b.value||!p||!p.value){toast(\'❌ Kiriting\');return}sendD({action:\'partner\',business:b.value,phone:p.value});closeM();toast(\'✅ Yuborildi!\');haptic(\'success\')">📤 Ariza</button>'
  );
}

function openMember() {
  var plans = [
    {n:'Basic',p:200000,d:10,pk:['Har buyurtma -10%','Ustuvor xizmat'],r:false},
    {n:'Premium',p:500000,d:20,pk:['Har buyurtma -20%','Ustuvor xizmat','Bepul konsultatsiya','VIP support'],r:true}
  ];
  var h = '<div class="m-t">💎 A\'zolik</div>';
  for (var i = 0; i < plans.length; i++) {
    var m = plans[i];
    var brd = m.r ? '2px solid var(--p)' : '2px solid var(--b)';
    var bc = m.r ? 'btn-p' : 'btn-o';
    var icon = m.r ? '💎' : '🥈';
    h += '<div class="cd" style="border:' + brd + '">';
    if (m.r) h += '<span class="bdg bdg-p" style="margin-bottom:6px">⭐ TAVSIYA</span>';
    h += '<div class="cd-t">' + icon + ' ' + m.n + '</div>';
    h += '<div style="font-size:22px;font-weight:800;background:var(--p-g);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px">' + F(m.p) + ' <span style="font-size:11px;color:var(--t3);-webkit-text-fill-color:var(--t3)">so\'m/oy</span></div>';
    h += '<div style="font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--ok),var(--s));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px">-' + m.d + '%</div>';
    for (var j = 0; j < m.pk.length; j++) {
      h += '<div class="ft" style="padding:4px 0"><div class="ft-i">✅</div><div class="ft-t">' + m.pk[j] + '</div></div>';
    }
    h += '<button class="btn ' + bc + '" style="margin-top:10px" onclick="sendD({action:\'membership\',plan:\'' + m.n.toLowerCase() + '\',price:' + m.p + '});closeM();toast(\'✅ Yuborildi!\');haptic(\'success\')">' + icon + ' ' + m.n + ' — ' + F(m.p) + '</button></div>';
  }
  h += '<button class="btn btn-gh" onclick="closeM()">Yopish</button>';
  openM(h);
}

function openCompare() {
  openM(
    '<div class="m-t">📊 Taqqoslash</div>' +
    '<div style="overflow-x:auto;margin-bottom:12px"><table class="cmp">' +
    '<tr><th></th><th style="color:var(--p)">🏆 Biz</th><th>A</th><th>B</th></tr>' +
    '<tr><td>Tozalash</td><td class="cmp-us">500K</td><td>600K</td><td>550K</td></tr>' +
    '<tr><td>Divan</td><td class="cmp-us">80K</td><td>100K</td><td>90K</td></tr>' +
    '<tr><td>Gilam</td><td class="cmp-us">27K</td><td>35K</td><td>30K</td></tr>' +
    '<tr><td>Borish</td><td class="cmp-hl">Bepul</td><td>+20K</td><td>+15K</td></tr>' +
    '<tr><td>Kafolat</td><td class="cmp-hl">48s</td><td>Yo\'q</td><td>24s</td></tr></table></div>' +
    '<button class="btn btn-p" onclick="closeM();go(\'order\');newOrd(false)">✨ Buyurtma</button>' +
    '<button class="btn btn-gh" onclick="closeM()">Yopish</button>'
  );
}

function openHome() {
  var hm = savedHome;
  openM(
    '<div class="m-t">🏠 Uy profili</div>' +
    '<p style="font-size:11px;color:var(--t3);margin-bottom:10px">Saqlang — tezroq buyurtma!</p>' +
    '<div class="fg"><label class="fl">🚪 Xonalar</label><input class="fi" id="hR" value="' + (hm.rooms || '') + '" placeholder="3"></div>' +
    '<div class="fg"><label class="fl">📐 Maydon</label><input class="fi" id="hA" value="' + (hm.area || '') + '" placeholder="80 kv.m"></div>' +
    '<div class="fg"><label class="fl">🏢 Qavat</label><input class="fi" id="hF" value="' + (hm.floor || '') + '" placeholder="5"></div>' +
    '<div class="fg"><label class="fl">📍 Manzil</label><input class="fi" id="hAd" value="' + (hm.addr || '') + '" placeholder="Ko\'cha, uy..."></div>' +
    '<div class="fg"><label class="fl">🔑 Eslatma</label><textarea class="fi" id="hN" placeholder="Eshik kodi...">' + (hm.notes || '') + '</textarea></div>' +
    '<button class="btn btn-ok" onclick="saveHm()">💾 Saqlash</button>'
  );
}

function saveHm() {
  savedHome = {
    rooms: $('hR') ? $('hR').value : '',
    area: $('hA') ? $('hA').value : '',
    floor: $('hF') ? $('hF').value : '',
    addr: $('hAd') ? $('hAd').value : '',
    notes: $('hN') ? $('hN').value : ''
  };
  sendD({action:'home_profile', rooms:savedHome.rooms, area:savedHome.area, floor:savedHome.floor, addr:savedHome.addr, notes:savedHome.notes});
  closeM(); toast('✅ Saqlandi!'); haptic('success');
}

function openPrivacy() {
  openM(
    '<div class="m-t">🔐 Maxfiylik</div>' +
    '<div class="ft"><div class="ft-i">✅</div><div class="ft-t">Telefon — faqat aloqa</div></div>' +
    '<div class="ft"><div class="ft-i">✅</div><div class="ft-t">Manzil — faqat xizmat</div></div>' +
    '<div class="ft"><div class="ft-i">❌</div><div class="ft-t">3-shaxslarga berilmaydi</div></div>' +
    '<div class="ft"><div class="ft-i">❌</div><div class="ft-t">Reklama uchun ishlatilmaydi</div></div>' +
    '<button class="btn btn-er" style="margin-top:12px" onclick="confirmDel()">🗑 O\'chirish</button>' +
    '<button class="btn btn-gh" onclick="closeM()">Yopish</button>'
  );
}

function confirmDel() {
  openM(
    '<div style="text-align:center;padding:20px 0">' +
    '<div style="font-size:48px;margin-bottom:12px">⚠️</div>' +
    '<div style="font-size:16px;font-weight:700;margin-bottom:8px">Ishonchingiz komilmi?</div>' +
    '<p style="font-size:12px;color:var(--t2);margin-bottom:16px">Barcha ma\'lumotlar o\'chiriladi</p>' +
    '<button class="btn btn-er" onclick="sendD({action:\'delete_data\'});closeM();toast(\'✅ Yuborildi\');haptic(\'success\')">Ha, o\'chirish</button>' +
    '<button class="btn btn-gh" onclick="closeM()" style="margin-top:6px">Bekor</button></div>'
  );
}

function openSettings() {
  var isDark = document.body.classList.contains('dark');
  openM(
    '<div class="m-t">⚙️ Sozlamalar</div>' +
    '<div class="sw"><div class="sw-b"><div class="sw-n">🌙 Dark rejim</div><div class="sw-d">Qorang\'i mavzu</div></div>' +
    '<div class="sw-t' + (isDark ? ' on' : '') + '" onclick="toggleTheme();this.classList.toggle(\'on\')"></div></div>' +
    '<div class="sw"><div class="sw-b"><div class="sw-n">🔔 Bildirishnomalar</div><div class="sw-d">Eslatmalar</div></div>' +
    '<div class="sw-t on" onclick="this.classList.toggle(\'on\')"></div></div>' +
    '<div class="sw"><div class="sw-b"><div class="sw-n">🌐 Til</div><div class="sw-d">O\'zbek</div></div>' +
    '<div style="font-size:16px">🇺🇿</div></div>' +
    '<button class="btn btn-p" style="margin-top:12px" onclick="closeM();toast(\'✅ Saqlandi\');haptic(\'success\')">Saqlash</button>'
  );
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  var btn = $('themeBtn');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  haptic('light');
}

// ═══════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════
function boot() {
  drawHome();
  drawCalc();
  drawFaq();
  drawTips();
  go('home');

  var mBg = $('mBg');
  if (mBg) mBg.addEventListener('click', function(e) { if (e.target === mBg) closeM(); });

  try {
    tg.MainButton.setText('✨ Buyurtma berish');
    tg.MainButton.color = '#6C5CE7';
    tg.MainButton.textColor = '#FFFFFF';
    tg.MainButton.show();
    tg.MainButton.onClick(function() { go('order'); newOrd(false); });
  } catch(e) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
