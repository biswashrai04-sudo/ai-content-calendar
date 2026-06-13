import { useState } from "react";

const PLATFORMS = ["Instagram", "LinkedIn", "Twitter/X", "Facebook"];
const NICHES = [
  "AI & Automation",
  "Tech Reviews",
  "Freelancing",
  "Mobile Hair Styling",
  "Fitness",
  "Food & Lifestyle",
  "Real Estate",
  "E-commerce",
];
const TONES = ["Inspiring", "Educational", "Funny", "Professional", "Casual"];

export default function App() {
  const [step, setStep] = useState("form"); // form | loading | result
  const [form, setForm] = useState({
    niche: "",
    customNiche: "",
    platform: "Instagram",
    tone: "Inspiring",
    days: 7,
    brandName: "",
    targetAudience: "",
  });
  const [calendar, setCalendar] = useState(null);
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const loadingMessages = [
    "🔍 Researching your niche...",
    "✍️ Writing your content ideas...",
    "🎯 Crafting hooks & captions...",
    "📅 Building your calendar...",
  ];

  const handleGenerate = async () => {
    const niche = form.niche === "Other" ? form.customNiche : form.niche;
    if (!niche || !form.brandName || !form.targetAudience) {
      setError("Please fill in all fields before generating.");
      return;
    }
    setError("");
    setStep("loading");

    let msgIndex = 0;
    setLoadingMsg(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIndex]);
    }, 2200);

    try {
      const prompt = `You are a professional social media content strategist.

Generate a ${form.days}-day content calendar for:
- Brand: ${form.brandName}
- Niche: ${niche}
- Platform: ${form.platform}
- Tone: ${form.tone}
- Target Audience: ${form.targetAudience}

Return ONLY a valid JSON object (no markdown, no backticks) in this exact format:
{
  "brandName": "${form.brandName}",
  "platform": "${form.platform}",
  "niche": "${niche}",
  "days": [
    {
      "day": 1,
      "date_label": "Day 1",
      "content_type": "Reel / Carousel / Story / Post",
      "topic": "Short topic title",
      "hook": "Opening line that grabs attention",
      "caption": "Full caption with emojis (2-3 sentences)",
      "hashtags": "#tag1 #tag2 #tag3 #tag4 #tag5",
      "cta": "Call to action text"
    }
  ]
}

Generate exactly ${form.days} day objects. Make each day unique and varied in content type and topic.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((i) => i.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setCalendar(parsed);
      setStep("result");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStep("form");
    } finally {
      clearInterval(interval);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setCalendar(null);
    setStep("form");
    setError("");
  };

  return (
    <div className="app">
      {/* Header */}
      <header>
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">📅</span>
            <span className="logo-text">ContentAI</span>
          </div>
          <p className="tagline">30 days of content. 30 seconds to generate.</p>
        </div>
      </header>

      <main>
        {/* FORM STEP */}
        {step === "form" && (
          <div className="card form-card">
            <h2>Build Your Content Calendar</h2>
            <p className="subtitle">Fill in your brand details and let AI do the rest.</p>

            {error && <div className="error-box">⚠️ {error}</div>}

            <div className="form-grid">
              <div className="field">
                <label>Brand / Creator Name *</label>
                <input
                  type="text"
                  placeholder="e.g. vibetechbee, Hair by Pannu"
                  value={form.brandName}
                  onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Target Audience *</label>
                <input
                  type="text"
                  placeholder="e.g. Non-tech people curious about AI"
                  value={form.targetAudience}
                  onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Your Niche *</label>
                <select
                  value={form.niche}
                  onChange={(e) => setForm({ ...form, niche: e.target.value })}
                >
                  <option value="">Select a niche...</option>
                  {NICHES.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                  <option value="Other">Other (type below)</option>
                </select>
              </div>

              {form.niche === "Other" && (
                <div className="field">
                  <label>Custom Niche</label>
                  <input
                    type="text"
                    placeholder="e.g. Luxury Watches"
                    value={form.customNiche}
                    onChange={(e) => setForm({ ...form, customNiche: e.target.value })}
                  />
                </div>
              )}

              <div className="field">
                <label>Platform</label>
                <div className="pill-group">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      className={`pill ${form.platform === p ? "active" : ""}`}
                      onClick={() => setForm({ ...form, platform: p })}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Tone of Voice</label>
                <div className="pill-group">
                  {TONES.map((t) => (
                    <button
                      key={t}
                      className={`pill ${form.tone === t ? "active" : ""}`}
                      onClick={() => setForm({ ...form, tone: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Number of Days: <strong>{form.days}</strong></label>
                <input
                  type="range"
                  min={3}
                  max={30}
                  value={form.days}
                  onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>3</span><span>7</span><span>14</span><span>30</span>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={handleGenerate}>
              ✨ Generate My Content Calendar
            </button>
          </div>
        )}

        {/* LOADING STEP */}
        {step === "loading" && (
          <div className="loading-card">
            <div className="spinner-wrap">
              <div className="spinner" />
            </div>
            <p className="loading-msg">{loadingMsg}</p>
            <p className="loading-sub">Generating {form.days} days of content for {form.brandName}...</p>
          </div>
        )}

        {/* RESULT STEP */}
        {step === "result" && calendar && (
          <div className="result-section">
            <div className="result-header">
              <div>
                <h2>Your Content Calendar is Ready! 🎉</h2>
                <p className="result-meta">
                  {calendar.days?.length} days · {calendar.platform} · {calendar.niche}
                </p>
              </div>
              <div className="result-actions">
                <button className="btn-secondary" onClick={handleReset}>
                  ↩ Start Over
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    const text = calendar.days
                      .map(
                        (d) =>
                          `DAY ${d.day} - ${d.content_type}\nTopic: ${d.topic}\nHook: ${d.hook}\nCaption: ${d.caption}\nHashtags: ${d.hashtags}\nCTA: ${d.cta}\n`
                      )
                      .join("\n---\n\n");
                    navigator.clipboard.writeText(text);
                  }}
                >
                  📋 Copy All
                </button>
              </div>
            </div>

            <div className="days-grid">
              {calendar.days?.map((day, i) => (
                <div key={i} className="day-card">
                  <div className="day-header">
                    <span className="day-number">Day {day.day}</span>
                    <span className="content-type">{day.content_type}</span>
                  </div>

                  <h3 className="day-topic">{day.topic}</h3>

                  <div className="day-section">
                    <span className="section-label">🎣 Hook</span>
                    <p>{day.hook}</p>
                  </div>

                  <div className="day-section">
                    <span className="section-label">✍️ Caption</span>
                    <p>{day.caption}</p>
                  </div>

                  <div className="day-section hashtags">
                    <span className="section-label">🏷️ Hashtags</span>
                    <p>{day.hashtags}</p>
                  </div>

                  <div className="day-section cta-section">
                    <span className="section-label">👉 CTA</span>
                    <p>{day.cta}</p>
                  </div>

                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(
                        `${day.hook}\n\n${day.caption}\n\n${day.hashtags}\n\n${day.cta}`,
                        i
                      )
                    }
                  >
                    {copiedIndex === i ? "✅ Copied!" : "📋 Copy Caption"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Built with ❤️ by <strong>vibetechbee</strong> · Powered by Claude AI</p>
      </footer>
    </div>
  );
}
