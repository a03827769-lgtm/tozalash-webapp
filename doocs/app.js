'use strict';

// ═══════════════════════════════════════════
//  TELEGRAM WEBAPP INIT
// ═══════════════════════════════════════════
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const TG_USER = tg.initDataUnsafe?.user || {};
const IS_DARK = tg.colorScheme === 'dark';
if (IS_DARK) document.body.classList.add('dk');

// ═══════════════════════════════════════════
//  CONFIG & DATA
// ═══════════════════════════════════════════
const CFG = {
  phone: '+998887887011',
  card: '5614 6817 1876 7068',
  holder: 'M.A.',
  channel: 'https://t.me/tozalash_servis',
  insta: 'https://instagram.com/tozalash.servis',
  botUser: 'tozalash_servisbot',
  workStart: 9,
  workEnd: 17,
};

const SERVICES = [
  {id:'cleaning_standard',i:'🧹',n:'Oddiy tozalash',p:500000,u:'ishchi',t:'w',hot:true},
  {id:'cleaning_general',i:'🧼',n:'General tozalash',p:500000,u:'ishchi',t:'w'},
  {id:'cleaning_renovation',i:'🔨',n:'Remont keyin',p:600000,u:'ishchi',t:'w'},
  {id:'sofa',i:'🛋',n:'Divan yuvish',p:80000,u:"o'rin",mn:5,mx:50,t:'q'},
  {id:'chair',i:'💺',n:'Stul yuvish',p:50000,u:'dona',mn:5,mx:50,t:'q'},
  {id:'carpet',i:'🟫',n:'Gilam yuvish',p:27000,u:'kv.m',mn:10,mx:200,t:'q'},
  {id:'facade',i:'🏢',n:'Fasad yuvish',p:22000,u:'kv.m',mn:1,mx:500,t:'q'},
  {id:'tile',i:'🧱',n:'Plitka yuvish',p:15000,u:'kv.m',mn:1,mx:500,t:'q'},
];

const DISTRICTS = [
  'Bektemir','Chilonzor','Yakkasaroy','Mirobod','Mirzo Ulugbek',
  'Sergeli','Shayxontohur','Olmazor','Uchtepa','Yashnobod','Yunusobod',
];

const TIMES = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

const HOLIDAYS = ['2025-03-30','2025-03-31','2025-04-01','2025-06-06','2025-06-07'];

const FAQ_DATA = [
  {q:'Narxlar qanday?',a:"Oddiy/General tozalash: 500,000 so'm/ishchi. Remont keyin: 600,000. Divan: 80,000/o'rin (min 5). Gilam: 27,000/kv.m (min 10). Stul: 50,000/dona (min 5)."},
  {q:'Ish vaqti?',a:'Har kuni 09:00 dan 17:00 gacha. Bayram kunlari (Ramazon, Qurbon hayiti) dam olamiz.'},
  {q:'Vositalar kimdan?',a:"Barcha professional Karcher apparatlari va tozalash vositalari bizdan. Siz hech narsa tayyorlashingiz shart emas."},
  {q:"To'lov usullari?",a:"Naqd pul yoki karta orqali. Karta: 5614 6817 1876 7068 (M.A.)"},
  {q:'Qaysi hududlarga xizmat?',a:'Toshkent shahri barcha tumanlari. Borish narxga kiritilgan.'},
  {q:'Minimal buyurtma?',a:"Tozalash: min 1 ishchi. Divan: min 5 o'rin. Stul: min 5 dona. Gilam: min 10 kv.m."},
  {q:'Shoshilinch buyurtma?',a:"Ha, mumkin! 24 soatdan kam qolsa narx 25% ga oshadi."},
  {q:'Kafolat bormi?',a:"Ha! Ish tugaganidan 48 soat ichida norozi bo'lsangiz BEPUL qayta tozalaymiz."},
  {q:"Nechta ishchi keladi?",a:"Siz buyurtma berasiz, admin rasmlaringizni ko'rib, zarur ishchilar sonini belgilaydi (max 10 ta)."},
  {q:"Chegirmalar qanday ishlaydi?",a:"Birinchi buyurtma -5%. 10+ buyurtma -10%. VIP (20+) -8%. Referral -5%. Shoshilinch +25%."},
];

const TIPS = [
  {cat:'🧹 Tozalash',icon:'🧹',title:'Chang artish tartibi',text:'Doim yuqoridan pastga tozalang. Avval tokchalar, shkaf ustlari, keyin pol.'},
  {cat:'🧹 Tozalash',icon:'✨',title:'Oyna tozalash',text:'Gazeta bilan oynalarni artsangiz iz qoldirmaydi! Sprey + gazeta = mukammal natija.'},
  {cat:'🛋 Mebel',icon:'🛋',title:'Divan parvarishi',text:'Har 6 oyda bir professional tozalash tavsiya etiladi. Yangi dog\'ni darhol sovuq suv bilan yuving.'},
  {cat:'🟫 Gilam',icon:'🟫',title:'Gilam hidi',text:'Soda sepib 30 daqiqa qo\'ying, keyin changyutgich bilan oling. Hid yo\'qoladi!'},
  {cat:'🏠 Uy',icon:'⏰',title:'Tozalash jadvali',text:'Har kun: idish, pol. Har hafta: hammom, oshxona. Har oy: umumiy tozalash. Har yil: general.'},
  {cat:'🧴 Vositalar',icon:'🧴',title:'Natural vositalar',text:'Sirka + soda = hammom uchun ideal. Limon suvi = oynalar. Zaytun moyi = mebel.'},
];

const ACHIEVEMENTS = [
  {id:'first',i:'🎉',n:'Birinchi qadam',d:'Birinchi buyurtma',o:1},
  {id:'loyal3',i:'⭐',n:'Doimiy mijoz',d:'3 buyurtma',o:3},
  {id:'loyal5',i:'🌟',n:'Sodiq',d:'5 buyurtma',o:5},
  {id:'loyal10',i:'💎',n:'Oltin',d:'10 buyurtma',o:10},
  {id:'loyal25',i:'👑',n:'Brilliant',d:'25 buyurtma',o:25},
  {id:'spent1m',i:'💰',n:'Millioner',d:"1M+ sarfladi",s:1000000},
  {id:'ref3',i:'🤝',n:'Taklif ustasi',d:'3 do\'st taklif',r:3},
  {id:'reviewer',i:'📝',n:'Sharhchi',d:'Sharh qoldirdi'},
  {id:'vip',i:'🌟',n:'VIP',d:'VIP status oldi'},
];

