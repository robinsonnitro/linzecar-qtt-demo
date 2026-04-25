import { useState, useEffect } from "react";

// ── MOBILE HOOK ───────────────────────────────────────────────────────────────
function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

// ── PALETTE ──────────────────────────────────────────────────────────────────
const P = {
  lc:'#7B2FBE', lcL:'#A855F7', lcD:'#5B0FAE',
  qt:'#00C4B4', qtD:'#009E94',
  bg:'#070810', card:'#0E1220', brd:'#1A2440',
  txt:'#E2EAF4', mut:'#4A6080',
  ok:'#22C55E', warn:'#F59E0B', err:'#EF4444', inf:'#3B82F6',
};

// ── DATA ─────────────────────────────────────────────────────────────────────
const CARS = [
  { id:'C1', brand:'Geely',      model:'GS 1.8 Gc Mt',            price:6500000,  mo:214567, yr:2019, km:100000, badge:null,          type:'SUV',      icon:'🚙' },
  { id:'C2', brand:'JMC',        model:'Grand Avenue 2.3 Mt 4×4', price:17300000, mo:571078, yr:2024, km:87000,  badge:null,          type:'Pickup',   icon:'🛻' },
  { id:'C3', brand:'Great Wall', model:'Haval H6 2.0',            price:7500000,  mo:247577, yr:2018, km:71536,  badge:'Precio justo',type:'SUV',      icon:'🚙' },
  { id:'C4', brand:'Suzuki',     model:'Celerio 1.0 Glx Sport',   price:4700000,  mo:null,   yr:2016, km:106500, badge:'Buen precio', type:'Hatchback',icon:'🚗' },
  { id:'C5', brand:'Chevrolet',  model:'Captiva 2.4',             price:6350000,  mo:null,   yr:2012, km:210000, badge:'Buen precio', type:'SUV',      icon:'🚙' },
  { id:'C6', brand:'Toyota',     model:'Land Cruiser 4.0 Tx',     price:21000000, mo:null,   yr:2014, km:195000, badge:null,          type:'SUV',      icon:'🏔️' },
  { id:'C7', brand:'Volkswagen', model:'Voyage 1.6 Comfortline',  price:6650000,  mo:219519, yr:2021, km:78000,  badge:'Buen precio', type:'Sedán',    icon:'🚗' },
  { id:'C8', brand:'Haval',      model:'H6 1.5 G Elite 5p At',    price:10150000, mo:335055, yr:2019, km:81000,  badge:null,          type:'SUV',      icon:'🚙' },
];

const STEPS_PHASES = [
  { ph:'Coordinación', col:'#3B82F6', list:['Agendamiento','Asignación','Confirmación'] },
  { ph:'Evaluación',   col:'#00C4B4', list:['Recepción','Explicación','Inspección','Informe'] },
  { ph:'Decisión',     col:'#F59E0B', list:['Validación','Decisión','Pago'] },
  { ph:'Cierre Legal', col:'#22C55E', list:['Firma','Transferencia','Entrega','Cierre'] },
];
const ALL_STEPS = STEPS_PHASES.flatMap(s => s.list.map(n => ({ name:n, phase:s.ph, col:s.col })));

const STEP_REQ = [
  { photo:false, docs:[] },                                                                         // 0  Agendamiento
  { photo:false, docs:[] },                                                                         // 1  Asignación
  { photo:false, docs:[] },                                                                         // 2  Confirmación
  { photo:true,  photoLabel:'Foto llegada al punto',   photoEmojis:['🚗','📍','🏢'],       docs:[] }, // 3  Recepción
  { photo:false, docs:[] },                                                                         // 4  Explicación
  { photo:true,  photoLabel:'Fotos del vehículo',      photoEmojis:['🚙','🔍','🪟','⚙️','💡'], docs:[] }, // 5  Inspección
  { photo:true,  photoLabel:'Foto del informe',         photoEmojis:['📋','📝'],            docs:[] }, // 6  Informe
  { photo:false, docs:['Carnet Comprador','Carnet Vendedor','Padrón del vehículo','Revisión Técnica'] }, // 7  Validación
  { photo:false, docs:[] },                                                                         // 8  Decisión
  { photo:false, docs:['Comprobante de pago'] },                                                    // 9  Pago
  { photo:false, docs:['Contrato firmado digital'] },                                               // 10 Firma
  { photo:false, docs:['Comprobante transferencia vehicular'] },                                    // 11 Transferencia
  { photo:true,  photoLabel:'Foto entrega del vehículo', photoEmojis:['🤝','🔑','😊'],     docs:[] }, // 12 Entrega
  { photo:true,  photoLabel:'Foto cierre final',          photoEmojis:['✅','🎉'],          docs:['Resumen de transacción'] }, // 13 Cierre
];

const PHOTO_BGSV = ['#0D2A1A','#0D1A2A','#1A0D2A','#2A1A0D','#0D2A2A','#1A1A0D'];

const POINTS_LIST = [
  { id:1, local:'Autoplanet',    addr:'Pajaritos 3005',       com:'Maipú' },
  { id:2, local:'Autoplanet',    addr:"Bernardo O'Higgins 800", com:'Quilicura' },
  { id:5, local:'Saint Germain', addr:'Bellavista 0790',      com:'Providencia' },
  { id:6, local:'Gama',          addr:'La Oración 1301',      com:'Pudahuel' },
  { id:7, local:'Tu Auto Aquí',  addr:'Departamental 4500',   com:'Macul' },
];

function randomJob() {
  const car  = CARS[Math.floor(Math.random() * CARS.length)];
  const pt   = POINTS_LIST[Math.floor(Math.random() * POINTS_LIST.length)];
  return {
    car:  { brand:car.brand, model:car.model, icon:car.icon, type:car.type },
    point:{ id:pt.id, local:pt.local, addr:pt.addr, com:pt.com },
    id:   `TXN-${Math.floor(Math.random()*90000+10000)}`,
  };
}

const POINTS = [
  { id:1, local:'Autoplanet',    addr:'Pajaritos 3005',         com:'Maipú' },
  { id:2, local:'Autoplanet',    addr:"Bernardo O'Higgins 800", com:'Quilicura' },
  { id:3, local:'Autoplanet',    addr:'J.M. Carrera 13731',     com:'San Bernardo' },
  { id:4, local:'Autoplanet',    addr:'San Pablo 4997',         com:'Quinta Normal' },
  { id:5, local:'Saint Germain', addr:'Bellavista 0790',        com:'Providencia' },
  { id:6, local:'Gama',          addr:'La Oración 1301',        com:'Pudahuel' },
  { id:7, local:'Tu Auto Aquí',  addr:'Departamental 4500',     com:'Macul' },
  { id:8, local:'Saint Germain', addr:'La Dehesa 11150',        com:'Lo Barnechea' },
];

const LINZERS = [
  { id:'L1', name:'Carlos Muñoz',  zone:'Maipú · Quinta Normal',     stars:4.9, txns:48, st:'online' },
  { id:'L2', name:'Andrea Soto',   zone:'Providencia · Lo Barnechea', stars:4.8, txns:35, st:'busy' },
  { id:'L3', name:'Diego Ramos',   zone:'San Bernardo · Macul',       stars:4.7, txns:27, st:'online' },
  { id:'L4', name:'Paula Vega',    zone:'Quilicura · Pudahuel',       stars:5.0, txns:61, st:'offline' },
  { id:'L5', name:'Marcos Pérez',  zone:'Maipú · Pudahuel',           stars:4.6, txns:19, st:'online' },
];

const fmtCLP = n => n ? `$${n.toLocaleString('es-CL')}` : '—';
const fmtKm  = n => n ? `${n.toLocaleString('es-CL')} km` : '—';

