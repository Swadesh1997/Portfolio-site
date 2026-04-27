/* App entry — wires sections, Tweaks panel, and persistent defaults */

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "cyan",
  "density": "comfortable",
  "order": ["about", "skills", "experience", "projects", "publications", "certifications", "contact"]
}/*EDITMODE-END*/;

const ACCENTS = {
  cyan:    { label: "Cyan",    h: 188, h2: 268 },
  blue:    { label: "Electric", h: 240, h2: 290 },
  violet:  { label: "Violet",  h: 280, h2: 200 },
  amber:   { label: "Amber",   h: 60,  h2: 20  },
  mint:    { label: "Mint",    h: 155, h2: 200 },
};

const SECTION_META = {
  about:          { id: "about",          label: "About"        },
  skills:         { id: "skills",         label: "Skills"       },
  experience:     { id: "experience",     label: "Experience"   },
  projects:       { id: "projects",       label: "Projects"     },
  publications:   { id: "publications",   label: "Publications" },
  certifications: { id: "certifications", label: "Certs"        },
  contact:        { id: "contact",        label: "Contact"      },
};

const COMPONENT_MAP = {
  about:          (d) => <About data={d} />,
  skills:         (d) => <Skills data={d} />,
  experience:     (d) => <Experience data={d} />,
  projects:       (d) => <Projects data={d} />,
  publications:   (d) => <Publications data={d} />,
  certifications: (d) => <Certifications data={d} />,
  contact:        (d) => <Contact data={d.profile} />,
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const data = window.PORTFOLIO_DATA;

  // Apply accent + density to root
  useEffect(() => {
    const root = document.documentElement;
    const a = ACCENTS[tweaks.accent] || ACCENTS.cyan;
    root.style.setProperty('--accent-h', a.h);
    root.style.setProperty('--accent-2-h', a.h2);
    root.dataset.density = tweaks.density;
  }, [tweaks.accent, tweaks.density]);

  // Build section list including hero
  const navSections = [
    { id: "hero", label: "Top" },
    ...tweaks.order.map((k) => SECTION_META[k]).filter(Boolean),
  ];

  // Reorder helpers
  const moveSection = (key, dir) => {
    const arr = [...tweaks.order];
    const i = arr.indexOf(key);
    if (i < 0) return;
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setTweak('order', arr);
  };

  const resetOrder = () => setTweak('order', ["about", "skills", "experience", "projects", "publications", "certifications", "contact"]);

  return (
    <>
      <Topbar data={data.profile} />
      <DotNav sections={navSections} />
      <main>
        <Hero data={data.profile} />
        {tweaks.order.map((key) => {
          const fn = COMPONENT_MAP[key];
          return fn ? <React.Fragment key={key}>{fn(data)}</React.Fragment> : null;
        })}
      </main>
      <Footer data={data.profile} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakRadio
            value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}
            options={Object.entries(ACCENTS).map(([k, v]) => ({ value: k, label: v.label }))}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {Object.entries(ACCENTS).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setTweak('accent', k)}
                title={v.label}
                style={{
                  width: 22, height: 22, border: tweaks.accent === k ? '2px solid #fff' : '1px solid #333',
                  background: `oklch(0.78 0.15 ${v.h})`,
                  borderRadius: '50%', cursor: 'pointer', padding: 0,
                }}
              />
            ))}
          </div>
        </TweakSection>

        <TweakSection title="Density">
          <TweakRadio
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'compact', label: 'Compact' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Section order">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>
            {tweaks.order.map((key, i) => (
              <div key={key} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px', background: 'rgba(255,255,255,0.04)',
                borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <span style={{ color: '#888', minWidth: 16 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ flex: 1, textTransform: 'capitalize' }}>{SECTION_META[key]?.label || key}</span>
                <button
                  onClick={() => moveSection(key, -1)}
                  disabled={i === 0}
                  style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                    color: i === 0 ? '#444' : '#ddd', width: 22, height: 22,
                    borderRadius: 3, cursor: i === 0 ? 'default' : 'pointer', padding: 0,
                  }}
                >↑</button>
                <button
                  onClick={() => moveSection(key, 1)}
                  disabled={i === tweaks.order.length - 1}
                  style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                    color: i === tweaks.order.length - 1 ? '#444' : '#ddd', width: 22, height: 22,
                    borderRadius: 3, cursor: i === tweaks.order.length - 1 ? 'default' : 'pointer', padding: 0,
                  }}
                >↓</button>
              </div>
            ))}
            <TweakButton onClick={resetOrder} style={{ marginTop: 8 }}>Reset order</TweakButton>
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