const LEVELS = [
  {n:'🥉 Bronze',mn:0,mx:500,clr:'#CD7F32'},
  {n:'🥈 Silver',mn:500,mx:1500,clr:'#C0C0C0'},
  {n:'🥇 Gold',mn:1500,mx:3000,clr:'#FFD700'},
  {n:'💎 Diamond',mn:3000,mx:5000,clr:'#B9F2FF'},
  {n:'👑 Legend',mn:5000,mx:99999,clr:'#FF69B4'},
];

// ═══════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════
const STATE = {
  page: 'home',
  theme: IS_DARK ? 'dark' : 'light',
  lang: 'uz',
  selSrv: null,
  orderStep: 0,
  orderData: {},
  calcSrv: SERVICES[0],
  calcVal: 1,
  calMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
  faqSearch: '',
  notifEnabled: true,
  promoCode: '',
  tipCat: 'all',
  ordersFilter: 'all',
  homeSaved: {},
};

// ═══════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════
const F = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const el = id => document.getElementById(id);
const now = () => new Date();
const today = () => now().toISOString().split('T')[0];
const minDate = () => {
  const d = new Date(); d.setDate(d.getDate());
  return d.toISOString().split('T')[0];
};
const isHoliday = d => HOLIDAYS.includes(d);
const isWeekend = d => [0,6].includes(new Date(d).getDay());
const isUrgent = d => {
  const diff = new Date(d+'T09:00') - now();
  return diff < 24*3600*1000 && diff > 0;
};

function toast(msg, dur=2500) {
  const t = el('toast');
  t.textContent = msg;
  t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), dur);
}

function oModal(html) {
  el('mdl').innerHTML = '<div class="mdl-bar"></div>' + html;
  el('mbg').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function cModal() {
  el('mbg').classList.remove('on');
  document.body.style.overflow = '';
}

function uRange(input) {
  const mn = +input.min, mx = +input.max, v = +input.value;
  const pct = ((v - mn) / (mx - mn)) * 100;
  input.style.background = `linear-gradient(to right,var(--p) ${pct}%,var(--bg3) ${pct}%)`;
}

function send(data) {
  try { tg.sendData(JSON.stringify(data)); }
  catch(e) { console.error('Send error:', e); }
}

function copyText(txt) {
  if (navigator.clipboard) navigator.clipboard.writeText(txt);
  else {
    const ta = document.createElement('textarea');
    ta.value = txt; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
  }
  toast('📋 Nusxalandi!');
}

function getLevel(pts) {
  return LEVELS.find(l => pts >= l.mn && pts < l.mx) || LEVELS[LEVELS.length-1];
}

function getRefCode() {
  return TG_USER.id ? 'TS' + String(TG_USER.id).slice(-6).toUpperCase() : 'TSGUEST';
}

// ═══════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════
function go(page) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.bi').forEach((b,i) => {
    const pages = ['home','order','calc','more','me'];
    b.classList.toggle('on', pages[i] === page);
  });
  const p = el('p-'+page);
  if (p) { p.classList.add('on'); window.scrollTo(0,0); }
  STATE.page = page;
  if (page === 'me') renderProfile();
  if (page === 'calc') renderCalc();
  if (page === 'home') renderHome();
}

// ═══════════════════════════════════════════
//  HOME PAGE
// ═══════════════════════════════════════════
function renderHome() {
  const sg = el('home-srvs');
  if (!sg) return;
  sg.innerHTML = SERVICES.filter(s => !['tile'].includes(s.id)).slice(0,6).map(s => `
    <div class="sv${STATE.selSrv?.id===s.id?' on':''}" onclick="pickSrv('${s.id}')">
      <span class="sv-i">${s.i}</span>
      <div class="sv-n">${s.n}${s.hot?'<span class="sv-badge">HOT</span>':''}</div>
      <div class="sv-p">${F(s.p)}/${s.u}</div>
    </div>
  `).join('');
}

function pickSrv(id) {
  STATE.selSrv = SERVICES.find(s => s.id === id);
  renderHome();
  setTimeout(() => { go('order'); initOrder(); }, 160);
}

// ═══════════════════════════════════════════
//  ORDER FLOW - 5 BOSQICH
// ═══════════════════════════════════════════
function initOrder(fromCalc=false) {
  if (!STATE.selSrv) STATE.selSrv = SERVICES[0];
  STATE.orderStep = 0;
  const S = STATE.selSrv;
  STATE.orderData = {
    srv: S,
    qty: fromCalc ? STATE.calcVal : (S.t==='w' ? 1 : (S.mn||1)),
    extraSrvs: [],
    addr: STATE.homeSaved.addr || '',
    dist: '',
    date: '',
    time: '09:00',
    phone: '',
    pay: '',
    urgent: false,
  };
  renderOrder();
}