// ── LANDING ───────────────────────────────────────────────────────────────────
function Landing({ go }) {
  const mob = useIsMobile();
  const cards = [
    { role:'linzecar', icon:'🚗', title:'Linzecar.cl',    sub:'Marketplace de autos',    desc:'Compra y vende autos con IA. Solicita inspección QTT certificada en cada publicación.', accent:P.lc },
    { role:'linzer',   icon:'👷', title:'Soy Linzer',     sub:'Inspector certificado',   desc:'Recibe trabajos en tiempo real. Ejecuta los 14 pasos con captura de fotos y documentos.', accent:P.qt },
    { role:'admin',    icon:'⚙️', title:'QTT Backoffice', sub:'Control operacional',     desc:'Dashboard de KPIs, transacciones, evidencia del Linzer y gestión de inspectores.', accent:'#5B8AD4' },
  ];
  return (
    <div style={{ minHeight:'100vh', background:P.bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding: mob?16:24, fontFamily:'system-ui, sans-serif' }}>
      <div style={{ marginBottom: mob?32:48, textAlign:'center' }}>
        <div style={{ display:'flex', gap:10, alignItems:'center', justifyContent:'center', marginBottom:10 }}>
          <span style={{ fontSize: mob?28:34, fontWeight:900, color:P.lc }}>Linze</span>
          <span style={{ fontSize: mob?20:24, color:P.mut }}>×</span>
          <span style={{ fontSize: mob?28:34, fontWeight:900, color:P.qt }}>QTT</span>
        </div>
        <div style={{ color:P.mut, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase' }}>Demo · Plataforma de Inspecciones</div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:14, width:'100%', maxWidth: mob?420:920, marginBottom:32 }}>
        {cards.map(c => (
          <div key={c.role} onClick={() => go(c.role)} style={{
            background:P.card, border:`1px solid ${P.brd}`, borderLeft:`4px solid ${c.accent}`,
            borderRadius:16, padding: mob?'18px 20px':28, cursor:'pointer', transition:'all 0.18s',
            display:'flex', alignItems:'center', gap:18,
          }}
          onMouseOver={e => { e.currentTarget.style.background='#141828'; e.currentTarget.style.borderLeftColor=c.accent; }}
          onMouseOut={e =>  { e.currentTarget.style.background=P.card; }}
          >
            <div style={{ fontSize: mob?36:42, flexShrink:0 }}>{c.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize: mob?17:18, fontWeight:800, color:P.txt, marginBottom:2 }}>{c.title}</div>
              <div style={{ fontSize:11, color:c.accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>{c.sub}</div>
              <div style={{ fontSize: mob?12:13, color:P.mut, lineHeight:1.5 }}>{c.desc}</div>
            </div>
            <div style={{ color:c.accent, fontSize:20, flexShrink:0 }}>›</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize:10, color:P.mut, letterSpacing:'0.12em', textTransform:'uppercase' }}>
        Región Metropolitana · Santiago · Chile · 2026
      </div>
    </div>
  );
}

// ── CAR CARD ──────────────────────────────────────────────────────────────────
function CarCard({ car, onSelect }) {
  const mob = useIsMobile();
  const [hov, setHov] = useState(false);
  if (mob) return (
    <div onClick={onSelect} style={{ background:'#fff', borderRadius:14, overflow:'hidden', cursor:'pointer', border:`1.5px solid ${P.lc}20`, boxShadow:'0 2px 8px rgba(0,0,0,0.07)', display:'flex', alignItems:'stretch' }}>
      <div style={{ background:'linear-gradient(135deg,#F3F0FF,#EAE0FA)', width:90, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:42, position:'relative' }}>
        {car.icon}
        {car.badge && <span style={{ position:'absolute', top:6, left:0, right:0, textAlign:'center', background:car.badge==='Precio justo'?'#16A34A':'#2563EB', color:'#fff', fontSize:9, fontWeight:700, padding:'2px 0' }}>{car.badge}</span>}
      </div>
      <div style={{ padding:'12px 14px', flex:1 }}>
        <div style={{ fontSize:9, color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>{car.brand} · {car.type}</div>
        <div style={{ fontSize:14, fontWeight:800, color:'#1A1A2E', lineHeight:1.2, margin:'3px 0 6px' }}>{car.model}</div>
        <div style={{ display:'flex', gap:10, fontSize:11, color:'#777', marginBottom:8 }}>
          <span>📅 {car.yr}</span><span>🛣️ {fmtKm(car.km)}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:16, fontWeight:900, color:'#1A1A2E' }}>{fmtCLP(car.price)}</div>
            {car.mo && <div style={{ fontSize:10, color:'#888' }}>desde {fmtCLP(car.mo)}/mes</div>}
          </div>
          <div style={{ background:P.qt, color:'#000', borderRadius:8, padding:'6px 12px', fontSize:11, fontWeight:800 }}>Ver →</div>
        </div>
      </div>
    </div>
  );
  return (
    <div
      style={{ background:'#fff', borderRadius:14, overflow:'hidden', cursor:'pointer', transition:'all 0.2s',
        boxShadow: hov ? '0 8px 28px rgba(123,47,190,0.18)' : '0 2px 10px rgba(0,0,0,0.08)',
        border: `1.5px solid ${hov ? P.lc : '#E8E5F4'}` }}
      onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)} onClick={onSelect}
    >
      <div style={{ background:'linear-gradient(135deg, #F3F0FF 0%, #EAE0FA 100%)', height:140, display:'flex', alignItems:'center', justifyContent:'center', fontSize:60, position:'relative' }}>
        {car.icon}
        {car.badge && (
          <span style={{ position:'absolute', top:10, right:10, background: car.badge==='Precio justo'?'#16A34A':'#2563EB', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:20 }}>{car.badge}</span>
        )}
        <span style={{ position:'absolute', bottom:8, left:10, background:'rgba(0,0,0,0.65)', color:'#fff', fontSize:9, padding:'2px 8px', borderRadius:8, fontWeight:600, letterSpacing:'0.05em' }}>{car.type.toUpperCase()}</span>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontSize:10, color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>{car.brand}</div>
        <div style={{ fontSize:14, fontWeight:800, color:'#1A1A2E', lineHeight:1.3, marginBottom:8 }}>{car.model}</div>
        <div style={{ display:'flex', gap:14, fontSize:11, color:'#777', marginBottom:10 }}>
          <span>📅 {car.yr}</span>
          <span>🛣️ {fmtKm(car.km)}</span>
        </div>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:19, fontWeight:900, color:'#1A1A2E' }}>{fmtCLP(car.price)}</div>
          {car.mo && <div style={{ fontSize:11, color:'#888' }}>Desde {fmtCLP(car.mo)}/mes</div>}
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={onSelect} style={{ flex:1, background:'#fff', color:P.lc, border:`1.5px solid ${P.lc}`, borderRadius:8, padding:'7px 0', fontSize:12, fontWeight:700, cursor:'pointer' }}>Ver más</button>
          <button onClick={onSelect} style={{ flex:1, background:P.qt, color:'#000', border:'none', borderRadius:8, padding:'7px 0', fontSize:11, fontWeight:800, cursor:'pointer' }}>🔍 Inspección QTT</button>
        </div>
      </div>
    </div>
  );
}

