"use client";

import React, { useState } from "react";

const deviceData = {
  ios: {
    label: "iPhone / iOS Devices",
    models: {
      iphone_legacy: {
        name: "iPhone 11 & Older (A13 Bionic and older)",
        specs: "4GB RAM or less, older cooling architecture",
        genshin: {
          fps: "30 FPS (Locked)",
          resolution: "Low (0.8x)",
          shadows: "Low",
          effects: "Low",
          sfx: "Low",
          blur: "Off",
          bloom: "Off",
          upscaling: "Off",
          stability: "B- (occasional stutters)",
          thermal: "High Risk (recommend phone cooler)",
          tips: "A13 chipsets heat up quickly. Lock to 30 FPS to avoid severe thermal throttling. Play without a thick case to improve passive dissipation. During hot summer days in Pakistan (ambient temp > 35°C), play under a fan or AC."
        },
        wuwa: {
          fps: "30 FPS (Locked)",
          resolution: "Low (0.8x)",
          shadows: "Off",
          effects: "Low",
          sfx: "Low",
          blur: "Off",
          bloom: "Off",
          upscaling: "Off",
          stability: "C (sluggish in boss combat)",
          thermal: "High Risk (expect rapid battery drain)",
          tips: "Wuthering Waves is highly CPU-bound. Lock game details to minimum and disable shadows completely. Keep background apps closed."
        }
      },
      iphone_mid: {
        name: "iPhone 12 / 13 / 14 Standard (A14 / A15 Bionic)",
        specs: "4GB - 6GB RAM, modern performance cores",
        genshin: {
          fps: "45 FPS (Optimal) or 60 FPS (Short sessions)",
          resolution: "Medium (1.0x)",
          shadows: "Low / Medium",
          effects: "Medium",
          sfx: "Medium",
          blur: "Off",
          bloom: "On",
          upscaling: "FSR (On)",
          stability: "A- (smooth with minor drops)",
          thermal: "Medium Risk (heats up after 30 mins)",
          tips: "Excellent baseline performance. Running 45 FPS provides a much smoother experience than 30 FPS without causing the rapid overheating that 60 FPS triggers on standard chassis."
        },
        wuwa: {
          fps: "45 FPS (Optimal)",
          resolution: "Medium (1.0x)",
          shadows: "Low",
          effects: "Low",
          sfx: "Medium",
          blur: "Off",
          bloom: "Off",
          upscaling: "FSR (On)",
          stability: "B (stable in overworld, drops in domains)",
          thermal: "Medium-High Risk (recommend brightness < 60%)",
          tips: "Turn off bloom and motion blur to stabilize the camera during combat. Low shadows reduce GPU load, preventing the phone from dimming the screen due to heat."
        }
      },
      iphone_high: {
        name: "iPhone 15 Pro / 16 & Pro Max (A17 Pro / A18 / Pro)",
        specs: "8GB RAM, hardware-accelerated Ray Tracing",
        genshin: {
          fps: "60 FPS",
          resolution: "High (1.2x)",
          shadows: "Medium / High",
          effects: "High",
          sfx: "High",
          blur: "Off",
          bloom: "On",
          upscaling: "MetalFX (On)",
          stability: "A+ (extremely fluid)",
          thermal: "Low-Medium Risk (very stable)",
          tips: "Take full advantage of MetalFX Spatial Upscaling. If you suffer from battery heating on mobile networks, toggle MetalFX to 'Quality' and set shadows to Medium."
        },
        wuwa: {
          fps: "60 FPS",
          resolution: "High (1.0x)",
          shadows: "Medium",
          effects: "Medium",
          sfx: "High",
          blur: "Off",
          bloom: "On",
          upscaling: "FSR (On)",
          stability: "A (fluid with rare stutters)",
          thermal: "Medium Risk (warm near camera module)",
          tips: "Capable of handling 60 FPS comfortably. If playing outdoors on local 4G/5G mobile data (Jazz/Zong) in summer heat, reduce FPS to 45 to protect battery health."
        }
      }
    }
  },
  android: {
    label: "Android Devices (SoC Chipsets)",
    models: {
      android_budget: {
        name: "Budget Chipsets (Snapdragon 680 / Helio G85 & below)",
        specs: "4GB - 6GB RAM, budget GPU layout",
        genshin: {
          fps: "30 FPS (Strict Lock)",
          resolution: "Lowest (0.6x)",
          shadows: "Off",
          effects: "Lowest",
          sfx: "Low",
          blur: "Off",
          bloom: "Off",
          upscaling: "Off",
          stability: "D (stuttering in elemental bursts)",
          thermal: "High Risk (warning: thermal throttling)",
          tips: "This tier struggles heavily. Set resolution to the absolute minimum. Close all background apps (Social media, WhatsApp) before launching. Use game boosters if pre-installed. Do not play while charging."
        },
        wuwa: {
          fps: "30 FPS (Strict Lock)",
          resolution: "Lowest (0.6x)",
          shadows: "Off",
          effects: "Lowest",
          sfx: "Low",
          blur: "Off",
          bloom: "Off",
          upscaling: "Off",
          stability: "F (severe lags in combat)",
          thermal: "Extreme Risk (heavy lag and heat)",
          tips: "Very demanding for this tier. Set all graphic options to Lowest, turn off music if CPU lags. Run on Asia server to minimize latency overhead. Parrying will be difficult due to visual latency."
        }
      },
      android_mid: {
        name: "Mid-range Chipsets (Snapdragon 778G / Dimensity 1080)",
        specs: "6GB - 8GB RAM, stable performance clusters",
        genshin: {
          fps: "45 FPS",
          resolution: "Low / Medium (0.8x)",
          shadows: "Low",
          effects: "Medium",
          sfx: "Medium",
          blur: "Off",
          bloom: "Off",
          upscaling: "FSR (On)",
          stability: "B (playable and stable)",
          thermal: "Medium Risk (heats up on mobile data)",
          tips: "Highly optimized configuration. 45 FPS provides a good compromise. Use Wi-Fi instead of mobile data to reduce temperature by 2-3°C. Perfect for daily commissions."
        },
        wuwa: {
          fps: "30 FPS (Stable) or 45 FPS (Varying)",
          resolution: "Low (0.8x)",
          shadows: "Off",
          effects: "Low",
          sfx: "Medium",
          blur: "Off",
          bloom: "Off",
          upscaling: "FSR (On)",
          stability: "C+ (occasional frame drops)",
          thermal: "Medium-High Risk (recommend cool environment)",
          tips: "Keep shadows disabled to save GPU cycles. Limit crowd density to Low to ease the CPU workload when moving around Jinzhou city."
        }
      },
      android_upper: {
        name: "Upper Mid-range (Snapdragon 870 / Dimensity 8100)",
        specs: "8GB - 12GB RAM, flagship grade cores",
        genshin: {
          fps: "60 FPS (Stable) or 45 FPS (Overheat prevention)",
          resolution: "Medium (1.0x)",
          shadows: "Medium",
          effects: "Medium",
          sfx: "High",
          blur: "Off",
          bloom: "On",
          upscaling: "FSR (On)",
          stability: "A (very smooth)",
          thermal: "Medium Risk (stable under normal use)",
          tips: "Can handle 60 FPS. If you play in a room without AC during Pakistani summers, lock to 45 FPS to prevent screen dimming and keep touch responsiveness at maximum."
        },
        wuwa: {
          fps: "45 FPS (Optimal) or 60 FPS (Warm)",
          resolution: "Medium (0.8x)",
          shadows: "Low",
          effects: "Medium",
          sfx: "Medium",
          blur: "Off",
          bloom: "Off",
          upscaling: "FSR (On)",
          stability: "B+ (smooth with occasional drops)",
          thermal: "Medium-High Risk (warm body)",
          tips: "To maintain 60 FPS, set resolution scale to 0.8x. Use a standard desk fan blowing towards your hands if playing during long power outages."
        }
      },
      android_flagship: {
        name: "Flagship SoCs (Snapdragon 8 Gen 1+ / Dimensity 9200+)",
        specs: "12GB - 16GB RAM, advanced cooling pipelines",
        genshin: {
          fps: "60 FPS",
          resolution: "High (1.2x)",
          shadows: "High",
          effects: "High",
          sfx: "High",
          blur: "Off",
          bloom: "On",
          upscaling: "FSR (On)",
          stability: "A+ (flawless 60 FPS)",
          thermal: "Low-Medium Risk (efficient cooling)",
          tips: "Maximum graphics settings are supported. Disable Motion Blur to keep text and character movement clean. Runs smoothly even on mid-tier mobile networks."
        },
        wuwa: {
          fps: "60 FPS",
          resolution: "High (1.0x)",
          shadows: "Medium / High",
          effects: "Medium",
          sfx: "High",
          blur: "Off",
          bloom: "On",
          upscaling: "FSR (On)",
          stability: "A (smooth experience)",
          thermal: "Medium Risk (slight warm spots)",
          tips: "Excellent performance. If you experience micro-stutters, set Shadows to Medium and restart the game to flush the shader cache. Mobile network latency won't affect FPS."
        }
      }
    }
  },
  pc: {
    label: "PC Builds (Desktop / Laptop)",
    models: {
      pc_low: {
        name: "Low-spec PC (Integrated Intel HD / Ryzen APU)",
        specs: "8GB RAM Dual-Channel, shared system memory",
        genshin: {
          fps: "30 FPS or 45 FPS",
          resolution: "720p (Render Scale 0.8x)",
          shadows: "Low",
          effects: "Low",
          sfx: "Low",
          blur: "Off",
          bloom: "Off",
          upscaling: "FSR (On)",
          stability: "B- (playable for casual tasks)",
          thermal: "Low-Medium Risk (monitor laptop temps)",
          tips: "Ensure RAM is in dual-channel mode (crucial for integrated graphics). Set Windows Power Plan to 'High Performance'. Lock to 30/45 FPS to reduce input lag."
        },
        wuwa: {
          fps: "30 FPS (Locked)",
          resolution: "720p (Render Scale 0.8x)",
          shadows: "Off",
          effects: "Low",
          sfx: "Low",
          blur: "Off",
          bloom: "Off",
          upscaling: "FSR (On)",
          stability: "D (stuttering in crowded areas)",
          thermal: "Medium Risk (high CPU utilization)",
          tips: "Highly demanding. Force DirectX 11/12 compatibility. Close web browsers (Chrome/Edge) to free up RAM before launching the game client."
        }
      },
      pc_mid: {
        name: "Mid-spec PC (GTX 1050 Ti / GTX 1650 / RX 570)",
        specs: "16GB RAM, 4GB VRAM dedicated GPU",
        genshin: {
          fps: "60 FPS",
          resolution: "1080p (Render Scale 1.0x)",
          shadows: "Medium",
          effects: "Medium",
          sfx: "High",
          blur: "Off",
          bloom: "On",
          upscaling: "FSR (Off/Native)",
          stability: "A (stable 60 FPS)",
          thermal: "Low Risk",
          tips: "Perfect 1080p setup. Set render scale to 1.0x. You can safely enable Bloom and set Character Details to High while keeping Shadows at Medium."
        },
        wuwa: {
          fps: "60 FPS (V-Sync On)",
          resolution: "1080p (Render Scale 1.0x)",
          shadows: "Low / Medium",
          effects: "Medium",
          sfx: "Medium",
          blur: "Off",
          bloom: "Off",
          upscaling: "FSR (On)",
          stability: "B (stable in dungeons, minor drops in cities)",
          thermal: "Low Risk",
          tips: "Use FSR to maintain a locked 60 FPS. Keep Motion Blur OFF to maintain visual clarity during fast-paced dodging and parrying sequences."
        }
      },
      pc_high: {
        name: "Recommended PC (RTX 3060 / RX 6600 & higher)",
        specs: "16GB+ RAM, 6GB+ VRAM modern GPU",
        genshin: {
          fps: "60 FPS",
          resolution: "1080p / 1440p (Render Scale 1.5x)",
          shadows: "High",
          effects: "High",
          sfx: "High",
          blur: "Off/On",
          bloom: "On",
          upscaling: "Native / SMAA",
          stability: "A+ (locked 60 FPS)",
          thermal: "Low Risk",
          tips: "Feel free to max out all settings. If playing on 1440p or 4K, set Render Scale to 1.0x to save power and keep temperatures low."
        },
        wuwa: {
          fps: "60 FPS (or 120 FPS if monitor supports)",
          resolution: "1080p / 1440p",
          shadows: "High",
          effects: "High",
          sfx: "High",
          blur: "Off",
          bloom: "On",
          upscaling: "DLSS / FSR (On)",
          stability: "A (extremely smooth)",
          thermal: "Low Risk",
          tips: "If you have an NVIDIA RTX card, enable DLSS Quality or DLAA. Use reflex settings if available to minimize input latency caused by server lag."
        }
      }
    }
  }
};