function renderOrder() {
  const steps = el('osteps');
  const cont = el('oc');
  if (!steps || !cont) return;

  steps.innerHTML = Array.from({length:5},(_,i) =>
    `<div class="step ${i<STATE.orderStep?'d':i===STATE.orderStep?'c':''}"></div>`
  ).join('');

  const S = STATE.orderData.srv;
  const total = S.p * STATE.orderData.qty;

  const stepTitles = ['Xizmat & Miqdor','Manzil','Sana & Vaqt',"To'lov","Tasdiqlash"];
  const subtitle = `<div style="font-size:11px;color:var(--t3);margin-bottom:12px;text-align:center">${STATE.orderStep+1}/5 — ${stepTitles[STATE.orderStep]}</div>`;

  switch (STATE.orderStep) {

    case 0: // Xizmat tanlash va miqdor
      cont.innerHTML = subtitle + `
        <div class="cd"><div class="cd-t">🛠 Xizmat tanlang</div>
          <div class="sg" style="margin-bottom:12px">${
            SERVICES.map(s=>`
              <div class="sv${STATE.orderData.srv.id===s.id?' on':''}"
                   onclick="STATE.orderData.srv=SERVICES.find(x=>x.id==='${s.id}');STATE.orderData.qty=${s.t==='w'?1:(s.mn||1)};renderOrder()">
                <span class="sv-i">${s.i}</span>
                <div class="sv-n">${s.n}</div>
                <div class="sv-p">${F(s.p)}/${s.u}</div>
              </div>`).join('')}
          </div>
          ${S.t==='w' ? `
            <div class="cd-t">👷 Ishchilar soni</div>
            <div class="rv" id="oqv">${STATE.orderData.qty} ishchi</div>
            <input type="range" min="1" max="10" value="${STATE.orderData.qty}"
              oninput="STATE.orderData.qty=+this.value;el('oqv').textContent=this.value+' ishchi';uRange(this)">
            <div class="ri"><span>1</span><span>10</span></div>
            <p style="font-size:11px;color:var(--t3);margin-top:8px;text-align:center">
              💰 ${F(S.p)} so'm/ishchi/kun</p>
          ` : `
            <div class="cd-t">📊 Miqdor (${S.u})</div>
            <div class="fg">
              <input class="fi" type="number" id="qi" value="${STATE.orderData.qty}"
                min="${S.mn||1}" placeholder="${S.mn||1}">
              <p style="font-size:10px;color:var(--t4);margin-top:4px">Min: ${S.mn||1} ${S.u}</p>
            </div>
          `}
          ${STATE.orderData.extraSrvs.length===0 && S.t==='q' ? `
            <div style="margin-top:8px;padding:8px;background:var(--bg2);border-radius:var(--r3);font-size:11px;color:var(--t3)">
              ➕ Qo'shimcha xizmatlar qo'shib <b>-10% paket</b> chegirma oling!
              <button class="btn bo" style="margin-top:6px;padding:7px;font-size:11px" onclick="showAddExtra()">
                ➕ Xizmat qo'shish</button>
            </div>` : ''}
        </div>
        <div class="br">
          <button class="btn bo" onclick="go('home')">❌</button>
          <button class="btn bp" onclick="step0Next()">Davom ▶</button>
        </div>`;
      // uRange init
      const r = document.querySelector('#oc input[type=range]');
      if (r) uRange(r);
      break;

    case 1: // Manzil
      cont.innerHTML = subtitle + `
        <div class="cd">
          <div class="cd-t">📍 Manzil ma'lumotlari</div>
          <div class="fg">
            <label class="fl">📍 Tuman</label>
            <select class="fi" id="odist">
              ${DISTRICTS.map(d=>`<option${STATE.orderData.dist===d?' selected':''}>${d}</option>`).join('')}
            </select>
          </div>
          <div class="fg">
            <label class="fl">🏠 To'liq manzil</label>
            <input class="fi" id="oaddr" placeholder="Ko'cha, uy, mo'ljal..."
              value="${STATE.orderData.addr}">
          </div>
          ${STATE.homeSaved.addr ? `
            <div style="padding:8px;background:var(--bg2);border-radius:var(--r3);font-size:11px;cursor:pointer"
              onclick="el('oaddr').value='${STATE.homeSaved.addr}';toast('✅ Manzil qo\'shildi')">
              📌 Saqlangan: <b>${STATE.homeSaved.addr.slice(0,30)}...</b>
            </div>` : ''}
          <div class="map-prev" onclick="useLocation()" style="margin-top:10px">
            <div class="map-overlay">
              <div style="text-align:center;color:var(--p)">
                <div style="font-size:24px">📍</div>
                <div style="font-size:11px;font-weight:600;margin-top:4px">GPS joylashuvni yuborish</div>
              </div>
            </div>
          </div>
        </div>
        <div class="br">
          <button class="btn bo" onclick="STATE.orderStep--;renderOrder()">◀</button>
          <button class="btn bp" onclick="step1Next()">Davom ▶</button>
        </div>`;
      break;

    case 2: // Sana & Vaqt
      cont.innerHTML = subtitle + `
        <div class="cd">
          <div class="cd-t">📅 Sana tanlang</div>
          <div id="cal-wrap"></div>
        </div>
        <div class="cd">
          <div class="cd-t">⏰ Boshlanish vaqti</div>
          <div class="chs" id="tchs"></div>
        </div>
        ${isUrgent(STATE.orderData.date||minDate()) ? `
          <div class="timer">
            <div class="timer-t">⚡ SHOSHILINCH BUYURTMA</div>
            <div class="timer-v">+25%</div>
            <div class="timer-l">24 soatdan kam vaqt</div>
          </div>` : ''}
        <div class="br">
          <button class="btn bo" onclick="STATE.orderStep--;renderOrder()">◀</button>
          <button class="btn bp" onclick="step2Next()">Davom ▶</button>
        </div>`;
      renderCalendar('cal-wrap');
      renderTimeChips();
      break;

    case 3: // Telefon & To'lov
      cont.innerHTML = subtitle + `
        <div class="cd">
          <div class="cd-t">📱 Aloqa ma'lumotlari</div>
          <div class="fg">
            <label class="fl">📞 Telefon raqam</label>
            <div class="fi-icon">
              <span class="icon">📱</span>
              <input class="fi" type="tel" id="oph" placeholder="+998 90 123 45 67"
                value="${STATE.orderData.phone}">
            </div>
          </div>
        </div>
        <div class="cd">
          <div class="cd-t">💳 To'lov usuli</div>
          <div class="chs" style="margin-bottom:10px">
            <div class="ch${STATE.orderData.pay==='cash'?' on':''}"
              onclick="STATE.orderData.pay='cash';renderOrder()">💵 Naqd pul</div>
            <div class="ch${STATE.orderData.pay==='card'?' on':''}"
              onclick="STATE.orderData.pay='card';renderOrder()">💳 Karta</div>
          </div>
          ${STATE.orderData.pay==='card' ? `
            <div class="payc">
              <div class="payc-logo">💳</div>
              <small>TO'LOV KARTASI</small>
              <div class="pnum">${CFG.card}</div>
              <div class="phld">${CFG.holder}</div>
            </div>
            <p style="font-size:11px;color:var(--t3);margin-bottom:8px">
              ℹ️ Buyurtma tasdiqlangandan so'ng karta raqamiga o'tkazing</p>` : ''}
        </div>
        <div class="br">
          <button class="btn bo" onclick="STATE.orderStep--;renderOrder()">◀</button>
          <button class="btn bp" onclick="step3Next()">Davom ▶</button>
        </div>`;
      break;

    case 4: // Tasdiqlash
      const urg = isUrgent(STATE.orderData.date);
      const basePrice = S.p * STATE.orderData.qty;
      const urgAdd = urg ? Math.round(basePrice * 0.25) : 0;
      const extraDisc = STATE.orderData.extraSrvs.length > 0 ? Math.round(basePrice * 0.10) : 0;
      const finalPrice = basePrice + urgAdd - extraDisc;
      STATE.orderData.urgent = urg;

      cont.innerHTML = subtitle + `
        <div class="sum">
          <div style="text-align:center;font-weight:800;font-size:14px;margin-bottom:10px;color:var(--t)">📋 Buyurtma xulosasi</div>
          <div class="sr"><span class="lbl">Xizmat</span><span class="val">${S.i} ${S.n}</span></div>
          <div class="sr"><span class="lbl">Miqdor</span><span class="val">${STATE.orderData.qty} ${S.u}</span></div>
          ${STATE.orderData.extraSrvs.length ? `
            <div class="sr"><span class="lbl">Qo'shimcha</span><span class="val">${STATE.orderData.extraSrvs.map(e=>e.i).join(' ')}</span></div>` : ''}
          <div class="sr"><span class="lbl">Tuman</span><span class="val">📍 ${STATE.orderData.dist}</span></div>
          <div class="sr"><span class="lbl">Manzil</span><span class="val">${STATE.orderData.addr}</span></div>
          <div class="sr"><span class="lbl">Sana</span><span class="val">📅 ${STATE.orderData.date}</span></div>
          <div class="sr"><span class="lbl">Vaqt</span><span class="val">⏰ ${STATE.orderData.time}</span></div>
          <div class="sr"><span class="lbl">Telefon</span><span class="val">📱 ${STATE.orderData.phone}</span></div>
          <div class="sr"><span class="lbl">To'lov</span><span class="val">${STATE.orderData.pay==='card'?'💳 Karta':'💵 Naqd'}</span></div>
          <div class="sr"><span class="lbl">Asosiy narx</span><span class="val">${F(basePrice)} so'm</span></div>
          ${urg?`<div class="sr"><span class="lbl" style="color:var(--e)">⚡ Shoshilinch</span><span class="val" style="color:var(--e)">+${F(urgAdd)} so'm</span></div>`:''}
          ${extraDisc?`<div class="sr"><span class="lbl" style="color:var(--g)">📦 Paket</span><span class="val" style="color:var(--g)">-${F(extraDisc)} so'm</span></div>`:''}
          <div class="sr tot"><span>JAMI</span><span>${F(finalPrice)} so'm</span></div>
        </div>
        <button class="btn bg" onclick="submitOrder(${finalPrice})" style="font-size:15px;padding:15px">
          ✅ BUYURTMA BERISH
        </button>
        <button class="btn bo" onclick="STATE.orderStep--;renderOrder()" style="margin-top:6px">◀ Orqaga</button>`;
      break;
  }
}

function step0Next() {
  const S = STATE.orderData.srv;
  if (S.t === 'q') {
    const v = +(el('qi')?.value || STATE.orderData.qty);
    if (S.mn && v < S.mn) { toast(`❌ Min ${S.mn} ${S.u}`); el('qi')?.classList.add('err'); return; }
    if (S.mx && v > S.mx) { toast(`❌ Max ${S.mx} ${S.u}`); return; }
    STATE.orderData.qty = v;
  }
  STATE.orderStep++; renderOrder();
}

function step1Next() {
  const a = el('oaddr')?.value?.trim();
  const d = el('odist')?.value;
  if (!a || a.length < 5) { toast('❌ Manzilni kiriting'); el('oaddr')?.classList.add('err'); return; }
  STATE.orderData.addr = a;
  STATE.orderData.dist = d || DISTRICTS[0];
  STATE.orderStep++; renderOrder();
}

function step2Next() {
  if (!STATE.orderData.date) { toast('❌ Sanani tanlang'); return; }
  if (!STATE.orderData.time) STATE.orderData.time = '09:00';
  STATE.orderStep++; renderOrder();
}

function step3Next() {
  const ph = el('oph')?.value?.trim();
  if (!ph || ph.length < 9) { toast('❌ Telefon raqam kiriting'); return; }
  if (!STATE.orderData.pay) { toast("❌ To'lov usulini tanlang"); return; }
  STATE.orderData.phone = ph;
  STATE.orderStep++; renderOrder();
}

function showAddExtra() {
  const current = STATE.orderData.srv.id;
  const extras = SERVICES.filter(s => s.id !== current && ['sofa','chair','carpet'].includes(s.id));
  oModal(`
    <div class="mdl-t">➕ Xizmat qo'shish (-10%)</div>
    <p style="font-size:12px;color:var(--t3);margin-bottom:12px">Kompleks buyurtmada -10% chegirma!</p>
    ${extras.map(s => `
      <div class="oi" onclick="addExtra('${s.id}');cModal()">
        <div class="oi-ic" style="background:var(--bg2)">${s.i}</div>
        <div class="oi-info"><div class="oi-n">${s.n}</div><div class="oi-d">${F(s.p)} so'm/${s.u}</div></div>
        <div class="oi-r">+</div>
      </div>`).join('')}
  `);
}

function addExtra(id) {
  const s = SERVICES.find(x => x.id === id);
  if (s && !STATE.orderData.extraSrvs.find(x => x.id === id)) {
    STATE.orderData.extraSrvs.push(s);
  }
  renderOrder();
}

function useLocation() {
  if (navigator.geolocation) {
    toast('📍 Joylashuv aniqlanmoqda...');
    navigator.geolocation.getCurrentPosition(pos => {
      STATE.orderData.lat = pos.coords.latitude;
      STATE.orderData.lng = pos.coords.longitude;
      if (el('oaddr')) el('oaddr').placeholder = `📍 ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      toast('✅ Joylashuv aniqlandi!');
    }, () => toast('❌ Joylashuvga ruxsat bering'));
  }
}

