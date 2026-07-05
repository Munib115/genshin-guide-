document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const characterGrid = document.getElementById("character-grid");
  const searchInput = document.getElementById("search-input");
  const resultCount = document.getElementById("result-count");
  
  // Modals
  const modalBackdrop = document.getElementById("modal-backdrop");
  const closeButton = document.getElementById("modal-close-btn");
  
  // Ping Simulator
  const ispSelect = document.getElementById("isp-select");
  const pingBtn = document.getElementById("ping-btn");
  const pingResults = document.getElementById("ping-results");

  // State Variables
  let activeFilters = {
    game: "all",
    rarity: "all",
    element: "all",
    search: ""
  };

  // Get data from window namespace or API
  let db = [];

  // ==========================================
  // INITIAL RENDER & CORE LOGIC
  // ==========================================
  
  async function init() {
    setupFilters();
    setupSearch();
    setupModal();
    setupPingSimulator();
    await loadCharacters();
  }

  async function loadCharacters() {
    try {
      console.log("Attempting to fetch character data from PostgreSQL backend API...");
      const response = await fetch("http://localhost:5000/api/characters");
      if (!response.ok) {
        throw new Error(`Server returned HTTP status ${response.status}`);
      }
      db = await response.json();
      console.log("Successfully connected to PostgreSQL backend. Loaded character guides.");
    } catch (err) {
      console.warn("PostgreSQL backend offline or unreachable. Running static fallback dataset. Reason:", err.message);
      db = window.characterDatabase || [];
    }
    renderGrid(db);
  }

  // Render cards based on database items
  function renderGrid(items) {
    characterGrid.innerHTML = "";
    resultCount.textContent = `Showing ${items.length} characters`;

    if (items.length === 0) {
      characterGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; border: 1px solid var(--hairline); border-radius: var(--rounded-sm); color: var(--mute);">
          <p class="heading-sm">No characters found matching your filters.</p>
          <p class="body-sm" style="margin-top: 8px;">Try clearing search term or selecting another element.</p>
        </div>
      `;
      return;
    }

    items.forEach(char => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `View guide for ${char.name}`);
      
      // Map element class name safely
      const elementClass = `element-${char.element.toLowerCase()}`;
      const rarityClass = `rarity-${char.rarity}`;

      card.innerHTML = `
        <div class="corner-square"></div>
        <div class="card-header-meta">
          <span class="game-label">${char.game}</span>
          <span class="badge-tag ${rarityClass}">${char.rarity}-Star</span>
        </div>
        <div class="card-image-wrapper">
          <img src="${char.icon}" alt="${char.name} Official Icon" class="card-image" loading="lazy">
        </div>
        <div class="card-title-group">
          <div class="card-subtitle">
            <span class="element-dot ${elementClass}"></span>
            <span class="body-sm">${char.element} • ${char.weapon}</span>
          </div>
          <h3 class="card-title">${char.name}</h3>
        </div>
        <p class="card-description">${char.description}</p>
        <div class="card-footer">
          <span class="btn-ghost-link">View Guide <span>→</span></span>
        </div>
      `;

      // Event listener for opening detail modal
      const triggerDetails = () => openDetailedGuide(char);
      card.addEventListener("click", triggerDetails);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerDetails();
        }
      });

      characterGrid.appendChild(card);
    });
  }

  // ==========================================
  // SEARCH & FILTER FUNCTIONALITY
  // ==========================================

  function setupFilters() {
    // Game filters (All, Genshin, WuWa)
    const gameTabs = document.querySelectorAll("[data-filter='game']");
    gameTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        gameTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeFilters.game = tab.getAttribute("data-value");
        applyFilters();
      });
    });

    // Rarity filters
    const rarityTabs = document.querySelectorAll("[data-filter='rarity']");
    rarityTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        rarityTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeFilters.rarity = tab.getAttribute("data-value");
        applyFilters();
      });
    });

    // Element dropdown filter (mobile-friendly and clean)
    const elementTabs = document.querySelectorAll("[data-filter='element']");
    elementTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        elementTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeFilters.element = tab.getAttribute("data-value");
        applyFilters();
      });
    });
  }

  function setupSearch() {
    searchInput.addEventListener("input", (e) => {
      activeFilters.search = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  function applyFilters() {
    let filtered = db.filter(char => {
      // Game Filter
      if (activeFilters.game !== "all") {
        const targetGame = activeFilters.game === "genshin" ? "Genshin Impact" : "Wuthering Waves";
        if (char.game !== targetGame) return false;
      }

      // Rarity Filter
      if (activeFilters.rarity !== "all") {
        const targetRarity = parseInt(activeFilters.rarity);
        if (char.rarity !== targetRarity) return false;
      }

      // Element Filter
      if (activeFilters.element !== "all") {
        if (char.element.toLowerCase() !== activeFilters.element) return false;
      }

      // Search Query
      if (activeFilters.search !== "") {
        const matchesName = char.name.toLowerCase().includes(activeFilters.search);
        const matchesRole = char.role.toLowerCase().includes(activeFilters.search);
        const matchesWeapon = char.weapon.toLowerCase().includes(activeFilters.search);
        const matchesElement = char.element.toLowerCase().includes(activeFilters.search);
        if (!matchesName && !matchesRole && !matchesWeapon && !matchesElement) return false;
      }

      return true;
    });

    renderGrid(filtered);
  }

  // ==========================================
  // MODAL DRAWER FUNCTIONS
  // ==========================================

  function setupModal() {
    // Close on clicking backdrop overlay
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    // Close button trigger
    closeButton.addEventListener("click", closeModal);

    // Escape key listener for accessibility
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
        closeModal();
      }
    });
  }

  function openDetailedGuide(char) {
    const modalTitle = document.getElementById("modal-char-name");
    const modalContent = document.getElementById("modal-dynamic-body");

    modalTitle.textContent = `${char.name} Guide`;

    const elementClass = `element-${char.element.toLowerCase()}`;
    const rarityClass = `rarity-${char.rarity}`;

    // Render team badges
    let teamHtml = "";
    char.teamComps.forEach(team => {
      let membersHtml = "";
      team.members.forEach(member => {
        membersHtml += `<span class="team-member-badge">${member}</span>`;
      });

      teamHtml += `
        <div class="team-row">
          <h4 class="team-name">${team.name}</h4>
          <div class="team-members">
            ${membersHtml}
          </div>
        </div>
      `;
    });

    // Fill Dynamic content block
    modalContent.innerHTML = `
      <!-- Intro Section -->
      <section class="detail-intro-section">
        <div class="detail-img-box">
          <img src="${char.icon}" alt="${char.name} Profile Art" class="detail-img">
        </div>
        <div class="detail-headline">
          <div class="detail-game">${char.game}</div>
          <div class="detail-title-row">
            <h2 class="display-lg" style="margin-bottom: 0;">${char.name}</h2>
          </div>
          <p class="body-strong" style="color: var(--primary-dark); margin-top: 4px;">${char.role}</p>
          <div class="detail-tags">
            <span class="badge-tag ${rarityClass}">${char.rarity}-Star</span>
            <span class="badge-tag" style="background-color: var(--surface-dark); color: var(--on-dark);">
              <span class="element-dot ${elementClass}" style="display:inline-block; margin-right:6px;"></span>${char.element}
            </span>
            <span class="badge-tag">${char.weapon}</span>
          </div>
        </div>
      </section>

      <!-- Description Block -->
      <section class="guide-panel">
        <h3 class="heading-sm panel-title">Resonator Character Profile</h3>
        <p class="body-md">${char.description}</p>
      </section>

      <!-- Weapons Panel -->
      <section class="guide-panel">
        <h3 class="heading-sm panel-title">Weapon Recommendations</h3>
        
        <div class="build-item">
          <div class="build-item-header">
            <span class="build-item-name">${char.bestWeapon.name}</span>
            <span class="build-item-label" style="color: #d28c00;">Best in Slot (5★)</span>
          </div>
          <p class="build-item-desc">${char.bestWeapon.details}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid var(--surface-soft); margin: 16px 0;">
        
        <div class="build-item">
          <div class="build-item-header">
            <span class="build-item-name" style="color: var(--primary-dark);">${char.f2pWeapon.name}</span>
            <span class="build-item-label" style="color: var(--primary);">F2P Choice (4★)</span>
          </div>
          <p class="build-item-desc">${char.f2pWeapon.details}</p>
        </div>
      </section>

      <!-- Artifacts / Echoes Panel -->
      <section class="guide-panel">
        <h3 class="heading-sm panel-title">${char.game === 'Genshin Impact' ? 'Artifact Recommendations' : 'Echo Set Recommendations'}</h3>
        
        <div class="build-item">
          <div class="build-item-header">
            <span class="build-item-name" style="color: var(--ink);">${char.bestEchoes ? char.bestEchoes.set : char.bestArtifacts.set}</span>
            <span class="build-item-label" style="color: var(--mute);">Recommended Set</span>
          </div>
          <div class="build-item-desc" style="margin-top: 8px;">
            <p><strong>Primary Stats:</strong> ${char.bestEchoes ? char.bestEchoes.mainStats : char.bestArtifacts.mainStats}</p>
            <p style="margin-top: 4px;"><strong>Substats Priority:</strong> ${char.bestEchoes ? char.bestEchoes.subStats : char.bestArtifacts.subStats}</p>
          </div>
        </div>
      </section>

      <!-- Team Compositions Panel -->
      <section class="guide-panel">
        <h3 class="heading-sm panel-title">Recommended Team Compositions</h3>
        <div class="teams-list">
          ${teamHtml}
        </div>
      </section>

      <!-- Pakistani Niche Specific Optimization Alert -->
      <section class="pakistan-alert-box">
        <h3 class="pakistan-alert-title">
          <span style="font-size:18px;">🇵🇰</span> Pakistan Server & Optimization Guide
        </h3>
        <p class="pakistan-alert-content">${char.pakistaniTips}</p>
      </section>
    `;

    // Display modal backdrop and slide in drawer
    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable background scrolling
  }

  function closeModal() {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable background scrolling
  }

  // ==========================================
  // PAKISTANI ISP LATENCY SIMULATOR
  // ==========================================

  function setupPingSimulator() {
    // Database of ISP routing latency ranges
    const pingData = {
      stormfiber: {
        name: "StormFiber (GPON Fiber)",
        asia: { min: 110, max: 140, quality: "excellent", comment: "Direct routing to Singapore servers. Highly recommended for quick-swap team rotations." },
        europe: { min: 130, max: 170, quality: "average", comment: "Decent routing to Europe. Stable but higher baseline delay." }
      },
      ptcl: {
        name: "PTCL (ADSL / VDSL / GPON)",
        asia: { min: 175, max: 240, quality: "average", comment: "Adequate latency, but prone to packet loss during peak times. Shields are highly recommended." },
        europe: { min: 140, max: 195, quality: "average", comment: "Stable routing to Europe. Safer for non-timed overworld runs." }
      },
      nayatel: {
        name: "Nayatel (Fiber Home)",
        asia: { min: 120, max: 155, quality: "excellent", comment: "Solid routing to Southeast Asia servers. Minimal jitter detected." },
        europe: { min: 130, max: 165, quality: "excellent", comment: "Low latency routing profiles. Recommended for timing parries." }
      },
      transworld: {
        name: "Transworld Home (Premium Fiber)",
        asia: { min: 90, max: 125, quality: "excellent", comment: "Lowest latency options to Singapore servers. Best competitive gacha connection." },
        europe: { min: 150, max: 185, quality: "average", comment: "Slightly indirect routing to European servers, resulting in mild delay." }
      }
    };

    pingBtn.addEventListener("click", () => {
      const selectedIsp = ispSelect.value;
      const data = pingData[selectedIsp];

      if (!data) return;

      // Disable button during test
      pingBtn.disabled = true;
      pingResults.innerHTML = `
        <div style="text-align: center; color: var(--mute); padding: var(--spacing-md) 0;">
          <p class="body-sm loading-dots">Routing traceroute packets from Pakistan to Game Servers</p>
        </div>
      `;

      // Simulate a ping response delays
      setTimeout(() => {
        // Generate random latency within the ISP's range
        const generatePing = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const asiaPing = generatePing(data.asia.min, data.asia.max);
        const europePing = generatePing(data.europe.min, data.europe.max);

        // Determine status classes
        const getStatusClass = (ping) => {
          if (ping < 130) return { dot: "bg-excellent", text: "ping-excellent", label: "Excellent (F2P Safe)" };
          if (ping < 185) return { dot: "bg-average", text: "ping-average", label: "Average (Playable)" };
          return { dot: "bg-poor", text: "ping-poor", label: "Poor (Lag Prone)" };
        };

        const asiaStatus = getStatusClass(asiaPing);
        const europeStatus = getStatusClass(europePing);

        pingResults.innerHTML = `
          <!-- Asia Server Result -->
          <div class="ping-result-row">
            <div>
              <span class="ping-server-name">Asia Server (Recommended)</span>
              <p class="caption-sm" style="color: var(--mute); margin-top: 2px;">${data.asia.comment}</p>
            </div>
            <div style="text-align: right;">
              <span class="ping-value-indicator ${asiaStatus.text}">${asiaPing} ms</span>
              <p class="caption-sm" style="color: var(--mute); margin-top: 2px;">
                <span class="ping-indicator-dot ${asiaStatus.dot}"></span>${asiaStatus.label}
              </p>
            </div>
          </div>

          <!-- Europe Server Result -->
          <div class="ping-result-row" style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--hairline);">
            <div>
              <span class="ping-server-name">Europe Server</span>
              <p class="caption-sm" style="color: var(--mute); margin-top: 2px;">${data.europe.comment}</p>
            </div>
            <div style="text-align: right;">
              <span class="ping-value-indicator ${europeStatus.text}">${europePing} ms</span>
              <p class="caption-sm" style="color: var(--mute); margin-top: 2px;">
                <span class="ping-indicator-dot ${europeStatus.dot}"></span>${europeStatus.label}
              </p>
            </div>
          </div>
        `;

        // Re-enable button
        pingBtn.disabled = false;
      }, 1500);
    });
  }

  // Initialize application
  init();
});