export default function DeviceOptimizer() {
  const [category, setCategory] = useState("ios");
  const [model, setModel] = useState("iphone_mid");
  const [game, setGame] = useState("genshin");

  const currentCategoryData = deviceData[category];
  const currentModelData = currentCategoryData.models[model] || Object.values(currentCategoryData.models)[0];
  const config = game === "genshin" ? currentModelData.genshin : currentModelData.wuwa;

  const performanceClass = config.stability.startsWith("A") 
    ? "bg-excellent" 
    : config.stability.startsWith("B") 
    ? "bg-good" 
    : "bg-poor";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", margin: "24px 0" }} className="optimizer-layout">
      {/* 1. Selector Panel */}
      <div className="guide-panel" style={{ borderColor: "var(--primary)" }}>
        <h3 className="panel-title heading-md" style={{ borderBottom: "2px solid var(--primary)", paddingBottom: "8px" }}>
          ⚙️ HARDWARE OPTIMIZER SELECTION
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
          <div>
            <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Select Hardware Platform</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {Object.entries(deviceData).map(([key, data]) => (
                <button
                  key={key}
                  className={`pill-tab ${category === key ? "active" : ""}`}
                  onClick={() => {
                    setCategory(key);
                    setModel(Object.keys(data.models)[0]);
                  }}
                  style={{ fontSize: "13.5px" }}
                >
                  {key === "ios" ? "🍎 " : key === "android" ? "🤖 " : "💻 "} {data.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="select-row-grid">
            <div>
              <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Select Device Model / Chipset</label>
              <select 
                className="search-input" 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                style={{ paddingLeft: "12px", background: "white", cursor: "pointer" }}
              >
                {Object.entries(currentCategoryData.models).map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Select Target Game</label>
              <select 
                className="search-input" 
                value={game} 
                onChange={(e) => setGame(e.target.value)}
                style={{ paddingLeft: "12px", background: "white", cursor: "pointer" }}
              >
                <option value="genshin">Genshin Impact</option>
                <option value="wuwa">Wuthering Waves</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: "13px", color: "var(--mute)", borderTop: "1px solid var(--hairline)", paddingTop: "12px" }}>
            <strong>Estimated Specs Covered:</strong> {currentModelData.specs}
          </div>
        </div>
      </div>

      {/* 2. Results Dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="optimizer-results-layout">
        {/* Recommended Graphics Configurations */}
        <div className="guide-panel">
          <h3 className="panel-title heading-sm" style={{ textTransform: "uppercase" }}>
            📋 RECOMMENDED GRAPHICS SHEET ({game === "genshin" ? "Genshin" : "WuWa"})
          </h3>
          
          <table className="tech-table" style={{ marginTop: "12px" }}>
            <thead>
              <tr>
                <th>Setting Parameter</th>
                <th>Target Value</th>
                <th>Performance Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Frame Rate Limit</strong></td>
                <td style={{ color: "var(--primary-dark)", fontWeight: "bold" }}>{config.fps}</td>
                <td>Critical for CPU thermal stabilization</td>
              </tr>
              <tr>
                <td><strong>Render Resolution</strong></td>
                <td>{config.resolution}</td>
                <td>High GPU load factor (highly sensitive)</td>
              </tr>
              <tr>
                <td><strong>Shadow Quality</strong></td>
                <td>{config.shadows}</td>
                <td>High VRAM consumption parameter</td>
              </tr>
              <tr>
                <td><strong>Elemental SFX / Particles</strong></td>
                <td>{config.effects}</td>
                <td>Affects lag during burst animations</td>
              </tr>
              <tr>
                <td><strong>Character Details</strong></td>
                <td>{config.sfx}</td>
                <td>LOD model scaling impact</td>
              </tr>
              <tr>
                <td><strong>Motion Blur</strong></td>
                <td>{config.blur}</td>
                <td>Camera movement GPU overhead</td>
              </tr>
              <tr>
                <td><strong>Bloom / HDR Glow</strong></td>
                <td>{config.bloom}</td>
                <td>Post-processing effect cost</td>
              </tr>
              <tr>
                <td><strong>Antialiasing / Upscaling</strong></td>
                <td>{config.upscaling}</td>
                <td>Reduces edge jaggedness dynamically</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Performance Profile Panels */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="select-row-grid">
          <div className="guide-panel" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span className="filter-label">FPS STABILITY CLASS</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className={`ping-status-light ${performanceClass}`} style={{ width: "16px", height: "16px" }} />
              <span className="body-strong" style={{ fontSize: "20px", color: "var(--ink)" }}>{config.stability}</span>
            </div>
            <p className="caption-sm" style={{ color: "var(--mute)", marginTop: "4px" }}>
              Based on extended 60-minute play sessions in overworld and domains.
            </p>
          </div>

          <div className="guide-panel" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span className="filter-label">THERMAL STRESS RATING</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="body-strong" style={{ fontSize: "20px", color: "red" }}>{config.thermal}</span>
            </div>
            <p className="caption-sm" style={{ color: "var(--mute)", marginTop: "4px" }}>
              Estimates battery heat risk and potential CPU core throttling over time.
            </p>
          </div>
        </div>

        {/* Hardware Tips for Pakistan */}
        <div className="pakistan-alert-box" style={{ marginTop: "8px" }}>
          <h4 className="pakistan-alert-title">
            🇵🇰 LOCAL HARDWARE TEMPERATURE & CONGESTION GUIDE
          </h4>
          <p className="pakistan-alert-content" style={{ fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-line" }}>
            {config.tips}
          </p>
        </div>
      </div>
    </div>
  );
}