function submitOrder(finalPrice) {
  const data = {
    action: 'order',
    service: STATE.orderData.srv.id,
    qty: STATE.orderData.qty,
    extra: STATE.orderData.extraSrvs.map(s=>s.id),
    district: STATE.orderData.dist,
    address: STATE.orderData.addr,
    lat: STATE.orderData.lat,
    lng: STATE.orderData.lng,
    date: STATE.orderData.date,
    time: STATE.orderData.time,
    phone: STATE.orderData.phone,
    payment: STATE.orderData.pay,
    urgent: STATE.orderData.urgent,
    final_price: finalPrice,
  };
  send(data);
  el('oc').innerHTML = `
    <div class="succ">
      <span class="succ-i">🎉</span>
      <div class="succ-t">Buyurtma qabul qilindi!</div>
      <div class="succ-d">Operator tez orada bog'lanadi va kerakli ishchilar sonini belgilaydi.</div>
      <div class="succ-id">Telefon: ${CFG.phone}</div>
      <button class="btn bp" style="margin-top:16px" onclick="go('home')">🏠 Asosiy sahifa</button>
    </div>`;
  el('osteps').innerHTML = '';
}

// ═══════════════════════════════════════════
//  CALENDAR
// ═══════════════════════════════════════════
function renderCalendar(containerId) {
  const container = el(containerId);
  if (!container) return;

  const y = STATE.calYear, m = STATE.calMonth;
  const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
  const days = ['Du','Se','Ch','Pa','Ju','Sh','Ya'];
  const first = new Date(y, m, 1).getDay();
  const offset = (first + 6) % 7;
  const total = new Date(y, m+1, 0).getDate();
  const todayStr = today();

  let html = `<div class="cal">
    <div class="cal-hdr">
      <div class="cal-nav" onclick="calPrev()">‹</div>
      <div class="cal-title">${months[m]} ${y}</div>
      <div class="cal-nav" onclick="calNext()">›</div>
    </div>
    <div class="cal-days">
      ${days.map(d=>`<div class="cal-day-name">${d}</div>`).join('')}
      ${Array(offset).fill('<div class="cal-day empty"></div>').join('')}`;

  for (let d = 1; d <= total; d++) {
    const dateStr = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isPast = dateStr < todayStr;
    const isHol = isHoliday(dateStr);
    const isWknd = isWeekend(dateStr);
    const isSel = STATE.orderData.date === dateStr;
    const isToday = dateStr === todayStr;
    let cls = 'cal-day';
    if (isPast) cls += ' busy';
    else if (isHol) cls += ' holiday';
    else if (isSel) cls += ' sel';
    else if (isToday) cls += ' today';
    const click = isPast || isHol ? '' : `onclick="selectDate('${dateStr}')"`;
    html += `<div class="${cls}" ${click}>${d}${isHol?'🎉':''}</div>`;
  }

  html += `</div>`;
  if (STATE.orderData.date) {
    const urg = isUrgent(STATE.orderData.date);
    html += `<div style="margin-top:8px;padding:8px;background:${urg?'#FEF2F2':'#F0FDF4'};border-radius:var(--r3);font-size:11px;color:${urg?'var(--e)':'var(--g)'}">
      ${urg?'⚡ Shoshilinch! (+25%)':'✅ Tanlangan: '+STATE.orderData.date}</div>`;
  }
  html += `</div>`;
  container.innerHTML = html;
}

