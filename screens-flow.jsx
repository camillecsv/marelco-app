// screens-flow.jsx — Pay flow, Outage, Schedule, Notifications, Service, Energy, Coop
const { useState: useS2, useEffect: useE2 } = React;

// ─── Pay (GCash sheet + success) ─────────────────────────
function PayScreen({ tenant, data, nav }) {
  const [stage, setStage] = useS2('select'); // select | gcash | confirming | success
  const channels = [
    { id: 'gcash', name: 'GCash', sub: '09•• ••• 4567', fee: 'No fee', tag: 'Recommended' },
    { id: 'maya',  name: 'Maya',  sub: 'Linked wallet', fee: 'No fee' },
    { id: 'bank',  name: 'Online banking', sub: 'BPI · UnionBank · BDO · 12 more', fee: '₱5 fee' },
    { id: 'otc',   name: 'Cash payment', sub: '7-Eleven · Bayad Center · M Lhuillier', fee: '₱15 fee' },
  ];
  const [picked, setPicked] = useS2('gcash');

  if (stage === 'success') {
    return <PaySuccess tenant={tenant} data={data} nav={nav}/>;
  }

  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Pay your bill" onBack={()=>nav('bill')}/>
      <div className="scroll" style={{ padding: '4px 18px 24px' }}>
        <div className="card" style={{ padding: 18, background:'var(--primary-soft)', borderColor:'transparent' }}>
          <div className="eyebrow" style={{ color:'var(--primary)' }}>Paying</div>
          <div className="amount" style={{ fontSize:'2.625rem', lineHeight: 1, color:'var(--primary)' }}>₱{data.bill.amount.toFixed(2)}</div>
          <div style={{ marginTop: 6, fontSize:'0.875rem', color:'var(--primary)' }}>
            April bill · <span className="mono">{tenant.code}-{data.account.no}</span>
          </div>
        </div>

        <div className="eyebrow" style={{ marginTop: 22 }}>Choose payment method</div>
        <div className="card" style={{ marginTop: 8 }}>
          {channels.map((c, i) => (
            <label key={c.id} className="row" style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <div style={{ display:'flex', gap: 12, alignItems:'center', minWidth: 0 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 999,
                  border: `2px solid ${picked===c.id ? 'var(--primary)' : 'var(--line)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'
                }}>
                  {picked===c.id && <span style={{ width: 8, height: 8, background:'var(--primary)', borderRadius: 999 }}/>}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize:'1rem', display:'flex', alignItems:'center', gap: 8 }}>
                    {c.name}
                    {c.tag && <span className="pill pill-ok" style={{ fontSize:'0.75rem' }}>{c.tag}</span>}
                  </div>
                  <div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>{c.sub}</div>
                </div>
              </div>
              <div style={{ fontSize:'0.875rem', color:'var(--ink-3)' }}>{c.fee}</div>
              <input type="radio" name="m" checked={picked===c.id} onChange={()=>setPicked(c.id)} style={{ display:'none' }}/>
            </label>
          ))}
        </div>

        <div style={{ marginTop: 18, padding: 12, borderRadius: 12, background: 'var(--bg-elev)', border:'1px dashed var(--line)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.875rem' }}>
            <span style={{ color:'var(--ink-3)' }}>Bill amount</span><span className="mono">₱{data.bill.amount.toFixed(2)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.875rem', marginTop: 4 }}>
            <span style={{ color:'var(--ink-3)' }}>Service fee</span><span className="mono">₱0.00</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight: 700, marginTop: 8, paddingTop: 8, borderTop:'1px solid var(--line)' }}>
            <span>Total</span><span className="mono">₱{data.bill.amount.toFixed(2)}</span>
          </div>
        </div>

        <button className="btn btn-primary btn-block" style={{ marginTop: 18 }}
          onClick={()=>setStage('gcash')}>
          Continue with {channels.find(c=>c.id===picked).name}
        </button>
        <div style={{ textAlign:'center', fontSize:'0.75rem', color:'var(--ink-3)', marginTop: 10 }}>
          You'll be taken to your wallet to confirm.
        </div>
      </div>

      {stage === 'gcash' && (
        <GCashSheet onClose={()=>setStage('select')} onPay={()=>{ setStage('confirming'); setTimeout(()=>setStage('success'), 900); }} amount={data.bill.amount}/>
      )}
      {stage === 'confirming' && <ConfirmingOverlay/>}
    </div>
  );
}

function GCashSheet({ onClose, onPay, amount }) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"/>
        <div style={{ padding: '6px 22px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div className="eyebrow">via GCash</div>
          <button onClick={onClose} style={{ appearance:'none', background:'transparent', border:0, padding: 6 }}><I.X size={20} stroke="var(--ink-3)"/></button>
        </div>
        <div style={{ padding: '6px 22px 18px', flex: 1, overflowY:'auto' }}>
          <div className="serif" style={{ fontSize:'1.625rem' }}>Confirm payment</div>
          <p style={{ color:'var(--ink-3)', fontSize:'0.875rem', marginTop: 4 }}>You'll be charged from your GCash wallet.</p>

          <div style={{ marginTop: 14, padding: 14, borderRadius: 14, background:'var(--bg-elev)', border:'1px solid var(--line)' }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ color:'var(--ink-3)', fontSize:'0.875rem' }}>Wallet</span>
              <span style={{ fontWeight: 600, fontSize:'0.875rem' }}>09•• ••• 4567 · ₱2,184.00</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop: 6 }}>
              <span style={{ color:'var(--ink-3)', fontSize:'0.875rem' }}>Amount</span>
              <span className="mono" style={{ fontWeight: 700 }}>₱{amount.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={onPay}>
            <I.Shield size={16}/> Pay ₱{amount.toFixed(2)}
          </button>
          <div style={{ textAlign:'center', fontSize:'0.75rem', color:'var(--ink-3)', marginTop: 8 }}>
            Secured by BUx · UnionBank · BSP-licensed
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmingOverlay() {
  return (
    <div className="sheet-backdrop" style={{ alignItems:'center' }}>
      <div style={{ background:'var(--bg)', padding: '28px 30px', borderRadius: 16, textAlign:'center' }}>
        <div style={{ width: 36, height: 36, border:'2.5px solid var(--line)', borderTop:'2.5px solid var(--primary)',
          borderRadius:'50%', margin:'0 auto', animation: 'spin 0.7s linear infinite' }}/>
        <style>{`@keyframes spin{to{transform: rotate(360deg)}}`}</style>
        <div style={{ marginTop: 14, fontSize:'0.875rem', color:'var(--ink-2)' }}>Confirming with GCash…</div>
      </div>
    </div>
  );
}

function PaySuccess({ tenant, data, nav }) {
  return (
    <div className="eko-screen screen-enter">
      <div className="scroll" style={{ padding: '40px 22px 22px', textAlign:'center', display:'flex', flexDirection:'column' }}>
        <div style={{ width: 78, height: 78, margin:'30px auto 14px', borderRadius:'50%', background:'var(--primary-soft)',
          color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <I.Check size={44} sw={2}/>
        </div>
        <div className="eyebrow" style={{ color:'var(--primary)' }}>Payment successful</div>
        <div className="amount" style={{ fontSize:'2.75rem', marginTop: 4 }}>₱{data.bill.amount.toFixed(2)}</div>
        <div style={{ color:'var(--ink-3)', fontSize:'0.875rem', marginTop: 6 }}>Salamat, Maria. Your kuryente is paid.</div>

        <div className="card" style={{ marginTop: 26, padding: 16, textAlign:'left' }}>
          {[
            ['Reference', 'GC-2026-04-A8XQ4-0044'],
            ['Paid via', 'GCash · 09•• ••• 4567'],
            ['Posted to', `${tenant.code} · 2 mins`],
            ['Account', `${tenant.code}-${data.account.no}`],
            ['Bill', `April 2026 · ${data.bill.period}`],
          ].map(([k,v], i) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', padding: '10px 0',
              borderBottom: i < 4 ? '1px solid var(--line)' : 'none', fontSize:'0.875rem' }}>
              <span style={{ color:'var(--ink-3)' }}>{k}</span>
              <span className="mono">{v}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <button className="btn btn-primary btn-block" onClick={()=>nav('home')}>Done</button>
          <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }}><I.Send size={16}/> Send receipt to email</button>
        </div>

        <div style={{ marginTop: 24, padding: 14, borderRadius: 14, background:'var(--gold-soft)', textAlign:'left', display:'flex', gap: 10 }}>
          <I.Coin size={20} stroke="var(--warning)"/>
          <div style={{ fontSize:'0.875rem', color:'var(--warning)' }}>
            <b>+₱4.20</b> patronage refund earned. Member equity now ₱2,847.40.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Outage Report ──────────────────────────────────────
function OutageScreen({ tenant, nav }) {
  const [step, setStep] = useS2(0);
  const reasons = ['No power', 'Flickering / brownout', 'Fallen pole or wire', 'Sparks / fire', 'Tripped meter'];
  const [reason, setReason] = useS2(reasons[0]);
  const [photo, setPhoto] = useS2(false);

  if (step === 2) return <OutageStatus nav={nav}/>;

  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Report outage" onBack={()=>nav('home')}/>
      <div className="scroll" style={{ padding: '8px 18px 18px' }}>
        <div className="serif" style={{ fontSize:'1.625rem', lineHeight: 1.25 }}>What's happening at your place?</div>
        <p style={{ color:'var(--ink-3)', fontSize:'0.875rem', marginTop: 10 }}>
          We'll add yours to the dispatch map. The more reports, the faster crews can pinpoint the fault.
        </p>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">Type</div>
          <div className="card" style={{ marginTop: 8 }}>
            {reasons.map((r, i) => (
              <label key={r} className="row" style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <span style={{ fontSize:'1rem' }}>{r}</span>
                <span style={{
                  width: 18, height: 18, borderRadius: 999,
                  border: `2px solid ${reason===r ? 'var(--primary)' : 'var(--line)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  {reason===r && <span style={{ width: 8, height: 8, background:'var(--primary)', borderRadius: 999 }}/>}
                </span>
                <input type="radio" checked={reason===r} onChange={()=>setReason(r)} style={{ display:'none' }}/>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">Where</div>
          <div className="card" style={{ marginTop: 8, padding: 14 }}>
            <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <I.MapPin size={18} stroke="var(--primary)"/>
              <div style={{ flex: 1, fontSize:'0.875rem' }}>
                <div style={{ fontWeight: 600 }}>Purok 3, Brgy. Poblacion</div>
                <div style={{ color:'var(--ink-3)', fontSize:'0.875rem' }} className="mono">8.6411° N, 124.7553° E · accuracy ±8m</div>
              </div>
              <span className="linkish" style={{ fontSize:'0.875rem' }}>Adjust</span>
            </div>
            <div className="placeholder" style={{ height: 110, marginTop: 12, background: 'linear-gradient(135deg, #E2EEE8 25%, transparent 25%, transparent 50%, #E2EEE8 50%, #E2EEE8 75%, transparent 75%, transparent), var(--bg-elev)', backgroundSize:'10px 10px', position:'relative' }}>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap: 4 }}>
                <I.MapPin size={26} stroke="var(--accent)" fill="var(--accent)"/>
                <div className="mono" style={{ fontSize:'0.75rem', background:'var(--bg)', padding:'2px 6px', borderRadius: 4 }}>your pin</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">Photo (optional)</div>
          <button onClick={()=>setPhoto(!photo)} style={{
            appearance:'none', width:'100%', marginTop: 8, padding: '20px 14px',
            border:'1.5px dashed var(--line)', background:'transparent',
            borderRadius: 14, color:'var(--ink-2)', display:'flex', gap: 10, alignItems:'center', justifyContent:'center',
            cursor:'pointer'
          }}>
            <I.Camera size={20}/> {photo ? '✓ photo_001.jpg attached' : 'Add a photo'}
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">Note</div>
          <textarea placeholder="e.g. Lights went out around 9 PM, neighbors also out…"
            style={{ width:'100%', marginTop: 8, padding: 12, border:'1px solid var(--line)', borderRadius: 12,
            background:'var(--bg-elev)', color:'var(--ink)', fontFamily:'var(--sans)', fontSize:'0.875rem', minHeight: 60, resize:'none', outline:'none' }}/>
        </div>

        <button className="btn btn-accent btn-block" style={{ marginTop: 18 }} onClick={()=>setStep(2)}>
          Submit report <I.Send size={16}/>
        </button>
        <div style={{ fontSize:'0.875rem', color:'var(--ink-3)', textAlign:'center', marginTop: 8 }}>
          Submitted reports are visible to your EC and other members.
        </div>
      </div>
    </div>
  );
}

// ─── Outage Status (after submit) ──────────────────────
function OutageStatus({ nav }) {
  const stages = [
    { label: 'Reported', sub: 'You + 14 others', time: '9:42 PM', done: true, active: false },
    { label: 'Acknowledged', sub: 'Dispatch — Joy R.', time: '9:45 PM', done: true, active: false },
    { label: 'Crew on the way', sub: 'Lineman Bong A. · ETA 25 min', time: '9:51 PM', done: true, active: true },
    { label: 'Repair in progress', sub: 'Estimated 45 min', time: '— —', done: false, active: false },
    { label: 'Power restored', sub: 'You will get a notification', time: '— —', done: false, active: false },
  ];
  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Outage status" onBack={()=>nav('home')}/>
      <div className="scroll" style={{ padding: '8px 18px 18px' }}>
        <div className="card" style={{ padding: 16, background: 'var(--accent-soft)', borderColor: 'transparent' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <span className="ind-dot warn" style={{ width: 8, height: 8 }}/>
            <span className="eyebrow" style={{ color:'var(--accent)' }}>Active outage · Feeder F-02</span>
          </div>
          <div className="serif" style={{ fontSize:'1.5rem', marginTop: 4, color:'var(--ink)' }}>
            Power is out in your area
          </div>
          <div style={{ display:'flex', gap: 16, marginTop: 14 }}>
            <div>
              <div className="amount" style={{ fontSize:'1.625rem' }}>23m</div>
              <div style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>since reported</div>
            </div>
            <div>
              <div className="amount" style={{ fontSize:'1.625rem' }}>87</div>
              <div style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>members affected</div>
            </div>
            <div>
              <div className="amount" style={{ fontSize:'1.625rem' }}>~45m</div>
              <div style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>crew ETA</div>
            </div>
          </div>
        </div>

        <div className="placeholder" style={{ height: 140, marginTop: 16, background: 'repeating-linear-gradient(45deg, var(--line-2) 0 6px, var(--bg) 6px 12px)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset: 0, opacity: 0.4, background:'radial-gradient(circle at 30% 50%, var(--accent) 0, transparent 28%), radial-gradient(circle at 65% 40%, var(--accent) 0, transparent 22%)' }}/>
          <div style={{ position:'absolute', bottom: 8, left: 8, padding:'4px 8px', background:'var(--bg)', borderRadius: 6, fontSize:'0.75rem' }} className="mono">
            14 reports · Brgy Poblacion
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div className="eyebrow">Live timeline</div>
          <div className="card" style={{ marginTop: 8, padding: '4px 16px' }}>
            {stages.map((s, i) => (
              <div key={i} style={{ display:'flex', gap: 14, padding: '14px 0',
                borderBottom: i < stages.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 999,
                    background: s.done ? 'var(--primary)' : 'var(--bg-elev)',
                    border: `2px solid ${s.done ? 'var(--primary)' : 'var(--line)'}`,
                    display:'flex', alignItems:'center', justifyContent:'center', color:'#FAF6EF',
                    boxShadow: s.active ? '0 0 0 6px var(--primary-soft)' : 'none'
                  }}>{s.done && <I.Check size={12} sw={2.5}/>}</span>
                  {i < stages.length - 1 && <span style={{ width: 2, flex: 1, marginTop: 4,
                    background: s.done ? 'var(--primary)' : 'var(--line)' }}/>}
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize:'0.875rem', color: s.done ? 'var(--ink)' : 'var(--ink-3)' }}>{s.label}</span>
                    <span className="mono" style={{ fontSize:'0.75rem', color:'var(--ink-3)' }}>{s.time}</span>
                  </div>
                  <div style={{ fontSize:'0.875rem', color:'var(--ink-3)', marginTop: 2 }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-ghost btn-block" style={{ marginTop: 16 }}>
          <I.Chat size={16}/> Message dispatch
        </button>
      </div>
    </div>
  );
}

// ─── Load Shedding Schedule (off-grid) ─────────────────
function ScheduleScreen({ nav }) {
  const days = ['M','T','W','T','F','S','S'];
  const labels = ['Mon May 5','Tue May 6','Wed May 7','Thu May 8','Fri May 9','Sat May 10','Sun May 11'];
  const today = 0;
  // each day: array of {h: hours, on: boolean}
  const week = [
    [{h:6,on:false},{h:6,on:true},{h:4,on:false},{h:4,on:true},{h:4,on:false}],
    [{h:6,on:false},{h:6,on:true},{h:6,on:false},{h:6,on:true}],
    [{h:6,on:false},{h:6,on:true},{h:4,on:false},{h:4,on:true},{h:4,on:false}],
    [{h:6,on:false},{h:8,on:true},{h:4,on:false},{h:6,on:true}],
    [{h:6,on:false},{h:6,on:true},{h:6,on:false},{h:6,on:true}],
    [{h:4,on:false},{h:8,on:true},{h:4,on:false},{h:8,on:true}],
    [{h:4,on:false},{h:8,on:true},{h:4,on:false},{h:8,on:true}],
  ];
  const [sel, setSel] = useS2(0);
  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="Power schedule" onBack={()=>nav('home')} action={<I.Calendar size={20}/>}/>
      <div className="scroll" style={{ padding: '8px 18px 18px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div className="serif" style={{ fontSize:'1.375rem', lineHeight: 1.1 }}>Zone B · Siargao</div>
            <div style={{ fontSize:'0.875rem', color:'var(--ink-3)', marginTop: 2 }}>Generator: <b style={{ color:'var(--ink)' }}>Running</b> · Diesel 78%</div>
          </div>
          <span className="pill pill-ok"><span style={{width:6,height:6,borderRadius:999,background:'var(--primary)'}}/> Power on</span>
        </div>

        <div style={{ display:'flex', gap: 6, marginTop: 16 }}>
          {days.map((d, i) => (
            <button key={i} onClick={()=>setSel(i)} style={{
              flex: 1, appearance:'none', border:`1px solid ${sel===i ? 'var(--ink)' : 'var(--line)'}`,
              background: sel===i ? 'var(--ink)' : 'var(--bg-elev)', color: sel===i ? 'var(--bg)' : 'var(--ink)',
              borderRadius: 10, padding:'8px 0', cursor:'pointer'
            }}>
              <div style={{ fontSize:'0.75rem', opacity: 0.7, fontWeight: 500 }}>{d}</div>
              <div style={{ fontSize:'1rem', fontWeight: 600, marginTop: 2 }}>{5+i}</div>
              {today===i && <div style={{ width: 4, height: 4, borderRadius:999, background: sel===i ? 'var(--bg)' : 'var(--accent)', margin: '3px auto 0' }}/>}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: 18, marginTop: 16 }}>
          <div className="eyebrow">{labels[sel]}</div>
          <div style={{ fontSize:'0.875rem', color:'var(--ink-3)', marginTop: 6 }}>
            {week[sel].filter(b=>b.on).reduce((a,b)=>a+b.h,0)} hours of power · {week[sel].filter(b=>!b.on).reduce((a,b)=>a+b.h,0)} hours scheduled outage
          </div>
          <div style={{ display:'flex', height: 38, borderRadius: 8, overflow:'hidden', border:'1px solid var(--line)', marginTop: 12 }}>
            {week[sel].map((b, i) => (
              <div key={i} title={`${b.h}h ${b.on?'ON':'OFF'}`} style={{
                flex: b.h, background: b.on ? 'var(--primary)' : 'var(--line)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color: b.on ? '#FAF6EF' : 'var(--ink-3)',
                fontSize:'0.75rem', fontWeight: 600, letterSpacing: '.04em',
                borderRight: i < week[sel].length-1 ? '1px solid var(--bg)' : 'none',
              }}>{b.on ? 'ON' : 'OFF'}</div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--ink-3)', marginTop: 6 }} className="mono">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
          </div>
        </div>

        <div className="card" style={{ padding: 14, marginTop: 14, display:'flex', gap: 10 }}>
          <I.Info size={18} stroke="var(--ink-3)"/>
          <div style={{ fontSize:'0.875rem', color:'var(--ink-2)' }}>
            Schedule cached for the next 7 days — works offline. Posted by {'{tenant}'} dispatch on May 4, 5:00 PM.
          </div>
        </div>

        <div className="card" style={{ padding: 16, marginTop: 14, borderColor:'var(--gold)', borderStyle:'dashed' }}>
          <div className="eyebrow" style={{ color:'var(--warning)' }}>Genset status</div>
          <div style={{ display:'flex', alignItems:'center', gap: 14, marginTop: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background:'var(--gold-soft)', color:'var(--warning)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <I.Spark size={28}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize:'0.875rem', fontWeight: 600 }}>Genset 1 — Cumulative 14h today</div>
              <div className="bar" style={{ marginTop: 6 }}><span style={{ width: '78%', background:'var(--gold)' }}/></div>
              <div style={{ fontSize:'0.75rem', color:'var(--ink-3)', marginTop: 4 }}>Diesel: 78% · Refuel scheduled May 7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PayScreen = PayScreen;
window.OutageScreen = OutageScreen;
window.OutageStatus = OutageStatus;
window.ScheduleScreen = ScheduleScreen;