// ── LINZECAR VIEW ─────────────────────────────────────────────────────────────
function LinzecarView({ go, onSelect }) {
  const mob = useIsMobile();
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [howTab, setHowTab] = useState('comprar');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const bodyTypes = [
    { name:'Sedán', icon:'🚗' }, { name:'Coupé', icon:'🏎️' }, { name:'SUV', icon:'🚙' },
    { name:'Pickup', icon:'🛻' }, { name:'Station Wagon', icon:'🚐' }, { name:'Hatchback', icon:'🚘' },
  ];
  const cars = CARS.filter(c => (filter==='Todos'||c.type===filter) && (search===''||`${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())));
  const buySteps = [
    { n:1, icon:'🔍', t:'Encuentra tu auto en Linze', s:'Revisa las publicaciones' },
    { n:2, icon:'💬', t:'Negocia el mejor precio', s:'Online o con asesor Linze' },
    { n:3, icon:'✅', t:'Inspección certificada', s:'Validación QTT en terreno' },
    { n:4, icon:'💳', t:'Paga con crédito o contado', s:'Solo pagas si compras' },
  ];
  const sellSteps = [
    { n:1, icon:'📱', t:'Publica gratis', s:'Sube fotos y describe tu auto' },
    { n:2, icon:'📨', t:'Recibe consultas', s:'Negocia con apoyo de un asesor' },
    { n:3, icon:'🔒', t:'Inspección QTT', s:'Genera confianza certificada' },
    { n:4, icon:'🏦', t:'Pago seguro', s:'Transferencia verificada' },
  ];

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'system-ui, sans-serif' }}>

      {/* NAV */}
      <nav style={{ background:P.lc, padding: mob?'0 14px':'0 24px', display:'flex', alignItems:'center', height:54, gap: mob?10:20, position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ color:'#fff', fontWeight:900, fontSize: mob?20:22 }}>Linze</span>
          {!mob && <div style={{ background:'rgba(255,255,255,0.22)', borderRadius:5, padding:'2px 7px', fontSize:10, color:'#fff', fontWeight:700 }}>+ Banco de Chile</div>}
        </div>
        <div style={{ flex:1 }} />
        {!mob && ['Comprar','Vender','0km','Servicios','Financiar'].map(item => (
          <span key={item} style={{ color:'rgba(255,255,255,0.82)', fontSize:13, cursor:'pointer', fontWeight:500 }}>{item}</span>
        ))}
        {mob && <span style={{ color:'rgba(255,255,255,0.7)', fontSize:12, fontWeight:600 }}>Banco de Chile</span>}
        <button onClick={() => go('landing')} style={{ background:'rgba(0,0,0,0.35)', color:'#fff', border:'none', borderRadius:8, padding: mob?'7px 12px':'6px 14px', cursor:'pointer', fontSize: mob?12:11, fontWeight:700, whiteSpace:'nowrap' }}>
          ☰ Demo
        </button>
      </nav>

      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg, ${P.lc} 0%, #3D0D80 100%)`, padding: mob?'32px 16px 28px':'52px 24px 44px', textAlign:'center', color:'#fff' }}>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.2em', marginBottom:8, opacity:0.75, textTransform:'uppercase' }}>e-commerce car</div>
        <h1 style={{ fontSize: mob?26:44, fontWeight:900, margin:'0 0 8px', letterSpacing: mob?'-0.5px':'-1.5px', lineHeight:1.1 }}>TU VEHÍCULO<br/>100% ONLINE</h1>
        <p style={{ fontSize: mob?13:16, opacity:0.82, margin: mob?'0 0 20px':'0 0 28px' }}>Encuentra tu auto ideal con inteligencia artificial</p>
        <div style={{ display:'flex', maxWidth:540, margin:'0 auto', borderRadius:10, overflow:'hidden', boxShadow:'0 8px 30px rgba(0,0,0,0.3)' }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={mob ? "Describe el auto que buscas..." : "Describe el auto que buscas y Linze IA lo encontrará por ti"}
            style={{ flex:1, padding: mob?'13px 14px':'15px 18px', fontSize: mob?13:13, border:'none', outline:'none', background:'#fff', color:'#333', minWidth:0 }}
          />
          <button style={{ background:'#000', color:'#fff', border:'none', padding:'0 18px', fontWeight:800, fontSize:13, cursor:'pointer', whiteSpace:'nowrap' }}>Buscar</button>
        </div>
      </div>

      {/* QTT BANNER */}
      <div style={{ background:'#001218', borderBottom:`2px solid ${P.qt}`, padding: mob?'10px 14px':'10px 24px', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
        <span style={{ background:P.qt, color:'#000', borderRadius:4, padding:'2px 7px', fontSize:9, fontWeight:900, letterSpacing:'0.05em', flexShrink:0 }}>NUEVO</span>
        <span style={{ color:P.qt, fontSize: mob?12:13, fontWeight:700 }}>Inspección QTT disponible</span>
        {!mob && <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12 }}>— Inspector certificado asignado en menos de 24 hrs.</span>}
        <span style={{ marginLeft:'auto', color:P.mut, fontSize:10, flexShrink:0 }}>QTT SpA</span>
      </div>

      {/* BENEFITS */}
      <div style={{ background:'#F9F7FF', padding: mob?'14px':'20px 24px', borderBottom:'1px solid #EEE' }}>
        <div style={{ display:'grid', gridTemplateColumns: mob?'1fr 1fr':'repeat(4,1fr)', gap: mob?10:20, maxWidth:1200, margin:'0 auto' }}>
          {[
            { icon:'🔍', t:'Tu auto ideal', s:'IA de búsqueda' },
            { icon:'🛡️', t:'Compra segura', s:'Pago protegido' },
            { icon:'✅', t:'Sin complicaciones', s:'Inspección y entrega' },
            { icon:'💳', t:'Financia online', s:'Banco de Chile' },
          ].map(b => (
            <div key={b.t} style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ fontSize: mob?20:24, flexShrink:0 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: mob?11:13, fontWeight:700, color:'#1A1A2E' }}>{b.t}</div>
                <div style={{ fontSize:10, color:'#666' }}>{b.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ELIGE POR CARROCERÍA */}
      <div style={{ padding: mob?'20px 14px':'32px 24px', background:'#fff', borderBottom:'1px solid #EEE' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontSize: mob?14:17, fontWeight:800, color:'#1A1A2E', marginBottom:14 }}>Elige por carrocería</div>
          <div style={{ display:'grid', gridTemplateColumns: mob?'repeat(3,1fr)':'repeat(6,1fr)', gap: mob?8:12 }}>
            {bodyTypes.map(b => (
              <button key={b.name} onClick={() => setFilter(filter===b.name?'Todos':b.name)} style={{
                background: filter===b.name?`linear-gradient(135deg,${P.lc},#9B59D4)`:'#F9F7FF',
                border:`1.5px solid ${filter===b.name?P.lc:'#E0DAF5'}`,
                borderRadius: mob?10:14, padding: mob?'10px 4px':'16px 8px', cursor:'pointer', textAlign:'center', transition:'all 0.15s',
              }}>
                <div style={{ fontSize: mob?22:28, marginBottom:4 }}>{b.icon}</div>
                <div style={{ fontSize: mob?9:12, fontWeight:700, color:filter===b.name?'#fff':'#444' }}>{b.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER CHIPS */}
      <div style={{ padding: mob?'10px 14px':'12px 24px', background:'#F4F3FA', borderBottom:'1px solid #E5E0F0', display:'flex', gap:8, overflowX:'auto', alignItems:'center', WebkitOverflowScrolling:'touch' }}>
        {['Todos',...bodyTypes.map(b=>b.name)].map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            background: filter===t?P.lc:'#fff', color: filter===t?'#fff':'#666',
            border:`1.5px solid ${filter===t?P.lc:'#DDD'}`,
            borderRadius:20, padding: mob?'5px 12px':'5px 16px', fontSize: mob?11:12, cursor:'pointer', fontWeight:filter===t?700:500, flexShrink:0,
          }}>{t}</button>
        ))}
        <span style={{ marginLeft:'auto', fontSize:11, color:'#888', flexShrink:0 }}>{cars.length} autos</span>
      </div>

      {/* CAR GRID */}
      <div style={{ padding: mob?'16px 14px':'28px 24px', maxWidth:1240, margin:'0 auto' }}>
        <div style={{ fontSize: mob?14:17, fontWeight:800, color:'#1A1A2E', marginBottom: mob?12:22 }}>Publicaciones populares</div>
        {cars.length === 0
          ? <div style={{ textAlign:'center', padding:40, color:'#999', fontSize:14 }}>No se encontraron autos</div>
          : <div style={{ display:'grid', gridTemplateColumns: mob?'1fr':'repeat(auto-fill,minmax(255px,1fr))', gap: mob?10:20 }}>
              {cars.map(car => <CarCard key={car.id} car={car} onSelect={() => onSelect(car)} />)}
            </div>
        }
      </div>

      {/* CÓMO FUNCIONA */}
      <div style={{ padding: mob?'28px 14px':'44px 24px', background:'#1A1A2E' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ fontSize: mob?18:22, fontWeight:900, color:'#fff', textAlign:'center', marginBottom:6 }}>La forma más fácil de comprar y vender</div>
          <p style={{ textAlign:'center', color:'rgba(255,255,255,0.45)', fontSize:13, marginBottom:22 }}>Todo en un solo lugar</p>
          <div style={{ display:'flex', gap:0, justifyContent:'center', marginBottom:24, borderRadius:10, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)', maxWidth:340, margin:'0 auto 24px' }}>
            {[['comprar','🚗 Comprar'],['vender','💰 Vender']].map(([key,label]) => (
              <button key={key} onClick={() => setHowTab(key)} style={{ flex:1, padding:'11px 0', border:'none', cursor:'pointer', fontWeight:700, fontSize:13, background:howTab===key?P.lc:'rgba(255,255,255,0.05)', color:howTab===key?'#fff':'rgba(255,255,255,0.45)' }}>{label}</button>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns: mob?'1fr 1fr':'repeat(4,1fr)', gap:12 }}>
            {(howTab==='comprar'?buySteps:sellSteps).map((s,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding: mob?14:20, textAlign:'center' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:i===2?`${P.qt}25`:`${P.lc}25`, border:`2px solid ${i===2?P.qt:P.lc}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, margin:'0 auto 10px' }}>{s.icon}</div>
                <div style={{ fontSize: mob?10:11, fontWeight:800, color:i===2?P.qt:P.lc, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:4 }}>Paso {s.n}</div>
                <div style={{ fontSize: mob?11:13, fontWeight:700, color:'#fff', marginBottom:4, lineHeight:1.3 }}>{s.t}</div>
                <div style={{ fontSize: mob?10:11, color:'rgba(255,255,255,0.4)', lineHeight:1.4 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* APP + NEWSLETTER */}
      <div style={{ display:'grid', gridTemplateColumns: mob?'1fr':'1fr 1fr', background:'#fff', borderTop:'1px solid #EEE' }}>
        <div style={{ padding: mob?'24px 16px':'40px 36px', borderBottom: mob?'1px solid #EEE':'none', borderRight: mob?'none':'1px solid #EEE' }}>
          <div style={{ fontSize:28, marginBottom:10 }}>📱</div>
          <div style={{ fontSize: mob?16:18, fontWeight:900, color:'#1A1A2E', marginBottom:6 }}>Tu auto, cada vez más cerca</div>
          <p style={{ fontSize:13, color:'#666', lineHeight:1.5, marginBottom:18 }}>Sigue tus negociaciones e inspección QTT desde cualquier lugar.</p>
          <button style={{ background:'#1A1A2E', color:'#fff', border:'none', borderRadius:10, padding:'10px 22px', fontWeight:700, fontSize:13, cursor:'pointer' }}>⬇️ Descarga la app</button>
        </div>
        <div style={{ padding: mob?'24px 16px':'40px 36px', background:'#F9F7FF' }}>
          <div style={{ fontSize:28, marginBottom:10 }}>📰</div>
          <div style={{ fontSize: mob?16:18, fontWeight:900, color:'#1A1A2E', marginBottom:6 }}>Suscríbete a LinzeNews</div>
          <p style={{ fontSize:13, color:'#666', lineHeight:1.5, marginBottom:18 }}>Recibe las mejores oportunidades en autos nuevos y usados.</p>
          {subscribed
            ? <div style={{ background:`${P.lc}15`, color:P.lc, borderRadius:10, padding:'11px 16px', fontWeight:700, fontSize:13 }}>✅ ¡Suscrito!</div>
            : <div style={{ display:'flex', borderRadius:10, overflow:'hidden', border:`1.5px solid ${P.lc}` }}>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Tu email" style={{ flex:1, padding:'10px 12px', border:'none', outline:'none', fontSize:13, background:'#fff', minWidth:0 }} />
                <button onClick={() => { if(email) setSubscribed(true); }} style={{ background:P.lc, color:'#fff', border:'none', padding:'0 16px', fontWeight:800, fontSize:13, cursor:'pointer', whiteSpace:'nowrap' }}>Suscribirse</button>
              </div>
          }
        </div>
      </div>

      {/* PARTNERS */}
      <div style={{ background:'#F4F3FA', padding: mob?'16px':'22px', textAlign:'center', borderTop:'1px solid #E5E0F0' }}>
        <div style={{ fontSize:9, color:'#AAA', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>Partners</div>
        <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
          {['MOK','FullMec','AutoRed','ICar','MAVI','Gomu','QTT'].map(p => (
            <span key={p} style={{ fontSize:12, fontWeight:700, color:p==='QTT'?P.qt:'#666', padding:'3px 12px', borderRadius:8, background:'#fff', border:`1px solid ${p==='QTT'?P.qt:'#DDD'}` }}>{p}</span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background:P.lc, padding: mob?'14px 16px':'18px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8, maxWidth:1200, margin:'0 auto' }}>
          <span style={{ color:'#fff', fontWeight:900, fontSize: mob?16:18 }}>Linze</span>
          <div style={{ display:'flex', gap: mob?14:20 }}>
            {['Comprar','Vender','Ingresar'].map(l => (
              <span key={l} style={{ color:'rgba(255,255,255,0.75)', fontSize:13, cursor:'pointer' }}>{l}</span>
            ))}
          </div>
          <span style={{ color:'rgba(255,255,255,0.5)', fontSize:11 }}>© 2026 Linze</span>
        </div>
      </div>
    </div>
  );
}


// ── QR CODE (SVG determinístico) ─────────────────────────────────────────────
function QRCode({ data, size=160 }) {
  const cells = 21;
  const cell  = size / cells;
  let hash = 5381;
  for (let i = 0; i < data.length; i++) hash = ((hash << 5) + hash + data.charCodeAt(i)) | 0;

  const filled = (r, c) => {
    // Finder patterns — top-left
    if (r < 7 && c < 7) {
      if (r===0||r===6||c===0||c===6) return true;
      if (r>=2&&r<=4&&c>=2&&c<=4)     return true;
      return false;
    }
    // Finder — top-right
    if (r < 7 && c >= cells-7) {
      const cc = c-(cells-7);
      if (r===0||r===6||cc===0||cc===6) return true;
      if (r>=2&&r<=4&&cc>=2&&cc<=4)     return true;
      return false;
    }
    // Finder — bottom-left
    if (r >= cells-7 && c < 7) {
      const rr = r-(cells-7);
      if (rr===0||rr===6||c===0||c===6) return true;
      if (rr>=2&&rr<=4&&c>=2&&c<=4)     return true;
      return false;
    }
    // Separator quiet zones
    if (r===7||c===7||(r===cells-8&&c<8)||(c===cells-8&&r<8)) return false;
    // Timing patterns
    if (r===6) return c%2===0;
    if (c===6) return r%2===0;
    // Data modules — deterministic
    const seed = (hash ^ (r*31337 + c*7919)) >>> 0;
    return ((seed * 2654435761) >>> 28) % 2 === 0;
  };

  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ borderRadius:10, display:'block' }}>
      <rect width={size} height={size} fill="#fff" rx="8"/>
      {Array.from({length:cells}, (_,r) =>
        Array.from({length:cells}, (_,c) =>
          filled(r,c) ? <rect key={`${r}-${c}`} x={c*cell+0.3} y={r*cell+0.3} width={cell-0.3} height={cell-0.3} fill="#0a0a0a" rx="0.5"/> : null
        )
      )}
    </svg>
  );
}

// ── CAR DETAIL VIEW ───────────────────────────────────────────────────────────
function CarDetailView({ go, car, onRequest }) {
  const mob = useIsMobile();
  const [point, setPoint] = useState(POINTS[0]);
  const [date,  setDate]  = useState('');
  const today = new Date().toISOString().split('T')[0];
  if (!car) { go('linzecar'); return null; }
  return (
    <div style={{ background:'#F8F6FF', minHeight:'100vh', fontFamily:'system-ui, sans-serif' }}>
      <nav style={{ background:P.lc, padding: mob?'10px 14px':'12px 24px', display:'flex', alignItems:'center', gap:10, boxShadow:'0 2px 12px rgba(0,0,0,0.3)', position:'sticky', top:0, zIndex:100 }}>
        <span style={{ color:'#fff', fontWeight:900, fontSize: mob?16:18 }}>Linze</span>
        <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12, flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>/ {car.brand} {car.model}</span>
        <button onClick={() => go('linzecar')} style={{ background:'rgba(255,255,255,0.18)', color:'#fff', border:'none', borderRadius:7, padding:'6px 14px', cursor:'pointer', fontSize:12, fontWeight:600, flexShrink:0 }}>← Volver</button>
      </nav>
      <div style={{ maxWidth:960, margin:'0 auto', padding: mob?'14px':'28px 24px', display:'grid', gridTemplateColumns: mob?'1fr':'1fr 340px', gap: mob?14:24 }}>
        <div>
          <div style={{ background:'#fff', borderRadius:18, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', marginBottom:14 }}>
            <div style={{ background:'linear-gradient(135deg,#F0EAFF,#E0D0F8)', height: mob?160:280, display:'flex', alignItems:'center', justifyContent:'center', fontSize: mob?70:100 }}>{car.icon}</div>
            <div style={{ padding: mob?'14px 16px':26 }}>
              <div style={{ fontSize:10, color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>{car.brand}</div>
              <h1 style={{ fontSize: mob?20:26, fontWeight:900, color:'#1A1A2E', margin:'0 0 12px' }}>{car.model}</h1>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: mob?8:12, marginBottom:12 }}>
                {[['📅 Año',car.yr],['🛣️ Km',fmtKm(car.km)],['🚙 Tipo',car.type]].map(([l,v]) => (
                  <div key={l} style={{ background:'#F9F7FF', borderRadius:10, padding:'10px' }}>
                    <div style={{ fontSize:10, color:'#888', marginBottom:3 }}>{l}</div>
                    <div style={{ fontSize: mob?12:15, fontWeight:800, color:'#1A1A2E' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: mob?22:30, fontWeight:900, color:P.lc }}>{fmtCLP(car.price)}</div>
              {car.mo && <div style={{ fontSize:12, color:'#777', marginTop:3 }}>Desde {fmtCLP(car.mo)}/mes con Banco de Chile</div>}
            </div>
          </div>
        </div>
        <div>
          <div style={{ background:'linear-gradient(150deg,#001620 0%,#002030 100%)', borderRadius:18, padding: mob?16:22, border:`2px solid ${P.qt}`, boxShadow:'0 8px 40px rgba(0,196,180,0.15)' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14 }}>
              <div style={{ background:`${P.qt}20`, borderRadius:10, padding:'8px', fontSize:18 }}>🔍</div>
              <div>
                <div style={{ color:P.qt, fontWeight:800, fontSize:15 }}>Inspección QTT</div>
                <div style={{ color:'rgba(255,255,255,0.45)', fontSize:11 }}>Certificación profesional en terreno</div>
              </div>
            </div>
            <div style={{ background:`${P.qt}0D`, border:`1px solid ${P.qt}30`, borderRadius:12, padding:12, marginBottom:14 }}>
              <div style={{ fontSize:10, color:P.qt, fontWeight:700, marginBottom:6 }}>¿Qué incluye?</div>
              {['Coordinación y agendamiento','Validación documental','Gestión de pago seguro','Firma digital','Acompañamiento hasta cierre'].map(item => (
                <div key={item} style={{ fontSize:11, color:'rgba(255,255,255,0.65)', padding:'2px 0', display:'flex', gap:6 }}><span style={{ color:P.qt, fontWeight:700 }}>✓</span>{item}</div>
              ))}
            </div>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginBottom:5 }}>Punto de atención</div>
              <select value={point.id} onChange={e => setPoint(POINTS.find(pt => pt.id===Number(e.target.value)))}
                style={{ width:'100%', padding:'10px 12px', borderRadius:9, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', color:'#fff', fontSize:12, outline:'none', cursor:'pointer' }}>
                {POINTS.map(pt => <option key={pt.id} value={pt.id} style={{ background:'#0E1220' }}>{pt.local} — {pt.com}</option>)}
              </select>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:4 }}>📍 {point.addr}, {point.com}</div>
            </div>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginBottom:5 }}>Fecha preferida</div>
              <input type="date" value={date} min={today} onChange={e => setDate(e.target.value)}
                style={{ width:'100%', padding:'10px 12px', borderRadius:9, background:'rgba(255,255,255,0.07)', border:`1px solid ${date?P.qt+'80':'rgba(255,255,255,0.14)'}`, color:date?'#fff':'rgba(255,255,255,0.35)', fontSize:13, outline:'none', cursor:'pointer', boxSizing:'border-box', colorScheme:'dark' }} />
              {!date && <div style={{ fontSize:10, color:P.warn, marginTop:4 }}>* Selecciona una fecha para continuar</div>}
              {date  && <div style={{ fontSize:10, color:P.qt, marginTop:4 }}>📅 Inspector asignado dentro de 24 hrs</div>}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
              <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:10, padding:'10px 12px' }}>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', marginBottom:2 }}>Tarifa base</div>
                <div style={{ fontSize:20, fontWeight:900, color:'#fff' }}>UF 1,5</div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.35)' }}>+ IVA</div>
              </div>
              <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:10, padding:'10px 12px' }}>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', marginBottom:2 }}>SLA respuesta</div>
                <div style={{ fontSize:20, fontWeight:900, color:P.ok }}>24 hrs</div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.35)' }}>Reg. Metropolitana</div>
              </div>
            </div>
            <button onClick={() => date && onRequest(car, point, date)}
              style={{ width:'100%', background:date?P.qt:'rgba(255,255,255,0.1)', color:date?'#000':'rgba(255,255,255,0.3)', border:'none', borderRadius:11, padding:'14px 0', fontWeight:900, fontSize: mob?14:15, cursor:date?'pointer':'not-allowed', transition:'all 0.15s' }}>
              {date ? 'Solicitar Inspección QTT →' : 'Selecciona una fecha'}
            </button>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.28)', textAlign:'center', marginTop:8 }}>Cobro al presentarse el inspector</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── QTT CONFIRM ───────────────────────────────────────────────────────────────
function QTTConfirm({ go, txn }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const fmtDate = d => {
    if (!d) return '—';
    const [y,m,day] = d.split('-');
    const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return `${day} ${months[Number(m)-1]} ${y}`;
  };

  const qrData = txn
    ? `QTT|${txn.id}|${txn.car?.brand} ${txn.car?.model}|${txn.point?.local} ${txn.point?.com}|${txn.date||''}|LINZER:Carlos Muñoz`
    : 'QTT|TXN-DEMO';

  const mob = useIsMobile();
  return (
    <div style={{ minHeight:'100vh', background:P.bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding: mob?12:24, fontFamily:'system-ui, sans-serif' }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }`}</style>

      <div style={{ background:P.card, borderRadius: mob?16:22, padding: mob?20:36, maxWidth:480, width:'100%', border:`1px solid ${P.brd}`, textAlign:'center' }}>

        {/* FASE 0 — Buscando */}
        {phase === 0 && (
          <>
            <div style={{ fontSize:52, marginBottom:16 }}>🔍</div>
            <div style={{ color:P.txt, fontSize:19, fontWeight:800, marginBottom:8 }}>Buscando Linzer disponible...</div>
            <div style={{ color:P.mut, fontSize:13, marginBottom:28, lineHeight:1.6 }}>
              Conectando con el inspector certificado más cercano a <strong style={{ color:P.txt }}>{txn?.point?.com || 'la zona'}</strong>
            </div>
            <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:10, height:10, borderRadius:'50%', background:P.qt, opacity:0.3, animation:`pulse 1.2s ease-in-out ${i*0.3}s infinite` }} />
              ))}
            </div>
          </>
        )}

        {/* FASE 1 — Linzer encontrado */}
        {phase === 1 && (
          <>
            <div style={{ fontSize:52, marginBottom:16 }}>👷</div>
            <div style={{ color:P.qt, fontSize:18, fontWeight:800, marginBottom:16 }}>¡Linzer asignado!</div>
            <div style={{ background:`${P.qt}12`, border:`1px solid ${P.qt}30`, borderRadius:14, padding:18, marginBottom:14 }}>
              <div style={{ color:'#fff', fontWeight:800, fontSize:16 }}>Carlos Muñoz</div>
              <div style={{ color:P.mut, fontSize:12, marginTop:4 }}>⭐ 4.9 · 48 transacciones · Maipú</div>
            </div>
            <div style={{ color:P.mut, fontSize:12 }}>Generando confirmación y QR...</div>
            <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:16 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:P.qt, opacity:0.3, animation:`pulse 1.2s ease-in-out ${i*0.3}s infinite` }} />
              ))}
            </div>
          </>
        )}

        {/* FASE 2 — Confirmación final con QR */}
        {phase === 2 && (
          <>
            <div style={{ fontSize:44, marginBottom:6 }}>✅</div>
            <div style={{ color:P.ok, fontSize:20, fontWeight:900, marginBottom:4 }}>¡Inspección confirmada!</div>
            <div style={{ color:P.mut, fontSize:12, marginBottom:20 }}>Presenta este QR al llegar al punto de inspección</div>

            {/* QR CODE */}
            <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:14, boxShadow:'0 4px 30px rgba(0,196,180,0.2)', border:`2px solid ${P.qt}` }}>
                <QRCode data={qrData} size={150} />
                <div style={{ marginTop:8, textAlign:'center', fontFamily:'monospace', fontSize:11, color:'#333', fontWeight:700, letterSpacing:1 }}>
                  {txn?.id || 'TXN-58292'}
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:14, overflow:'hidden', marginBottom:18 }}>
              {[
                ['🚗 Vehículo',  `${txn?.car?.brand||'Toyota'} ${txn?.car?.model||'Land Cruiser'}`],
                ['📍 Punto',     `${txn?.point?.local||'Autoplanet'} — ${txn?.point?.com||'Maipú'}`],
                ['📅 Fecha',     fmtDate(txn?.date)],
                ['👷 Inspector', 'Carlos Muñoz  ⭐ 4.9'],
                ['💰 Tarifa',    'UF 1,5 + IVA'],
                ['⏱️ SLA',       '24 hrs · Región Metropolitana'],
              ].map(([l,v], i, arr) => (
                <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 16px', borderBottom: i<arr.length-1?`1px solid ${P.brd}`:'none' }}>
                  <span style={{ color:P.mut, fontSize:12 }}>{l}</span>
                  <span style={{ color:P.txt, fontWeight:600, fontSize:12, textAlign:'right', maxWidth:220 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ background:`${P.qt}10`, border:`1px solid ${P.qt}25`, borderRadius:10, padding:'10px 14px', marginBottom:20, fontSize:11, color:P.qt, lineHeight:1.5 }}>
              💡 Guarda este QR o captura una foto. Lo necesitarás en el punto de atención para que el inspector valide tu solicitud.
            </div>

            {/* SOLO botón volver — el comprador NO accede al admin */}
            <button
              onClick={() => go('linzecar')}
              style={{ width:'100%', background:P.qt, color:'#000', border:'none', borderRadius:11, padding:'14px 0', fontWeight:900, fontSize:15, cursor:'pointer' }}
            >
              ← Ver más autos en Linzecar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── LINZER VIEW (APP MÓVIL) ───────────────────────────────────────────────────
function LinzerView({ go, txnRequest, onComplete }) {
  const [screen, setScreen]           = useState('login');
  const [available, setAvailable]     = useState(false);
  const [notification, setNotification] = useState(false);
  const [step, setStep]               = useState(0);
  const [stepCaptures, setStepCaptures] = useState({});
  const [email, setEmail]             = useState('');
  const [pass, setPass]               = useState('');
  const [err, setErr]                 = useState('');
  const [isSecondJob, setIsSecondJob] = useState(false);
  const [secondJob]                   = useState(() => randomJob());
  const [completing, setCompleting]   = useState(false);

  const activeJob = isSecondJob ? secondJob : txnRequest;

  const login = () => {
    if (email==='juanperez@linzer.cl' && pass==='mapache') { setErr(''); setScreen('home'); }
    else setErr('Credenciales incorrectas. Usa las del demo.');
  };

  // First notification trigger
  useEffect(() => {
    if (!available || notification || step > 0 || screen !== 'home') return;
    const t = setTimeout(() => setNotification(true), 5000);
    return () => clearTimeout(t);
  }, [available, notification, step, screen]);

  const addPhoto = (stepIdx, req) => {
    const emojis = req.photoEmojis || ['📷'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const bg = PHOTO_BGSV[Math.floor(Math.random() * PHOTO_BGSV.length)];
    const ts = new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' });
    setStepCaptures(prev => ({
      ...prev,
      [stepIdx]: { photos:[...(prev[stepIdx]?.photos||[]), { emoji, bg, ts }], docs:(prev[stepIdx]?.docs||[]) }
    }));
  };

  const addDoc = (stepIdx, docType) => {
    const ts = new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' });
    setStepCaptures(prev => ({
      ...prev,
      [stepIdx]: { photos:(prev[stepIdx]?.photos||[]), docs:[...(prev[stepIdx]?.docs||[]), { type:docType, ts }] }
    }));
  };

  const advanceStep = () => {
    if (step === ALL_STEPS.length - 1) {
      const txnId = activeJob?.id || 'TXN-DEMO';
      onComplete && onComplete(txnId, { ...stepCaptures }, activeJob);
      setStep(step + 1);
      setCompleting(true);
      setTimeout(() => {
        setStep(0);
        setStepCaptures({});
        setCompleting(false);
        setScreen('home');
        setAvailable(true);
        setTimeout(() => { setIsSecondJob(true); setNotification(true); }, 6000);
      }, 3500);
    } else {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:'#04050A', display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 16px', fontFamily:'system-ui, sans-serif' }}>
      <div style={{ width:375, maxWidth:'100%', marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
        <button onClick={() => go('landing')} style={{ background:'transparent', color:P.mut, border:`1px solid ${P.brd}`, borderRadius:6, padding:'5px 12px', cursor:'pointer', fontSize:11 }}>← Demo</button>
        <span style={{ color:P.qt, fontSize:11, fontWeight:700, letterSpacing:'0.1em' }}>📱 LINZER APP — INSPECTOR</span>
      </div>

      <div style={{ width:375, maxWidth:'100%', background:'#0A0C16', borderRadius:28, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.6)', border:'1px solid #1A2030', minHeight:640 }}>
        {/* Status bar */}
        <div style={{ background:'#0A0C16', padding:'12px 20px 0', display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(255,255,255,0.5)' }}>
          <span>09:41</span><span>●●●●  WiFi  🔋</span>
        </div>

        {/* ── LOGIN ── */}
        {screen==='login' && (
          <div style={{ padding:'40px 24px' }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <div style={{ fontSize:40, marginBottom:10 }}>👷</div>
              <div style={{ color:'#fff', fontSize:24, fontWeight:800 }}>Linzer App</div>
              <div style={{ color:P.mut, fontSize:13, marginTop:6 }}>Inspector certificado QTT</div>
            </div>
            {[['Email','email',email,v=>setEmail(v)],['Contraseña','password',pass,v=>setPass(v)]].map(([ph,t,val,set]) => (
              <input key={ph} type={t} placeholder={ph} value={val} onChange={e=>set(e.target.value)}
                style={{ display:'block', width:'100%', padding:'13px 16px', marginBottom:12, borderRadius:12, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', fontSize:14, boxSizing:'border-box', outline:'none' }}
              />
            ))}
            {err && <div style={{ color:P.err, fontSize:12, marginBottom:8, textAlign:'center' }}>{err}</div>}
            <div style={{ background:`${P.qt}12`, border:`1px solid ${P.qt}25`, borderRadius:8, padding:'8px 14px', marginBottom:14, fontSize:11, color:P.qt, textAlign:'center' }}>
              Demo: juanperez@linzer.cl / mapache
            </div>
            <button onClick={login} style={{ width:'100%', background:P.qt, color:'#000', border:'none', borderRadius:12, padding:14, fontWeight:800, fontSize:15, cursor:'pointer' }}>Ingresar →</button>
          </div>
        )}

        {/* ── HOME ── */}
        {screen==='home' && (
          <div>
            <div style={{ padding:'16px 20px 14px', borderBottom:'1px solid #1A2030' }}>
              <div style={{ color:'#fff', fontWeight:800, fontSize:18 }}>Hola, Juan 👋</div>
              <div style={{ color:P.mut, fontSize:12 }}>Inspector certificado · Maipú</div>
            </div>
            <div style={{ padding:'16px 20px' }}>
              <div style={{ background:available?'rgba(34,197,94,0.08)':'rgba(255,255,255,0.03)', borderRadius:16, padding:18, border:`1px solid ${available?'#22C55E40':'#1A2030'}`, transition:'all 0.3s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>{available?'🟢 Disponible':'⚫ No disponible'}</div>
                    <div style={{ color:P.mut, fontSize:12 }}>{available?'Recibirás solicitudes de Linzecar':'Activa para recibir trabajos'}</div>
                  </div>
                  <div onClick={() => setAvailable(a=>!a)} style={{ width:54, height:30, borderRadius:15, background:available?P.ok:'#2A3040', cursor:'pointer', position:'relative', transition:'background 0.25s' }}>
                    <div style={{ width:22, height:22, borderRadius:'50%', background:'#fff', position:'absolute', top:4, left:available?28:4, transition:'left 0.25s', boxShadow:'0 2px 6px rgba(0,0,0,0.3)' }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding:'0 20px 14px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
              {[['48','Transacciones'],['UF 50.4','Este mes'],['4.9 ⭐','Rating']].map(([v,l]) => (
                <div key={l} style={{ background:'rgba(255,255,255,0.04)', borderRadius:12, padding:'12px 10px', textAlign:'center' }}>
                  <div style={{ color:P.qt, fontWeight:800, fontSize:15 }}>{v}</div>
                  <div style={{ color:P.mut, fontSize:10, marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
            {notification && (
              <div style={{ margin:'0 16px 16px', background:'linear-gradient(135deg, #001820, #002535)', border:`2px solid ${P.qt}`, borderRadius:18, padding:20 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12 }}>
                  <span style={{ fontSize:24 }}>🔔</span>
                  <div>
                    <div style={{ color:P.qt, fontWeight:800, fontSize:14 }}>¡Nueva solicitud de Linzecar!</div>
                    <div style={{ color:'rgba(255,255,255,0.5)', fontSize:11 }}>Ingresó automáticamente vía API</div>
                  </div>
                </div>
                <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:10, padding:12, marginBottom:12 }}>
                  <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>
                    {activeJob?.car ? `${activeJob.car.brand} ${activeJob.car.model}` : 'Toyota Land Cruiser 4.0'}
                  </div>
                  <div style={{ color:P.mut, fontSize:12, marginTop:3 }}>
                    📍 {activeJob?.point ? `${activeJob.point.local} — ${activeJob.point.com}` : 'Autoplanet — Maipú'}
                  </div>
                  <div style={{ color:P.qt, fontSize:12, fontWeight:700, marginTop:5 }}>Tu comisión: UF 1,05 (70%)</div>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={() => setNotification(false)} style={{ flex:1, background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.7)', border:'1px solid #2A3040', borderRadius:10, padding:11, cursor:'pointer', fontSize:13 }}>Rechazar</button>
                  <button onClick={() => { setNotification(false); setScreen('job'); }} style={{ flex:1, background:P.ok, color:'#000', border:'none', borderRadius:10, padding:11, fontWeight:800, cursor:'pointer', fontSize:13 }}>✓ Aceptar</button>
                </div>
              </div>
            )}
            {available && !notification && (
              <div style={{ padding:'0 20px', textAlign:'center', color:P.mut, fontSize:12 }}>
                ⏳ Esperando solicitudes... (~5 seg en demo)
              </div>
            )}
          </div>
        )}

        {/* ── JOB EXECUTION ── */}
        {screen==='job' && (
          <div style={{ display:'flex', flexDirection:'column', height:590 }}>
            {/* Header */}
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #1A2030', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
              <div style={{ flex:1 }}>
                <div style={{ color:'#fff', fontWeight:700, fontSize:14 }}>Ejecución en terreno</div>
                <div style={{ color:P.mut, fontSize:11 }}>
                  {completing ? '✅ Completando...' : `Paso ${Math.min(step+1, ALL_STEPS.length)} / ${ALL_STEPS.length}`}
                </div>
              </div>
              <span style={{ background:`${P.qt}18`, color:P.qt, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:8 }}>UF 1,05</span>
            </div>

            {/* Vehicle strip */}
            <div style={{ padding:'8px 16px', background:`${P.qt}08`, borderBottom:'1px solid #1A2030', flexShrink:0, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ color:P.qt, fontWeight:700, fontSize:12 }}>
                  {activeJob?.car ? `${activeJob.car.brand} ${activeJob.car.model}` : 'Toyota Land Cruiser 4.0'}
                </div>
                <div style={{ color:P.mut, fontSize:11 }}>
                  📍 {activeJob?.point ? `${activeJob.point.local} — ${activeJob.point.com}` : 'Autoplanet — Maipú'}
                </div>
              </div>
              <div style={{ fontSize:20 }}>{activeJob?.car?.icon || '🚗'}</div>
            </div>

            {/* Progress bar */}
            <div style={{ padding:'6px 16px 2px', flexShrink:0 }}>
              <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:4, height:3 }}>
                <div style={{ background:P.qt, height:'100%', borderRadius:4, width:`${(step/ALL_STEPS.length)*100}%`, transition:'width 0.4s' }} />
              </div>
            </div>

            {/* Steps list */}
            <div style={{ flex:1, overflowY:'auto', padding:'6px 10px 10px' }}>
              {ALL_STEPS.map((s, i) => {
                const done    = i < step;
                const active  = i === step && !completing;
                const caps    = stepCaptures[i] || { photos:[], docs:[] };
                const req     = STEP_REQ[i] || { photo:false, docs:[] };
                return (
                  <div key={i} style={{ marginBottom:5, background:active?`${s.col}12`:done?'rgba(34,197,94,0.04)':'rgba(255,255,255,0.02)', border:`1px solid ${active?s.col+'50':done?'rgba(34,197,94,0.18)':'transparent'}`, borderRadius:12, overflow:'hidden', transition:'all 0.2s' }}>
                    {/* Step row */}
                    <div style={{ display:'flex', gap:10, alignItems:'center', padding:'9px 12px' }}>
                      <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0, background:done?P.ok:active?s.col:'rgba(255,255,255,0.08)', color:done||active?'#000':P.mut, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800 }}>
                        {done ? '✓' : i+1}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ color:done?P.mut:active?'#fff':'rgba(255,255,255,0.38)', fontSize:13, fontWeight:active?700:400 }}>{s.name}</div>
                        <div style={{ color:'rgba(255,255,255,0.2)', fontSize:9, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.phase}</div>
                      </div>
                      {done && (caps.photos.length>0 || caps.docs.length>0) && (
                        <span style={{ fontSize:9, color:P.ok, opacity:0.65 }}>
                          {caps.photos.length>0?`📷${caps.photos.length} `:''}{caps.docs.length>0?`📄${caps.docs.length}`:''}
                        </span>
                      )}
                    </div>

                    {/* Active step — captures */}
                    {active && (
                      <div style={{ padding:'0 12px 12px' }}>
                        {/* Photo capture */}
                        {req.photo && (
                          <div style={{ marginBottom:10 }}>
                            <div style={{ fontSize:10, color:P.qt, fontWeight:700, marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>📷 {req.photoLabel}</div>
                            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:4 }}>
                              {caps.photos.map((p, pi) => (
                                <div key={pi} style={{ width:48, height:48, borderRadius:8, background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, border:`1px solid ${P.qt}40`, position:'relative' }}>
                                  {p.emoji}
                                  <span style={{ position:'absolute', bottom:2, right:3, fontSize:7, color:'rgba(255,255,255,0.5)' }}>{p.ts}</span>
                                </div>
                              ))}
                              <button onClick={() => addPhoto(i, req)} style={{ width:48, height:48, borderRadius:8, background:'rgba(255,255,255,0.06)', border:`1.5px dashed ${P.qt}60`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, cursor:'pointer', flexShrink:0, color:P.qt }}>
                                📷
                              </button>
                            </div>
                            <div style={{ fontSize:9, color:'rgba(255,255,255,0.25)' }}>Toca 📷 para simular captura</div>
                          </div>
                        )}

                        {/* Document upload */}
                        {req.docs && req.docs.length > 0 && (
                          <div style={{ marginBottom:10 }}>
                            <div style={{ fontSize:10, color:'#60A5FA', fontWeight:700, marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>📄 Documentos</div>
                            {req.docs.map(doc => {
                              const captured = caps.docs.find(d => d.type === doc);
                              return (
                                <div key={doc} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                                  <div style={{ width:28, height:28, borderRadius:6, background:captured?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.05)', border:`1px solid ${captured?P.ok:'rgba(255,255,255,0.1)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, flexShrink:0 }}>
                                    {captured ? '✓' : '📄'}
                                  </div>
                                  <span style={{ fontSize:11, color:captured?P.ok:'rgba(255,255,255,0.55)', flex:1 }}>{doc}</span>
                                  {captured
                                    ? <span style={{ fontSize:9, color:P.mut }}>{captured.ts}</span>
                                    : <button onClick={() => addDoc(i, doc)} style={{ background:'rgba(59,130,246,0.15)', color:'#60A5FA', border:'1px solid rgba(59,130,246,0.3)', borderRadius:6, padding:'3px 10px', fontSize:10, cursor:'pointer', fontWeight:700, whiteSpace:'nowrap' }}>Cargar ↑</button>
                                  }
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Confirm button */}
                        <button onClick={advanceStep} style={{ width:'100%', background:s.col, color:'#000', border:'none', borderRadius:10, padding:'10px 0', fontSize:13, fontWeight:800, cursor:'pointer', marginTop:2, transition:'opacity 0.15s' }}>
                          {step === ALL_STEPS.length-1 ? '✓ Completar transacción' : 'Confirmar paso →'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Completion banner */}
              {(step >= ALL_STEPS.length || completing) && (
                <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:16, padding:24, textAlign:'center', margin:'8px 0 16px' }}>
                  <div style={{ fontSize:40, marginBottom:8 }}>🎉</div>
                  <div style={{ color:P.ok, fontWeight:800, fontSize:16, marginBottom:4 }}>¡Transacción completada!</div>
                  <div style={{ color:P.mut, fontSize:13, marginBottom:10 }}>Ganaste UF 1,05 · Datos enviados al backoffice</div>
                  <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>⏳ Volviendo al inicio en 3 seg...</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ borderTop:'1px solid #1A2030', padding:'10px 20px', display:'flex', justifyContent:'space-around' }}>
          {[['🏠','Inicio'],['📋','Historial'],['💰','Cobros'],['👤','Perfil']].map(([ic,l]) => (
            <div key={l} style={{ textAlign:'center', cursor:'pointer' }}>
              <div style={{ fontSize:20 }}>{ic}</div>
              <div style={{ fontSize:9, color:P.mut }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ADMIN VIEW ────────────────────────────────────────────────────────────────
function AdminView({ go, txnList, tab, setTab, linzers, linzerCaptures }) {
  const mob = useIsMobile();
  const [selTxn, setSelTxn] = useState(null);

  const baseTxns = [
    { id:'TXN-58291', car:'Toyota Land Cruiser 4.0', local:'Autoplanet — Maipú',         linzer:'Carlos Muñoz', step:14, status:'done',        ts:'09:14' },
    { id:'TXN-58290', car:'Volkswagen Voyage 1.6',   local:'Saint Germain — Providencia', linzer:'Andrea Soto',  step:9,  status:'in_progress', ts:'10:32' },
    { id:'TXN-58289', car:'Haval H6 1.5 G Elite',    local:'Autoplanet — Quilicura',      linzer:'Diego Ramos',  step:5,  status:'in_progress', ts:'11:45' },
    { id:'TXN-58288', car:'Chevrolet Captiva 2.4',   local:'Tu Auto Aquí — Macul',        linzer:'Marcos Pérez', step:3,  status:'in_progress', ts:'12:10' },
  ];
  const allTxns = [...txnList.map(t => ({ id:t.id, car:`${t.car?.brand||''} ${t.car?.model||''}`.trim()||'Sin datos', local:`${t.point?.local||''} — ${t.point?.com||''}`, linzer:'Carlos Muñoz', step:t.step||1, status:t.status||'pending', ts:t.ts })), ...baseTxns];

  const kpis = [
    { l:'Transacciones', v:allTxns.length,                               ic:'⚡', col:P.qt },
    { l:'UF facturadas', v:`${(allTxns.length*1.5).toFixed(1)} UF`,     ic:'💰', col:P.warn },
    { l:'Linzers activos', v:linzers.filter(l=>l.st!=='offline').length, ic:'👷', col:P.ok },
    { l:'Cumpl. SLA',    v:'97%',                                        ic:'🎯', col:P.inf },
  ];
  const stColor = s => s==='done'?P.ok : s==='in_progress'?P.qt : P.warn;
  const stLabel = s => s==='done'?'✓ Listo' : s==='in_progress'?'● Curso' : '○ Pend.';

  return (
    <div style={{ background:P.bg, minHeight:'100vh', color:P.txt, fontFamily:'system-ui, sans-serif' }}>

      {/* TOPBAR */}
      <div style={{ background:P.card, borderBottom:`1px solid ${P.brd}`, padding: mob?'0 12px':'0 24px', height:50, display:'flex', alignItems:'center', gap: mob?10:14, overflowX:'auto' }}>
        <span style={{ fontWeight:900, fontSize: mob?15:17, color:P.qt, flexShrink:0 }}>QTT</span>
        {!mob && <><span style={{ color:P.mut, fontSize:13 }}>Backoffice</span><div style={{ width:1, height:20, background:P.brd }} /></>}
        <div style={{ display:'flex', gap: mob?6:8, flex:1 }}>
          {[['dashboard','📊'],['transactions','📋'],['linzers','👷']].map(([id,ic]) => (
            <button key={id} onClick={() => { setTab(id); setSelTxn(null); }} style={{ background:tab===id?`${P.qt}20`:'transparent', color:tab===id?P.qt:P.mut, border:`1px solid ${tab===id?P.qt+'40':P.brd}`, borderRadius:7, padding: mob?'5px 10px':'5px 14px', cursor:'pointer', fontSize: mob?12:12, fontWeight:tab===id?700:400, flexShrink:0 }}>
              {mob ? ic : id==='dashboard'?'Dashboard':id==='transactions'?'Transacciones':'Linzers'}
            </button>
          ))}
        </div>
        <button onClick={() => go('landing')} style={{ background:'transparent', color:P.mut, border:`1px solid ${P.brd}`, borderRadius:7, padding:'4px 10px', cursor:'pointer', fontSize:11, flexShrink:0 }}>← Demo</button>
      </div>

      <div style={{ padding: mob?12:24, maxWidth:1280, margin:'0 auto' }}>

        {/* ── DASHBOARD ── */}
        {tab==='dashboard' && (
          <>
            <div style={{ display:'grid', gridTemplateColumns: mob?'1fr 1fr':'repeat(4,1fr)', gap: mob?10:14, marginBottom: mob?14:24 }}>
              {kpis.map(k => (
                <div key={k.l} style={{ background:P.card, borderRadius:12, padding: mob?'14px':20, border:`1px solid ${P.brd}`, borderTop:`3px solid ${k.col}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:10, color:P.mut, textTransform:'uppercase', letterSpacing:'0.05em' }}>{k.l}</span>
                    <span style={{ fontSize:18 }}>{k.ic}</span>
                  </div>
                  <div style={{ fontSize: mob?22:28, fontWeight:800, color:k.col }}>{k.v}</div>
                </div>
              ))}
            </div>

            {/* Requests — mobile uses cards, desktop uses table */}
            <div style={{ background:P.card, borderRadius:14, border:`1px solid ${P.brd}`, overflow:'hidden', marginBottom:16 }}>
              <div style={{ padding:'12px 16px', borderBottom:`1px solid ${P.brd}`, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:13, fontWeight:700 }}>Requests de Linzecar</span>
                <span style={{ background:`${P.qt}1A`, color:P.qt, fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:4 }}>API</span>
              </div>
              {mob ? (
                <div>
                  {allTxns.map(t => (
                    <div key={t.id} onClick={() => setSelTxn(selTxn?.id===t.id?null:t)} style={{ padding:'12px 16px', borderTop:`1px solid ${P.brd}`, cursor:'pointer', background:selTxn?.id===t.id?`${P.qt}08`:'transparent' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                        <span style={{ fontFamily:'monospace', fontSize:11, color:P.qt }}>{t.id}</span>
                        <span style={{ background:`${stColor(t.status)}20`, color:stColor(t.status), fontSize:10, fontWeight:700, padding:'1px 8px', borderRadius:4 }}>{stLabel(t.status)}</span>
                      </div>
                      <div style={{ fontSize:13, fontWeight:600, color:P.txt, marginBottom:2 }}>{t.car}</div>
                      <div style={{ fontSize:11, color:P.mut }}>{t.local} · Paso {t.step}/14</div>
                    </div>
                  ))}
                </div>
              ) : (
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr style={{ background:'rgba(255,255,255,0.025)' }}>
                    {['ID','Vehículo','Punto','Linzer','Estado','Paso'].map(h => (
                      <th key={h} style={{ padding:'9px 18px', textAlign:'left', fontSize:10, color:P.mut, letterSpacing:'0.1em', textTransform:'uppercase' }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {allTxns.map(t => (
                      <tr key={t.id} onClick={() => setSelTxn(selTxn?.id===t.id?null:t)} style={{ borderTop:`1px solid ${P.brd}`, cursor:'pointer', background:selTxn?.id===t.id?`${P.qt}08`:'transparent' }}>
                        <td style={{ padding:'10px 18px', fontSize:12, fontFamily:'monospace', color:P.qt }}>{t.id}</td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.txt }}>{t.car}</td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.mut }}>{t.local}</td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.txt }}>{t.linzer}</td>
                        <td style={{ padding:'10px 18px' }}><span style={{ background:`${stColor(t.status)}20`, color:stColor(t.status), fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:4 }}>{stLabel(t.status)}</span></td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.mut }}>{t.step}/14</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ background:P.card, borderRadius:14, padding: mob?14:20, border:`1px solid ${P.brd}` }}>
              <div style={{ fontSize:11, color:P.mut, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Tarifas QTT</div>
              <div style={{ display:'grid', gridTemplateColumns: mob?'1fr':'repeat(3,1fr)', gap:10 }}>
                {[['Transacción ejecutada','1,5',P.qt],['Fallido / No show','1,0',P.warn],['Extendido /30min','0,5',P.inf]].map(([t,uf,col]) => (
                  <div key={t} style={{ background:'rgba(255,255,255,0.03)', borderRadius:12, padding:'14px 16px', border:`1px solid rgba(255,255,255,0.06)`, display: mob?'flex':'block', alignItems:'center', gap:12 }}>
                    <div style={{ fontSize:11, color:P.mut, marginBottom: mob?0:6, flex:1 }}>{t}</div>
                    <div style={{ fontSize: mob?20:24, fontWeight:900, color:col }}>UF {uf}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── TRANSACCIONES ── */}
        {tab==='transactions' && (
          <div style={{ display:'grid', gridTemplateColumns: (!mob && selTxn)?'1fr 360px':'1fr', gap:16 }}>
            <div style={{ background:P.card, borderRadius:14, border:`1px solid ${P.brd}`, overflow:'hidden' }}>
              <div style={{ padding:'12px 16px', borderBottom:`1px solid ${P.brd}` }}>
                <span style={{ fontSize:13, fontWeight:700 }}>Todas las transacciones</span>
              </div>
              {mob ? (
                <div>
                  {allTxns.map(t => (
                    <div key={t.id} onClick={() => setSelTxn(selTxn?.id===t.id?null:t)} style={{ padding:'12px 16px', borderTop:`1px solid ${P.brd}`, cursor:'pointer', background:selTxn?.id===t.id?`${P.qt}08`:'transparent' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                        <span style={{ fontFamily:'monospace', fontSize:11, color:P.qt }}>{t.id}</span>
                        <span style={{ background:`${stColor(t.status)}20`, color:stColor(t.status), fontSize:10, fontWeight:700, padding:'1px 8px', borderRadius:4 }}>{stLabel(t.status)}</span>
                      </div>
                      <div style={{ fontSize:13, fontWeight:600, color:P.txt, marginBottom:2 }}>{t.car}</div>
                      <div style={{ fontSize:11, color:P.mut }}>{t.local} · 👷 {t.linzer} · {t.ts}</div>
                      <div style={{ fontSize:11, color:P.mut, marginTop:2 }}>Paso {t.step}/14</div>
                    </div>
                  ))}
                </div>
              ) : (
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr style={{ background:'rgba(255,255,255,0.025)' }}>
                    {['ID','Vehículo','Punto','Linzer','Estado','Paso','Hora'].map(h => (
                      <th key={h} style={{ padding:'9px 18px', textAlign:'left', fontSize:10, color:P.mut, letterSpacing:'0.08em', textTransform:'uppercase' }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {allTxns.map(t => (
                      <tr key={t.id} onClick={() => setSelTxn(selTxn?.id===t.id?null:t)} style={{ borderTop:`1px solid ${P.brd}`, cursor:'pointer', background:selTxn?.id===t.id?`${P.qt}08`:'transparent' }}>
                        <td style={{ padding:'10px 18px', fontSize:12, fontFamily:'monospace', color:P.qt }}>{t.id}</td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.txt }}>{t.car}</td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.mut }}>{t.local}</td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.txt }}>{t.linzer}</td>
                        <td style={{ padding:'10px 18px' }}><span style={{ background:`${stColor(t.status)}20`, color:stColor(t.status), fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:4 }}>{stLabel(t.status)}</span></td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.mut }}>{t.step}/14</td>
                        <td style={{ padding:'10px 18px', fontSize:12, color:P.mut }}>{t.ts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {selTxn && (
              <div style={{ background:P.card, borderRadius:14, border:`1px solid ${P.brd}`, padding:22, overflowY:'auto', maxHeight:700 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, alignItems:'center' }}>
                  <span style={{ fontWeight:700, fontSize:13 }}>Detalle transacción</span>
                  <span onClick={() => setSelTxn(null)} style={{ color:P.mut, cursor:'pointer', fontSize:16, padding:'0 4px' }}>✕</span>
                </div>
                <div style={{ fontFamily:'monospace', color:P.qt, marginBottom:6, fontSize:14 }}>{selTxn.id}</div>
                <div style={{ color:P.txt, marginBottom:4, fontWeight:600 }}>{selTxn.car}</div>
                <div style={{ color:P.mut, fontSize:12, marginBottom:6 }}>📍 {selTxn.local}</div>
                <div style={{ color:P.mut, fontSize:12, marginBottom:18 }}>👷 {selTxn.linzer} · ⏱️ {selTxn.ts}</div>

                {/* Steps with Linzer captures */}
                {STEPS_PHASES.map((phase, pi) => (
                  <div key={pi} style={{ marginBottom:16 }}>
                    <div style={{ fontSize:10, color:phase.col, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:phase.col }} />
                      {phase.ph}
                    </div>
                    {phase.list.map((s, si) => {
                      const idx   = STEPS_PHASES.slice(0,pi).reduce((a,p)=>a+p.list.length,0)+si;
                      const done  = idx < selTxn.step;
                      const caps  = linzerCaptures[selTxn.id]?.captures?.[idx];
                      return (
                        <div key={si} style={{ background:done?'rgba(34,197,94,0.04)':'rgba(255,255,255,0.02)', border:`1px solid ${done?'rgba(34,197,94,0.14)':'transparent'}`, borderRadius:10, padding:'8px 12px', marginBottom:4 }}>
                          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                            <div style={{ width:18, height:18, borderRadius:'50%', background:done?P.ok:'rgba(255,255,255,0.08)', fontSize:9, display:'flex', alignItems:'center', justifyContent:'center', color:done?'#000':P.mut, flexShrink:0, fontWeight:700 }}>
                              {done?'✓':idx+1}
                            </div>
                            <span style={{ fontSize:12, color:done?P.txt:P.mut, fontWeight:done?500:400 }}>{s}</span>
                            {caps && (caps.photos?.length>0 || caps.docs?.length>0) && (
                              <span style={{ marginLeft:'auto', display:'flex', gap:6 }}>
                                {caps.photos?.length>0 && <span style={{ fontSize:10, color:P.qt, background:`${P.qt}15`, borderRadius:4, padding:'1px 6px' }}>📷 {caps.photos.length}</span>}
                                {caps.docs?.length>0   && <span style={{ fontSize:10, color:'#60A5FA', background:'rgba(96,165,250,0.1)', borderRadius:4, padding:'1px 6px' }}>📄 {caps.docs.length}</span>}
                              </span>
                            )}
                          </div>
                          {/* Show captures inline */}
                          {caps && caps.photos?.length > 0 && (
                            <div style={{ marginTop:8, marginLeft:28 }}>
                              <div style={{ fontSize:9, color:P.qt, fontWeight:700, marginBottom:4, textTransform:'uppercase', letterSpacing:'0.05em' }}>Fotografías capturadas</div>
                              <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                                {caps.photos.map((p, pi2) => (
                                  <div key={pi2} style={{ width:36, height:36, borderRadius:6, background:p.bg||'#0D2A1A', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, border:`1px solid ${P.qt}30`, position:'relative' }}>
                                    {p.emoji}
                                    <span style={{ position:'absolute', bottom:-1, right:2, fontSize:6, color:'rgba(255,255,255,0.4)' }}>{p.ts}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {caps && caps.docs?.length > 0 && (
                            <div style={{ marginTop:8, marginLeft:28 }}>
                              <div style={{ fontSize:9, color:'#60A5FA', fontWeight:700, marginBottom:4, textTransform:'uppercase', letterSpacing:'0.05em' }}>Documentos cargados</div>
                              {caps.docs.map((d, di) => (
                                <div key={di} style={{ display:'flex', gap:6, alignItems:'center', marginBottom:3 }}>
                                  <span style={{ fontSize:11 }}>✅</span>
                                  <span style={{ fontSize:11, color:'rgba(255,255,255,0.65)' }}>{d.type}</span>
                                  <span style={{ fontSize:9, color:P.mut, marginLeft:'auto' }}>{d.ts}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Summary */}
                {linzerCaptures[selTxn.id] && (
                  <div style={{ background:'rgba(0,196,180,0.06)', border:`1px solid ${P.qt}30`, borderRadius:12, padding:14, marginTop:4 }}>
                    <div style={{ fontSize:11, color:P.qt, fontWeight:800, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.06em' }}>Resumen capturas Linzer</div>
                    {(() => {
                      const allCaps = linzerCaptures[selTxn.id]?.captures || {};
                      const totalPhotos = Object.values(allCaps).reduce((a,c) => a+(c.photos?.length||0), 0);
                      const totalDocs   = Object.values(allCaps).reduce((a,c) => a+(c.docs?.length||0), 0);
                      return (
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                          {[['📷 Fotos', totalPhotos, P.qt],['📄 Docs', totalDocs, '#60A5FA'],['⏱️ Completado', selTxn.ts, P.ok]].map(([l,v,col]) => (
                            <div key={l} style={{ textAlign:'center' }}>
                              <div style={{ fontSize:11, color:P.mut, marginBottom:2 }}>{l}</div>
                              <div style={{ fontSize:18, fontWeight:800, color:col }}>{v}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {tab==='linzers' && (
          <div style={{ background:P.card, borderRadius:14, border:`1px solid ${P.brd}`, overflow:'hidden' }}>
            <div style={{ padding:'12px 16px', borderBottom:`1px solid ${P.brd}` }}>
              <span style={{ fontSize:13, fontWeight:700 }}>Roster · Región Metropolitana</span>
            </div>
            {mob ? (
              <div>
                {linzers.map(l => (
                  <div key={l.id} style={{ padding:'14px 16px', borderTop:`1px solid ${P.brd}`, display:'flex', alignItems:'center', gap:14 }}>
                    <div style={{ width:42, height:42, borderRadius:'50%', background:`${P.qt}20`, border:`2px solid ${P.qt}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>👷</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14, color:P.txt }}>{l.name}</div>
                      <div style={{ fontSize:11, color:P.mut }}>{l.zone}</div>
                      <div style={{ fontSize:11, color:P.warn, marginTop:2 }}>⭐ {l.stars} · {l.txns} txns</div>
                    </div>
                    <span style={{ background:l.st==='online'?`${P.ok}20`:l.st==='busy'?`${P.warn}20`:`rgba(255,255,255,0.06)`, color:l.st==='online'?P.ok:l.st==='busy'?P.warn:P.mut, fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20, flexShrink:0 }}>
                      {l.st==='online'?'● Online':l.st==='busy'?'● Trabajo':'○ Offline'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead><tr style={{ background:'rgba(255,255,255,0.025)' }}>
                  {['Linzer','Zona','Rating','Transacciones','Estado'].map(h => (
                    <th key={h} style={{ padding:'9px 20px', textAlign:'left', fontSize:10, color:P.mut, letterSpacing:'0.08em', textTransform:'uppercase' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {linzers.map(l => (
                    <tr key={l.id} style={{ borderTop:`1px solid ${P.brd}` }}>
                      <td style={{ padding:'14px 20px' }}>
                        <div style={{ fontWeight:700, fontSize:14, color:P.txt }}>{l.name}</div>
                        <div style={{ fontSize:11, color:P.mut }}>{l.id}</div>
                      </td>
                      <td style={{ padding:'14px 20px', fontSize:12, color:P.mut }}>{l.zone}</td>
                      <td style={{ padding:'14px 20px', fontSize:14, color:P.warn, fontWeight:700 }}>⭐ {l.stars}</td>
                      <td style={{ padding:'14px 20px', fontSize:13, color:P.txt, fontWeight:600 }}>{l.txns}</td>
                      <td style={{ padding:'14px 20px' }}>
                        <span style={{ background:l.st==='online'?`${P.ok}20`:l.st==='busy'?`${P.warn}20`:`rgba(255,255,255,0.06)`, color:l.st==='online'?P.ok:l.st==='busy'?P.warn:P.mut, fontSize:11, fontWeight:700, padding:'3px 12px', borderRadius:20 }}>
                          {l.st==='online'?'● Online':l.st==='busy'?'● En trabajo':'○ Offline'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView]               = useState('landing');
  const [selectedCar, setSel]         = useState(null);
  const [txnRequest, setTxnReq]       = useState(null);
  const [txnList, setTxnList]         = useState([]);
  const [adminTab, setAdminTab]       = useState('dashboard');
  const [linzerCaptures, setLinzerCaptures] = useState({});
  const go = v => setView(v);

  const handleRequest = (car, point, date) => {
    const txn = {
      id: `TXN-${Math.floor(Math.random()*90000+10000)}`,
      car, point, date,
      ts: new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' }),
      step: 0, status:'pending',
    };
    setTxnReq(txn);
    setTxnList(prev => [txn, ...prev]);
    go('qtt_confirm');
  };

  const handleLinzerComplete = (txnId, captures, jobInfo) => {
    setLinzerCaptures(prev => ({ ...prev, [txnId]: { captures, jobInfo } }));
    setTxnList(prev => {
      const existing = prev.find(t => t.id === txnId);
      if (existing) return prev.map(t => t.id===txnId ? { ...t, step:14, status:'done' } : t);
      // If second job (not initiated from Linzecar side), add it
      return [{ id:txnId, car:jobInfo?.car, point:jobInfo?.point, ts:new Date().toLocaleTimeString('es-CL',{hour:'2-digit',minute:'2-digit'}), step:14, status:'done' }, ...prev];
    });
  };

  if (view==='landing')     return <Landing go={go} />;
  if (view==='linzecar')    return <LinzecarView go={go} onSelect={car => { setSel(car); go('car_detail'); }} />;
  if (view==='car_detail')  return <CarDetailView go={go} car={selectedCar} onRequest={handleRequest} />;
  if (view==='qtt_confirm') return <QTTConfirm go={go} txn={txnRequest} />;
  if (view==='linzer')      return <LinzerView go={go} txnRequest={txnRequest} onComplete={handleLinzerComplete} />;
  if (view==='admin')       return <AdminView go={go} txnList={txnList} tab={adminTab} setTab={setAdminTab} linzers={LINZERS} linzerCaptures={linzerCaptures} />;
  return <Landing go={go} />;
}