function selectDate(d) {
  STATE.orderData.date = d;
  renderCalendar('cal-wrap');
}
function calPrev() {
  STATE.calMonth--;
  if (STATE.calMonth < 0) { STATE.calMonth = 11; STATE.calYear--; }
  renderCalendar('cal-wrap');
}
function calNext() {
  STATE.calMonth++;
  if (STATE.calMonth > 11) { STATE.calMonth = 0; STATE.calYear++; }
  renderCalendar('cal-wrap');
}

function renderTimeChips() {
  const container = el('tchs');
  if (!container) return;
  container.innerHTML = TIMES.map(t => `
    <div class="ch${STATE.orderData.time===t?' on':''}" onclick="STATE.orderData.time='${t}';renderTimeChips()">
      🕐 ${t}
    </div>`).join('');
}

// ═══════════════════════════════════════════
//  CALCULATOR
// ═══════════════════════════════════════════
function renderCalc() {
  const chips = el('cchs');
  const disp = el('cdisp');
  const rng = el('crng');
  if (!chips) return;

  chips.innerHTML = SERVICES.map(s => `
    <div class="ch${STATE.calcSrv.id===s.id?' on':''}"
      onclick="STATE.calcSrv=SERVICES.find(x=>x.id==='${s.id}');STATE.calcVal=STATE.calcSrv.t==='w'?1:(STATE.calcSrv.mn||1);renderCalc()">
      ${s.i} ${s.n}
    </div>`).join('');

  const S = STATE.calcSrv;
  const total = S.p * STATE.calcVal;
  const disc5 = Math.round(total * 0.05);
  const disc10 = Math.round(total * 0.10);
  const urgExtra = Math.round(total * 0.25);

  if (disp) disp.innerHTML = `
    <small>Taxminiy narx</small>
    <div class="cp">${F(total)} <span>so'm</span></div>
    <div class="cd2">${STATE.calcVal} ${S.u} × ${F(S.p)} so'm</div>`;

  if (rng) {
    if (S.t === 'w') {
      rng.innerHTML = `
        <div class="cd-t">👷 Ishchilar</div>
        <div class="rv" id="crv">${STATE.calcVal} ishchi</div>
        <input type="range" min="1" max="10" value="${STATE.calcVal}"
          oninput="STATE.calcVal=+this.value;el('crv').textContent=this.value+' ishchi';renderCalc();uRange(this)">
        <div class="ri"><span>1</span><span>10</span></div>`;
    } else {
      rng.innerHTML = `
        <div class="cd-t">📊 Miqdor (${S.u})</div>
        <div class="rv" id="crv">${STATE.calcVal} ${S.u}</div>
        <input type="range" min="${S.mn||1}" max="${S.mx||100}" value="${STATE.calcVal}"
          oninput="STATE.calcVal=+this.value;el('crv').textContent=this.value+' ${S.u}';renderCalc();uRange(this)">
        <div class="ri"><span>${S.mn||1}</span><span>${S.mx||100}</span></div>`;
    }
    const r = rng.querySelector('input[type=range]');
    if (r) uRange(r);
  }

  const comp = el('ccmp');
  if (comp) {
    comp.innerHTML = `
      <table class="cmp">
        <thead><tr><th>Narx turi</th><th style="color:var(--p)">Biz</th><th>A kompaniya</th><th>B kompaniya</th></tr></thead>
        <tbody>
          <tr><td>Jami</td><td class="us">${F(total)}</td><td>${F(Math.round(total*1.2))}</td><td>${F(Math.round(total*1.1))}</td></tr>
          <tr><td>-5% (birinchi)</td><td class="hl">${F(total-disc5)}</td><td>—</td><td>—</td></tr>
          <tr><td>-10% (sodiq)</td><td class="hl">${F(total-disc10)}</td><td>—</td><td>—</td></tr>
          <tr><td>+25% (shoshilinch)</td><td style="color:var(--w)">${F(total+urgExtra)}</td><td>—</td><td>—</td></tr>
        </tbody>
      </table>`;
  }
}

function calcToOrder() {
  STATE.selSrv = STATE.calcSrv;
  go('order');
  initOrder(true);
}

