// screens-core.jsx — Splash, Onboard, Home, Bill, BillDetail
const { useState, useEffect, useMemo } = React;

// ─── Splash ─────────────────────────────────────────────
function SplashScreen({ tenant, onGo }) {
  useEffect(() => {const t = setTimeout(onGo, 1400);return () => clearTimeout(t);}, []);
  return (
    <div className="eko-screen" style={{ background: 'var(--primary)', color: '#FAF6EF', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
        <EcoKoMark size={48} color="#FAF6EF" />
        <div className="eyebrow" style={{ color: 'rgba(250,246,239,0.6)' }}>powered by your cooperative</div>
      </div>
      <div style={{ padding: '0 24px 32px', width: '100%', textAlign: 'center' }}>
        <div className="serif" style={{ fontSize:'1.375rem', opacity: 0.85 }}>{tenant.fullName}</div>
        <div style={{ fontSize:'0.875rem', opacity: 0.5, marginTop: 6 }} className="mono">v1.0.0 · {tenant.code}</div>
      </div>
    </div>);

}

// ─── Onboard / Account Link ─────────────────────────────
function OnboardScreen({ tenant, onLink }) {
  const [acc, setAcc] = useState('001234');
  return (
    <div className="eko-screen screen-enter">
      <div style={{ padding: '20px 22px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <EcoKoMark size={22} />
        <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>{tenant.code}</div>
      </div>
      <div className="scroll" style={{ padding: '12px 22px 22px' }}>
        <div className="serif" style={{ fontSize:'2.375rem', marginTop: 14, fontFamily: "Inter", textAlign: "left", letterSpacing: "-0.38px", lineHeight: "1.05" }}>
          Your kuryente,<br />in your pocket.
        </div>
        <p style={{ color: 'var(--ink-2)', marginTop: 14, fontSize:'1rem' }}>
          Pay your bill, see when power's coming back, and keep tabs on your member equity — anywhere.
        </p>

        <div style={{ marginTop: 28 }}>
          <div className="eyebrow">Link your account</div>
          <div className="card" style={{ padding: 14, marginTop: 8 }}>
            <label style={{ display: 'block', fontSize:'0.875rem', color: 'var(--ink-3)' }}>Account number</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span className="mono" style={{ color: 'var(--ink-3)' }}>{tenant.code}-</span>
              <input value={acc} onChange={(e) => setAcc(e.target.value)}
              className="mono"
              style={{ flex: 1, border: 0, outline: 0, background: 'transparent', color: 'var(--ink)',
                fontSize:'1.125rem', padding: '4px 0' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 10, color: 'var(--ink-3)', fontSize:'0.875rem' }}>
            <I.Info size={14} /> <span>Find this on your paper bill, top-right corner.</span>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <button className="btn btn-primary btn-block" onClick={onLink} style={{ backgroundColor: "rgb(81, 146, 135)" }}>
            Continue <I.Chevron size={18} />
          </button>
          <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }}>
            I don't have my bill yet
          </button>
        </div>

        <div style={{ marginTop: 22, padding: 14, borderRadius: 14, background: 'var(--primary-soft)', display: 'flex', gap: 10, alignItems: 'flex-start', backgroundColor: "rgb(230, 248, 241)" }}>
          <I.Shield size={18} stroke="var(--primary)" />
          <div style={{ fontSize:'0.875rem', color: 'var(--primary)' }}>
            Verified by NEA · Data Privacy Act compliant. Your info stays with {tenant.code}.
          </div>
        </div>
      </div>
    </div>);

}

// ─── Top bar shared across home-ish screens ────────────
function TopBar({ tenant, onBell, onProfile, balance, due }) {
  return (
    <div style={{ padding: '16px 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button onClick={onProfile} style={{ display: 'flex', alignItems: 'center', gap: 11, appearance:'none', border:0, background:'transparent', padding:0, cursor: onProfile ? 'pointer':'default', textAlign:'left' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize:'1rem', letterSpacing: '0.02em'
        }}>{tenant.code[0]}</div>
        <div>
          <div className="eyebrow" style={{ color: 'var(--ink-3)', marginBottom: 1 }}>{tenant.code}</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize:'1rem', fontWeight: 700, lineHeight: 1.2, color: 'var(--primary)', letterSpacing: '-0.01em' }}>Magandang umaga, Maria</div>
        </div>
      </button>
      <button onClick={onBell} style={{ position: 'relative', appearance: 'none', border: 0, background: 'transparent', padding: 6 }}>
        <I.Bell size={22} />
        <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 999, background: 'var(--accent)' }} />
      </button>
    </div>);

}

