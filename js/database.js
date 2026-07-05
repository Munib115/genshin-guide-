const characterDatabase = [
  // ==========================================
  // GENSHIN IMPACT CHARACTERS (10)
  // ==========================================
  {
    id: "furina",
    name: "Furina",
    game: "Genshin Impact",
    rarity: 5,
    element: "Hydro",
    weapon: "Sword",
    role: "Sub-DPS / Buffer",
    description: "The absolute focus of the stage of judgment, Furina buffing all party members' damage output when their HP increases or decreases.",
    icon: "https://genshin.jmp.blue/characters/furina/icon",
    splash: "https://genshin.jmp.blue/characters/furina/gacha-splash",
    bestWeapon: {
      name: "Splendor of Tranquil Waters",
      rarity: 5,
      details: "Signature weapon. Boosts Elemental Skill DMG when equipped character's HP changes, and raises Max HP when teammates' HP changes."
    },
    f2pWeapon: {
      name: "Fleuve Cendre Ferryman (F2P)",
      rarity: 4,
      details: "Obtained from Fontaine Fishing Association. Provides crucial Energy Recharge (ER) and boosts Elemental Skill Crit Rate. Perfect for F2P players."
    },
    bestArtifacts: {
      set: "Golden Troupe (4-Piece)",
      mainStats: "Sands: HP% or ER% | Goblet: HP% or Hydro DMG | Circlet: Crit Rate / Crit DMG",
      subStats: "Crit Rate > Crit DMG > HP% > Energy Recharge"
    },
    teamComps: [
      { name: "Neuvillette Hypercarry", members: ["Furina", "Neuvillette", "Kazuha", "Zhongli"] },
      { name: "F2P Taser", members: ["Furina", "Sucrose", "Fischl", "Beidou"] }
    ],
    pakistaniTips: "Crucial for team-wide buffs. On Pakistani ISP networks (e.g. StormFiber/PTCL), maintain an ER threshold of at least 180-200% in solo Hydro teams. Latency spikes might delay her skill casts, so casting her burst immediately is recommended. Runs smoothly on mid-tier mobile chipsets like Snapdragon 778G at 45 FPS."
  },
  {
    id: "raiden",
    name: "Raiden Shogun",
    game: "Genshin Impact",
    rarity: 5,
    element: "Electro",
    weapon: "Polearm",
    role: "Main DPS / Battery",
    description: "The Her Eternal Excellency, the Raiden Shogun, who unleashes devastating Electro damage and charges her team's energy reserves.",
    icon: "https://genshin.jmp.blue/characters/raiden/icon",
    splash: "https://genshin.jmp.blue/characters/raiden/gacha-splash",
    bestWeapon: {
      name: "Engulfing Lightning",
      rarity: 5,
      details: "Signature weapon. Converts Energy Recharge into ATK%, providing unmatched scaling with Emblem of Severed Fate."
    },
    f2pWeapon: {
      name: "\"The Catch\" (F2P)",
      rarity: 4,
      details: "Completely free weapon obtained via Inazuma Fishing Association. Increases Elemental Burst DMG and Burst Crit Rate. Outstanding F2P option."
    },
    bestArtifacts: {
      set: "Emblem of Severed Fate (4-Piece)",
      mainStats: "Sands: Energy Recharge | Goblet: ATK% or Electro DMG | Circlet: Crit Rate / DMG",
      subStats: "Energy Recharge > Crit Rate > Crit DMG > ATK%"
    },
    teamComps: [
      { name: "Raiden National (Rational)", members: ["Raiden Shogun", "Bennett", "Xiangling", "Xingqiu"] },
      { name: "Hyper Raiden", members: ["Raiden Shogun", "Kujou Sara", "Kazuha", "Bennett"] }
    ],
    pakistaniTips: "Raiden National is the #1 recommended F2P meta team for Pakistani players struggling with high ping. Her burst attacks are auto-targeted, minimizing DPS loss during server-side lag spikes. Make sure to fish for R5 'The Catch' in Inazuma to maximize her damage output without spending Primogems."
  },
  {
    id: "nahida",
    name: "Nahida",
    game: "Genshin Impact",
    rarity: 5,
    element: "Dendro",
    weapon: "Catalyst",
    role: "Dendro Enabler / Sub-DPS",
    description: "The Lesser Lord Kusanali, Nahida binds enemies with her Elemental Skill and triggers massive Dendro reactions.",
    icon: "https://genshin.jmp.blue/characters/nahida/icon",
    splash: "https://genshin.jmp.blue/characters/nahida/gacha-splash",
    bestWeapon: {
      name: "A Thousand Floating Dreams",
      rarity: 5,
      details: "Signature weapon. Grants massive Elemental Mastery (EM) and shares EM buffs with the active character based on team elements."
    },
    f2pWeapon: {
      name: "Sacrificial Fragments (F2P)",
      rarity: 4,
      details: "Provides the highest flat EM stat for a 4-star catalyst. Skill reset cooldown helps re-applying seeds if target spreads."
    },
    bestArtifacts: {
      set: "Deepwood Memories (4-Piece)",
      mainStats: "Sands: Elemental Mastery | Goblet: EM or Dendro DMG | Circlet: EM or Crit",
      subStats: "Elemental Mastery > Crit Rate > Crit DMG > ATK%"
    },
    teamComps: [
      { name: "Hyperbloom Meta", members: ["Nahida", "Alhaitham", "Yelan", "Kuki Shinobu"] },
      { name: "F2P Burgeon", members: ["Nahida", "Xingqiu", "Thoma", "Bennett"] }
    ],
    pakistaniTips: "Aim for 800 to 1000 Elemental Mastery (EM) to maximize her passive. On high ping (150ms+ on Asia server from Pakistan), her camera-swing skill aiming is very reliable. If you encounter stuttering during her burst, lock settings to 60fps on PC and disable motion blur to stabilize camera rotation."
  },
  {
    id: "zhongli",
    name: "Zhongli",
    game: "Genshin Impact",
    rarity: 5,
    element: "Geo",
    weapon: "Polearm",
    role: "Shield Support",
    description: "Vago Mundo, Zhongli offers the strongest shield in Teyvat, reducing nearby enemies' elemental resistance.",
    icon: "https://genshin.jmp.blue/characters/zhongli/icon",
    splash: "https://genshin.jmp.blue/characters/zhongli/gacha-splash",
    bestWeapon: {
      name: "Staff of Homa",
      rarity: 5,
      details: "Improves HP% and adds ATK based on Max HP, transforming Zhongli into a powerful sub-DPS burst damage dealer."
    },
    f2pWeapon: {
      name: "Black Tassel (F2P)",
      rarity: 3,
      details: "A 3-star weapon that is cheap to level and provides a massive flat HP% substat. Unmatched budget choice for pure shield bot build."
    },
    bestArtifacts: {
      set: "Tenacity of the Millelith (4-Piece)",
      mainStats: "Sands: HP% | Goblet: HP% | Circlet: HP% (Pure Shield) or Crit (Hybrid)",
      subStats: "HP% > Flat HP > Crit Rate > Crit DMG"
    },
    teamComps: [
      { name: "Mono Geo", members: ["Zhongli", "Itto", "Gorou", "Albedo"] },
      { name: "Hu Tao Vaporize", members: ["Zhongli", "Hu Tao", "Xingqiu", "Yelan"] }
    ],
    pakistaniTips: "The ultimate safety net for high latency. If you play on PTCL copper connections with constant package loss, Zhongli's unbreakable shield ensures you do not get killed during lag frames. Equip him with a Black Tassel and level up his skill to talent lvl 9+ immediately."
  },
  {
    id: "kazuha",
    name: "Kaedehara Kazuha",
    game: "Genshin Impact",
    rarity: 5,
    element: "Anemo",
    weapon: "Sword",
    role: "CC Support / Elemental Buffer",
    description: "A wandering samurai from Inazuma, Kazuha groups enemies together and boosts the party's elemental damage.",
    icon: "https://genshin.jmp.blue/characters/kazuha/icon",
    splash: "https://genshin.jmp.blue/characters/kazuha/gacha-splash",
    bestWeapon: {
      name: "Freedom-Sworn",
      rarity: 5,
      details: "Signature weapon. Boosts EM, increases team damage, and buffs Normal/Charged/Plunging attacks when triggers Swirl reactions."
    },
    f2pWeapon: {
      name: "Iron Sting (F2P)",
      rarity: 4,
      details: "Craftable sword at the blacksmith. Provides a solid EM substat and triggers damage stacks upon landing elemental hits."
    },
    bestArtifacts: {
      set: "Viridescent Venerer (4-Piece)",
      mainStats: "Sands: Elemental Mastery | Goblet: EM | Circlet: EM",
      subStats: "Elemental Mastery > Energy Recharge > Crit Rate"
    },
    teamComps: [
      { name: "Childe International", members: ["Kazuha", "Tartaglia", "Xiangling", "Bennett"] },
      { name: "F2P Aggravate", members: ["Kazuha", "Keqing", "Fischl", "Dendro Traveler"] }
    ],
    pakistaniTips: "VV 4-piece set is mandatory to shred enemy resistance. Since Kazuha relies heavily on double-swirl mechanics, ping spikes (200ms+) might occasionally delay elements applying. Try to execute his E skill (tap/hold) right after applying elements to confirm the swirl. Iron Sting is extremely cheap to craft at the blacksmith."
  },
  {
    id: "hu-tao",
    name: "Hu Tao",
    game: "Genshin Impact",
    rarity: 5,
    element: "Pyro",
    weapon: "Polearm",
    role: "Main DPS",
    description: "The 77th Director of the Wangsheng Funeral Parlor, Hu Tao consumes her own HP to deal massive Pyro Charged Attacks.",
    icon: "https://genshin.jmp.blue/characters/hu-tao/icon",
    splash: "https://genshin.jmp.blue/characters/hu-tao/gacha-splash",
    bestWeapon: {
      name: "Staff of Homa",
      rarity: 5,
      details: "Increases Crit DMG and boosts ATK based on HP thresholds. Crucial for high-end Hu Tao damage output."
    },
    f2pWeapon: {
      name: "Dragon's Bane (F2P)",
      rarity: 4,
      details: "Provides EM substat and increases DMG against enemies affected by Hydro. Highly competitive with 5-star options in Vaporize teams."
    },
    bestArtifacts: {
      set: "Crimson Witch of Flames (4-Piece) or Shimenawa's Reminiscence",
      mainStats: "Sands: HP% or EM | Goblet: Pyro DMG | Circlet: Crit Rate / Crit DMG",
      subStats: "Crit Rate > Crit DMG > HP% > EM > ATK%"
    },
    teamComps: [
      { name: "Double Hydro Vape", members: ["Hu Tao", "Xingqiu", "Yelan", "Zhongli"] },
      { name: "F2P Vaporize", members: ["Hu Tao", "Xingqiu", "Layla", "Sucrose"] }
    ],
    pakistaniTips: "Hu Tao is highly technical. If you do not have her 1st Constellation (C1), you must master the jump-cancel technique for charged attacks. High ping (250ms+) can make animation cancels sluggish. Use a solid Hydro enabler like Xingqiu to ensure Pyro attacks always trigger Vaporize."
  },
  {
    id: "neuvillette",
    name: "Neuvillette",
    game: "Genshin Impact",
    rarity: 5,
    element: "Hydro",
    weapon: "Catalyst",
    role: "Main DPS",
    description: "The Chief Justice of Fontaine, Neuvillette fires a continuous stream of Hydro damage that sweeps across the entire field.",
    icon: "https://genshin.jmp.blue/characters/neuvillette/icon",
    splash: "https://genshin.jmp.blue/characters/neuvillette/gacha-splash",
    bestWeapon: {
      name: "Tome of the Eternal Flow",
      rarity: 5,
      details: "Signature weapon. Boosts Crit DMG, increases HP% and increases Charged Attack DMG when HP changes."
    },
    f2pWeapon: {
      name: "Prototype Amber (F2P)",
      rarity: 4,
      details: "Craftable catalyst at the blacksmith. Provides massive HP% substat and restores energy + party HP upon burst. Elite budget weapon."
    },
    bestArtifacts: {
      set: "Marechaussee Hunter (4-Piece)",
      mainStats: "Sands: HP% | Goblet: Hydro DMG or HP% | Circlet: Crit DMG or HP%",
      subStats: "Crit DMG > Crit Rate > HP% > Energy Recharge"
    },
    teamComps: [
      { name: "Neuvillette Electro-Charged", members: ["Neuvillette", "Fischl", "Beidou", "Kazuha"] },
      { name: "F2P Hyper-Neuv", members: ["Neuvillette", "Dendro Traveler", "Fischl", "Layla"] }
    ],
    pakistaniTips: "Highly optimized for mobile players. Neuvillette's charged attack is an auto-sustaining laser beam, making him very friendly for budget devices and fluctuating ping in Pakistan. Pair him with craftable Prototype Amber. Make sure to run different elemental characters to trigger his Hydro Draconic Glory stacks."
  },
  {
    id: "arlecchino",
    name: "Arlecchino",
    game: "Genshin Impact",
    rarity: 5,
    element: "Pyro",
    weapon: "Polearm",
    role: "Main DPS",
    description: "The Knave, Fourth of the Fatui Harbingers. She clears her enemies using the Bond of Life mechanic, dealing high Pyro damage.",
    icon: "https://genshin.jmp.blue/characters/arlecchino/icon",
    splash: "https://genshin.jmp.blue/characters/arlecchino/gacha-splash",
    bestWeapon: {
      name: "Crimson Moon's Semblance",
      rarity: 5,
      details: "Signature weapon. Grants Crit Rate, increases Bond of Life, and provides additional damage buffs when the bond is active."
    },
    f2pWeapon: {
      name: "White Tassel (F2P)",
      rarity: 3,
      details: "A 3-star chest exclusive weapon from Liyue. Boosts Crit Rate and dramatically increases Normal Attack DMG. Highly effective budget weapon."
    },
    bestArtifacts: {
      set: "Fragment of Harmonic Whims (4-Piece)",
      mainStats: "Sands: ATK% | Goblet: Pyro DMG | Circlet: Crit Rate / Crit DMG",
      subStats: "Crit Rate > Crit DMG > ATK% > Elemental Mastery"
    },
    teamComps: [
      { name: "Overloaded Pyro", members: ["Arlecchino", "Chevreuse", "Fischl", "Bennett"] },
      { name: "Arlecchino Vape", members: ["Arlecchino", "Xingqiu", "Yelan", "Zhongli"] }
    ],
    pakistaniTips: "Arlecchino cannot be healed by teammates during combat due to her Bond of Life mechanic. Therefore, if you suffer from lag spikes on Pakistani ISPs, run her with a strong shielder like Zhongli or Layla to avoid getting defeated. For F2P, use the 3-star White Tassel (keep copies locked)."
  },
  {
    id: "bennett",
    name: "Bennett",
    game: "Genshin Impact",
    rarity: 4,
    element: "Pyro",
    weapon: "Sword",
    role: "ATK Buffer / Healer",
    description: "A good-natured adventurer from Mondstadt who is plagued by terrible luck, but provides unmatched ATK buffs and healing.",
    icon: "https://genshin.jmp.blue/characters/bennett/icon",
    splash: "https://genshin.jmp.blue/characters/bennett/gacha-splash",
    bestWeapon: {
      name: "Mistsplitter Reforged",
      rarity: 5,
      details: "High Base ATK sword that maximizes Bennett's flat ATK buff scaling while boosting his personal sub-DPS damage."
    },
    f2pWeapon: {
      name: "Sapwood Blade (F2P)",
      rarity: 4,
      details: "Craftable Sumeru weapon. Has a high Base ATK of 565 for a 4-star, provides Energy Recharge, and drops a leaf that buffs EM."
    },
    bestArtifacts: {
      set: "Noblesse Oblige (4-Piece)",
      mainStats: "Sands: ER% or HP% | Goblet: HP% | Circlet: Healing Bonus or HP%",
      subStats: "Energy Recharge > HP% > Flat HP"
    },
    teamComps: [
      { name: "National core", members: ["Bennett", "Xiangling", "Xingqiu", "Raiden Shogun"] },
      { name: "Melt Core", members: ["Bennett", "Rosaria", "Kaeya", "Xiangling"] }
    ],
    pakistaniTips: "Bennett is the core of 90% of budget accounts. His burst ATK buff scales *only* off his Base ATK (character level + weapon base stat), so level him up to 90/90 and give him a high base ATK weapon like Sapwood Blade. For artifact sub-stats, focus entirely on Energy Recharge (220% ER is ideal)."
  },
  {
    id: "xingqiu",
    name: "Xingqiu",
    game: "Genshin Impact",
    rarity: 4,
    element: "Hydro",
    weapon: "Sword",
    role: "Hydro Enabler / Sub-DPS",
    description: "A book-loving young man who defends the weak with his Guhua sword techniques, applying constant Hydro off-field.",
    icon: "https://genshin.jmp.blue/characters/xingqiu/icon",
    splash: "https://genshin.jmp.blue/characters/xingqiu/gacha-splash",
    bestWeapon: {
      name: "Primordial Jade Cutter",
      rarity: 5,
      details: "Provides massive Crit Rate and boosts ATK based on Max HP, transforming Xingqiu into a top-tier damage dealer."
    },
    f2pWeapon: {
      name: "Sacrificial Sword (F2P)",
      rarity: 4,
      details: "Enables him to double-cast his Elemental Skill, generating tons of energy particles and instantly charging his burst. The absolute best-in-slot."
    },
    bestArtifacts: {
      set: "Emblem of Severed Fate (4-Piece) or Noblesse Oblige",
      mainStats: "Sands: ER% or ATK% | Goblet: Hydro DMG | Circlet: Crit Rate / Crit DMG",
      subStats: "Energy Recharge > Crit Rate > Crit DMG > ATK%"
    },
    teamComps: [
      { name: "Vaporize Assist", members: ["Xingqiu", "Hu Tao", "Yelan", "Zhongli"] },
      { name: "F2P National", members: ["Xingqiu", "Bennett", "Xiangling", "Sucrose"] }
    ],
    pakistaniTips: "Xingqiu is widely considered the best 4-star character in the game. His Raincutter swords provide active damage reduction, minor healing, and infinite Hydro application. Even at 250ms ping, his swords trigger perfectly on active characters' normal attacks."
  },

  // ==========================================
  // WUTHERING WAVES CHARACTERS (10)
  // ==========================================
  {
    id: "jiyan",
    name: "Jiyan",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Aero",
    weapon: "Broadblade",
    role: "Main DPS",
    description: "General of the Midnight Rangers. Harnesses the power of the Azure Dragon to unleash rapid wind strikes.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png",
    bestWeapon: {
      name: "Verdant Summit",
      rarity: 5,
      details: "Signature weapon. Boosts Heavy Attack DMG and Crit DMG, providing ultimate synergy with his Qingloong Mode."
    },
    f2pWeapon: {
      name: "Helios Cleaver (F2P)",
      rarity: 4,
      details: "Provides stacking ATK% buffs over time upon using active skills. Highly competitive 4-star weapon."
    },
    bestEchoes: {
      set: "Sierra Gale (5-Piece) | Main Echo: Feilian Primal",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Aero DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Heavy Attack DMG > ATK% > Resonance Efficiency"
    },
    teamComps: [
      { name: "Jiyan Hyper", members: ["Jiyan", "Mortefi", "Verina"] },
      { name: "Aero Dual DPS", members: ["Jiyan", "Yangyang", "Baizhi"] }
    ],
    pakistaniTips: "Jiyan is extremely strong for clearing high-end content like the Tower of Adversity. During his ultimate, Jiyan gets parry frames on his normal attacks, making it easier to parry bosses even with ping spikes (180ms+). Aim for 120% Resonance Efficiency for smooth ultimate rotations."
  },
  {
    id: "yinlin",
    name: "Yinlin",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Electro",
    weapon: "Rectifier",
    role: "Sub-DPS / Electro Buffer",
    description: "A mysterious former investigator. Yinlin calls down lightning web networks that punish enemies and buff Electro teammates.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Yinlin.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Yinlin.png",
    bestWeapon: {
      name: "Stringmaster",
      rarity: 5,
      details: "Signature weapon. Offers Crit Rate, boosts all attribute DMG, and buffs ATK when the character is off-field."
    },
    f2pWeapon: {
      name: "Jinzhou Keeper (F2P)",
      rarity: 4,
      details: "Gives ATK% and boosts basic attack DMG when using Resonance Skills. A solid F2P alternative."
    },
    bestEchoes: {
      set: "Void Thunder (5-Piece) | Main Echo: Tempest Mephis",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Electro DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Skill DMG > ATK% > Energy Recharge"
    },
    teamComps: [
      { name: "Electro Dominance", members: ["Yinlin", "Calcharo", "Verina"] },
      { name: "Lightning Quick-swap", members: ["Yinlin", "Xiangli Yao", "Shorekeeper"] }
    ],
    pakistaniTips: "Excellent support for Electro characters. Yinlin's off-field coordinated attacks hit enemies automatically, which bypasses potential input lag. If your game stutters during her ultimate's particle effects, lower 'Effects Quality' in game settings to Medium."
  },
  {
    id: "jinhsi",
    name: "Jinhsi",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Spectro",
    weapon: "Broadblade",
    role: "Main DPS",
    description: "The Magistrate of Jinzhou. Jinhsi commands the power of Jué, triggering massive Spectro bursts with her elemental forms.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jinhsi.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jinhsi.png",
    bestWeapon: {
      name: "Ages of Harvest",
      rarity: 5,
      details: "Signature weapon. Boosts Crit Rate and dramatically amplifies Resonance Skill DMG after using attacks."
    },
    f2pWeapon: {
      name: "Broadblade#41 (F2P)",
      rarity: 4,
      details: "Craftable broadblade at the Jinzhou forge. Boosts Energy Recharge and restores HP% on skill use."
    },
    bestEchoes: {
      set: "Celestial Light (5-Piece) | Main Echo: Jué",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Spectro DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Skill DMG > ATK% > Resonance Efficiency"
    },
    teamComps: [
      { name: "Jinhsi Coordinated Team", members: ["Jinhsi", "Yinlin", "Verina"] },
      { name: "F2P Jinzhou Core", members: ["Jinhsi", "Yuanwu", "Baizhi"] }
    ],
    pakistaniTips: "Jinhsi's damage scaling is heavily dependent on coordinated off-field damage stacks. Pair her with Yuanwu (whose skill triggers coordinated attacks instantly without field time) for an incredibly cheap F2P combination. Ensure your main Echo Jué is leveled to 25 immediately."
  },
  {
    id: "changli",
    name: "Changli",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Fusion",
    weapon: "Sword",
    role: "Main / Sub-DPS",
    description: "Counselor to the Jinzhou Magistrate. Changli weaves fast-paced Pyro strikes, leaving enemies scorched with red feathers.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Changli.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Changli.png",
    bestWeapon: {
      name: "Blazing Brilliance",
      rarity: 5,
      details: "Signature weapon. Provides high Crit DMG, increases ATK%, and increases Resonance Skill DMG stacks."
    },
    f2pWeapon: {
      name: "Commando of Conviction (F2P)",
      rarity: 4,
      details: "Increases ATK% by 15% when utilizing Intro skills, aligning perfectly with Changli's quick-swap gameplay."
    },
    bestEchoes: {
      set: "Molten Rift (5-Piece) | Main Echo: Inferno Rider",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Fusion DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Skill DMG > Resonance Liberation > ATK%"
    },
    teamComps: [
      { name: "Fusion Dual DPS", members: ["Changli", "Chixia", "Verina"] },
      { name: "Changli Hyper", members: ["Changli", "Sanhua", "Shorekeeper"] }
    ],
    pakistaniTips: "Changli requires quick reflexes to hit 'Enflamement' stacks correctly. High ping (200ms+) might result in missed inputs. A simple tip is to hold down your attack key early to cue her Enflamement sweeps. Commando of Conviction is a highly standard 4-star weapon that you can get from standard weapon pulls."
  },
  {
    id: "shorekeeper",
    name: "Shorekeeper",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Spectro",
    weapon: "Rectifier",
    role: "Buffer / Healer",
    description: "Guardian of the Black Shores. She controls stellar nodes, expanding territories that boost Crit Rate and heal characters.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Shorekeeper.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Shorekeeper.png",
    bestWeapon: {
      name: "Stellar Symphony",
      rarity: 5,
      details: "Signature rectifier. Restores energy to the party and scales her healing output by increasing Max HP%."
    },
    f2pWeapon: {
      name: "Rectifier#25 (F2P)",
      rarity: 4,
      details: "Craftable rectifier. Increases HP% and restores Resonance Energy when using active healing skills."
    },
    bestEchoes: {
      set: "Rejuvenating Glow (5-Piece) | Main Echo: Fallacy of No Return",
      mainStats: "Cost 4: Healing Bonus / HP% | Cost 3: Energy Recharge | Cost 1: HP%",
      subStats: "Energy Recharge > HP% > Flat HP > Def%"
    },
    teamComps: [
      { name: "Universal Boost", members: ["Jinhsi", "Yinlin", "Shorekeeper"] },
      { name: "Aero Powerhouse", members: ["Jiyan", "Mortefi", "Shorekeeper"] }
    ],
    pakistaniTips: "The premier buffer in the game. Her ultimate domain grants up to 12.5% Crit Rate and 25% Crit DMG based on her total Energy Recharge. Make sure her ER% is above 250% to activate all domain thresholds. Use the craftable Rectifier#25 if you don't roll on her weapon banner."
  },
  {
    id: "camellya",
    name: "Camellya",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Havoc",
    weapon: "Sword",
    role: "Main DPS",
    description: "An eccentric member of the Black Shores. Moves with deadly grace, using Havoc vines to cut through her targets.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Camellya.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Camellya.png",
    bestWeapon: {
      name: "Red Spring",
      rarity: 5,
      details: "Signature weapon. Boosts Crit Rate, Normal Attack damage multipliers, and adds Havoc DMG bonuses."
    },
    f2pWeapon: {
      name: "Luming Sword (F2P)",
      rarity: 4,
      details: "Boosts Resonance Skill DMG and increases ATK% after landing skills. Excellent standard 4-star option."
    },
    bestEchoes: {
      set: "Sun-sinking Eclipse (5-Piece) | Main Echo: Dreamless or Crownless",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Havoc DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Normal Attack DMG > ATK% > ER%"
    },
    teamComps: [
      { name: "Havoc Core", members: ["Camellya", "Sanhua", "Verina"] },
      { name: "Bloom & Decay", members: ["Camellya", "Danjin", "Shorekeeper"] }
    ],
    pakistaniTips: "Camellya relies on rapid, continuous basic attacks in her bloom state. Due to high network latency, make sure to queue her skills (press the keys ahead of the animation finish) to avoid lag pauses. Sanhua is the best F2P partner for Camellya because she provides a 38% Basic Attack DMG boost via her Outro skill."
  },
  {
    id: "zhezhi",
    name: "Zhezhi",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Glacio",
    weapon: "Rectifier",
    role: "Sub-DPS / Glacio Buffer",
    description: "A shy commission painter. Paints constructs that attack alongside her active team members and boosts their skill damage.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Zhezhi.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Zhezhi.png",
    bestWeapon: {
      name: "Blazing Cosmos",
      rarity: 5,
      details: "Signature rectifier. Provides Crit Rate and increases coordinated attack DMG while off-field."
    },
    f2pWeapon: {
      name: "Voyage Rectifier (F2P)",
      rarity: 4,
      details: "Restores energy on hit and increases flat HP, assisting her energy rotation requirements."
    },
    bestEchoes: {
      set: "Freezing Frost (5-Piece) or Moonlit Clouds | Main Echo: Lampylumen Myriad",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Glacio DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Resonance Efficiency > ATK% > Skill DMG"
    },
    teamComps: [
      { name: "Glacio Resonance", members: ["Zhezhi", "Jinhsi", "Verina"] },
      { name: "Freezing Art", members: ["Zhezhi", "Sanhua", "Baizhi"] }
    ],
    pakistaniTips: "Zhezhi has a strong Outro skill that buffs the next character's Resonance Skill DMG by 25%. This makes her the absolute best support for Jinhsi. If you are a budget player, equip her with the Moonlit Clouds 5-piece set to give Jinhsi an extra 22.5% ATK boost on entry."
  },
  {
    id: "xiangli_yao",
    name: "Xiangli Yao",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Electro",
    weapon: "Gauntlets",
    role: "Main DPS",
    description: "Principal Investigator of Huaxi Academy. Features a cybernetic arm that discharges heavy Electro damage pulses.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Xiangli_Yao.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Xiangli_Yao.png",
    bestWeapon: {
      name: "Verity's Handle",
      rarity: 5,
      details: "Signature weapon. Boosts Crit Rate and amplifies Resonance Liberation DMG dramatically."
    },
    f2pWeapon: {
      name: "Marcato (F2P)",
      rarity: 4,
      details: "Increases Resonance Energy generation when using active skills, supporting quick burst recovery cycles."
    },
    bestEchoes: {
      set: "Void Thunder (5-Piece) | Main Echo: Tempest Mephis",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Electro DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Resonance Liberation > ATK% > Skill DMG"
    },
    teamComps: [
      { name: "Electro Burst", members: ["Xiangli Yao", "Yinlin", "Verina"] },
      { name: "Lightning Academy", members: ["Xiangli Yao", "Sanhua", "Shorekeeper"] }
    ],
    pakistaniTips: "Xiangli Yao was distributed for free to all players during Version 1.2, making him a staple on Pakistani F2P accounts. His damage profile centers around his ultimate. Use Marcato gauntlets if you do not have a 5-star option. Lower post-processing settings on PC if his glitch-effect animations cause frame drops."
  },
  {
    id: "verina",
    name: "Verina",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Spectro",
    weapon: "Rectifier",
    role: "Buffer / Healer",
    description: "A botanist who grows healing vines and flowers. Provides massive team-wide ATK buffs and heals.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Verina.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Verina.png",
    bestWeapon: {
      name: "Cosmic Ripples",
      rarity: 5,
      details: "Increases ATK% and Energy Recharge, maximizing the flat scaling of her healing outputs."
    },
    f2pWeapon: {
      name: "Rectifier#25 (F2P)",
      rarity: 4,
      details: "Craftable weapon. Increases HP and restores energy on skill casts, perfect for keeping her ultimate active."
    },
    bestEchoes: {
      set: "Rejuvenating Glow (5-Piece) | Main Echo: Bell-Borne Geochelone",
      mainStats: "Cost 4: Healing Bonus | Cost 3: Energy Recharge | Cost 1: ATK%",
      subStats: "Energy Recharge > ATK% > Flat ATK > HP%"
    },
    teamComps: [
      { name: "Standard Meta Support", members: ["Jinhsi", "Mortefi", "Verina"] },
      { name: "Midnight Support", members: ["Jiyan", "Aalto", "Verina"] }
    ],
    pakistaniTips: "The undisputed best support in Wuthering Waves. She fits into literally every single team. Her healing scales with her ATK stat, so do not build her with HP. Standard craftable Rectifier#25 is more than enough. Her aerial attacks help dodge ground shocks easily."
  },
  {
    id: "rover_havoc",
    name: "Rover (Havoc)",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Havoc",
    weapon: "Sword",
    role: "Main DPS",
    description: "The main protagonist of Wuthering Waves, wielding a sword imbued with dark Havoc energy that cleaves enemies.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Rover_F.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Rover_F.png",
    bestWeapon: {
      name: "Emerald of Genesis",
      rarity: 5,
      details: "Standard 5-star sword. Restores Energy and increases ATK% when using skills, providing high base stats."
    },
    f2pWeapon: {
      name: "Luming Sword (F2P)",
      rarity: 4,
      details: "Enables fast skill damage stacking. High value budget sword available from basic convene pools."
    },
    bestEchoes: {
      set: "Sun-sinking Eclipse (5-Piece) | Main Echo: Crownless",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Havoc DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Skill DMG > ATK% > Resonance Efficiency"
    },
    teamComps: [
      { name: "Dark Resonance", members: ["Rover (Havoc)", "Danjin", "Verina"] },
      { name: "F2P Starter", members: ["Rover (Havoc)", "Sanhua", "Baizhi"] }
    ],
    pakistaniTips: "Rover Havoc is the strongest free character in the game, capable of out-damaging many limited 5-star characters. Perfect for F2P players in Pakistan. Level her up to the max and pair her with Danjin (who shreds Havoc resistance by 23%). The Standard 5-star weapon selector box can be used to get Emerald of Genesis completely free."
  }
];

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.characterDatabase = characterDatabase;
}