// ═══════════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════════
function renderProfile() {
  const name = [TG_USER.first_name, TG_USER.last_name].filter(Boolean).join(' ') || 'Foydalanuvchi';
  const pts = 150; // demo
  const lvl = getLevel(pts);
  const pct = Math.min(100, ((pts - lvl.mn) / (lvl.mx - lvl.mn)) * 100);
  const refCode = getRefCode();

  const pcard = el('pcard');
  if (pcard) pcard.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <div style="width:52px;height:52px;background:var(--grad);border-radius:14px;
        display:flex;align-items:center;justify-content:center;font-size:22px;
        color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(59,130,246,.3)">
        ${TG_USER.first_name?TG_USER.first_name[0].toUpperCase():'👤'}
      </div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:800">${name}</div>
        <div style="font-size:11px;color:var(--t3)">@${TG_USER.username||'N/A'}</div>
        <span class="bdg bb" style="margin-top:3px">🥉 Bronze</span>
      </div>
    </div>
    <div class="lvl">
      <div class="lvl-i">🥉</div>
      <div class="lvl-info">
        <div class="lvl-n">${lvl.n}</div>
        <div class="lvl-sub">Keyingi: ${F(lvl.mx - pts)} ball kerak</div>
        <div class="prog" style="margin-top:6px;background:rgba(255,255,255,.2)">
          <div class="prog-f" style="width:${pct}%;background:rgba(255,255,255,.8)"></div>
        </div>
      </div>
      <div class="lvl-pts">${pts}<small> ball</small></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:4px">
      ${[['📋','0','Buyurtma'],['💰','0','Sarflangan'],['👥','0','Taklif']].map(([i,v,l])=>
        `<div class="st"><div class="st-i">${i}</div><div class="st-v">${v}</div><div class="st-l">${l}</div></div>`
      ).join('')}
    </div>`;

  const abox = el('achbox');
  if (abox) abox.innerHTML = ACHIEVEMENTS.map(a =>
    `<div class="ach locked">
      <div class="ach-i">${a.i}</div>
      <div class="ach-info">
        <div class="ach-n">${a.n}</div>
        <div class="ach-d">🔒 ${a.d}</div>
      </div>
    </div>`).join('');

  const rfc = el('rfc');
  if (rfc) rfc.textContent = refCode;
}

// ═══════════════════════════════════════════
//  FAQ
// ═══════════════════════════════════════════
function renderFaq(query='') {
  const container = el('faq-list');
  if (!container) return;
  const filtered = query
    ? FAQ_DATA.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()))
    : FAQ_DATA;
  if (!filtered.length) {
    container.innerHTML = `<div class="emp"><span class="emp-i">🔍</span><div class="emp-t">Topilmadi</div><div class="emp-d">"${query}" bo'yicha hech narsa topilmadi</div></div>`;
    return;
  }
  container.innerHTML = filtered.map((f,i) => `
    <div class="fq" id="fq${i}" onclick="toggleFaq(${i})">
      <div class="fq-q">${f.q}<span class="fq-arr">▼</span></div>
      <div class="fq-a">${f.a}</div>
    </div>`).join('');
}

function toggleFaq(i) {
  document.querySelectorAll('.fq').forEach((x,j) => {
    if (j !== i) x.classList.remove('open');
  });
  el('fq'+i)?.classList.toggle('open');
}

// ═══════════════════════════════════════════
//  TIPS / MASLAHATLAR
// ═══════════════════════════════════════════
function renderTips(cat='all') {
  const container = el('tips-list');
  if (!container) return;
  const filtered = cat === 'all' ? TIPS : TIPS.filter(t => t.cat === cat);
  container.innerHTML = filtered.map(t => `
    <div class="cd" onclick="showTip('${t.title}','${t.text}')">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="font-size:24px">${t.icon}</div>
        <div>
          <div style="font-size:13px;font-weight:700">${t.title}</div>
          <div style="font-size:11px;color:var(--t3);margin-top:2px">${t.text.slice(0,50)}...</div>
        </div>
        <div style="margin-left:auto;color:var(--t4)">→</div>
      </div>
    </div>`).join('');
}

function showTip(title, text) {
  oModal(`<div class="mdl-t">${title}</div><p style="font-size:13px;line-height:1.6;color:var(--t2)">${text}</p>
    <button class="btn bp" style="margin-top:16px" onclick="cModal()">OK</button>`);
}

// ═══════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════
function showWarranty() {
  oModal(`
    <div class="mdl-t">🛡 Kafolat siyosati</div>
    <div class="cd" style="background:linear-gradient(135deg,#F0FDF4,#ECFDF5);border:1.5px solid #6EE7B7">
      <div style="text-align:center;font-size:32px;margin-bottom:8px">🛡</div>
      <div style="text-align:center;font-size:14px;font-weight:800;margin-bottom:4px">48 SOAT KAFOLAT</div>
      <div style="text-align:center;font-size:12px;color:var(--t2)">Sifatdan norozi bo'lsangiz — BEPUL qayta tozalash!</div>
    </div>
    <div class="ft"><div class="ft-i">✅</div><div class="ft-txt">48 soat ichida murojaat</div></div>
    <div class="ft"><div class="ft-i">📸</div><div class="ft-txt">Muammo joylarini rasmga olish</div></div>
    <div class="ft"><div class="ft-i">📝</div><div class="ft-txt">Sabab yozib qoldirish</div></div>
    <div class="ft"><div class="ft-i">🔄</div><div class="ft-txt">Bepul qayta tozalash</div></div>
    <button class="btn bp" style="margin-top:14px" onclick="warrantyForm()">🛡 Kafolat talabi</button>
    <button class="btn bo" onclick="cModal()" style="margin-top:6px">Yopish</button>`);
}

function warrantyForm() {
  oModal(`
    <div class="mdl-t">🛡 Kafolat talabi</div>
    <div class="fg"><label class="fl">📋 Buyurtma ID</label><input class="fi" id="war-id" placeholder="#12345"></div>
    <div class="fg"><label class="fl">📝 Muammo tavsifi</label><textarea class="fi" id="war-reason" placeholder="Muammoni batafsil yozing..."></textarea></div>
    <button class="btn bg" onclick="submitWarranty()">📤 Yuborish</button>`);
}

function submitWarranty() {
  const id = el('war-id')?.value;
  const reason = el('war-reason')?.value;
  if (!reason) { toast('❌ Muammo tavsifini yozing'); return; }
  send({action:'warranty', order_id: id, reason});
  cModal();
  toast('✅ Kafolat talabi yuborildi!');
}

function showGift() {
  oModal(`
    <div class="mdl-t">🎁 Sovg'a sertifikat</div>
    <p style="font-size:12px;color:var(--t2);margin-bottom:14px">Do'stingizga tozalash xizmati sovg'a qiling!</p>
    <div class="sg">${[500000,1000000,2000000,5000000].map(a=>`
      <div class="sv" onclick="buyGift(${a})">
        <span class="sv-i">🎁</span>
        <div class="sv-n">${F(a)}</div>
        <div class="sv-p">so'm</div>
      </div>`).join('')}
    </div>
    <div class="fg" style="margin-top:12px">
      <label class="fl">💬 Xabar (ixtiyoriy)</label>
      <input class="fi" id="gift-msg" placeholder="Muborak bo'lsin!">
    </div>
    <div style="margin-top:8px">
      <button class="btn bo" onclick="useGift()">🎟 Kodni ishlatish</button>
    </div>`);
}

