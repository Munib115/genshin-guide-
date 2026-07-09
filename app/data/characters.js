export const characterDatabase = [
  // ==========================================
  // GENSHIN IMPACT CHARACTERS (13)
  // ==========================================
  {
    id: "mualani",
    title: "Splish-Splash Wavechaser",
    gender: "Female",
    nation: "Natlan",
    affiliation: "People of the Springs",
    birthday: "August 18",
    constellation: "Phoca Neomonachus",
    history: "A well-known guide in Natlan and a member of the People of the Springs tribe. She runs a shop for water sports equipment and is renowned for her surfing skills across the nation of Pyro.",
    name: "Mualani",
    game: "Genshin Impact",
    rarity: 5,
    element: "Hydro",
    weapon: "Catalyst",
    role: "Main DPS",
    description: "A professional guide from Natlan's People of the Springs who surfs on her Sharky Surfboard, dealing massive Hydro damage based on her Max HP.",
    icon: "https://genshin.jmp.blue/characters/mualani/icon",
    splash: "https://genshin.jmp.blue/characters/mualani/gacha-splash",
    bestWeapon: {
      name: "Surf's Up",
      rarity: 5,
      details: "Signature weapon. Increases Max HP and Normal Attack DMG, synergizing perfectly with her shark bite attacks."
    },
    f2pWeapon: {
      name: "Ring of Yaxche (F2P)",
      rarity: 4,
      details: "Craftable Natlan weapon. Provides HP% and boosts Normal Attack damage based on Max HP."
    },
    bestArtifacts: {
      set: "Obsidian Codex (4-Piece)",
      mainStats: "Sands: HP% | Goblet: Hydro DMG | Circlet: Crit DMG",
      subStats: "Crit DMG > HP% > Elemental Mastery > Crit Rate"
    },
    bestEchoes: null,
    teamComps: [
      { name: "Mualani Vape", members: ["Mualani", "Xiangling", "Emilie", "Zhongli"] },
      { name: "F2P Vape", members: ["Mualani", "Xiangling", "Sucrose", "Kachina"] }
    ],
    pakistaniTips: "Since Mualani relies on riding her shark and hitting targets accurately, play carefully if you experience packet loss, as missing a fully stacked shark bite will cost a lot of DPS."
  },
  {
    id: "arlecchino",
    title: "Dire Balemoon",
    gender: "Female",
    nation: "Snezhnaya (Cryo Nation)",
    affiliation: "Fatui",
    birthday: "August 22",
    constellation: "Ignis Purgatorius",
    history: "Arlecchino, also known as \"The Knave,\" is the Fourth of the Eleven Fatui Harbingers. She runs the House of the Hearth, an orphanage in Snezhnaya that raises children to become Fatui soldiers. Cold, calculating, and exceptionally powerful, she strikes fear into the hearts of both her enemies and her subordinates.",
    name: "Arlecchino",
    game: "Genshin Impact",
    rarity: 5,
    element: "Pyro",
    weapon: "Polearm",
    role: "Main DPS",
    description: "The Knave, Fourth of the Fatui Harbingers. She wields a scythe and utilizes a unique Bond of Life mechanic to deal devastating Pyro damage.",
    icon: "https://genshin.jmp.blue/characters/arlecchino/icon",
    splash: "https://genshin.jmp.blue/characters/arlecchino/gacha-splash",
    bestWeapon: {
      name: "Crimson Moon's Semblance",
      rarity: 5,
      details: "Signature weapon. Grants a Bond of Life and massive damage bonuses, shifting form into a scythe when equipped by her."
    },
    f2pWeapon: {
      name: "White Tassel (F2P)",
      rarity: 3,
      details: "A 3-star weapon found in Liyue chests. Surprisingly strong on her due to the massive Normal Attack DMG bonus."
    },
    bestArtifacts: {
      set: "Fragment of Harmonic Whimsy (4-Piece)",
      mainStats: "Sands: ATK% | Goblet: Pyro DMG | Circlet: Crit Rate / Crit DMG",
      subStats: "Crit Rate > Crit DMG > ATK% > Elemental Mastery"
    },
    bestEchoes: null,
    teamComps: [
      { name: "Overload Knave", members: ["Arlecchino", "Chevreuse", "Fischl", "Yae Miko"] },
      { name: "Vape Father", members: ["Arlecchino", "Yelan", "Bennett", "Zhongli"] }
    ],
    pakistaniTips: "Arlecchino cannot be healed by teammates during combat due to her passive. On high-ping connections, bringing a strong shielder like Zhongli or Layla is crucial so you don't get taken out before you can burst to heal yourself."
  },
  {
    id: "ganyu",
    title: "Plenilune Gaze",
    gender: "Female",
    nation: "Liyue",
    affiliation: "Yuehai Pavilion",
    birthday: "December 2",
    constellation: "Sinae Unicornis",
    history: "Ganyu is a half-qilin Adeptus who serves as the general secretary of the Liyue Qixing. She fought alongside Rex Lapis during the Archon War and has dedicated herself to the prosperity of Liyue for thousands of years.",
    name: "Ganyu",
    game: "Genshin Impact",
    rarity: 5,
    element: "Cryo",
    weapon: "Bow",
    role: "Main DPS / Sub-DPS",
    description: "The secretary to the Liyue Qixing. The blood of both human and illuminated beast flows within her veins. Known for her devastating Frostflake Arrows.",
    icon: "https://genshin.jmp.blue/characters/ganyu/icon",
    splash: "https://genshin.jmp.blue/characters/ganyu/gacha-splash",
    bestWeapon: {
      name: "Amos' Bow",
      rarity: 5,
      details: "Signature weapon. Massively increases Charged Attack DMG, perfectly synergizing with her Frostflake Arrows."
    },
    f2pWeapon: {
      name: "Prototype Crescent (F2P)",
      rarity: 4,
      details: "Craftable weapon. Hitting weak points significantly boosts ATK. Excellent free option for aim-shot playstyles."
    },
    bestArtifacts: {
      set: "Wanderer's Troupe (4-Piece)",
      mainStats: "Sands: ATK% | Goblet: Cryo DMG | Circlet: Crit Rate / Crit DMG",
      subStats: "Crit DMG > Crit Rate > ATK% > Elemental Mastery"
    },
    bestEchoes: null,
    teamComps: [
      { name: "Morgana (Freeze)", members: ["Ganyu", "Mona", "Venti", "Diona"] },
      { name: "Melt Ganyu", members: ["Ganyu", "Zhongli", "Xiangling", "Bennett"] }
    ],
    pakistaniTips: "For Pakistani players with higher ping, Freeze teams (Morgana) are highly recommended over Melt. Missing a Melt charged shot due to lag is punishing, whereas Freeze keeps enemies immobilized."
  },
  {
    id: "furina",
    title: "Endless Solo of Solitude",
    gender: "Female",
    nation: "Fontaine",
    affiliation: "Court of Fontaine",
    birthday: "October 13",
    constellation: "Animula Choragi",
    history: "Furina served as the human proxy of Focalors, the Hydro Archon, for five hundred years. She played the role of the flamboyant and dramatic Archon of Fontaine to deceive the Heavenly Principles and prevent the prophecy of Fontaine's deluge from destroying her people. After the crisis was resolved, she stepped down to live a quiet life as a normal human, rediscovering her love for the performing arts.",
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
    bestEchoes: null,
    teamComps: [
      { name: "Neuvillette Hypercarry", members: ["Furina", "Neuvillette", "Kazuha", "Zhongli"] },
      { name: "F2P Taser", members: ["Furina", "Sucrose", "Fischl", "Beidou"] }
    ],
    pakistaniTips: "Crucial for team-wide buffs. On Pakistani ISP networks (e.g. StormFiber/PTCL), maintain an ER threshold of at least 180-200% in solo Hydro teams. Latency spikes might delay her skill casts, so casting her burst immediately is recommended. Runs smoothly on mid-tier mobile chipsets like Snapdragon 778G at 45 FPS."
  },
  {
    id: "raiden",
    title: "Plane of Euthymia",
    gender: "Female",
    nation: "Inazuma",
    affiliation: "Inazuma Shogunate",
    birthday: "June 26",
    constellation: "Imperatrix Umbrosa",
    history: "The Raiden Shogun is the vessel of Ei, the Electro Archon of Inazuma. Seeking to protect Inazuma from the erosion of time, Ei built an autonomous puppet (the Shogun) to rule the nation while she withdrew into the Plane of Euthymia to meditate. After the abolition of the Vision Hunt Decree, Ei resolved to guide Inazuma toward a future of active eternity rather than static isolation.",
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
    bestEchoes: null,
    teamComps: [
      { name: "Raiden National (Rational)", members: ["Raiden Shogun", "Bennett", "Xiangling", "Xingqiu"] },
      { name: "Hyper Raiden", members: ["Raiden Shogun", "Kujou Sara", "Kazuha", "Bennett"] }
    ],
    pakistaniTips: "Raiden National is the #1 recommended F2P meta team for Pakistani players struggling with high ping. Her burst attacks are auto-targeted, minimizing DPS loss during server-side lag spikes. Make sure to fish for R5 'The Catch' in Inazuma to maximize her damage output without spending Primogems."
  },
  {
    id: "nahida",
    title: "Physic of Purity",
    gender: "Female",
    nation: "Sumeru",
    affiliation: "Sumeru City",
    birthday: "October 27",
    constellation: "Sapientia Oromasdis",
    history: "Nahida is the lesser Lord Kusanali, the current Dendro Archon of Sumeru. She is a branch of Irminsul, the avatar of the world tree. Confined to the Sanctuary of Surasthana by the Sumeru Akademiya sages who favored her predecessor, she was eventually rescued by the Traveler. She is a compassionate, curious Archon who seeks to understand the world and guide her people through wisdom.",
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
    bestEchoes: null,
    teamComps: [
      { name: "Hyperbloom Meta", members: ["Nahida", "Alhaitham", "Yelan", "Kuki Shinobu"] },
      { name: "F2P Burgeon", members: ["Nahida", "Xingqiu", "Thoma", "Bennett"] }
    ],
    pakistaniTips: "Aim for 800 to 1000 Elemental Mastery (EM) to maximize her passive. On high ping (150ms+ on Asia server from Pakistan), her camera-swing skill aiming is very reliable. If you encounter stuttering during her burst, lock settings to 60fps on PC and disable motion blur to stabilize camera rotation."
  },
  {
    id: "zhongli",
    title: "Vago Mundo",
    gender: "Male",
    nation: "Liyue",
    affiliation: "Wangsheng Funeral Parlor",
    birthday: "December 31",
    constellation: "Lapis Dei",
    history: "Zhongli is the mortal vessel of Morax, the Geo Archon and Rex Lapis, who ruled Liyue for over three millennia. As the God of Contracts and Commerce, Morax forged the prosperity of Liyue. Believing it was time for humanity to guide their own destiny, he faked his death in a grand contract to test Liyue's readiness and retired to work as a consultant for the Wangsheng Funeral Parlor.",
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
    bestEchoes: null,
    teamComps: [
      { name: "Mono Geo", members: ["Zhongli", "Itto", "Gorou", "Albedo"] },
      { name: "Hu Tao Vaporize", members: ["Zhongli", "Hu Tao", "Xingqiu", "Yelan"] }
    ],
    pakistaniTips: "The ultimate safety net for high latency. If you play on PTCL copper connections with constant package loss, Zhongli's unbreakable shield ensures you do not get killed during lag frames. Equip him with a Black Tassel and level up his skill to talent lvl 9+ immediately."
  },
  {
    id: "kazuha",
    title: "Scarlet Leaves Pursue Wild Waves",
    gender: "Male",
    nation: "Inazuma",
    affiliation: "The Crux / Kaedehara Clan",
    birthday: "October 29",
    constellation: "Acer Palmatum",
    history: "Kaedehara Kazuha is a wandering samurai from Inazuma and the last heir of the once-illustrious Kaedehara clan. Following the death of his close friend, who was executed for challenging the Vision Hunt Decree, Kazuha fled Inazuma and joined Captain Beidou's crew on the Alcor. During the resistance, he famously blocked the Shogun's Musou no Hitotachi with two Visions.",
    name: "Kaedehara Kazuha",
    game: "Genshin Impact",
    rarity: 5,
    element: "Anemo",
    weapon: "Sword",
    role: "CC Support / Buffer",
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
    bestEchoes: null,
    teamComps: [
      { name: "Childe International", members: ["Kazuha", "Tartaglia", "Xiangling", "Bennett"] },
      { name: "F2P Aggravate", members: ["Kazuha", "Keqing", "Fischl", "Dendro Traveler"] }
    ],
    pakistaniTips: "VV 4-piece set is mandatory to shred enemy resistance. Since Kazuha relies heavily on double-swirl mechanics, ping spikes (200ms+) might occasionally delay elements applying. Try to execute his E skill (tap/hold) right after applying elements to confirm the swirl. Iron Sting is extremely cheap to craft at the blacksmith."
  },
  {
    id: "hu-tao",
    title: "Fragrance in Thaw",
    gender: "Female",
    nation: "Liyue",
    affiliation: "Wangsheng Funeral Parlor",
    birthday: "July 15",
    constellation: "Papilio Charontis",
    history: "Hu Tao is the eccentric 77th Director of the Wangsheng Funeral Parlor, responsible for managing Liyue's funeral ceremonies and maintaining the boundary between the living and the dead. Known for her mischievous poems and pranks, she takes her duty to honor the departed extremely seriously, ensuring their souls cross peacefully into the afterlife.",
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
    bestEchoes: null,
    teamComps: [
      { name: "Double Hydro Vape", members: ["Hu Tao", "Xingqiu", "Yelan", "Zhongli"] },
      { name: "F2P Vaporize", members: ["Hu Tao", "Xingqiu", "Layla", "Sucrose"] }
    ],
    pakistaniTips: "Hu Tao is highly technical. If you do not have her 1st Constellation (C1), you must master the jump-cancel technique for charged attacks. High ping (250ms+) can make animation cancels sluggish. Use a solid Hydro enabler like Xingqiu to ensure Pyro attacks always trigger Vaporize."
  },
  {
    id: "neuvillette",
    title: "Ordainer of Inexorable Judgment",
    gender: "Male",
    nation: "Fontaine",
    affiliation: "Court of Fontaine",
    birthday: "December 18",
    constellation: "Diluvium",
    history: "Neuvillette is the Chief Justice (Iudex) of Fontaine, presiding over Fontaine's legal system with absolute neutrality. He is the modern reincarnation of the Hydro Sovereign, the ancient Dragon Ruler of Water. For centuries, he hid his draconic nature. After Focalors returned the Hydro Authority to him, Neuvillette forgave the sins of the Fontainians, saving them from the prophecy.",
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
    bestEchoes: null,
    teamComps: [
      { name: "Neuvillette Electro-Charged", members: ["Neuvillette", "Fischl", "Beidou", "Kazuha"] },
      { name: "F2P Hyper-Neuv", members: ["Neuvillette", "Dendro Traveler", "Fischl", "Layla"] }
    ],
    pakistaniTips: "Highly optimized for mobile players. Neuvillette's charged attack is an auto-sustaining laser beam, making him very friendly for budget devices and fluctuating ping in Pakistan. Pair him with craftable Prototype Amber. Make sure to run different elemental characters to trigger his Hydro Draconic Glory stacks."
  },
  {
    id: "bennett",
    title: "Trial by Fire",
    gender: "Male",
    nation: "Mondstadt",
    affiliation: "Adventurers' Guild / Benny's Adventure Team",
    birthday: "February 29",
    constellation: "Rota Calamitas",
    history: "Bennett is a good-natured young adventurer from Mondstadt who was found as an infant in a treacherous domain. He suffers from a bizarre, persistent curse of extreme bad luck. Despite this, he remains incredibly optimistic, running 'Benny's Adventure Team' (which has no other active members) and supporting his friends with his fiery passion.",
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
    bestEchoes: null,
    teamComps: [
      { name: "National core", members: ["Bennett", "Xiangling", "Xingqiu", "Raiden Shogun"] },
      { name: "Melt Core", members: ["Bennett", "Rosaria", "Kaeya", "Xiangling"] }
    ],
    pakistaniTips: "Bennett is the core of 90% of budget accounts. His burst ATK buff scales *only* off his Base ATK (character level + weapon base stat), so level him up to 90/90 and give him a high base ATK weapon like Sapwood Blade. For artifact sub-stats, focus entirely on Energy Recharge (220% ER is ideal)."
  },
  {
    id: "xingqiu",
    title: "Juvenile Galant",
    gender: "Male",
    nation: "Liyue",
    affiliation: "Feiyun Commerce Guild / Guhua Sect",
    birthday: "October 9",
    constellation: "Fabulae Textilis",
    history: "Xingqiu is the second son of the manager of the wealthy Feiyun Commerce Guild in Liyue. Although expected to inherit the business, he prefers reading martial arts novels and practicing the ancient Guhua sword style. He secretly fights for justice under the moniker of a chivalrous hero, utilizing his hydro-infused swordplay to defend the weak.",
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
    bestEchoes: null,
    teamComps: [
      { name: "Vaporize Assist", members: ["Xingqiu", "Hu Tao", "Yelan", "Zhongli"] },
      { name: "F2P National", members: ["Xingqiu", "Bennett", "Xiangling", "Sucrose"] }
    ],
    pakistaniTips: "Xingqiu is widely considered the best 4-star character in the game. His Raincutter swords provide active damage reduction, minor healing, and infinite Hydro application. Even at 250ms ping, his swords trigger perfectly on active characters' normal attacks."
  },
  {
    id: "ayaka",
    title: "Frostflake Heron",
    gender: "Female",
    nation: "Inazuma",
    affiliation: "Yashiro Commission",
    birthday: "September 28",
    constellation: "Grus Nivis",
    history: "Kamisato Ayaka is the eldest daughter of the Kamisato Clan of the Yashiro Commission, one of the three ruling commissions of Inazuma. Known as the 'Shirasagi Himegimi' (White Heron Princess), she represents elegance, nobility, and kindness. Alongside her brother Ayato, she works tirelessly to maintain stability in Inazuma, secretly aiding the resistance during the Vision Hunt Decree to protect her people's freedoms.",
    name: "Kamisato Ayaka",
    game: "Genshin Impact",
    rarity: 5,
    element: "Cryo",
    weapon: "Sword",
    role: "Main DPS",
    description: "Daughter of the Yashiro Commission's Kamisato Clan, Ayaka strikes with graceful Cryo swordplay and swift movement.",
    icon: "https://genshin.jmp.blue/characters/ayaka/icon",
    splash: "https://genshin.jmp.blue/characters/ayaka/gacha-splash",
    bestWeapon: {
      name: "Mistsplitter Reforged",
      rarity: 5,
      details: "Signature weapon. Provides high Crit DMG, Elemental DMG Bonus, and extra stackable multipliers on burst casting."
    },
    f2pWeapon: {
      name: "Amenoma Kageuchi (F2P)",
      rarity: 4,
      details: "Craftable Inazuma sword. Solves her energy requirements completely by regenerating flat energy after casting her burst."
    },
    bestArtifacts: {
      set: "Blizzard Strayer (4-Piece)",
      mainStats: "Sands: ATK% | Goblet: Cryo DMG | Circlet: Crit DMG",
      subStats: "Crit DMG > ATK% > Energy Recharge > Crit Rate"
    },
    bestEchoes: null,
    teamComps: [
      { name: "Premium Freeze", members: ["Kamisato Ayaka", "Shenhe", "Kazuha", "Kokomi"] },
      { name: "F2P Freeze", members: ["Kamisato Ayaka", "Rosaria", "Sucrose", "Xingqiu"] }
    ],
    pakistaniTips: "For Ayaka, the 4-piece Blizzard Strayer set is mandatory, giving up to 40% free Crit Rate against frozen targets. On high latency (180ms+ on Asia server from Pakistan), grouping targets with Kazuha or Sucrose first ensures her burst hits all enemies without missing. Craft the Amenoma Kageuchi at the Inazuma blacksmith."
  },
  {
    id: "tartaglia",
    title: "Childe",
    gender: "Male",
    nation: "Snezhnaya (Cryo Nation)",
    affiliation: "Fatui",
    birthday: "July 20",
    constellation: "Monoceros Caeli",
    history: "Tartaglia, whose real name is Ajax, is the eleventh member of the Fatui Harbingers, serving under the Tsaritsa (the Cryo Archon). Raised in a seaside village in Snezhnaya, he fell into the Abyss as a youth, where he learned his formidable combat skills. Unlike other Harbingers who rely on deceit, Tartaglia values direct, honorable combat and strives to become a master of all weaponry, constantly seeking stronger opponents.",
    name: "Tartaglia",
    game: "Genshin Impact",
    rarity: 5,
    element: "Hydro",
    weapon: "Bow",
    role: "Main DPS",
    description: "No. 11 of the Fatui Harbingers, Tartaglia (also known as Childe) is a master of combat who utilizes a dual-blade Hydro stance and a bow.",
    icon: "https://genshin.jmp.blue/characters/tartaglia/icon",
    splash: "https://genshin.jmp.blue/characters/tartaglia/gacha-splash",
    bestWeapon: {
      name: "Polar Star",
      rarity: 5,
      details: "Signature weapon. Buffs Elemental Skill and Burst DMG, and stacks ATK% on landing Normal/Charged attacks, Skills, or Bursts."
    },
    f2pWeapon: {
      name: "Rust (F2P/Gacha)",
      rarity: 4,
      details: "Gives huge Normal Attack DMG bonus, which scales extremely well with his melee stance attacks."
    },
    bestArtifacts: {
      set: "Nymph's Dream (4-Piece) or Heart of Depth (4-Piece)",
      mainStats: "Sands: ATK% | Goblet: Hydro DMG | Circlet: Crit Rate / Crit DMG",
      subStats: "Crit Rate > Crit DMG > ATK% > Energy Recharge"
    },
    bestEchoes: null,
    teamComps: [
      { name: "International", members: ["Tartaglia", "Xiangling", "Kazuha", "Bennett"] },
      { name: "Electro-Charge", members: ["Tartaglia", "Fischl", "Beidou", "Bennett"] }
    ],
    pakistaniTips: "Tartaglia's International team is one of the strongest in the game but requires strict rotation management. In Pakistan, on 180ms+ ping, double-swirling Hydro (from Tartaglia's skill activation) and Pyro (from Bennett's burst) with Kazuha can feel slightly delayed. Practice the rotation: Tartaglia E status trigger ➔ Bennett Q ➔ Kazuha QE ➔ Xiangling QE ➔ Tartaglia EQ then melee."
  },

  // ==========================================
  // WUTHERING WAVES CHARACTERS (23 COMPLETE ROSTER)
  // ==========================================
  {
    id: "jiyan",
    title: "General of the Midnight Rangers",
    gender: "Male",
    nation: "Huanglong",
    affiliation: "Midnight Rangers",
    birthday: "December 14",
    constellation: "Qingloong",
    history: "Jiyan is the General of Jinzhou's military force, the Midnight Rangers. Originally a medical doctor in the military, he took command during a desperate battle against the Tacet Discords in the Desorock Highland when the previous General was lost. He wields a heavy broadblade and commands the wind dragon, standing as Jinzhou's primary line of defense.",
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
    bestArtifacts: null,
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
    title: "Former Security Inspector",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Jinzhou Patroller",
    birthday: "July 24",
    constellation: "Chidori",
    history: "Yinlin is a brilliant but secretive former Jinzhou Patroller who works deep undercover in the criminal underworld. Disguising herself as an information broker, she uses her electrostatic network strings and dolls to track down corruption and target members of the Fractsidus, operating in the shadows of Jinzhou.",
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
    bestArtifacts: null,
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
    title: "Magistrate of Jinzhou",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Magistrate Office",
    birthday: "January 19",
    constellation: "Jue",
    history: "Jinhsi is the young, newly appointed Magistrate of Jinzhou. Resolute and wise beyond her years, she is the chosen resonance proxy of Jue, the Sentinel dragon of Jinzhou. She bears the heavy burden of guiding the city through the threat of the Tacet Discords while managing political tensions with the central capital of Huanglong.",
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
    bestArtifacts: null,
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
    title: "Counselor to the Magistrate",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Magistrate Office",
    birthday: "August 30",
    constellation: "Vermillion Bird",
    history: "Changli is the brilliant counselor to Magistrate Jinhsi and the former mentor to Jiyan. As a master of strategy, she acts as Jinhsi's guardian and political advisor. She harbors a deep, blazing internal heat related to her Vermillion Bird resonance aspect, using her fiery swordplay and strategic mind to safeguard the future of Jinzhou.",
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
    bestArtifacts: null,
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
    title: "Guardian of the Black Shores",
    gender: "Female",
    nation: "Black Shores",
    affiliation: "The Black Shores",
    birthday: "September 22",
    constellation: "Stella",
    history: "The Shorekeeper is the mysterious, immortal guardian of the Black Shores, an island isolated from the rest of the world. She is a server-born consciousness designed to monitor the world's data flow and guide humanity away from the Lament's collapse. She shares a deep, ancient bond with the Rover, waiting centuries for their return.",
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
    bestArtifacts: null,
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
    title: "Envoy of the Black Shores",
    gender: "Female",
    nation: "Black Shores",
    affiliation: "The Black Shores",
    birthday: "November 5",
    constellation: "Dianthus",
    history: "Camellya is an eccentric, chaotic, and dangerous member of the Black Shores. Obsessed with the Rover, she travels the world investigating anomalies and Tacet Discord mutations. She uses a pair of sharp Havoc vines that grow from her hands, fighting with a wild, dance-like grace that reflects her unpredictable nature.",
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
    bestArtifacts: null,
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
    title: "Commission Painter",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Jinzhou Art Guild",
    birthday: "March 15",
    constellation: "Pictura",
    history: "Zhezhi is a quiet, incredibly shy freelance painter in Jinzhou who struggles with social anxiety but expresses herself beautifully through art. Her resonance ability allows her to materialize her ink paintings into living, physical projections, creating floating constructs that attack and defend alongside her teammates.",
    name: "Zhezhi",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Glacio",
    weapon: "Rectifier",
    role: "Sub-DPS / Buffer",
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
    bestArtifacts: null,
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
    title: "Principal Investigator of Huaxi Academy",
    gender: "Male",
    nation: "Huanglong",
    affiliation: "Huaxi Academy",
    birthday: "October 16",
    constellation: "Mantis",
    history: "Xiangli Yao is the young, genius Principal Investigator at Jinzhou's Huaxi Academy. He specializes in mechanical and resonance engineering. After losing his arm in a dangerous experiment, he designed and built a state-of-the-art cybernetic arm that can channel massive Electro pulses, using his intellect to build new defensive technologies.",
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
    bestArtifacts: null,
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
    title: "Pioneer Association Botanist",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Pioneer Association",
    birthday: "May 18",
    constellation: "Folia",
    history: "Verina is a bubbly and enthusiastic young member of the Pioneer Association in Jinzhou, working as a specialist in botany and agriculture. Originally from a distant expedition team, she uses her unique connection with plants to heal teammates, cultivate crops in harsh soils, and grow protective flora to defend her companions.",
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
    bestArtifacts: null,
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
    id: "rover",
    title: "The Wandering Star",
    gender: "Male / Female",
    nation: "Unknown",
    affiliation: "Unknown",
    birthday: "Unknown",
    constellation: "Sol",
    history: "The Rover is a mysterious traveler who awoke in the world of Solaris-3 with no memories of their past. Possessing the unique ability to absorb and manipulate multiple elements (Spectro and Havoc) without a traditional Focus, the Rover is sought after by both the leadership of Jinzhou and the mysterious Fractsidus organization.",
    name: "Rover (Havoc)",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Havoc",
    weapon: "Sword",
    role: "Main DPS",
    description: "The main protagonist of Wuthering Waves, wielding a sword imbued with dark Havoc energy.",
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
    bestArtifacts: null,
    bestEchoes: {
      set: "Sun-sinking Eclipse (5-Piece) | Main Echo: Crownless",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Havoc DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Skill DMG > ATK% > Resonance Efficiency"
    },
    teamComps: [
      { name: "Dark Resonance", members: ["Rover (Havoc)", "Danjin", "Verina"] },
      { name: "F2P Starter", members: ["Rover (Havoc)", "Sanhua", "Baizhi"] }
    ],
    pakistaniTips: "Rover Havoc is the strongest free character in the game. Levels up naturally with story progression. Pair her with Danjin or Sanhua to trigger massive Havoc burst damage. Highly reliable on high ping setups."
  },
  {
    id: "baizhi",
    title: "Huaxi Academy Researcher",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Huaxi Academy",
    birthday: "April 10",
    constellation: "Remora",
    history: "Baizhi is a serious, analytical researcher at the Huaxi Academy, dedicated to studying the mechanics of Tacet Discords and the Lament. She commands a unique, floating organism named You'tan, which she uses to channel healing energy and execute coordinated Glacio attacks, choosing cold logic to protect her allies.",
    name: "Baizhi",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Glacio",
    weapon: "Rectifier",
    role: "Healer / Buffer",
    description: "A researcher at Huaxi Academy, Baizhi uses a spectral creature to restore party HP and buff active allies.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Baizhi.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Baizhi.png",
    bestWeapon: {
      name: "Stellar Symphony",
      rarity: 5,
      details: "Provides massive HP stats, improving both her raw healing outputs and team energy restoration."
    },
    f2pWeapon: {
      name: "Rectifier#25 (F2P)",
      rarity: 4,
      details: "Craftable weapon. Provides HP% and restores energy on skill casts, matching her healing requirements perfectly."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Rejuvenating Glow (5-Piece) | Main Echo: Bell-Borne Geochelone",
      mainStats: "Cost 4: Healing Bonus | Cost 3: Energy Recharge | Cost 1: HP%",
      subStats: "Energy Recharge > HP% > Flat HP > Def%"
    },
    teamComps: [
      { name: "F2P Glacio Team", members: ["Baizhi", "Sanhua", "Jinhsi"] },
      { name: "Baizhi Support", members: ["Jiyan", "Baizhi", "Mortefi"] }
    ],
    pakistaniTips: "Baizhi is your primary F2P healer before unlocking Verina. Her healing scales off Max HP, making her very tanky. If you lag, she can take hits without dying. Level her craftable Rectifier#25 to R5."
  },
  {
    id: "chixia",
    title: "Jinzhou Patroller",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Jinzhou Patrollers",
    birthday: "June 1",
    constellation: "Pistol",
    history: "Chixia is a cheerful, high-energy Patroller in Jinzhou. Always eager to help and standing up for justice, she is known as the 'firecracker' of the patrollers. She uses dual resonance pistols that fire heat-infused rounds, rushing headfirst into trouble to protect citizens and maintain the safety of Jinzhou.",
    name: "Chixia",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Fusion",
    weapon: "Pistols",
    role: "Main DPS",
    description: "A passionate junior officer of Jinzhou Patrollers. Chixia fires rapid, fiery bullet rounds from her dual pistols.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Chixia.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Chixia.png",
    bestWeapon: {
      name: "Static Mist",
      rarity: 5,
      details: "Standard 5-star pistols. Provides Crit Rate and increases team ATK% when switching out."
    },
    f2pWeapon: {
      name: "Novaburst (F2P)",
      rarity: 4,
      details: "Increases ATK% after dodging. Works beautifully on mobile/budget builds where dodging is essential."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Molten Rift (5-Piece) | Main Echo: Inferno Rider",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Fusion DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Resonance Skill DMG > ATK% > ER%"
    },
    teamComps: [
      { name: "Fusion F2P Burst", members: ["Chixia", "Sanhua", "Baizhi"] },
      { name: "Fusion Quick", members: ["Chixia", "Changli", "Verina"] }
    ],
    pakistaniTips: "Chixia relies on holding down her Resonance Skill for continuous rapid fire. Due to high ping, make sure to watch her ammunition gauge closely; server lag might sometimes desync the bullets. Lock settings to Medium effects to avoid FPS drops during her ultimate."
  },
  {
    id: "sanhua",
    title: "Guard to the Magistrate",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Magistrate Office",
    birthday: "February 12",
    constellation: "Snow",
    history: "Sanhua is the quiet, stoic personal bodyguard of Magistrate Jinhsi. Born with a unique mutation that turned her right eye red and caused her to see the world as a frozen landscape of energy flows, she mastered Glacio swordplay to protect Jinhsi from political assassins and external Tacet Discord threats.",
    name: "Sanhua",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Glacio",
    weapon: "Sword",
    role: "Sub-DPS / Basic Buffer",
    description: "Guard to the Magistrate of Jinzhou. Sanhua uses ice mechanics to freeze her enemies and buff basic attacks.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Sanhua.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Sanhua.png",
    bestWeapon: {
      name: "Emerald of Genesis",
      rarity: 5,
      details: "Standard 5-star sword. Grants high Crit Rate and Energy Recharge, speeding up her burst cycles."
    },
    f2pWeapon: {
      name: "Luming Sword (F2P)",
      rarity: 4,
      details: "Boosts skill DMG and grants ATK% stacks. Solid free option available from general pulls."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Moonlit Clouds (5-Piece) | Main Echo: Heron",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Energy Recharge | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Energy Recharge > ATK% > Skill DMG"
    },
    teamComps: [
      { name: "Basic Attack Buff", members: ["Sanhua", "Camellya", "Verina"] },
      { name: "Glacio Dual", members: ["Sanhua", "Zhezhi", "Baizhi"] }
    ],
    pakistaniTips: "Sanhua is highly recommended for F2P players due to her fast field time. Her Outro buffs the next character's basic attacks by 38%, matching perfectly with Camellya. Executing her detonate skill requires timing; if on high ping, release the key slightly early."
  },
  {
    id: "calcharo",
    title: "Leader of Ghost Hounds",
    gender: "Male",
    nation: "New Federation",
    affiliation: "Ghost Hounds Mercenary",
    birthday: "November 28",
    constellation: "Lupus",
    history: "Calcharo is the ruthless, practical leader of the Ghost Hounds, a private mercenary group operating across Solaris-3. He values results, efficiency, and contracts above all else. He commands dark Electro shadows that materialize during his sword strikes, fighting with a deadly and calculated savagery.",
    name: "Calcharo",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Electro",
    weapon: "Broadblade",
    role: "Main DPS",
    description: "Leader of the Ghost Hounds. Performs heavy, slow broadblade swings infused with lightning phantoms.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Calcharo.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Calcharo.png",
    bestWeapon: {
      name: "Verdant Summit",
      rarity: 5,
      details: "Grants heavy attack bonuses and Crit DMG, maximizing his Death Messenger damage spikes."
    },
    f2pWeapon: {
      name: "Helios Cleaver (F2P)",
      rarity: 4,
      details: "Provides stackable ATK% multipliers. Unlocked naturally from weapon boxes."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Void Thunder (5-Piece) | Main Echo: Thundering Mephis",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Electro DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Resonance Liberation > ATK% > ER%"
    },
    teamComps: [
      { name: "Electro Phantom", members: ["Calcharo", "Yinlin", "Verina"] },
      { name: "F2P Thunder", members: ["Calcharo", "Sanhua", "Baizhi"] }
    ],
    pakistaniTips: "Calcharo requires precise dodge cancels during his ultimate. High latency (220ms+) makes his attack combinations very hard to execute. If you struggle, run him with a shielder like Taoqi or Jianxin to avoid getting interrupted during lag spikes."
  },
  {
    id: "mortefi",
    title: "Huaxi Academy Department Head",
    gender: "Male",
    nation: "New Federation",
    affiliation: "Huaxi Academy",
    birthday: "September 8",
    constellation: "Dragon",
    history: "Mortefi is the hot-tempered head of the weapons research department at Huaxi Academy. Born into a wealthy family in the New Federation, he possesses a rare mutation that manifests as scaling fire in his blood. He channels this internal heat into his custom-designed pistols, building innovative weapons for the Midnight Rangers.",
    name: "Mortefi",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Fusion",
    weapon: "Pistols",
    role: "Sub-DPS / Heavy Buffer",
    description: "An associate professor at Huaxi Academy, Mortefi triggers coordinated off-field fire attacks when teammates hit targets.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Mortefi.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Mortefi.png",
    bestWeapon: {
      name: "Static Mist",
      rarity: 5,
      details: "Increases Crit Rate and boosts outgoing character ATK. Excellent off-field scaling weapon."
    },
    f2pWeapon: {
      name: "Cadenza (F2P)",
      rarity: 4,
      details: "Restores energy on hit, reducing his ultimate uptime requirements. Highly recommended for smooth team rotations."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Moonlit Clouds (5-Piece) | Main Echo: Impermanence Heron",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Energy Recharge | Cost 1: ATK%",
      subStats: "Energy Recharge > Crit Rate > Crit DMG > ATK% > Skill DMG"
    },
    teamComps: [
      { name: "Jiyan Premium Pair", members: ["Mortefi", "Jiyan", "Verina"] },
      { name: "F2P Heavy Buff", members: ["Mortefi", "Rover", "Baizhi"] }
    ],
    pakistaniTips: "The absolute best partner for Jiyan. His Outro buffs heavy attacks by 38%. Ensure he is equipped with the 5-piece Moonlit Clouds set. Because his ultimate triggers coordinated attacks automatically, ping fluctuations will not reduce his performance."
  },
  {
    id: "danjin",
    title: "Pioneer Association Ranger",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Pioneer Association",
    birthday: "October 30",
    constellation: "Sanguis",
    history: "Danjin is a devoted member of the Pioneer Association, traveling the land to hunt down rogue criminals and protect innocent travelers. She has a deep, obsessive hatred for injustice, utilizing her own life force (represented as crimson Havoc blades) to execute devastating slashes, constantly pushing herself to the edge of exhaustion.",
    name: "Danjin",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Havoc",
    weapon: "Sword",
    role: "Main DPS / Havoc Buffer",
    description: "A volunteer patroller, Danjin consumes her own HP to execute swift, bleeding sword slices.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Danjin.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Danjin.png",
    bestWeapon: {
      name: "Emerald of Genesis",
      rarity: 5,
      details: "Provides Crit Rate and Energy Recharge, stabilizing her high-frequency skill sweeps."
    },
    f2pWeapon: {
      name: "Luming Sword (F2P)",
      rarity: 4,
      details: "Boosts Skill DMG. Fits her spammy playstyle perfectly, keeping her personal DPS competitive."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Sun-sinking Eclipse (5-Piece) | Main Echo: Crownless",
      mainStats: "Cost 4: Crit Rate / Crit DMG | Cost 3: Havoc DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Skill DMG > ATK% > ER%"
    },
    teamComps: [
      { name: "Havoc Shred", members: ["Danjin", "Rover", "Verina"] },
      { name: "Danjin Hyper", members: ["Danjin", "Sanhua", "Shorekeeper"] }
    ],
    pakistaniTips: "Highly rewarding but risky. Since Danjin fights at low HP, lag spikes can cause you to get one-shot. Run a strong shielder or healer like Baizhi or Taoqi on budget connections. Her Outro shreds Havoc resistance by 23%, making her a top support for Rover."
  },
  {
    id: "taoqi",
    title: "Patroller Defense lead",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Jinzhou Patrollers",
    birthday: "May 25",
    constellation: "Tortoise",
    history: "Taoqi is the defense coordinator for the Jinzhou Patrollers. Often seen as sleepy, lazy, and relaxed off-duty, she transforms into an immovable wall on the battlefield. Wielding a massive broadblade, she uses her defensive barriers to protect civilians and patrollers, absorbing enemy blows with quiet efficiency.",
    name: "Taoqi",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Havoc",
    weapon: "Broadblade",
    role: "Shield Support / Skill Buffer",
    description: "Director of Jinzhou border defense. Wields a giant shield-broadblade to protect her team and block strikes.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Taoqi.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Taoqi.png",
    bestWeapon: {
      name: "Dauntless Everlasting",
      rarity: 5,
      details: "Grants massive Defense scaling and heals the character upon blocking, reinforcing her defensive role."
    },
    f2pWeapon: {
      name: "Broadblade#41 (F2P)",
      rarity: 4,
      details: "Craftable. Generates energy and heals the character, making it a very reliable budget broadblade."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Rejuvenating Glow or Moonlit Clouds | Main Echo: Bell-Borne",
      mainStats: "Cost 4: Defense% | Cost 3: Energy Recharge | Cost 1: Defense%",
      subStats: "Defense% > Energy Recharge > Flat Defense > HP%"
    },
    teamComps: [
      { name: "Safe Gacha Shield", members: ["Taoqi", "Calcharo", "Verina"] },
      { name: "F2P Tank", members: ["Taoqi", "Rover", "Baizhi"] }
    ],
    pakistaniTips: "Taoqi offers an ironclad shield. Her counter-attack frames are very generous, which is incredibly useful for players dealing with latency on local copper lines. Build her with high Defense to maximize shield strength."
  },
  {
    id: "jianxin",
    title: "Taoist Disciple",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Feilian Martial Arts",
    birthday: "July 7",
    constellation: "Taiji",
    history: "Jianxin is a dedicated martial artist who trained in isolation on a remote mountain peak. She descended to Jinzhou to test her skills in the mortal world and achieve enlightenment. She utilizes the flow of Qi to create defensive shields and pull enemies together in a perfect vortex, showing complete mastery of redirection.",
    name: "Jianxin",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Aero",
    weapon: "Gauntlets",
    role: "Shield / Crowd Control",
    description: "A Taoist monk who utilizes Tai Chi fields to absorb damage, heal allies, and group enemies together.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jianxin.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jianxin.png",
    bestWeapon: {
      name: "Abyss Surges",
      rarity: 5,
      details: "Standard 5-star gauntlets. Restores Energy and increases ATK when using skills."
    },
    f2pWeapon: {
      name: "Marcato (F2P)",
      rarity: 4,
      details: "Provides high energy recharge. Perfect for keeping her ultimate crowd-control vortex ready."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Sierra Gale or Rejuvenating Glow | Main Echo: Feilian Primal",
      mainStats: "Cost 4: Crit Rate / HP% | Cost 3: Aero DMG / ER% | Cost 1: ATK%",
      subStats: "Energy Recharge > Crit Rate > HP% > ATK%"
    },
    teamComps: [
      { name: "Vortex Pull", members: ["Jianxin", "Calcharo", "Verina"] },
      { name: "Aero F2P", members: ["Jianxin", "Yangyang", "Baizhi"] }
    ],
    pakistaniTips: "Her ultimate voretex pulls small enemies together, helping low-spec devices process targets cleaner. Her shield channel requires holding the attack key; this channel is immune to network lag once initialized. Build her as a support using Rejuvenating Glow."
  },
  {
    id: "lingyang",
    title: "Lion Dance Troupe Lead",
    gender: "Male",
    nation: "Huanglong",
    affiliation: "Liondance Association",
    birthday: "August 16",
    constellation: "Leo",
    history: "Lingyang is a cheerful, athletic performer who leads Jinzhou's traditional Lion Dance Troupe. Born as a beast-kin with a wild heritage, he was adopted and raised by humans in Jinzhou. He channels his natural agility and claw-like combat style into his performances and battles, leaping across the field to deliver Glacio punches.",
    name: "Lingyang",
    game: "Wuthering Waves",
    rarity: 5,
    element: "Glacio",
    weapon: "Gauntlets",
    role: "Main DPS",
    description: "A lion dancer performer who leaps into the air, executing rapid, floating Glacio claws.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Lingyang.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Lingyang.png",
    bestWeapon: {
      name: "Abyss Surges",
      rarity: 5,
      details: "Signature gauntlets. Increases standard attack multipliers, boosting his aerial combo damage."
    },
    f2pWeapon: {
      name: "Marcato (F2P)",
      rarity: 4,
      details: "Helps generate energy. A solid, accessible 4-star weapon for budget accounts."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Freezing Frost (5-Piece) | Main Echo: Lampylumen Myriad",
      mainStats: "Cost 4: Crit Rate | Cost 3: Glacio DMG | Cost 1: ATK%",
      subStats: "Crit Rate > Crit DMG > Normal Attack DMG > ATK%"
    },
    teamComps: [
      { name: "Lion Dance", members: ["Lingyang", "Sanhua", "Verina"] },
      { name: "F2P Ice claws", members: ["Lingyang", "Yangyang", "Baizhi"] }
    ],
    pakistaniTips: "Lingyang moves extensively in the air during his ultimate. If you play on mobile with high ping, keeping track of targets can be tricky. Adjust camera sensitivity to High to assist tracking during aerial sweeps. Sanhua is his best partner."
  },
  {
    id: "aalto",
    title: "Information Broker",
    gender: "Male",
    nation: "Unknown",
    affiliation: "The Black Shores",
    birthday: "November 22",
    constellation: "Nebula",
    history: "Aalto is a silver-tongued information broker and operative for the Black Shores, traveling with his partner Encore. He uses mist-generating pistols to create decoys and obscure the battlefield, hiding his true intentions behind a cheerful, lazy facade while securing valuable data for the organization.",
    name: "Aalto",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Aero",
    weapon: "Pistols",
    role: "Sub-DPS / Aero Buffer",
    description: "An information broker of the Black Shores. Creates mist clones to taunt targets and fires rapid wind bullets.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Aalto.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Aalto.png",
    bestWeapon: {
      name: "Static Mist",
      rarity: 5,
      details: "Standard 5-star pistols. Enhances active swap-out stats and boosts Crit Rate."
    },
    f2pWeapon: {
      name: "Cadenza (F2P)",
      rarity: 4,
      details: "Triggers concert energy particles, speeding up team swap-out thresholds."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Moonlit Clouds (5-Piece) | Main Echo: Heron",
      mainStats: "Cost 4: Crit Rate | Cost 3: Aero DMG / ER% | Cost 1: ATK%",
      subStats: "Energy Recharge > Crit Rate > Crit DMG > ATK%"
    },
    teamComps: [
      { name: "Aero Dash", members: ["Aalto", "Jiyan", "Verina"] },
      { name: "F2P Mist", members: ["Aalto", "Chixia", "Baizhi"] }
    ],
    pakistaniTips: "His Outro buffs Aero DMG by 23%. Perfect support for Jiyan if you do not have Mortefi. His mist gates speed up characters passing through, making it easy to run away from boss attacks during network lag."
  },
  {
    id: "yuanwu",
    title: "Boxing Gym Owner",
    gender: "Male",
    nation: "Huanglong",
    affiliation: "Jinzhou Ring",
    birthday: "October 5",
    constellation: "Tiger",
    history: "Yuanwu is a mature, gentle boxing gym owner in Jinzhou who serves tea and teaches self-defense to local citizens. In his past, he was a famous underground fighter. He uses a metallic ring to conduct high-voltage Electro energy, executing fast and heavy boxing combos that break enemy defensive stances.",
    name: "Yuanwu",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Electro",
    weapon: "Gauntlets",
    role: "Coordinated Sub-DPS",
    description: "Owner of a boxing gym. Plants a lightning pillar that attacks alongside active characters automatically.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Yuanwu.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Yuanwu.png",
    bestWeapon: {
      name: "Abyss Surges",
      rarity: 5,
      details: "Signature gauntlets. Increases Base ATK, improving his personal sub-DPS scaling."
    },
    f2pWeapon: {
      name: "Marcato (F2P)",
      rarity: 4,
      details: "Provides energy recharge. Highly accessible gauntlet obtained from standard pools."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Moonlit Clouds (5-Piece) | Main Echo: Bell-Borne",
      mainStats: "Cost 4: Defense / Crit | Cost 3: Energy Recharge | Cost 1: Defense%",
      subStats: "Energy Recharge > Defense% > HP% > Def"
    },
    teamComps: [
      { name: "Jinhsi Assist Core", members: ["Yuanwu", "Jinhsi", "Baizhi"] },
      { name: "Yuanwu Electro", members: ["Yuanwu", "Yinlin", "Verina"] }
    ],
    pakistaniTips: "Yuanwu is the ultimate low-investment helper for Jinhsi. You only need to drop his skill (pillar) and switch out. He requires zero field time and scales with Defense, making him incredibly cheap to build. Highly recommended for high ping players."
  },
  {
    id: "yangyang",
    title: "Outrider Patroller",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Jinzhou Patrollers",
    birthday: "April 2",
    constellation: "Lark",
    history: "Yangyang is a gentle and empathetic Outrider Patroller in Jinzhou, often serving as a guide to travelers. She has a unique connection to the wind, allowing her to sense emotions and structural changes in the air. Wielding a light sword, she creates wind vortexes that group enemies and restore energy to her allies.",
    name: "Yangyang",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Aero",
    weapon: "Sword",
    role: "Battery / Support",
    description: "An outrider of the Midnight Rangers. Uses wind currents to group targets and restore energy to teammates.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Yangyang.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Yangyang.png",
    bestWeapon: {
      name: "Emerald of Genesis",
      rarity: 5,
      details: "Improves Crit Rate, providing excellent stats for her sub-DPS sweeps."
    },
    f2pWeapon: {
      name: "Luming Sword (F2P)",
      rarity: 4,
      details: "Standard craftable sword. Boosts skill DMG and recovers energy upon hits."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Moonlit Clouds (5-Piece) | Main Echo: Heron",
      mainStats: "Cost 4: Crit Rate | Cost 3: Energy Recharge | Cost 1: ATK%",
      subStats: "Energy Recharge > Crit Rate > Crit DMG > ATK%"
    },
    teamComps: [
      { name: "F2P Aero Battery", members: ["Yangyang", "Jiyan", "Baizhi"] },
      { name: "Wind Pull", members: ["Yangyang", "Rover", "Verina"] }
    ],
    pakistaniTips: "Yangyang's Outro restores 4 Energy per second for 5 seconds to the next character. This battery effect is excellent for energy-hungry characters. If on high ping, her simple skills are easy to hit and auto-target reliably."
  },
  {
    id: "youhu",
    title: "Antiques Appraiser",
    gender: "Female",
    nation: "Huanglong",
    affiliation: "Jinzhou Treasury",
    birthday: "November 1",
    constellation: "Pixiu",
    history: "Youhu is an energetic young appraiser at the Jinzhou Treasury, obsessed with finding and identifying ancient artifacts and treasures. She carries a giant, magical toy scroll box on her back that randomizes attacks, throwing antique jars, scrolls, and coins at Tacet Discords while healing her companions.",
    name: "Youhu",
    game: "Wuthering Waves",
    rarity: 4,
    element: "Glacio",
    weapon: "Gauntlets",
    role: "Healer / Buffer",
    description: "An antique appraiser, Youhu retrieves random treasures from her scroll to heal and buff teammates.",
    icon: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Youhu.png",
    splash: "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Youhu.png",
    bestWeapon: {
      name: "Abyss Surges",
      rarity: 5,
      details: "Increases raw stats and heals based on her attack power."
    },
    f2pWeapon: {
      name: "Marcato (F2P)",
      rarity: 4,
      details: "Boosts Energy Recharge. Essential for keeping her ultimate scroll active."
    },
    bestArtifacts: null,
    bestEchoes: {
      set: "Rejuvenating Glow (5-Piece) | Main Echo: Bell-Borne",
      mainStats: "Cost 4: Healing Bonus | Cost 3: Energy Recharge | Cost 1: ATK%",
      subStats: "Energy Recharge > ATK% > HP% > Def%"
    },
    teamComps: [
      { name: "F2P Ice Scroll", members: ["Youhu", "Sanhua", "Baizhi"] },
      { name: "Glacio Buffer", members: ["Youhu", "Jinhsi", "Verina"] }
    ],
    pakistaniTips: "Youhu has a unique 'antique appraisal' scroll mechanic. If you have packet loss, the antique indicators might occasionally display with delay; simply spam her attack key to finalize the healing sweep."
  }
];