// ─── Home ──────────────────────────────────────────────
function HomeScreen({ tenant, mode, conn, data, nav }) {
  return (
    <div className="eko-screen screen-enter">
      <TopBar tenant={tenant} onBell={() => nav('notif')} onProfile={() => nav('profile')} />
      <div className="scroll">
        {/* hero bill card */}
        <div style={{ padding: '8px 18px 0' }}>
          <div className="card" style={{
            padding: 20, background: 'var(--bg-elev)', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', right: -30, top: -30, opacity: 0.07 }}>
              <I.Leaf size={180} stroke="var(--primary)" />
            </div>
            <div className="eyebrow" style={{ letterSpacing: '0.1em' }}>Current bill · {data.bill.period}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
              <span className="amount" style={{ fontSize:'3rem', lineHeight: 1, color: 'var(--ink)' }}>₱{data.bill.amount.toFixed(2).split('.')[0]}</span>
              <span className="amount" style={{ fontSize:'1.5rem', color: 'var(--ink-3)' }}>.{data.bill.amount.toFixed(2).split('.')[1]}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
              <div style={{ fontSize:'0.875rem', color: 'var(--ink-2)' }}>
                Due <b style={{ color: 'var(--ink)' }}>{data.bill.dueDate}</b> · {data.bill.kwh} kWh
              </div>
              <span className="pill pill-warn">
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--warning)' }} /> Unpaid
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => nav('pay')}>
                <I.Bolt size={16} /> Pay ₱{data.bill.amount.toFixed(2)}
              </button>
              <button className="btn btn-ghost" onClick={() => nav('bill')}>
                Details
              </button>
            </div>
          </div>
        </div>

        {/* Quick actions grid */}
        <div style={{ padding: '20px 18px 4px' }}>
          <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--ink-3)' }}>Quick actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {[
            { i: <I.Outage size={20} />, label: 'Report\noutage', go: 'outage' },
            { i: <I.Camera size={20} />, label: 'Submit\nreading', go: 'meter' },
            { i: <I.Calendar size={20} />, label: mode === 'off' ? 'Power\nschedule' : 'Pay\nhistory', go: mode === 'off' ? 'schedule' : 'energy' },
            { i: <I.Receipt size={20} />, label: 'Service\nrequest', go: 'service' },
            ].
            map((a, i) =>
            <button key={i} onClick={() => nav(a.go)} style={{
              appearance: 'none', border: '1px solid var(--line)', background: 'var(--bg-elev)',
              borderRadius: 14, padding: '12px 6px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              color: 'var(--ink)', whiteSpace: 'pre-line'
            }}>
                <span style={{
                width: 36, height: 36, borderRadius: 10, background: 'var(--primary-soft)', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{a.i}</span>
                <span style={{ fontSize:'0.75rem', fontWeight: 500, lineHeight: 1.15, textAlign: 'center', color: 'var(--ink-2)' }}>{a.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* Off-grid power schedule preview OR usage preview */}
        {mode === 'off' ?
        <SchedulePreviewCard nav={nav} data={data} /> :

        <UsagePreviewCard nav={nav} data={data} />
        }

        {/* Lifeline rate promo */}
        <div style={{ padding: '20px 18px 0' }}>
          <button onClick={() => nav('service')} style={{ width:'100%', padding:0, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
            <div style={{ background:'linear-gradient(135deg, #C7821A 0%, #E5A437 100%)', color:'#fff', borderRadius:14, padding:'16px 18px', display:'flex', alignItems:'center', gap:14, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', right:-10, top:-14, fontSize:'6.875rem', opacity:0.18, lineHeight:1, fontWeight:700 }}>₱</div>
              <div style={{ flex:1, minWidth:0, position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', opacity:0.75 }}>You may qualify · Lifeline Rate</div>
                <div style={{ fontFamily:'var(--sans)', fontWeight:700, fontSize:'1rem', marginTop:4, lineHeight:1.25, letterSpacing:'-0.01em' }}>Save up to ₱65/month under RA 11552.</div>
                <div style={{ fontSize:'0.875rem', opacity:0.88, marginTop:4 }}>For 4Ps & low-income households. <span style={{ whiteSpace:'nowrap' }}>Apply now →</span></div>
              </div>
            </div>
          </button>
        </div>

        {/* Net metering promo */}
        <div style={{ padding: '10px 18px 0' }}>
          <button onClick={() => nav('service')} style={{ width:'100%', padding:0, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
            <div style={{ background:'linear-gradient(135deg, #1A4D5A 0%, #2A7A8E 100%)', color:'#fff', borderRadius:14, padding:'16px 18px', display:'flex', alignItems:'center', gap:14, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', right:-8, top:-8, fontSize:'5.625rem', opacity:0.15, lineHeight:1 }}>☀</div>
              <div style={{ flex:1, minWidth:0, position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', opacity:0.75 }}>New · Solar Net Metering</div>
                <div style={{ fontFamily:'var(--sans)', fontWeight:700, fontSize:'1rem', marginTop:4, lineHeight:1.25, letterSpacing:'-0.01em' }}>Got solar panels? Sell excess kWh back to {tenant.fullName.split(' ')[0]}.</div>
                <div style={{ fontSize:'0.875rem', opacity:0.85, marginTop:4 }}>Earn peso credits on your next bill. Apply now →</div>
              </div>
            </div>
          </button>
        </div>

        {/* Internet partners promo */}
        <div style={{ padding: '10px 18px 0' }}>
          <button onClick={() => nav('service')} style={{ width:'100%', padding:0, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
            <div style={{ background:'linear-gradient(135deg, #0E2A47 0%, #1F5A8A 100%)', color:'#fff', borderRadius:16, padding:'18px 20px', display:'flex', alignItems:'center', gap:14, position:'relative', overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.18)' }}>
              <div style={{ position:'absolute', right:-10, top:-8, fontSize:'6rem', opacity:0.28, lineHeight:1, pointerEvents:'none' }}>📶</div>
              <div style={{ flex:1, minWidth:0, position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', opacity:0.8, marginBottom:4 }}>Partner Offer · Internet</div>
                <div style={{ fontFamily:'var(--sans)', fontWeight:700, fontSize:'1rem', lineHeight:1.25, letterSpacing:'-0.01em' }}>Connect your home — fiber & prepaid deals.</div>
                <div style={{ fontSize:'0.875rem', opacity:0.9, marginTop:5 }}>PLDT · Globe · Converge · Smart. Bundles from ₱699/mo</div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:4, marginTop:10, background:'rgba(255,255,255,0.22)', borderRadius:999, padding:'5px 12px', fontSize:'0.875rem', fontWeight:700, letterSpacing:'0.02em' }}>See deals →</div>
              </div>
            </div>
          </button>
        </div>

        {/* Outage status / advisories */}
        <div style={{ padding: '6px 18px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="eyebrow">Advisories</div>
            <span className="linkish" style={{ fontSize:'0.875rem' }} onClick={() => nav('notif')}>See all</span>
          </div>
          <div className="card" style={{ marginTop: 8 }}>
            <div style={{ padding: 14, display: 'flex', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FDEAEA', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                <I.Outage size={18} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize:'0.875rem', color: 'var(--ink)', lineHeight: 1.2 }}>Scheduled maintenance · Brgy. Taclobo</div>
                <div style={{ color: 'var(--ink-3)', fontSize:'0.875rem', marginTop: 3 }}>Tomorrow, 8:00 AM – 11:00 AM · Feeder F-02</div>
              </div>
              <I.Chevron size={18} stroke="var(--ink-3)" />
            </div>
          </div>
        </div>

        {/* Tipid Tip */}
        <div style={{ padding: '20px 18px 14px' }}>
          <div className="card" style={{ padding: 18, background: 'var(--primary-soft)', border: '1px solid var(--line)' }}>
            <div className="eyebrow" style={{ color: 'var(--primary-2)' }}>Tipid Tip</div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize:'1.0625rem', lineHeight: 1.35, marginTop: 8, color: 'var(--primary)', letterSpacing: '-0.01em' }}>
              Unplugging your aircon at the wall saves ~₱48 a month.
            </div>
            <div style={{ fontSize:'0.875rem', color: 'var(--ink-3)', marginTop: 8 }}>Based on your usage pattern</div>
          </div>
        </div>
      </div>
    </div>);

}

function UsagePreviewCard({ nav, data }) {
  const max = Math.max(...data.usage);
  return (
    <div style={{ padding: '20px 18px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div className="eyebrow">Energy use · last 6 months</div>
        <span className="linkish" style={{ fontSize:'0.875rem' }} onClick={() => nav('energy')}>Details</span>
      </div>
      <div className="card" style={{ padding: 16, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="amount" style={{ fontSize:'1.75rem' }}>87</span>
          <span style={{ color: 'var(--ink-3)', fontSize:'0.875rem' }}>kWh this month</span>
          <span style={{ marginLeft: 'auto', fontSize:'0.875rem', color: 'var(--primary)', fontWeight: 600 }}>↓ 9% vs last</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginTop: 14 }}>
          {data.usage.map((v, i) => {
            const barH = Math.round(v / max * 60);
            const isLatest = i === data.usage.length - 1;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{
                  width: '100%', height: barH,
                  background: isLatest ? 'var(--primary)' : 'var(--primary-soft)',
                  borderRadius: '4px 4px 2px 2px',
                  minHeight: 4,
                }} />
                <div style={{ fontSize:'0.75rem', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                  {['Nov','Dec','Jan','Feb','Mar','Apr'][i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>);

}

function SchedulePreviewCard({ nav, data }) {
  return (
    <div style={{ padding: '20px 18px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div className="eyebrow">Today's power schedule</div>
        <span className="linkish" style={{ fontSize:'0.875rem' }} onClick={() => nav('schedule')}>Full week</span>
      </div>
      <div className="card" style={{ padding: 14, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span className="pill pill-ok"><span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--primary)' }} /> Power on now</span>
          <span style={{ marginLeft: 'auto', fontSize:'0.875rem', color: 'var(--ink-3)' }} className="mono">Zone B · Siargao</span>
        </div>
        <div style={{ display: 'flex', height: 28, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)' }}>
          {data.todaySchedule.map((b, i) =>
          <div key={i} style={{
            flex: b.h, background: b.on ? 'var(--primary)' : 'var(--line)',
            borderRight: i < 5 ? '1px solid var(--bg)' : 'none'
          }} />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize:'0.75rem', color: 'var(--ink-3)', marginTop: 4 }} className="mono">
          <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
        </div>
        <div style={{ marginTop: 10, fontSize:'0.875rem', color: 'var(--ink-2)' }}>
          Next outage: <b style={{ color: 'var(--ink)' }}>10:00 PM – 6:00 AM</b>
        </div>
      </div>
    </div>);

}

// ─── Bill ──────────────────────────────────────────────
function BillScreen({ tenant, data, nav }) {
  const lines = data.bill.lines;
  const total = data.bill.amount;
  const yoy = data.yoyMonthly || [];
  const yoyMax = yoy.length ? Math.max(...yoy.flatMap(m => [m.current || 0, m.prev || 0])) : 1;
  return (
    <div className="eko-screen screen-enter">
      <ScreenHeader title="April bill" onBack={() => nav('home')} action={<I.Receipt size={20} />} />
      <div className="scroll" style={{ padding: '4px 18px 24px' }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="eyebrow">Total amount due</div>
          <div className="amount" style={{ fontSize:'2.875rem', lineHeight: 1, marginTop: 4 }}>₱{total.toFixed(2)}</div>
          <div style={{ marginTop: 8, color: 'var(--ink-2)', fontSize:'0.875rem' }}>
            Due <b>{data.bill.dueDate}</b> · Account <span className="mono">{tenant.code}-{data.account.no}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => nav('pay')}>
              Pay now
            </button>
            <button className="btn btn-ghost"><I.Send size={16} /> Share</button>
          </div>
        </div>

        {/* Year-over-year consumption comparison */}
        {yoy.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div className="eyebrow">Consumption · 2025 vs 2026</div>
            <div className="card" style={{ padding: 14, marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {yoy.map((m, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 56, width: '100%', justifyContent: 'center' }}>
                      <div style={{ flex: 1, height: Math.round((m.prev / yoyMax) * 52), background: 'var(--primary-soft)', borderRadius: '2px 2px 0 0', minHeight: 3 }} />
                      <div style={{ flex: 1, height: m.current ? Math.round((m.current / yoyMax) * 52) : 3, background: m.current ? 'var(--primary)' : 'var(--line)', borderRadius: '2px 2px 0 0', minHeight: 3 }} />
                    </div>
                    <div style={{ fontSize:'0.75rem', fontWeight: 700, color: 'var(--primary)', marginTop: 6 }}>{m.month}</div>
                    <div style={{ fontSize:'0.75rem', color: 'var(--ink-3)', fontFamily: "'IBM Plex Mono', monospace", marginTop: 2 }}>{m.current || '–'}/{m.prev}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, fontSize:'0.75rem', color: 'var(--ink-3)', marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--line)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 9, height: 9, background: 'var(--primary-soft)', borderRadius: 2, display:'inline-block' }} /> 2025</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 9, height: 9, background: 'var(--primary)', borderRadius: 2, display:'inline-block' }} /> 2026</span>
                <span style={{ marginLeft: 'auto', color: 'var(--primary)', fontWeight: 600 }}>↓ 12% vs last year</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">Consumption</div>
          <div className="card" style={{ padding: 14, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div className="amount" style={{ fontSize:'1.625rem' }}>{data.bill.kwh} <span style={{ fontSize:'1rem', color: 'var(--ink-3)' }}>kWh</span></div>
                <div style={{ fontSize:'0.875rem', color: 'var(--ink-3)', marginTop: 2 }}>{data.bill.period}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize:'0.875rem', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Meter <span className="mono">MR-88234</span></div>
                <div style={{ fontSize:'0.875rem', color: 'var(--primary)', fontWeight: 600, marginTop: 6, whiteSpace: 'nowrap' }}>↓ 9% vs March</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">ERC charge breakdown</div>
          <div className="card" style={{ padding: '4px 14px', marginTop: 8 }}>
            {lines.map((l, i) =>
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0',
              borderBottom: i < lines.length - 1 ? '1px solid var(--line)' : 'none'
            }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize:'0.875rem', color: 'var(--ink)' }}>{l.label}</div>
                  {l.rate && <div style={{ fontSize:'0.75rem', color: 'var(--ink-3)' }} className="mono">{l.rate}</div>}
                </div>
                <div className="mono" style={{
                fontSize:'0.875rem', fontWeight: 600,
                color: l.amt < 0 ? 'var(--primary)' : 'var(--ink)'
              }}>
                  {l.amt < 0 ? '−' : ''}₱{Math.abs(l.amt).toFixed(2)}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0',
              borderTop: '1.5px solid var(--ink)', marginTop: 2 }}>
              <div style={{ fontWeight: 700 }}>Total</div>
              <div className="mono" style={{ fontWeight: 700 }}>₱{total.toFixed(2)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 12, color: 'var(--ink-3)', fontSize:'0.875rem' }}>
            <I.Info size={14} />
            <span>Per ERC Resolution No. 16. Tap any line for plain-language explanation.</span>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">Last 3 months</div>
          <div className="card" style={{ marginTop: 8 }}>
            {data.bill.history.map((h, i) =>
            <div className="row" key={i}>
                <div>
                  <div style={{ fontSize:'0.875rem', fontWeight: 500 }}>{h.month}</div>
                  <div style={{ fontSize:'0.875rem', color: 'var(--ink-3)' }}>{h.kwh} kWh · paid {h.paidOn}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="mono" style={{ fontSize:'0.875rem' }}>₱{h.amt.toFixed(2)}</span>
                  <span className="pill pill-ok"><I.Check size={12} /> Paid</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PDF actions */}
        <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
          <button onClick={() => window.generateBillPDF && window.generateBillPDF()} style={{
            flex: 2, minHeight: 48, padding: '12px 14px',
            background: 'var(--primary)', color: '#fff', border: 'none',
            borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize:'1rem',
          }}>
            <span style={{ fontSize:'1.125rem' }}>📄</span>
            <span style={{ flex: 1, textAlign: 'left', lineHeight: 1.15 }}>Download Bill PDF<br/><span style={{ fontSize:'0.75rem', fontWeight: 400, opacity: 0.75 }}>Full statement of account</span></span>
          </button>
          <button onClick={() => nav('bill-pdf')} style={{
            flex: 1, minHeight: 48, padding: '12px 10px',
            background: 'var(--bg-elev)', color: 'var(--ink)', border: '1.5px solid var(--line)',
            borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
            fontWeight: 600, fontSize:'0.875rem',
          }}>
            Preview
          </button>
        </div>
      </div>
    </div>);

}

function ScreenHeader({ title, onBack, action }) {
  return (
    <div style={{
      padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8,
      borderBottom: '1px solid var(--line-2)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 10
    }}>
      <button onClick={onBack} style={{ appearance: 'none', border: 0, background: 'transparent', padding: 8, color: 'var(--ink)' }}>
        <I.ChevronL size={22} />
      </button>
      <div style={{ flex: 1, fontSize:'1rem', fontWeight: 600 }}>{title}</div>
      {action && <div style={{ padding: 8, color: 'var(--ink-2)' }}>{action}</div>}
    </div>);

}

window.SplashScreen = SplashScreen;
window.OnboardScreen = OnboardScreen;
window.HomeScreen = HomeScreen;
window.BillScreen = BillScreen;
window.ScreenHeader = ScreenHeader;