function buyGift(amount) {
  const msg = el('gift-msg')?.value || '';
  send({action:'gift_buy', amount, message: msg});
  cModal();
  toast(`🎁 ${F(amount)} so'm sertifikat so'rovi yuborildi!`);
}

function useGift() {
  cModal();
  oModal(`
    <div class="mdl-t">🎟 Sovg'a kodi</div>
    <div class="fg"><label class="fl">Kodni kiriting</label><input class="fi" id="gift-code" placeholder="GIFT****" style="text-transform:uppercase;letter-spacing:2px"></div>
    <button class="btn bp" onclick="applyGift()">✅ Ishlatish</button>`);
}

function applyGift() {
  const code = el('gift-code')?.value?.toUpperCase();
  if (!code || code.length < 6) { toast('❌ Kodni kiriting'); return; }
  send({action:'gift_use', code});
  cModal();
  toast('✅ Kod tekshirilmoqda...');
}

function showPromos() {
  oModal(`
    <div class="mdl-t">🎄 Joriy aksiyalar</div>
    <div class="dg">
      ${[
        {i:'🎉',t:'Birinchi',v:'-5%',d:'1-buyurtma'},
        {i:'🏆',t:'Sodiq mijoz',v:'-10%',d:'10+ buyurtma'},
        {i:'🌟',t:'VIP',v:'-8%',d:'20+ buyurtma'},
        {i:'👥',t:'Referral',v:'-5%',d:"Do'st taklif"},
        {i:'📦',t:'Paket',v:'-10%',d:'2+ xizmat'},
        {i:'💎',t:'Premium',v:'-20%',d:"A'zolik"},
      ].map(x=>`<div class="di"><div class="di-i">${x.i}</div><div class="di-t">${x.t}</div><div class="di-v">${x.v}</div><div class="di-d">${x.d}</div></div>`).join('')}
    </div>
    <div class="cd-t" style="margin-top:14px">🎟 Promo kod</div>
    <div class="promo-wrap">
      <input class="fi" id="promo-in" placeholder="PROMO kod...">
      <button class="btn bp" style="width:auto" onclick="applyPromo()">✅</button>
    </div>
    <button class="btn bo" onclick="cModal()" style="margin-top:10px">Yopish</button>`);
}

function applyPromo() {
  const code = el('promo-in')?.value?.trim();
  if (!code) return;
  send({action:'promo', code});
  toast('✅ Promo kod tekshirilmoqda...');
}

function showPartner() {
  oModal(`
    <div class="mdl-t">🤝 Hamkorlik dasturi</div>
    <div class="cd" style="background:var(--grad);color:#fff;text-align:center">
      <div style="font-size:28px;margin-bottom:6px">10%</div>
      <div style="font-size:13px;font-weight:700">Har buyurtmadan komissiya!</div>
    </div>
    <div class="ft"><div class="ft-i">1️⃣</div><div class="ft-txt">Ariza bering</div></div>
    <div class="ft"><div class="ft-i">2️⃣</div><div class="ft-txt">Shaxsiy link oling</div></div>
    <div class="ft"><div class="ft-i">3️⃣</div><div class="ft-txt">Mijozlarni yo'naltiring</div></div>
    <div class="ft"><div class="ft-i">4️⃣</div><div class="ft-txt">Har buyurtmadan 10% oling</div></div>
    <div class="fg" style="margin-top:12px">
      <label class="fl">🏢 Biznes turi</label>
      <input class="fi" id="part-biz" placeholder="Mebel do'koni, remont...">
    </div>
    <div class="fg">
      <label class="fl">📱 Telefon</label>
      <input class="fi" type="tel" id="part-ph" placeholder="+998...">
    </div>
    <button class="btn bg" onclick="submitPartner()">📤 Ariza berish</button>`);
}

function submitPartner() {
  const biz = el('part-biz')?.value;
  const ph = el('part-ph')?.value;
  if (!biz || !ph) { toast('❌ Ma\'lumotlarni kiriting'); return; }
  send({action:'partner', business:biz, phone:ph});
  cModal();
  toast('✅ Ariza yuborildi!');
}

function showHome() {
  const sv = STATE.homeSaved;
  oModal(`
    <div class="mdl-t">🏠 Uy profili</div>
    <p style="font-size:11px;color:var(--t3);margin-bottom:12px">Saqlang - keyingi buyurtmalarda tezroq bo'ladi!</p>
    <div class="fg"><label class="fl">🚪 Xonalar soni</label><input class="fi" id="hr" value="${sv.rooms||''}" placeholder="3"></div>
    <div class="fg"><label class="fl">📐 Maydon (kv.m)</label><input class="fi" id="ha" value="${sv.area||''}" placeholder="80"></div>
    <div class="fg"><label class="fl">🏢 Qavat</label><input class="fi" id="hf" value="${sv.floor||''}" placeholder="5"></div>
    <div class="fg"><label class="fl">📍 Manzil</label><input class="fi" id="haddr" value="${sv.addr||''}" placeholder="Ko'cha, uy..."></div>
    <div class="fg"><label class="fl">🔑 Eslatma</label><textarea class="fi" id="hn" placeholder="Eshik kodi, lift...">${sv.notes||''}</textarea></div>
    <button class="btn bg" onclick="saveHome()">💾 Saqlash</button>`);
}

function saveHome() {
  STATE.homeSaved = {
    rooms: el('hr')?.value,
    area: el('ha')?.value,
    floor: el('hf')?.value,
    addr: el('haddr')?.value,
    notes: el('hn')?.value,
  };
  send({action:'home_profile', ...STATE.homeSaved});
  cModal();
  toast('✅ Uy profili saqlandi!');
}

