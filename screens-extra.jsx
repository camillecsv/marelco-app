// screens-extra.jsx — Notifications, Service request, Energy, Coop
const { useState: useS3 } = React;

function NotifScreen({ nav }) {
  const items = [
    { tag:'Outage',   title:'Power restored in Brgy. Poblacion',      time:'2m ago',    sub:'Crew closed work order #4421',   icon:<I.Bolt size={18}/>,   color:'primary', unread:true },
    { tag:'Bill',     title:'April bill is ready · ₱538.02',          time:'2 days ago', sub:'Due May 20 · view breakdown',  icon:<I.Bill size={18}/>,   color:'primary', unread:true },
    { tag:'Advisory', title:'Scheduled maintenance · Tomorrow 8AM',   time:'1 wk ago',  sub:'Feeder F-02, est. 3 hours',    icon:<I.Outage size={18}/>, color:'accent' },
    { tag:'Bill',     title:'March bill paid · ₱614.55',              time:'3 wks ago', sub:'GCash · receipt available',     icon:<I.Check size={18}/>,  color:'primary' },
  ];
  const colorMap = { primary:['var(--primary-soft)','var(--primary)'], accent:['var(--accent-soft)','var(--accent)'], gold:['var(--gold-soft)','var(--warning)'] };
  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Notifications" onBack={()=>nav('home')} action={<I.Settings size={20}/>}/>
      <div className="scroll" style={{ padding:'8px 18px 18px' }}>
        <div className="chips" style={{ marginBottom: 12 }}>
          {['All','Bills','Outages','Advisories'].map((c,i)=>
            <button key={c} className={`chip ${i===0?'active':''}`}>{c}</button>)}
        </div>
        <div className="card">
          {items.map((it, i) => {
            const [bg, fg] = colorMap[it.color];
            return (
              <div key={i} className="row" style={{ borderTop: i ? '1px solid var(--line)' : 'none', alignItems:'flex-start' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:bg, color:fg, display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto' }}>{it.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
                    <span className="eyebrow" style={{ color:fg }}>{it.tag}</span>
                    <span style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>{it.time}</span>
                  </div>
                  <div style={{ fontWeight:600, fontSize:'0.875rem', marginTop:2, display:'flex', alignItems:'center', gap:6 }}>
                    {it.title} {it.unread && <span style={{ width:6, height:6, borderRadius:999, background:'var(--accent)' }}/>}
                  </div>
                  <div style={{ fontSize:'0.875rem', color:'var(--ink-3)', marginTop:2 }}>{it.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ServiceScreen({ nav }) {
  const items = [
    { i:<I.Camera size={20}/>,   title:'Submit meter reading',     sub:'Send a photo of your meter dial',    tag:'', go:'meter' },
    { i:<I.Shield size={20}/>,   title:'My profile & settings',    sub:'Account details and preferences',    tag:'', go:'profile' },
    { i:<I.Receipt size={20}/>,  title:'Dispute a charge',         sub:'Submit billing concern with proof',  tag:'5 days'        },
    { i:<I.Bolt size={20}/>,     title:'Reconnect line',           sub:'After payment of overdue bill',      tag:'2-3 days'      },
    { i:<I.Spark size={20}/>,    title:'Net meter application',    sub:'For solar PV systems ≤100 kW',      tag:'30 days'       },
    { i:<I.Coin size={20}/>,     title:'Lifeline rate application', sub:'For 4Ps & low-income members',     tag:'10% – 100% off'},
    { i:<I.Calendar size={20}/>, title:'Pay history',              sub:'View past bills and payment records',tag:'', go:'energy' },
  ];
  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Service requests" onBack={()=>nav('home')}/>
      <div className="scroll" style={{ padding:'8px 18px 18px' }}>
        <div className="serif" style={{ fontSize:'1.5rem', lineHeight:1.1 }}>What do you need?</div>
        <p style={{ color:'var(--ink-3)', fontSize:'0.875rem', marginTop:6 }}>
          Skip the trip to the EC office. We'll route your request and ping you when it's done.
        </p>

        <div className="card" style={{ marginTop:16, padding:14, background:'var(--gold-soft)', borderColor:'transparent' }}>
          <div className="eyebrow" style={{ color:'var(--warning)' }}>You may qualify</div>
          <div style={{ marginTop:6, fontSize:'1rem', fontWeight:600, color:'var(--warning)' }}>
            Lifeline rate · save up to ₱65/month
          </div>
          <div style={{ fontSize:'0.875rem', color:'var(--warning)', opacity:0.8, marginTop:2 }}>RA 11552 · for 4Ps & PSA-certified low-income households under 95 kWh</div>
          <button className="btn btn-primary" style={{ marginTop:10, height:38, padding:'0 14px' }}>Apply now</button>
        </div>

        <div className="eyebrow" style={{ marginTop:20 }}>All requests</div>
        <div className="card" style={{ marginTop:8 }}>
          {items.map((it, i) => (
            <div key={i} className="row" style={{ borderTop: i ? '1px solid var(--line)' : 'none', cursor: it.go ? 'pointer' : 'default' }}
              onClick={()=>{ if(it.go) nav(it.go); }}>
              <div style={{ display:'flex', gap:12, alignItems:'center', minWidth:0 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'var(--primary-soft)', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto' }}>{it.i}</div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:'1rem' }}>{it.title}</div>
                  <div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>{it.sub}</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {it.tag && <span className="mono" style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>{it.tag}</span>}
                <I.Chevron size={16} stroke="var(--ink-3)"/>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop:16, padding:14, display:'flex', gap:10, alignItems:'flex-start' }}>
          <I.Chat size={18} stroke="var(--ink-3)"/>
          <div style={{ fontSize:'0.875rem', color:'var(--ink-2)' }}>
            Need something else? Chat with our team — typical reply in 12 minutes.
          </div>
          <span className="linkish" style={{ fontSize:'0.875rem' }}>Open</span>
        </div>
      </div>
    </div>
  );
}

function EnergyScreen({ nav, data }) {
  const months = ['Nov','Dec','Jan','Feb','Mar','Apr'];
  const max = Math.max(...data.usage);
  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Energy use" onBack={()=>nav('home')}/>
      <div className="scroll" style={{ padding:'8px 18px 18px' }}>
        <div className="chips">
          {['Month','3M','6M','Year'].map((c,i)=>
            <button key={c} className={`chip ${i===2?'active':''}`}>{c}</button>)}
        </div>

        <div className="card" style={{ padding:18, marginTop:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <div>
              <div className="eyebrow">This month</div>
              <div className="amount" style={{ fontSize:'2.625rem', lineHeight:1, marginTop:4 }}>
                87 <span style={{ fontSize:'1.125rem', color:'var(--ink-3)' }}>kWh</span>
              </div>
              <div style={{ fontSize:'0.875rem', color:'var(--primary)', fontWeight:600, marginTop:4 }}>↓ 9% vs March</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div className="eyebrow">Projected bill</div>
              <div className="amount" style={{ fontSize:'1.5rem', marginTop:4 }}>₱538</div>
              <div style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>at current pace</div>
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'flex-end', gap:8, marginTop:18 }}>
            {data.usage.map((v, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ fontSize:'0.75rem', color:'var(--ink-3)' }} className="mono">{v}</div>
                <div style={{ width:'100%', height: Math.round((v/max)*80),
                  background: i === data.usage.length-1 ? 'var(--primary)' : 'var(--primary-soft)',
                  borderRadius:'4px 4px 0 0',
                }}/>
                <div style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </div>


        <div className="card" style={{ padding:16, marginTop:16, borderStyle:'dashed' }}>
          <div className="eyebrow" style={{ color:'var(--accent)' }}>Tipid Tip</div>
          <div className="serif" style={{ fontSize:'1.25rem', lineHeight:1.2, marginTop:6 }}>
            Set your aircon to 25°C — saves ~₱110/month vs 22°C.
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, trend }) {
  return (
    <div>
      <div style={{ fontSize:'0.75rem', color:'var(--ink-3)' }} className="eyebrow">{label}</div>
      <div className="amount" style={{ fontSize:'1.375rem', marginTop:2 }}>{value}</div>
      {trend && <div style={{ fontSize:'0.75rem', color: trend.startsWith('−')||trend.startsWith('+1') ? 'var(--primary)' : 'var(--accent)', fontWeight:600 }}>{trend}</div>}
    </div>
  );
}

// ─── Toggle (settings) ──────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <button onClick={()=>onChange(!on)} aria-pressed={on} style={{
      width:44, height:26, borderRadius:999, border:'none', cursor:'pointer', padding:3,
      background: on ? 'var(--primary)' : 'var(--line)', transition:'background .15s', flex:'0 0 auto',
      display:'flex', justifyContent: on ? 'flex-end' : 'flex-start',
    }}>
      <span style={{ width:20, height:20, borderRadius:999, background:'#fff', display:'block', boxShadow:'0 1px 3px rgba(0,0,0,0.25)' }}/>
    </button>
  );
}

// ─── Member Profile (account details + settings) ────────
function ProfileScreen({ tenant, data, brand, nav }) {
  const c = data.customer;
  const [push, setPush]   = useS3(true);
  const [sms, setSms]     = useS3(true);
  const [ebill, setEbill] = useS3(true);
  const [bio, setBio]     = useS3(false);
  const [lang, setLang]   = useS3('English');

  const initials = (c.name||'M').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();

  const Row = ({ label, value, mono }) => (
    <div className="row" style={{ alignItems:'flex-start' }}>
      <div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>{label}</div>
      <div style={{ fontSize:'0.875rem', fontWeight:600, textAlign:'right', maxWidth:'62%' }} className={mono?'mono':''}>{value}</div>
    </div>
  );
  const SetRow = ({ icon, title, sub, on, set, last }) => (
    <div className="row" style={{ borderTop: last?'none':'1px solid var(--line)' }}>
      <div style={{ display:'flex', gap:12, alignItems:'center', minWidth:0 }}>
        <div style={{ width:34, height:34, borderRadius:9, background:'var(--primary-soft)', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto' }}>{icon}</div>
        <div style={{ minWidth:0 }}>
          <div style={{ fontWeight:600, fontSize:'1rem' }}>{title}</div>
          {sub && <div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>{sub}</div>}
        </div>
      </div>
      <Toggle on={on} onChange={set}/>
    </div>
  );

  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="My profile" onBack={()=>nav('home')} action={<I.Settings size={20}/>}/>
      <div className="scroll" style={{ padding:'8px 18px 18px' }}>

        {/* Identity card */}
        <div className="card" style={{ padding:18, display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:56, height:56, borderRadius:999, background:'var(--primary)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'1.375rem', flex:'0 0 auto' }}>{initials}</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'1.125rem', fontWeight:700, color:'var(--ink)', lineHeight:1.2 }}>{c.name}</div>
            <div className="mono" style={{ fontSize:'0.875rem', color:'var(--ink-3)', marginTop:2 }}>{c.can}</div>
            <span className="pill pill-ok" style={{ marginTop:6 }}>{c.type} · Active</span>
          </div>
        </div>

        {/* Account details */}
        <div className="eyebrow" style={{ marginTop:20 }}>Account details</div>
        <div className="card" style={{ marginTop:8, padding:'4px 14px' }}>
          <Row label="Account number" value={c.can} mono/>
          <div style={{ borderTop:'1px solid var(--line)' }}/>
          <Row label="Account type" value={c.type}/>
          <div style={{ borderTop:'1px solid var(--line)' }}/>
          <Row label="Service address" value={c.address}/>
          <div style={{ borderTop:'1px solid var(--line)' }}/>
          <Row label="Meter number" value={c.meterNo} mono/>
          <div style={{ borderTop:'1px solid var(--line)' }}/>
          <Row label="Route / sequence" value={c.routeSeq}/>
        </div>
        <button className="btn btn-ghost" style={{ width:'100%', marginTop:8 }} onClick={()=>nav('meter')}>
          <I.Camera size={16}/> Submit a meter reading
        </button>

        {/* Settings */}
        <div className="eyebrow" style={{ marginTop:20 }}>Settings</div>
        <div className="card" style={{ marginTop:8 }}>
          <SetRow icon={<I.Bell size={18}/>}   title="Push notifications" sub="Bills, outages & advisories" on={push}  set={setPush}/>
          <SetRow icon={<I.Chat size={18}/>}   title="SMS alerts"         sub="Text reminders before due date" on={sms} set={setSms}/>
          <SetRow icon={<I.Receipt size={18}/>}title="Paperless billing"  sub="Get e-bills, skip the paper" on={ebill} set={setEbill}/>
          <SetRow icon={<I.Shield size={18}/>} title="Biometric login"    sub="Use fingerprint / face ID" on={bio} set={setBio} last/>
        </div>

        {/* Text size — accessibility. Uses the shared control defined in the host page. */}
        <div style={{ marginTop:12 }}>
          {typeof TextSizeControl !== 'undefined' && <TextSizeControl/>}
        </div>

        {/* Language */}
        <div className="card" style={{ marginTop:12, padding:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontWeight:600, fontSize:'1rem' }}>Language</div>
            <div style={{ display:'flex', gap:6, background:'var(--bg-elev)', borderRadius:9, padding:3 }}>
              {['English','Tagalog'].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{
                  border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:'0.875rem', fontWeight:600,
                  padding:'6px 12px', borderRadius:7,
                  background: lang===l ? '#fff':'transparent', color: lang===l ? 'var(--primary)':'var(--ink-3)',
                  boxShadow: lang===l ? '0 1px 3px rgba(0,0,0,0.12)':'none',
                }}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Support + sign out */}
        <div className="card" style={{ marginTop:12, padding:14, display:'flex', gap:10, alignItems:'flex-start' }}>
          <I.Info size={18} stroke="var(--ink-3)"/>
          <div style={{ fontSize:'0.875rem', color:'var(--ink-2)' }}>
            Need help? Email <b>{brand ? brand.supportEmail : 'support@example.com'}</b> or call the hotline {brand ? brand.hotlineDisplay : ''}.
          </div>
        </div>
        <button className="btn btn-ghost" style={{ width:'100%', marginTop:12, color:'var(--danger)', borderColor:'var(--line)' }} onClick={()=>nav('home')}>
          Sign out
        </button>
        <div style={{ textAlign:'center', fontSize:'0.75rem', color:'var(--ink-3)', marginTop:14 }} className="mono">
          {tenant.code} App · v1.0.0
        </div>
      </div>
    </div>
  );
}

// ─── Submit meter reading (photo) ───────────────────────
function MeterPhotoScreen({ tenant, data, nav }) {
  const [stage, setStage] = useS3('intro'); // intro | captured | done
  const m = data.meter;
  const suggested = (m.currentReading + Math.round((m.currentReading-m.previousReading)*1.05));
  const [reading, setReading] = useS3(String(suggested));

  if (stage === 'done') {
    return (
      <div className="eko-screen screen-enter">
        <ScreenHeader title="Reading submitted" onBack={()=>nav('home')}/>
        <div className="scroll" style={{ padding:'18px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
          <div style={{ width:72, height:72, borderRadius:999, background:'var(--primary-soft)', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', marginTop:24 }}>
            <I.Check size={36}/>
          </div>
          <div className="serif" style={{ fontSize:'1.5rem', marginTop:16 }}>Thank you!</div>
          <p style={{ color:'var(--ink-2)', fontSize:'0.875rem', marginTop:8, maxWidth:280, lineHeight:1.5 }}>
            Your photo and reading of <b>{reading} {tenant && data ? (data.unit||'kWh') : 'kWh'}</b> have been sent to {tenant.code}. We'll verify it and reflect it on your next bill — no need for a meter reader to visit.
          </p>
          <div className="card" style={{ width:'100%', marginTop:20, padding:14, textAlign:'left' }}>
            <div className="row" style={{ paddingTop:0 }}><div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>Reference no.</div><div className="mono" style={{ fontSize:'0.875rem', fontWeight:600 }}>MR-{m.meterNo.replace(/\D/g,'').slice(-5)}-04</div></div>
            <div className="row" style={{ borderTop:'1px solid var(--line)' }}><div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>Submitted</div><div style={{ fontSize:'0.875rem', fontWeight:600 }}>Today · {m.readingDate}</div></div>
            <div className="row" style={{ borderTop:'1px solid var(--line)', paddingBottom:0 }}><div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>Status</div><span className="pill pill-warn">Pending review</span></div>
          </div>
          <button className="btn btn-primary" style={{ width:'100%', marginTop:20 }} onClick={()=>nav('home')}>Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Submit meter reading" onBack={()=>nav('home')}/>
      <div className="scroll" style={{ padding:'8px 18px 18px' }}>
        <div className="serif" style={{ fontSize:'1.375rem', lineHeight:1.15 }}>Read your own meter</div>
        <p style={{ color:'var(--ink-3)', fontSize:'0.875rem', marginTop:6, lineHeight:1.5 }}>
          Snap a clear photo of your meter dial. We'll use it to bill your actual usage — so you don't have to wait for a meter reader.
        </p>

        {/* Meter info */}
        <div className="card" style={{ marginTop:16, padding:'4px 14px' }}>
          <div className="row" style={{ paddingBottom:10 }}><div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>Meter number</div><div className="mono" style={{ fontSize:'0.875rem', fontWeight:600 }}>{m.meterNo}</div></div>
          <div className="row" style={{ borderTop:'1px solid var(--line)' }}><div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>Last reading</div><div className="mono" style={{ fontSize:'0.875rem', fontWeight:600 }}>{m.previousReading} · {m.readingDate}</div></div>
          <div className="row" style={{ borderTop:'1px solid var(--line)', paddingTop:10 }}><div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>Next scheduled read</div><div style={{ fontSize:'0.875rem', fontWeight:600 }}>{m.nextReadingDate}</div></div>
        </div>

        {/* Photo capture */}
        <div className="eyebrow" style={{ marginTop:20 }}>Meter photo</div>
        {stage === 'intro' ? (
          <button onClick={()=>setStage('captured')} style={{
            width:'100%', marginTop:8, border:'1.5px dashed var(--line)', background:'var(--bg-elev)',
            borderRadius:14, padding:'32px 18px', cursor:'pointer', fontFamily:'inherit',
            display:'flex', flexDirection:'column', alignItems:'center', gap:10, color:'var(--ink-2)',
          }}>
            <div style={{ width:54, height:54, borderRadius:14, background:'var(--primary-soft)', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <I.Camera size={26}/>
            </div>
            <div style={{ fontWeight:700, fontSize:'1rem', color:'var(--ink)' }}>Take a photo</div>
            <div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>or upload from gallery</div>
          </button>
        ) : (
          <div style={{ marginTop:8 }}>
            {/* Mock captured meter image */}
            <div style={{ position:'relative', borderRadius:14, overflow:'hidden', border:'1px solid var(--line)', background:'#1a1a1a', height:170, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ background:'#0d0d0d', border:'3px solid #333', borderRadius:8, padding:'10px 14px', display:'flex', gap:4 }}>
                {String(suggested).split('').map((d,i)=>(
                  <span key={i} className="mono" style={{ background:'#111', color:'#e8e8e8', fontSize:'1.5rem', fontWeight:700, padding:'6px 7px', borderRadius:3, border:'1px solid #2a2a2a' }}>{d}</span>
                ))}
                <span className="mono" style={{ background:'#7a1414', color:'#fff', fontSize:'1.5rem', fontWeight:700, padding:'6px 7px', borderRadius:3 }}>4</span>
              </div>
              <span className="pill pill-ok" style={{ position:'absolute', top:10, left:10, background:'rgba(31,122,77,0.92)', color:'#fff' }}>
                <I.Check size={12}/> Photo captured
              </span>
              <button onClick={()=>setStage('intro')} style={{ position:'absolute', top:8, right:8, width:30, height:30, borderRadius:999, border:'none', background:'rgba(255,255,255,0.15)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <I.X size={16} stroke="#fff"/>
              </button>
            </div>

            {/* Auto-detected reading (editable) */}
            <div className="card" style={{ marginTop:12, padding:14 }}>
              <div className="eyebrow" style={{ color:'var(--primary)' }}>Auto-detected reading</div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:8 }}>
                <input value={reading} onChange={e=>setReading(e.target.value.replace(/[^0-9]/g,''))} inputMode="numeric" style={{
                  flex:1, fontFamily:'var(--mono)', fontSize:'1.625rem', fontWeight:700, color:'var(--ink)',
                  border:'1.5px solid var(--line)', borderRadius:10, padding:'8px 12px', background:'#fff', minWidth:0,
                }}/>
                <span style={{ fontSize:'1rem', color:'var(--ink-3)', fontWeight:600 }}>{(data.unit)||'kWh'}</span>
              </div>
              <div style={{ fontSize:'0.875rem', color:'var(--ink-3)', marginTop:8, lineHeight:1.5 }}>
                Detected from your photo. Tap to correct if it doesn't match your dial. Previous reading was <b>{m.previousReading}</b>.
              </div>
            </div>
          </div>
        )}

        <div className="card" style={{ marginTop:14, padding:13, display:'flex', gap:10, alignItems:'flex-start', background:'var(--gold-soft)', borderColor:'transparent' }}>
          <I.Info size={16} stroke="var(--warning)"/>
          <div style={{ fontSize:'0.875rem', color:'var(--warning)', lineHeight:1.5 }}>
            Make sure all digits are visible and in focus. Submit before your scheduled read date for it to count this cycle.
          </div>
        </div>

        <button className="btn btn-primary" style={{ width:'100%', marginTop:16, opacity: stage==='captured'?1:0.5 }}
          disabled={stage!=='captured'} onClick={()=>{ if(stage==='captured') setStage('done'); }}>
          <I.Send size={16}/> Submit reading
        </button>
      </div>
    </div>
  );
}

window.NotifScreen = NotifScreen;
window.ServiceScreen = ServiceScreen;
window.EnergyScreen = EnergyScreen;
window.Stat = Stat;
window.Toggle = Toggle;
window.ProfileScreen = ProfileScreen;
window.MeterPhotoScreen = MeterPhotoScreen;