function showMembership() {
  oModal(`
    <div class="mdl-t">💎 A'zolik rejalari</div>
    ${[{n:'Basic',p:200000,d:10,perks:['Har buyurtmada -10%','Ustuvor xizmat']},
       {n:'Premium',p:500000,d:20,perks:['Har buyurtmada -20%','Ustuvor xizmat','Bepul konsultatsiya','VIP qo\'llab-quvvatlash']}].map(m=>`
    <div class="cd" style="margin-bottom:10px;border:2px solid ${m.n==='Premium'?'var(--p)':'var(--b)'}">
      ${m.n==='Premium'?'<div class="bdg bb" style="margin-bottom:8px;font-size:10px">⭐ TAVSIYA</div>':''}
      <div class="cd-t">${m.n==='Premium'?'💎':'🥈'} ${m.n}</div>
      <div style="font-size:22px;font-weight:900;color:var(--p);margin-bottom:8px">${F(m.p)} <span style="font-size:12px;color:var(--t3)">so'm/oy</span></div>
      <div style="font-size:18px;font-weight:800;color:var(--g);margin-bottom:8px">-${m.d}%</div>
      ${m.perks.map(p=>`<div class="ft" style="padding:5px 0"><div class="ft-i">✅</div><div class="ft-txt">${p}</div></div>`).join('')}
      <button class="btn ${m.n==='Premium'?'bp':'bo'}" style="margin-top:10px" onclick="buyMembership('${m.n.toLowerCase()}',${m.p})">
        💎 ${m.n} olish - ${F(m.p)} so'm</button>
    </div>`).join('')}
    <button class="btn bo" onclick="cModal()">Yopish</button>`);
}

function buyMembership(plan, price) {
  send({action:'membership', plan, price});
  cModal();
  toast(`✅ ${plan.toUpperCase()} a'zolik so'rovi yuborildi!`);
}

function showCompare() {
  oModal(`
    <div class="mdl-t">📊 Narx taqqoslash</div>
    <div style="overflow-x:auto">
      <table class="cmp">
        <thead>
          <tr>
            <th>Xizmat</th>
            <th style="color:var(--p)">🏆 Biz</th>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Tozalash/ishchi</td><td class="us">500,000</td><td>600,000</td><td>550,000</td></tr>
          <tr><td>Divan/o'rin</td><td class="us">80,000</td><td>100,000</td><td>90,000</td></tr>
          <tr><td>Gilam/kv.m</td><td class="us">27,000</td><td>35,000</td><td>30,000</td></tr>
          <tr><td>Fasad/kv.m</td><td class="us">22,000</td><td>28,000</td><td>25,000</td></tr>
          <tr><td>Borish narxi</td><td class="hl">BEPUL</td><td>+20,000</td><td>+15,000</td></tr>
          <tr><td>Kafolat</td><td class="hl">48 soat</td><td>Yo'q</td><td>24 soat</td></tr>
        </tbody>
      </table>
    </div>
    <button class="btn bp" style="margin-top:14px" onclick="cModal();go('order');initOrder()">📝 Buyurtma berish</button>`);
}

function showPrivacy() {
  oModal(`
    <div class="mdl-t">🔐 Maxfiylik siyosati</div>
    <div class="ft"><div class="ft-i">✅</div><div class="ft-txt">Telefon raqami — aloqa uchun</div></div>
    <div class="ft"><div class="ft-i">✅</div><div class="ft-txt">Manzil — xizmat uchun</div></div>
    <div class="ft"><div class="ft-i">✅</div><div class="ft-txt">Rasmlar — narx aniqlash uchun</div></div>
    <div class="ft"><div class="ft-i">❌</div><div class="ft-txt">Uchinchi shaxslarga berilmaydi</div></div>
    <div class="ft"><div class="ft-i">❌</div><div class="ft-txt">Reklama uchun ishlatilmaydi</div></div>
    <div style="margin-top:14px">
      <button class="btn be" onclick="deleteData()">🗑 Ma'lumotlarni o'chirish</button>
      <button class="btn bo" onclick="cModal()" style="margin-top:6px">Yopish</button>
    </div>`);
}

function deleteData() {
  oModal(`
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:44px;margin-bottom:12px">⚠️</div>
      <div style="font-size:15px;font-weight:800;margin-bottom:8px">Ishonchingiz komilmi?</div>
      <p style="font-size:12px;color:var(--t2);margin-bottom:16px">Barcha ma'lumotlaringiz o'chiriladi</p>
      <button class="btn be" onclick="confirmDelete()">Ha, o'chirish</button>
      <button class="btn bo" onclick="cModal()" style="margin-top:6px">Bekor qilish</button>
    </div>`);
}

function confirmDelete() {
  send({action:'delete_data'});
  cModal();
  toast('✅ So\'rov yuborildi');
}

function showSettings() {
  oModal(`
    <div class="mdl-t">⚙️ Sozlamalar</div>
    <div class="sw">
      <div class="sw-info"><div class="sw-n">🌙 Dark rejim</div><div class="sw-d">Qorang'i interfeys</div></div>
      <div class="sw-toggle${document.body.classList.contains('dk')?' on':''}" onclick="toggleTheme(this)"></div>
    </div>
    <div class="sw">
      <div class="sw-info"><div class="sw-n">🔔 Bildirishnomalar</div><div class="sw-d">Eslatmalar</div></div>
      <div class="sw-toggle on" onclick="this.classList.toggle('on')"></div>
    </div>
    <div class="sw">
      <div class="sw-info"><div class="sw-n">🌐 Til</div><div class="sw-d">O'zbek</div></div>
      <div style="color:var(--t3);font-size:13px">🇺🇿</div>
    </div>
    <button class="btn bp" style="margin-top:14px" onclick="cModal()">Saqlash</button>`);
}

// ═══════════════════════════════════════════
//  THEME
// ═══════════════════════════════════════════
function toggleTheme(btn) {
  btn?.classList.toggle('on');
  document.body.classList.toggle('dk');
  STATE.theme = document.body.classList.contains('dk') ? 'dark' : 'light';
}

// ═══════════════════════════════════════════
//  UTILS ACTIONS
// ═══════════════════════════════════════════
function cpRef() {
  const code = getRefCode();
  copyText(`https://t.me/${CFG.botUser}?start=ref_${code}`);
}

function shareRef() {
  const code = getRefCode();
  const url = `https://t.me/${CFG.botUser}?start=ref_${code}`;
  const text = `Tozalash Servis - professional tozalash! Birinchi buyurtmaga -5% chegirma!\n${url}`;
  if (tg.openTelegramLink) tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
  else copyText(url);
}

// ═══════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════
function init() {
  renderHome();
  renderCalc();
  renderFaq();
  renderTips();
  go('home');

  // Telegram MainButton
  tg.MainButton.setText('📝 Buyurtma berish');
  tg.MainButton.show();
  tg.MainButton.onClick(() => { go('order'); initOrder(); });

  // Mbg close
  el('mbg').addEventListener('click', e => { if (e.target === el('mbg')) cModal(); });
}

document.addEventListener('DOMContentLoaded', init);
