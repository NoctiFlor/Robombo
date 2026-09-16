/**
 * Robombo 3D - Deluxe House Flipper Edition
 * Realistic 1st-Person Cockpit Camera, Interactive 3D Dirt/Shine Canvas Overlays,
 * In-Place Furniture Renovation (Zero-Reset), Autonomous Return-to-Dock Autopilot,
 * Tight Smooth Slide Collisions, High-Tech LiDAR Radar & Real Estate Portfolio.
 */

// --- ASMR SOUND SYSTEM (Web Audio API Synthesizer) ---
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.motorOsc = null;
    this.motorGain = null;
    this.motorFilter = null;
    this.enabled = true;
    this.isMotorRunning = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch(e) {}
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startMotor() {
    if (!this.enabled || !this.ctx || this.motorOsc) return;
    try {
      this.motorOsc = this.ctx.createOscillator();
      this.motorFilter = this.ctx.createBiquadFilter();
      this.motorGain = this.ctx.createGain();

      this.motorOsc.type = 'sawtooth';
      this.motorOsc.frequency.setValueAtTime(50, this.ctx.currentTime);

      this.motorFilter.type = 'lowpass';
      this.motorFilter.frequency.setValueAtTime(200, this.ctx.currentTime);

      this.motorGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      this.motorOsc.connect(this.motorFilter);
      this.motorFilter.connect(this.motorGain);
      this.motorGain.connect(this.ctx.destination);

      this.motorOsc.start();
      this.isMotorRunning = true;
    } catch(e) {}
  }

  updateMotor(isMoving, isTurbo, speedRatio = 1) {
    if (!this.motorOsc || !this.ctx) return;
    const now = this.ctx.currentTime;
    let targetFreq = 48;
    let targetGain = 0.015;
    let targetFilter = 160;

    if (isMoving) {
      targetFreq = 80 + speedRatio * 30;
      targetGain = isTurbo ? 0.07 : 0.045;
      targetFilter = isTurbo ? 420 : 260;
    }
    if (isTurbo && isMoving) {
      targetFreq += 35;
    }

    this.motorOsc.frequency.setTargetAtTime(targetFreq, now, 0.1);
    this.motorFilter.frequency.setTargetAtTime(targetFilter, now, 0.1);
    this.motorGain.gain.setTargetAtTime(this.enabled ? targetGain : 0, now, 0.1);
  }

  playCrackle() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100 + Math.random() * 700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.03);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  }

  playMopSwish() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.11);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }

  playChime(pitchMultiplier = 1) {
    if (!this.enabled || !this.ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50].map(f => f * pitchMultiplier);
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);
        gain.gain.setValueAtTime(0.07, this.ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.04 + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.04);
        osc.stop(this.ctx.currentTime + idx * 0.04 + 0.35);
      });
    } catch(e) {}
  }

  playCoin() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch(e) {}
  }

  playUVToggle(isOn) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isOn ? 440 : 880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isOn ? 880 : 330, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch(e) {}
  }
}

// --- GAME STATE ---
const GameState = {
  coins: 0,
  level: 1,
  cleanPercent: 0,
  shinePercent: 0,
  houseValue: 15000,
  battery: 100,
  maxBattery: 100,
  dust: 0,
  maxDust: 50,
  water: 100,
  maxWater: 100,
  hasMop: false,
  isTurbo: false,
  isUV: false,
  controlMode: 'dpad',
  cameraMode: 'pov',       // 'pov' (Cockpit Hood), 'follow' (3D Third-Person), 'top' (Overhead)
  isDocked: true,
  isCharging: true,
  isAutoDocking: false,
  isGameOver: false,
  soundEnabled: true,
  
  upgrades: {
    battery: 1,
    charge: 1,
    suction: 1,
    speed: 1,
    bin: 1,
    water: 1,
    mop: 0
  },

  modules: {
    magnet: false,
    steam: false,
    laser: false
  },

  renovations: {
    sofa: false,
    tv: false,
    table: false,
    lamp: false,
    plant: false
  },
  
  unlockedProperties: [1],
  currentSkin: 'white',
  ownedSkins: ['white']
};

// House Flipper Properties Catalog
const PROPERTIES = [
  {
    id: 1,
    name: "Terk Edilmiş Bekar Evi",
    desc: "Yıllardır temizlenmemiş, kalın toz ve döküntülerle dolu stüdyo daire.",
    basePrice: 15000,
    size: { width: 15, length: 13 },
    floorColor: 0xc89666,
    wallColor: 0x1e293b,
    dockPos: { x: -6.2, z: -5.2, rot: Math.PI / 2 },
    trashCount: 85,
    stainCount: 7,
    secretGoldCount: 10,
    catPos: { x: 1.5, z: 1.0 },
    furniture: [
      { id: 'sofa', type: 'modern_sofa', x: 0, z: -3.5, rot: 0, w: 3.4, l: 1.2, h: 0.85 },
      { id: 'tv', type: 'tv_cabinet_with_tv', x: 0, z: 5.2, rot: Math.PI, w: 3.6, l: 0.8, h: 1.4 },
      { id: 'table', type: 'coffee_table', x: 0, z: 0.5, rot: 0, w: 1.8, l: 1.0, h: 0.5 },
      { id: 'armchair', type: 'armchair', x: 4.5, z: -1.2, rot: -Math.PI / 3, w: 1.2, l: 1.2, h: 0.8 },
      { id: 'plant', type: 'potted_plant', x: -5.8, z: 4.8, w: 0.8, l: 0.8, h: 1.4 },
      { id: 'bookshelf', type: 'bookshelf', x: 6.2, z: 2.2, rot: -Math.PI / 2, w: 0.9, l: 2.2, h: 2.0 },
      { id: 'lamp', type: 'floor_lamp', x: -4.2, z: -4.8, w: 0.6, l: 0.6, h: 1.8 }
    ]
  },
  {
    id: 2,
    name: "Yağlı Kafe & Mutfak Alanı",
    desc: "Ağır kahve, ketçap ve yağ lekeleriyle kaplı yoğun bir restoran mutfağı.",
    basePrice: 28000,
    size: { width: 17, length: 15 },
    floorColor: 0x94a3b8,
    wallColor: 0x0f172a,
    dockPos: { x: -7.2, z: -6.2, rot: Math.PI / 2 },
    trashCount: 110,
    stainCount: 14,
    secretGoldCount: 14,
    catPos: { x: -2.5, z: 2.0 },
    furniture: [
      { id: 'kitchen_l', type: 'kitchen_counter_l', x: 4.2, z: -5.0, w: 4.0, l: 1.5, h: 0.9 },
      { id: 'island', type: 'kitchen_island', x: 3.8, z: 0.5, w: 2.5, l: 1.4, h: 0.9 },
      { id: 'table', type: 'dining_set', x: -3.2, z: 1.5, w: 2.4, l: 1.4, h: 0.8 },
      { id: 'fridge', type: 'refrigerator', x: -7.0, z: -3.0, rot: Math.PI / 2, w: 1.2, l: 1.2, h: 2.1 },
      { id: 'trash', type: 'trashcan', x: 7.0, z: 6.0, w: 0.8, l: 0.8, h: 0.9 },
      { id: 'plant', type: 'potted_plant', x: -6.8, z: 6.0, w: 0.8, l: 0.8, h: 1.4 }
    ]
  },
  {
    id: 3,
    name: "Dağınık Çocuklu Dubleks",
    desc: "Yerde rengarenk oyuncaklar, meyve suyu lekeleri ve pati izleri olan geniş oda.",
    basePrice: 45000,
    size: { width: 16, length: 16 },
    floorColor: 0xfde047,
    wallColor: 0x0284c7,
    dockPos: { x: -6.5, z: -6.5, rot: Math.PI / 2 },
    trashCount: 140,
    stainCount: 16,
    secretGoldCount: 18,
    catPos: { x: 0, z: 0 },
    furniture: [
      { id: 'bed', type: 'kids_bed', x: -4.5, z: -4.2, rot: 0, w: 2.4, l: 3.2, h: 0.9 },
      { id: 'desk', type: 'study_desk', x: 5.2, z: 3.2, rot: -Math.PI / 2, w: 2.2, l: 1.2, h: 0.8 },
      { id: 'chest', type: 'toy_chest', x: 4.5, z: -5.2, rot: 0, w: 1.6, l: 1.0, h: 0.6 },
      { id: 'tent', type: 'play_tent', x: -4.2, z: 4.2, w: 1.8, l: 1.8, h: 1.6 },
      { id: 'lego1', type: 'lego_tower', x: 0, z: 2.0, color: 0xef4444, w: 0.8, l: 0.8, h: 0.8 },
      { id: 'lego2', type: 'lego_tower', x: 2.0, z: -1.0, color: 0x10b981, w: 0.8, l: 0.8, h: 0.8 },
      { id: 'plant', type: 'potted_plant', x: 6.2, z: -1.8, w: 0.8, l: 0.8, h: 1.4 }
    ]
  },
  {
    id: 4,
    name: "Lüks Boğaz Manzaralı Penthouse",
    desc: "Büyük mermer salon. Doğru eşyalar ve ayna parlaklığıyla servet kazandırır!",
    basePrice: 95000,
    size: { width: 20, length: 18 },
    floorColor: 0xffffff,
    wallColor: 0x020617,
    dockPos: { x: -8.8, z: -7.8, rot: Math.PI / 2 },
    trashCount: 160,
    stainCount: 18,
    secretGoldCount: 22,
    catPos: { x: 3.0, z: -1.0 },
    furniture: [
      { id: 'sofa', type: 'grand_l_sofa', x: 0, z: -4.0, w: 4.2, l: 1.8, h: 0.9 },
      { id: 'table', type: 'luxury_glass_table', x: 0, z: -0.5, w: 2.4, l: 1.4, h: 0.5 },
      { id: 'piano', type: 'grand_piano', x: 6.8, z: -5.2, rot: -Math.PI / 4, w: 2.4, l: 2.4, h: 1.2 },
      { id: 'fireplace', type: 'fireplace', x: -8.8, z: 0.5, rot: Math.PI / 2, w: 1.2, l: 2.6, h: 1.5 },
      { id: 'credenza', type: 'modern_credenza', x: 0, z: 7.8, rot: Math.PI, w: 3.8, l: 1.0, h: 0.9 },
      { id: 'plant', type: 'potted_plant', x: 7.8, z: 6.8, w: 0.8, l: 0.8, h: 1.4 },
      { id: 'lamp', type: 'floor_lamp', x: -4.0, z: -6.8, w: 0.6, l: 0.6, h: 1.8 }
    ]
  }
];

function applyUpgrades() {
  GameState.maxBattery = 100 + (GameState.upgrades.battery - 1) * 35;
  GameState.maxDust = 50 + (GameState.upgrades.bin - 1) * 30;
  GameState.maxWater = 100 + (GameState.upgrades.water - 1) * 40;
  GameState.hasMop = GameState.upgrades.mop >= 1;
}

function loadSavedData() {
  try {
    const saved = localStorage.getItem('robombo_save_v4');
    if (saved) {
      const data = JSON.parse(saved);
      GameState.coins = data.coins || 0;
      GameState.level = data.level || 1;
      GameState.upgrades = data.upgrades || GameState.upgrades;
      GameState.modules = data.modules || GameState.modules;
      GameState.renovations = data.renovations || GameState.renovations;
      GameState.unlockedProperties = data.unlockedProperties || [1];
      GameState.currentSkin = data.currentSkin || 'white';
      GameState.ownedSkins = data.ownedSkins || ['white'];
      GameState.controlMode = data.controlMode || 'dpad';
      GameState.cameraMode = data.cameraMode || 'pov';
    }
  } catch(e) {}
  applyUpgrades();
}

function saveData() {
  try {
    const data = {
      coins: GameState.coins,
      level: GameState.level,
      upgrades: GameState.upgrades,
      modules: GameState.modules,
      renovations: GameState.renovations,
      unlockedProperties: GameState.unlockedProperties,
      currentSkin: GameState.currentSkin,
      ownedSkins: GameState.ownedSkins,
      controlMode: GameState.controlMode,
      cameraMode: GameState.cameraMode
    };
    localStorage.setItem('robombo_save_v4', JSON.stringify(data));
  } catch(e) {}
}

// --- LIQUID STAIN CLASS ---
class LiquidStain {
  constructor(scene, x, z, type = 'coffee') {
    this.scene = scene;
    this.pos = { x, z };
    this.type = type;
    this.radius = 0.50 + Math.random() * 0.30;
    this.health = 100;
    this.cleaned = false;

    this.group = new THREE.Group();
    this.createModel();
    this.group.position.set(x, 0.008, z);
    this.scene.add(this.group);
  }

  createModel() {
    let stainColor = 0x3b1e08; // Coffee
    let roughness = 0.2;
    if (this.type === 'ketchup') {
      stainColor = 0x991b1b;
      roughness = 0.15;
    } else if (this.type === 'mud') {
      stainColor = 0x451a03;
      roughness = 0.7;
    }

    const geo = new THREE.CircleGeometry(this.radius, 16);
    this.mat = new THREE.MeshStandardMaterial({
      color: stainColor,
      roughness: roughness,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    const mesh = new THREE.Mesh(geo, this.mat);
    mesh.rotation.x = -Math.PI / 2;
    this.group.add(mesh);
  }

  scrub(amount) {
    if (this.cleaned) return false;
    this.health -= amount;
    this.mat.opacity = Math.max(0.1, (this.health / 100) * 0.85);
    this.group.scale.setScalar(Math.max(0.2, this.health / 100));

    if (this.health <= 0) {
      this.cleaned = true;
      this.scene.remove(this.group);
      return true;
    }
    return false;
  }

  dispose() {
    if (this.group) {
      this.scene.remove(this.group);
      this.group.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
  }
}

// --- SECRET UV ITEM ---
class SecretUVItem {
  constructor(scene, x, z, isGold = true) {
    this.scene = scene;
    this.pos = { x, z };
    this.isGold = isGold;
    this.collected = false;

    this.group = new THREE.Group();
    if (isGold) {
      const geo = new THREE.OctahedronGeometry(0.11);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.9,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = 0.12;
      this.group.add(mesh);
    } else {
      const geo = new THREE.CircleGeometry(0.35, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        emissive: 0x16a34a,
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.85
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 0.009;
      this.group.add(mesh);
    }

    this.group.position.set(x, 0, z);
    this.group.visible = false;
    this.scene.add(this.group);
  }

  update(isUV) {
    if (this.collected) return;
    this.group.visible = isUV;
    if (isUV && this.isGold) {
      this.group.rotation.y += 0.04;
    }
  }

  collect() {
    if (this.collected) return;
    this.collected = true;
    this.scene.remove(this.group);
  }

  dispose() {
    if (this.group) {
      this.scene.remove(this.group);
      this.group.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
  }
}

// --- REALISTIC 3D MICRO-TRASH FACTORY ---
class RealisticTrashFactory {
  static create(type, x, z) {
    const group = new THREE.Group();
    const baseMaterials = [];

    switch(type) {
      case 'popcorn': {
        // Multi-lobed buttery popcorn cluster
        const popMat = new THREE.MeshStandardMaterial({
          color: 0xfef9c3,
          roughness: 0.9,
          emissive: 0x000000
        });
        const butterMat = new THREE.MeshStandardMaterial({
          color: 0xfde047,
          roughness: 0.7,
          emissive: 0x000000
        });
        baseMaterials.push(popMat, butterMat);

        const core = new THREE.Mesh(new THREE.SphereGeometry(0.035, 7, 7), butterMat);
        core.position.set(0, 0.035, 0);
        group.add(core);

        const offsets = [
          [-0.022, 0.042, 0.015, 0.026],
          [0.024, 0.040, -0.012, 0.028],
          [-0.010, 0.052, -0.018, 0.024],
          [0.016, 0.054, 0.020, 0.023]
        ];
        offsets.forEach(([ox, oy, oz, r]) => {
          const lobe = new THREE.Mesh(new THREE.SphereGeometry(r, 6, 6), popMat);
          lobe.position.set(ox, oy, oz);
          group.add(lobe);
        });
        break;
      }

      case 'cookie': {
        // Golden baked chocolate chip cookie
        const cookieMat = new THREE.MeshStandardMaterial({ color: 0xc27803, roughness: 0.85 });
        const chipMat = new THREE.MeshStandardMaterial({ color: 0x271406, roughness: 0.4 });
        baseMaterials.push(cookieMat, chipMat);

        const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.056, 0.018, 10), cookieMat);
        disc.position.set(0, 0.012, 0);
        disc.rotation.y = Math.random() * Math.PI;
        group.add(disc);

        const chipOffsets = [
          [-0.020, 0.022, 0.016],
          [0.018, 0.022, -0.014],
          [-0.007, 0.022, -0.022],
          [0.014, 0.022, 0.022]
        ];
        chipOffsets.forEach(([cx, cy, cz]) => {
          const chip = new THREE.Mesh(new THREE.DodecahedronGeometry(0.011), chipMat);
          chip.position.set(cx, cy, cz);
          chip.rotation.set(Math.random(), Math.random(), Math.random());
          group.add(chip);
        });
        break;
      }

      case 'candy': {
        // Sweet candy with twisted fan wrapper ends
        const candyColors = [0xec4899, 0x06b6d4, 0x10b981, 0x8b5cf6, 0xf59e0b];
        const chosenColor = candyColors[Math.floor(Math.random() * candyColors.length)];
        const candyMat = new THREE.MeshStandardMaterial({
          color: chosenColor,
          roughness: 0.25,
          metalness: 0.1
        });
        const wrapMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.35,
          transparent: true,
          opacity: 0.85
        });
        baseMaterials.push(candyMat, wrapMat);

        const body = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), candyMat);
        body.scale.set(1.4, 0.85, 0.85);
        body.position.set(0, 0.026, 0);
        group.add(body);

        const wrapL = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.032, 6), wrapMat);
        wrapL.position.set(-0.050, 0.026, 0);
        wrapL.rotation.z = Math.PI / 2;
        group.add(wrapL);

        const wrapR = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.032, 6), wrapMat);
        wrapR.position.set(0.050, 0.026, 0);
        wrapR.rotation.z = -Math.PI / 2;
        group.add(wrapR);
        break;
      }

      case 'dust_bunny': {
        // Soft fluffy dust bunny with organic tufts
        const dustMat = new THREE.MeshStandardMaterial({
          color: 0x64748b,
          roughness: 0.95
        });
        baseMaterials.push(dustMat);

        const mainCluster = new THREE.Mesh(new THREE.SphereGeometry(0.050, 8, 8), dustMat);
        mainCluster.position.set(0, 0.040, 0);
        mainCluster.scale.set(1.2, 0.8, 1.1);
        group.add(mainCluster);

        const subLobe = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 6), dustMat);
        subLobe.position.set(0.032, 0.032, 0.018);
        group.add(subLobe);
        break;
      }

      case 'coin': {
        // Shiny metallic flipped coin
        const coinMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          metalness: 0.95,
          roughness: 0.15
        });
        baseMaterials.push(coinMat);

        const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.050, 0.050, 0.011, 16), coinMat);
        coin.position.set(0, 0.009, 0);
        coin.rotation.z = 0.10;
        coin.rotation.y = Math.random() * Math.PI;
        group.add(coin);
        break;
      }

      case 'paper': {
        // Multi-faceted crumpled paper receipt
        const paperMat = new THREE.MeshStandardMaterial({
          color: 0xf8fafc,
          roughness: 0.8
        });
        baseMaterials.push(paperMat);

        const crumpled = new THREE.Mesh(new THREE.IcosahedronGeometry(0.042, 0), paperMat);
        crumpled.scale.set(1.2, 0.75, 1.1);
        crumpled.position.set(0, 0.028, 0);
        crumpled.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        group.add(crumpled);
        break;
      }

      case 'kibble': {
        // Crunchy pet food kibble pellet
        const kibbleMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
        baseMaterials.push(kibbleMat);

        const kibble = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.040, 0.030, 6), kibbleMat);
        kibble.position.set(0, 0.018, 0);
        kibble.rotation.set(0.12, Math.random() * Math.PI, 0.1);
        group.add(kibble);
        break;
      }

      case 'screw': {
        // Shiny metal nut and bolt
        const screwMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          metalness: 0.88,
          roughness: 0.22
        });
        baseMaterials.push(screwMat);

        const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.020, 6), screwMat);
        nut.position.set(0, 0.010, 0);
        group.add(nut);
        break;
      }

      default: {
        const mat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 });
        baseMaterials.push(mat);
        const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.04), mat);
        m.position.set(0, 0.025, 0);
        group.add(m);
      }
    }

    group.position.set(x, 0, z);
    group.rotation.y = Math.random() * Math.PI * 2;

    return {
      group,
      type,
      pos: { x, z },
      collected: false,
      isSucking: false,
      suckProgress: 0,
      baseMaterials,
      updateUV(isUV) {
        baseMaterials.forEach(m => {
          if (isUV) {
            if (type === 'dust_bunny') {
              m.emissive = new THREE.Color(0xa855f7);
              m.emissiveIntensity = 0.90;
            } else if (type === 'popcorn' || type === 'cookie') {
              m.emissive = new THREE.Color(0x38bdf8);
              m.emissiveIntensity = 0.50;
            } else if (type === 'coin') {
              m.emissive = new THREE.Color(0xf59e0b);
              m.emissiveIntensity = 0.65;
            } else {
              m.emissive = new THREE.Color(0x8b5cf6);
              m.emissiveIntensity = 0.40;
            }
          } else {
            m.emissive = new THREE.Color(0x000000);
            m.emissiveIntensity = 0;
          }
        });
      }
    };
  }
}

// --- FLUORESCENT UV DUST PARTICLE FIELD ---
class UVDustParticleField {
  constructor(scene, width, length) {
    this.scene = scene;
    this.count = 220;
    this.positions = new Float32Array(this.count * 3);
    this.baseColors = new Float32Array(this.count * 3);
    this.velocities = [];

    const colorPalette = [
      new THREE.Color(0xc084fc), // Violet
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x4ade80), // Neon Mint
      new THREE.Color(0xfde047)  // Gold Spark
    ];

    for (let i = 0; i < this.count; i++) {
      this.positions[i * 3] = (Math.random() - 0.5) * (width - 1.5);
      this.positions[i * 3 + 1] = 0.02 + Math.random() * 0.9;
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * (length - 1.5);

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      this.baseColors[i * 3] = col.r;
      this.baseColors[i * 3 + 1] = col.g;
      this.baseColors[i * 3 + 2] = col.b;

      this.velocities.push({
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.03,
        vz: (Math.random() - 0.5) * 0.06,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 1 + Math.random() * 2
      });
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.baseColors, 3));

    // Canvas round glow texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);

    this.material = new THREE.PointsMaterial({
      size: 0.12,
      map: tex,
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  update(delta, isUV, robotPos, suctionRadius, roomWidth, roomLength) {
    if (!this.geometry) return;
    const posAttr = this.geometry.attributes.position;
    const posArr = posAttr.array;

    const targetOpacity = isUV ? 0.92 : 0.15;
    const targetSize = isUV ? 0.17 : 0.08;
    this.material.opacity += (targetOpacity - this.material.opacity) * Math.min(1, delta * 5);
    this.material.size += (targetSize - this.material.size) * Math.min(1, delta * 5);

    for (let i = 0; i < this.count; i++) {
      const idx = i * 3;
      const v = this.velocities[i];
      v.wobble += v.wobbleSpeed * delta;

      posArr[idx] += (v.vx + Math.sin(v.wobble) * 0.02) * delta;
      posArr[idx + 1] += (v.vy + Math.cos(v.wobble) * 0.015) * delta;
      posArr[idx + 2] += (v.vz + Math.cos(v.wobble * 0.8) * 0.02) * delta;

      // Vacuum suction attraction
      const dx = robotPos.x - posArr[idx];
      const dz = robotPos.z - posArr[idx + 2];
      const dist = Math.hypot(dx, dz);

      if (dist < suctionRadius * 2.2) {
        const pullSpeed = (1 - dist / (suctionRadius * 2.2)) * 3.5;
        posArr[idx] += dx * pullSpeed * delta;
        posArr[idx + 2] += dz * pullSpeed * delta;
        posArr[idx + 1] = Math.max(0.01, posArr[idx + 1] - 0.8 * delta);

        if (dist < suctionRadius * 0.5) {
          posArr[idx] = (Math.random() - 0.5) * (roomWidth - 1.5);
          posArr[idx + 1] = 0.05 + Math.random() * 0.8;
          posArr[idx + 2] = (Math.random() - 0.5) * (roomLength - 1.5);
        }
      }

      const halfW = (roomWidth - 1.0) / 2;
      const halfL = (roomLength - 1.0) / 2;
      if (posArr[idx] < -halfW) posArr[idx] = halfW;
      if (posArr[idx] > halfW) posArr[idx] = -halfW;
      if (posArr[idx + 2] < -halfL) posArr[idx + 2] = halfL;
      if (posArr[idx + 2] > halfL) posArr[idx + 2] = -halfL;
      if (posArr[idx + 1] < 0.01) posArr[idx + 1] = 0.8;
      if (posArr[idx + 1] > 1.2) posArr[idx + 1] = 0.02;
    }

    posAttr.needsUpdate = true;
  }

  dispose() {
    if (this.points) {
      this.scene.remove(this.points);
      if (this.geometry) this.geometry.dispose();
      if (this.material) this.material.dispose();
    }
  }
}

// --- BUBBLE EMITTER ---
class BubbleEmitter {
  constructor(scene) {
    this.scene = scene;
    this.bubbles = [];
    this.geo = new THREE.SphereGeometry(0.04, 8, 8);
    this.mat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    });
  }

  emit(x, z, count = 2) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(this.geo, this.mat);
      mesh.position.set(
        x + (Math.random() - 0.5) * 0.35,
        0.04 + Math.random() * 0.04,
        z + (Math.random() - 0.5) * 0.35
      );
      this.scene.add(mesh);
      this.bubbles.push({
        mesh,
        life: 0.8,
        vy: 0.35 + Math.random() * 0.3
      });
    }
  }

  update(delta) {
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      b.life -= delta * 2;
      b.mesh.position.y += b.vy * delta;
      b.mesh.scale.setScalar(Math.max(0.1, b.life));
      if (b.life <= 0) {
        this.scene.remove(b.mesh);
        b.mesh.geometry.dispose();
        this.bubbles.splice(i, 1);
      }
    }
  }

  dispose() {
    this.bubbles.forEach(b => {
      this.scene.remove(b.mesh);
      b.mesh.geometry.dispose();
    });
    this.bubbles = [];
  }
}

// --- WANDERING CAT (ROOM SIZED ROAMING) ---
class PetCat {
  constructor(scene, initialPos, roomSize = { width: 16, length: 14 }) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.pos = { x: initialPos.x, z: initialPos.z || initialPos.y };
    this.targetPos = { x: this.pos.x, z: this.pos.z };
    this.roomSize = roomSize;
    this.wanderTimer = 2.0;

    this.createModel();
    this.group.position.set(this.pos.x, 0, this.pos.z);
    this.scene.add(this.group);
  }

  createModel() {
    const gingerMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.8 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.36, 10), gingerMat);
    body.rotation.x = Math.PI / 2;
    body.position.y = 0.20;
    this.group.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), gingerMat);
    head.position.set(0, 0.28, 0.22);
    this.group.add(head);

    const earGeo = new THREE.ConeGeometry(0.05, 0.09, 4);
    const earL = new THREE.Mesh(earGeo, gingerMat);
    earL.position.set(-0.08, 0.38, 0.20);
    this.group.add(earL);
    const earR = new THREE.Mesh(earGeo, gingerMat);
    earR.position.set(0.08, 0.38, 0.20);
    this.group.add(earR);

    // Animated Tail
    const tailGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.28, 8);
    this.tail = new THREE.Mesh(tailGeo, gingerMat);
    this.tail.position.set(0, 0.24, -0.20);
    this.tail.rotation.x = -Math.PI / 4;
    this.group.add(this.tail);
  }

  update(delta, robotPos) {
    const boundX = (this.roomSize.width / 2) - 1.2;
    const boundZ = (this.roomSize.length / 2) - 1.2;

    const dx = this.pos.x - robotPos.x;
    const dz = this.pos.z - robotPos.z;
    const dist = Math.hypot(dx, dz);

    if (dist < 2.0) {
      // Flee from robot
      this.targetPos.x = Math.max(-boundX, Math.min(boundX, this.pos.x + (dx / dist) * 3.5));
      this.targetPos.z = Math.max(-boundZ, Math.min(boundZ, this.pos.z + (dz / dist) * 3.5));
    } else {
      // Idle wander
      this.wanderTimer -= delta;
      if (this.wanderTimer <= 0) {
        this.wanderTimer = 3.0 + Math.random() * 4.0;
        this.targetPos.x = (Math.random() - 0.5) * (boundX * 1.8);
        this.targetPos.z = (Math.random() - 0.5) * (boundZ * 1.8);
      }
    }

    const moveDx = this.targetPos.x - this.pos.x;
    const moveDz = this.targetPos.z - this.pos.z;
    const moveDist = Math.hypot(moveDx, moveDz);

    if (moveDist > 0.1) {
      const speed = dist < 2.0 ? 2.5 : 0.9;
      this.pos.x += (moveDx / moveDist) * speed * delta;
      this.pos.z += (moveDz / moveDist) * speed * delta;
      this.group.rotation.y = Math.atan2(moveDx, moveDz);
    }
    this.group.position.set(this.pos.x, 0, this.pos.z);

    // Wag Tail
    if (this.tail) {
      this.tail.rotation.z = Math.sin(performance.now() * 0.007) * 0.45;
    }
  }

  dispose() {
    if (this.group) {
      this.scene.remove(this.group);
      this.group.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
  }
}

// --- MAIN ROBOMBO GAME ENGINE ---
class RoboGame {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.sound = new SoundSystem();
    
    this.currentPropIndex = GameState.level - 1;
    this.currentProp = PROPERTIES[this.currentPropIndex] || PROPERTIES[0];

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.robot = null;
    this.dock = null;
    this.cat = null;
    this.bubbles = null;

    // Room mesh references for clean GPU disposal
    this.floorMesh = null;
    this.wallMeshes = [];
    this.dirtOverlayMesh = null;
    this.shineOverlayMesh = null;
    this.furnitureGroup = null;

    // Dynamic 3D Dirt & Shine Canvas
    this.dirtCanvas = null;
    this.dirtCtx = null;
    this.dirtTexture = null;
    this.shineCanvas = null;
    this.shineCtx = null;
    this.shineTexture = null;

    // Movement & Autopilot
    this.robotPos = { x: 0, z: 0 };
    this.robotAngle = 0;
    this.robotVelocity = 0;
    this.keys = {};

    // Collision boxes: { minX, maxX, minZ, maxZ, w, l, x, z }
    this.colliders = [];
    this.trashItems = [];
    this.liquidStains = [];
    this.uvItems = [];

    // Radar canvas context cached for performance
    this.radarCanvas = document.getElementById('radar-canvas');
    this.radarCtx = this.radarCanvas ? this.radarCanvas.getContext('2d') : null;
    this.radarScanAngle = 0;

    this.lastTime = performance.now();

    loadSavedData();
    this.initThree();
    this.initSound();
    this.initControls();
    this.initUI();
    this.loadProperty(this.currentPropIndex);
    this.animate();
  }

  initSound() {
    const unlock = () => {
      this.sound.init();
      this.sound.resume();
      this.sound.startMotor();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0f1d);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(65, aspect, 0.05, 100);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.container.appendChild(this.renderer.domElement);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xfff5e6, 0.9);
    this.dirLight.position.set(8, 16, 8);
    this.dirLight.castShadow = true;
    this.scene.add(this.dirLight);

    this.bubbles = new BubbleEmitter(this.scene);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  createRobot() {
    this.robot = new THREE.Group();
    const radius = 0.58;
    const height = 0.16;

    let chassisColor = 0xf8fafc;
    let metallic = 0.1;
    let roughness = 0.3;

    if (GameState.currentSkin === 'black') {
      chassisColor = 0x111827;
      roughness = 0.2;
    } else if (GameState.currentSkin === 'cyber') {
      chassisColor = 0x06b6d4;
      roughness = 0.1;
      metallic = 0.8;
    } else if (GameState.currentSkin === 'gold') {
      chassisColor = 0xf59e0b;
      roughness = 0.15;
      metallic = 0.9;
    }

    // Main Chassis
    const chassisGeo = new THREE.CylinderGeometry(radius, radius, height, 32);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: chassisColor,
      metalness: metallic,
      roughness: roughness
    });
    this.chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    this.chassisMesh.position.y = height / 2;
    this.chassisMesh.castShadow = true;
    this.robot.add(this.chassisMesh);

    // Front Bumper (Semi-cylinder)
    const bumperGeo = new THREE.CylinderGeometry(radius + 0.012, radius + 0.012, height * 0.75, 32, 1, false, -Math.PI / 2, Math.PI);
    const bumperMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
    const bumper = new THREE.Mesh(bumperGeo, bumperMat);
    bumper.position.y = height / 2;
    bumper.rotation.y = Math.PI / 2;
    this.robot.add(bumper);

    // Glowing Robot Eyes (LED Blue)
    const eyeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    eyeGeo.scale(0.8, 1.3, 0.6);
    this.eyeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      roughness: 0.1
    });
    const eyeL = new THREE.Mesh(eyeGeo, this.eyeMat);
    eyeL.position.set(-0.22, height * 0.72, radius - 0.05);
    eyeL.rotation.y = -0.15;
    this.robot.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeo, this.eyeMat);
    eyeR.position.set(0.22, height * 0.72, radius - 0.05);
    eyeR.rotation.y = 0.15;
    this.robot.add(eyeR);

    // Steady Front Headlight Spotlight (Soft warm-white forward lighting with soft penumbra)
    this.headlight = new THREE.SpotLight(0xfff8db, 0.85, 7.5, 0.65, 0.75, 1.2);
    this.headlight.position.set(0, height * 0.8, radius * 0.8);
    this.headTarget = new THREE.Object3D();
    this.headTarget.position.set(0, 0, 4.0);
    this.robot.add(this.headTarget);
    this.headlight.target = this.headTarget;
    this.robot.add(this.headlight);

    // UV Headlight (Deep Glowing Violet Spotlight with ultra-soft penumbra)
    this.uvLight = new THREE.SpotLight(0x8b5cf6, 0, 8.0, 0.75, 0.85, 1.1);
    this.uvLight.position.set(0, height * 0.8, radius * 0.8);
    this.uvLight.target = this.headTarget;
    this.robot.add(this.uvLight);

    // LiDAR Turret on top
    const lidarBaseGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.06, 16);
    const lidarMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const lidarBase = new THREE.Mesh(lidarBaseGeo, lidarMat);
    lidarBase.position.set(0, height + 0.03, -0.06);
    this.robot.add(lidarBase);

    // Spinning Side Brushes
    this.brushL = this.createSideBrush(-0.42, 0.42);
    this.brushR = this.createSideBrush(0.42, 0.42);
    this.robot.add(this.brushL);
    this.robot.add(this.brushR);

    // Cat Rider
    if (GameState.currentSkin === 'cat') {
      this.riderCat = new PetCat(this.scene, { x: 0, z: 0 }, { width: 4, length: 4 });
      this.riderCat.group.scale.setScalar(0.65);
      this.riderCat.group.position.set(0, height, -0.08);
      this.robot.add(this.riderCat.group);
    }

    this.scene.add(this.robot);
  }

  createSideBrush(x, z) {
    const group = new THREE.Group();
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 8), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    group.add(hub);
    for (let i = 0; i < 3; i++) {
      const bGeo = new THREE.BoxGeometry(0.22, 0.005, 0.02);
      const bMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const b = new THREE.Mesh(bGeo, bMat);
      b.rotation.y = (i / 3) * Math.PI * 2;
      group.add(b);
    }
    group.position.set(x, 0.02, z);
    return group;
  }

  createChargingDock(pos) {
    this.dock = new THREE.Group();
    const baseGeo = new THREE.BoxGeometry(0.9, 0.08, 0.8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(0, 0.04, 0);
    this.dock.add(base);

    const towerGeo = new THREE.BoxGeometry(0.85, 0.75, 0.32);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(0, 0.41, -0.25);
    this.dock.add(tower);

    const ledGeo = new THREE.SphereGeometry(0.04, 8, 8);
    this.dockLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const led = new THREE.Mesh(ledGeo, this.dockLedMat);
    led.position.set(0, 0.70, -0.08);
    this.dock.add(led);

    this.dock.position.set(pos.x, 0, pos.z);
    if (pos.rot) this.dock.rotation.y = pos.rot;
    this.scene.add(this.dock);
  }

  // --- FULL PROPERTY LOAD & MEMORY CLEANUP ---
  loadProperty(propIndex) {
    this.currentPropIndex = propIndex;
    this.currentProp = PROPERTIES[propIndex] || PROPERTIES[0];
    GameState.level = propIndex + 1;

    // 1. Clean up old room meshes (prevents GPU memory leak)
    if (this.floorMesh) {
      this.scene.remove(this.floorMesh);
      this.floorMesh.geometry.dispose();
      this.floorMesh.material.dispose();
      this.floorMesh = null;
    }
    if (this.wallMeshes.length > 0) {
      this.wallMeshes.forEach(w => {
        this.scene.remove(w);
        w.geometry.dispose();
        w.material.dispose();
      });
      this.wallMeshes = [];
    }
    if (this.dirtOverlayMesh) {
      this.scene.remove(this.dirtOverlayMesh);
      this.dirtOverlayMesh.geometry.dispose();
      this.dirtOverlayMesh.material.dispose();
      if (this.dirtTexture) this.dirtTexture.dispose();
      this.dirtOverlayMesh = null;
      this.dirtTexture = null;
    }
    if (this.shineOverlayMesh) {
      this.scene.remove(this.shineOverlayMesh);
      this.shineOverlayMesh.geometry.dispose();
      this.shineOverlayMesh.material.dispose();
      if (this.shineTexture) this.shineTexture.dispose();
      this.shineOverlayMesh = null;
      this.shineTexture = null;
    }

    if (this.robot) {
      this.scene.remove(this.robot);
      this.robot.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      this.robot = null;
    }
    if (this.dock) {
      this.scene.remove(this.dock);
      this.dock.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      this.dock = null;
    }
    if (this.cat) {
      this.cat.dispose();
      this.cat = null;
    }

    this.trashItems.forEach(t => {
      if (t.group) {
        this.scene.remove(t.group);
        t.group.traverse(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      } else if (t.mesh) {
        this.scene.remove(t.mesh);
        t.mesh.geometry.dispose();
        t.mesh.material.dispose();
      }
    });
    this.trashItems = [];

    if (this.uvDustField) {
      this.uvDustField.dispose();
      this.uvDustField = null;
    }

    this.liquidStains.forEach(s => s.dispose());
    this.liquidStains = [];

    this.uvItems.forEach(u => u.dispose());
    this.uvItems = [];

    this.colliders = [];

    // 2. Build Room, Textures & Overlays
    this.buildRoomEnvironment();
    this.initDirtTextures();
    this.createRobot();
    this.createChargingDock(this.currentProp.dockPos);

    // Initial position on dock
    this.robotPos = { x: this.currentProp.dockPos.x, z: this.currentProp.dockPos.z };
    this.robotAngle = this.currentProp.dockPos.rot || 0;
    this.robot.position.set(this.robotPos.x, 0, this.robotPos.z);
    this.robot.rotation.y = this.robotAngle;

    // 3. Build Furniture, Spawns & State
    this.rebuildFurniture();
    this.cat = new PetCat(this.scene, this.currentProp.catPos, this.currentProp.size);
    this.uvDustField = new UVDustParticleField(this.scene, this.currentProp.size.width, this.currentProp.size.length);
    this.spawnMicroTrash(this.currentProp.trashCount);
    this.spawnLiquidStains(this.currentProp.stainCount);
    this.spawnUVItems(this.currentProp.secretGoldCount);

    GameState.cleanPercent = 0;
    GameState.shinePercent = 0;
    GameState.dust = 0;
    GameState.battery = GameState.maxBattery;
    GameState.water = GameState.maxWater;
    GameState.isGameOver = false;
    GameState.isDocked = true;
    GameState.isCharging = true;
    GameState.isAutoDocking = false;

    this.updateHouseValue();
    this.updateHUD();

    document.getElementById('room-name').innerText = this.currentProp.name;
    document.getElementById('level-badge').innerText = `MÜLK #${GameState.level}`;
  }

  buildRoomEnvironment() {
    const { width, length } = this.currentProp.size;
    const floorGeo = new THREE.PlaneGeometry(width, length);
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.currentProp.floorColor,
      roughness: 0.38,
      metalness: 0.08
    });
    this.floorMesh = new THREE.Mesh(floorGeo, floorMat);
    this.floorMesh.rotation.x = -Math.PI / 2;
    this.floorMesh.receiveShadow = true;
    this.scene.add(this.floorMesh);

    // Walls
    const wallHeight = 3.2;
    const wallMat = new THREE.MeshStandardMaterial({ color: this.currentProp.wallColor, roughness: 0.8 });

    // North & South
    const wallHGeo = new THREE.BoxGeometry(width + 0.4, wallHeight, 0.4);
    const wallN = new THREE.Mesh(wallHGeo, wallMat);
    wallN.position.set(0, wallHeight / 2, -length / 2 - 0.2);
    this.scene.add(wallN);
    this.wallMeshes.push(wallN);
    this.colliders.push({ minX: -width/2, maxX: width/2, minZ: -length/2 - 0.4, maxZ: -length/2 });

    const wallS = new THREE.Mesh(wallHGeo, wallMat);
    wallS.position.set(0, wallHeight / 2, length / 2 + 0.2);
    this.scene.add(wallS);
    this.wallMeshes.push(wallS);
    this.colliders.push({ minX: -width/2, maxX: width/2, minZ: length/2, maxZ: length/2 + 0.4 });

    // East & West
    const wallVGeo = new THREE.BoxGeometry(0.4, wallHeight, length + 0.4);
    const wallW = new THREE.Mesh(wallVGeo, wallMat);
    wallW.position.set(-width / 2 - 0.2, wallHeight / 2, 0);
    this.scene.add(wallW);
    this.wallMeshes.push(wallW);
    this.colliders.push({ minX: -width/2 - 0.4, maxX: -width/2, minZ: -length/2, maxZ: length/2 });

    const wallE = new THREE.Mesh(wallVGeo, wallMat);
    wallE.position.set(width / 2 + 0.2, wallHeight / 2, 0);
    this.scene.add(wallE);
    this.wallMeshes.push(wallE);
    this.colliders.push({ minX: width/2, maxX: width/2 + 0.4, minZ: -length/2, maxZ: length/2 });
  }

  // --- TWO-STAGE FLOOR CLEANING -------------------------------------------------
  // The floor is a real gameplay surface: vacuuming reveals the material below
  // the grime layer; a mop then paints a separate, subtle gloss layer.
  initDirtTextures() {
    const resolution = 1024;
    const { width, length } = this.currentProp.size;
    const makeCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = resolution;
      return canvas;
    };

    this.dirtCanvas = makeCanvas();
    this.dirtCtx = this.dirtCanvas.getContext('2d', { willReadFrequently: false });
    const dirt = this.dirtCtx;
    dirt.fillStyle = 'rgba(18, 21, 25, 0.78)';
    dirt.fillRect(0, 0, resolution, resolution);
    // Fine, irregular speckling prevents the layer from reading as a flat decal.
    for (let i = 0; i < 9000; i++) {
      const alpha = 0.05 + Math.random() * 0.13;
      const size = 1 + Math.random() * 4;
      dirt.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      dirt.fillRect(Math.random() * resolution, Math.random() * resolution, size, size);
    }
    this.dirtTexture = new THREE.CanvasTexture(this.dirtCanvas);
    this.dirtTexture.minFilter = THREE.LinearFilter;
    this.dirtTexture.magFilter = THREE.LinearFilter;
    this.dirtOverlayMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, length),
      new THREE.MeshBasicMaterial({ map: this.dirtTexture, transparent: true, depthWrite: false })
    );
    this.dirtOverlayMesh.rotation.x = -Math.PI / 2;
    this.dirtOverlayMesh.position.y = 0.012;
    this.scene.add(this.dirtOverlayMesh);

    this.shineCanvas = makeCanvas();
    this.shineCtx = this.shineCanvas.getContext('2d');
    this.shineTexture = new THREE.CanvasTexture(this.shineCanvas);
    this.shineTexture.minFilter = THREE.LinearFilter;
    this.shineTexture.magFilter = THREE.LinearFilter;
    this.shineOverlayMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, length),
      new THREE.MeshBasicMaterial({ map: this.shineTexture, transparent: true, opacity: 0.42, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    this.shineOverlayMesh.rotation.x = -Math.PI / 2;
    this.shineOverlayMesh.position.y = 0.02;
    this.scene.add(this.shineOverlayMesh);

    this.cleanGridSize = 56;
    this.cleanGrid = new Uint8Array(this.cleanGridSize * this.cleanGridSize);
    this.shineGrid = new Uint8Array(this.cleanGridSize * this.cleanGridSize);
    this.cleanedFloorCells = 0;
    this.shinedFloorCells = 0;
  }

  clearDirtAt(worldX, worldZ, radius) {
    if (!this.dirtCtx || Math.abs(this.robotVelocity) < 0.04) return;
    const { width, length } = this.currentProp.size;
    const canvasRadius = radius / width * this.dirtCanvas.width;
    const cx = (worldX / width + 0.5) * this.dirtCanvas.width;
    const cy = (0.5 - worldZ / length) * this.dirtCanvas.height;
    const gradient = this.dirtCtx.createRadialGradient(cx, cy, canvasRadius * 0.28, cx, cy, canvasRadius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.76, 'rgba(0,0,0,0.92)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    this.dirtCtx.save();
    this.dirtCtx.globalCompositeOperation = 'destination-out';
    this.dirtCtx.fillStyle = gradient;
    this.dirtCtx.beginPath();
    this.dirtCtx.arc(cx, cy, canvasRadius, 0, Math.PI * 2);
    this.dirtCtx.fill();
    this.dirtCtx.restore();
    this.dirtTexture.needsUpdate = true;

    const gridRadius = Math.max(1, Math.ceil(radius / Math.min(width, length) * this.cleanGridSize));
    const gridX = Math.floor((worldX / width + 0.5) * this.cleanGridSize);
    const gridZ = Math.floor((worldZ / length + 0.5) * this.cleanGridSize);
    for (let z = gridZ - gridRadius; z <= gridZ + gridRadius; z++) {
      for (let x = gridX - gridRadius; x <= gridX + gridRadius; x++) {
        if (x < 0 || z < 0 || x >= this.cleanGridSize || z >= this.cleanGridSize) continue;
        if (Math.hypot(x - gridX, z - gridZ) > gridRadius) continue;
        const index = z * this.cleanGridSize + x;
        if (!this.cleanGrid[index]) { this.cleanGrid[index] = 1; this.cleanedFloorCells++; }
      }
    }

    if (GameState.hasMop && GameState.water > 0) {
      this.shineCtx.save();
      this.shineCtx.globalCompositeOperation = 'source-over';
      const shine = this.shineCtx.createRadialGradient(cx, cy, 0, cx, cy, canvasRadius * 0.78);
      shine.addColorStop(0, 'rgba(174, 239, 255, 0.75)');
      shine.addColorStop(0.5, 'rgba(82, 204, 255, 0.28)');
      shine.addColorStop(1, 'rgba(82, 204, 255, 0)');
      this.shineCtx.fillStyle = shine;
      this.shineCtx.beginPath();
      this.shineCtx.arc(cx, cy, canvasRadius * 0.78, 0, Math.PI * 2);
      this.shineCtx.fill();
      this.shineCtx.restore();
      this.shineTexture.needsUpdate = true;
      this.bubbles.emit(worldX, worldZ, 1);
      for (let z = gridZ - gridRadius; z <= gridZ + gridRadius; z++) {
        for (let x = gridX - gridRadius; x <= gridX + gridRadius; x++) {
          if (x < 0 || z < 0 || x >= this.cleanGridSize || z >= this.cleanGridSize) continue;
          const index = z * this.cleanGridSize + x;
          if (this.cleanGrid[index] && !this.shineGrid[index]) { this.shineGrid[index] = 1; this.shinedFloorCells++; }
        }
      }
    }
  }

  // --- IN-PLACE FURNITURE RENOVATION (DOES NOT RESET CLEAN PROGRESS) ---
  rebuildFurniture() {
    if (this.furnitureGroup) {
      this.scene.remove(this.furnitureGroup);
      this.furnitureGroup.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      this.furnitureGroup = null;
    }

    // Keep wall colliders, remove only furniture colliders
    this.colliders = this.colliders.filter(c => !c.isFurniture);

    this.furnitureGroup = new THREE.Group();

    this.currentProp.furniture.forEach(item => {
      const group = new THREE.Group();
      const isSofaRenovated = item.id === 'sofa' && GameState.renovations.sofa;
      const isTVRenovated = item.id === 'tv' && GameState.renovations.tv;
      const isTableRenovated = item.id === 'table' && GameState.renovations.table;
      const isLampRenovated = item.id === 'lamp' && GameState.renovations.lamp;
      const isPlantRenovated = item.id === 'plant' && GameState.renovations.plant;

      const w = item.w || 1.2;
      const l = item.l || 1.2;

      if (item.type.includes('sofa') || item.type.includes('armchair')) {
        const primaryColor = isSofaRenovated ? 0x065f46 : 0x334155; // Royal Emerald Italian Velvet vs Charcoal Fabric
        const cushionColor = isSofaRenovated ? 0x047857 : 0x475569;
        const mainMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          roughness: isSofaRenovated ? 0.45 : 0.7,
          metalness: isSofaRenovated ? 0.1 : 0.05
        });
        const cushionMat = new THREE.MeshStandardMaterial({
          color: cushionColor,
          roughness: isSofaRenovated ? 0.4 : 0.65,
          metalness: 0.05
        });

        // 1. Elevated Sofa Legs (4 Modern Cylinders)
        const legMat = new THREE.MeshStandardMaterial({
          color: isSofaRenovated ? 0xf59e0b : 0x1e293b,
          metalness: isSofaRenovated ? 0.85 : 0.2,
          roughness: isSofaRenovated ? 0.25 : 0.7
        });
        const legH = 0.10;
        const legRadius = 0.035;
        const legPositions = [
          [-w/2 + 0.12, -l/2 + 0.12],
          [w/2 - 0.12, -l/2 + 0.12],
          [-w/2 + 0.12, l/2 - 0.12],
          [w/2 - 0.12, l/2 - 0.12]
        ];
        legPositions.forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(legRadius, legRadius * 0.75, legH, 12), legMat);
          leg.position.set(lx, legH / 2, lz);
          group.add(leg);
        });

        // 2. Base Structural Plinth / Underframe
        const plinthH = 0.10;
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(w, plinthH, l), mainMat);
        plinth.position.y = legH + plinthH / 2;
        group.add(plinth);

        // 3. Left & Right Padded Armrests
        const armW = Math.min(0.22, w * 0.16);
        const armH = 0.38;
        const armL = l;
        const armY = legH + plinthH + armH / 2 - 0.04;
        const armGeo = new THREE.BoxGeometry(armW, armH, armL);
        
        const armLeft = new THREE.Mesh(armGeo, mainMat);
        armLeft.position.set(-w / 2 + armW / 2, armY, 0);
        group.add(armLeft);

        const armRight = new THREE.Mesh(armGeo, mainMat);
        armRight.position.set(w / 2 - armW / 2, armY, 0);
        group.add(armRight);

        // 4. Main Backrest Frame (Rear)
        const backW = w - armW * 2 + 0.02;
        const backH = 0.52;
        const backD = Math.min(0.24, l * 0.25);
        const backZ = -l / 2 + backD / 2;
        const backY = legH + plinthH + backH / 2;
        const backFrame = new THREE.Mesh(new THREE.BoxGeometry(backW, backH, backD), mainMat);
        backFrame.position.set(0, backY, backZ);
        group.add(backFrame);

        // 5. Individual Plush Seat & Backrest Cushions
        const seatAreaW = w - armW * 2;
        const seatAreaL = l - backD;
        const numCushions = w >= 2.6 ? 3 : (w >= 1.5 ? 2 : 1);
        const seatCushionW = (seatAreaW - 0.03 * (numCushions - 1)) / numCushions;
        const seatCushionH = 0.14;
        const seatCushionL = seatAreaL - 0.04;
        const seatCushionY = legH + plinthH + seatCushionH / 2 + 0.01;
        const seatCushionZ = backZ + backD / 2 + seatCushionL / 2 + 0.02;

        for (let i = 0; i < numCushions; i++) {
          const cGeo = new THREE.BoxGeometry(seatCushionW, seatCushionH, seatCushionL);
          const cMesh = new THREE.Mesh(cGeo, cushionMat);
          const cx = -seatAreaW / 2 + seatCushionW / 2 + i * (seatCushionW + 0.03);
          cMesh.position.set(cx, seatCushionY, seatCushionZ);
          group.add(cMesh);

          // Backrest Plush Pillows (tilted back slightly for realism)
          const backCushionH = 0.36;
          const backCushionD = 0.14;
          const bcGeo = new THREE.BoxGeometry(seatCushionW - 0.02, backCushionH, backCushionD);
          const bcMesh = new THREE.Mesh(bcGeo, cushionMat);
          bcMesh.position.set(cx, legH + plinthH + seatCushionH + backCushionH / 2 - 0.02, backZ + backD / 2 + backCushionD / 2);
          bcMesh.rotation.x = -0.06;
          group.add(bcMesh);
        }

        // 6. Decorative Accent Corner Pillows (Throw Pillows / Kırlentler)
        if (numCushions >= 2) {
          const pillowMat = new THREE.MeshStandardMaterial({
            color: isSofaRenovated ? 0xfbbf24 : 0x94a3b8,
            roughness: 0.5
          });
          const pGeo = new THREE.BoxGeometry(0.20, 0.20, 0.09);

          const pillowL = new THREE.Mesh(pGeo, pillowMat);
          pillowL.position.set(-seatAreaW / 2 + 0.10, seatCushionY + 0.10, seatCushionZ - seatCushionL / 4);
          pillowL.rotation.set(-0.1, 0.25, 0.15);
          group.add(pillowL);

          const pillowR = new THREE.Mesh(pGeo, pillowMat);
          pillowR.position.set(seatAreaW / 2 - 0.10, seatCushionY + 0.10, seatCushionZ - seatCushionL / 4);
          pillowR.rotation.set(-0.1, -0.25, -0.15);
          group.add(pillowR);
        }

        // 7. Renovated Luxury Gold Trim Accents
        if (isSofaRenovated) {
          const goldTrimMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            metalness: 0.9,
            roughness: 0.2
          });
          const trim = new THREE.Mesh(new THREE.BoxGeometry(w + 0.03, 0.025, l + 0.03), goldTrimMat);
          trim.position.y = legH + plinthH;
          group.add(trim);
        }
      } else if (item.type.includes('tv')) {
        const standMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
        const stand = new THREE.Mesh(new THREE.BoxGeometry(w, 0.55, l), standMat);
        stand.position.y = 0.275;
        group.add(stand);

        const tvMat = new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: isTVRenovated ? 0x2563eb : 0x050505,
          emissiveIntensity: isTVRenovated ? 0.7 : 0.1,
          roughness: 0.1
        });
        const tv = new THREE.Mesh(new THREE.BoxGeometry(isTVRenovated ? w * 0.95 : w * 0.75, 1.3, 0.06), tvMat);
        tv.position.set(0, 1.35, 0);
        group.add(tv);
      } else if (item.type.includes('table')) {
        const tableMat = new THREE.MeshStandardMaterial({
          color: isTableRenovated ? 0xf8fafc : 0x78350f,
          roughness: isTableRenovated ? 0.15 : 0.6
        });
        const top = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, l), tableMat);
        top.position.y = 0.46;
        group.add(top);

        for (let dx of [-w/2 + 0.15, w/2 - 0.15]) {
          for (let dz of [-l/2 + 0.15, l/2 - 0.15]) {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.46), tableMat);
            leg.position.set(dx, 0.23, dz);
            group.add(leg);
          }
        }
      } else if (item.type.includes('plant')) {
        const potMat = new THREE.MeshStandardMaterial({ color: isPlantRenovated ? 0xf8fafc : 0xb45309, roughness: 0.3 });
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.2, 0.5, 16), potMat);
        pot.position.y = 0.25;
        group.add(pot);

        const leafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.5 });
        const leaves = new THREE.Mesh(new THREE.SphereGeometry(isPlantRenovated ? 0.45 : 0.3, 8, 8), leafMat);
        leaves.position.y = 0.7;
        group.add(leaves);
      } else if (item.type.includes('lamp')) {
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.8), poleMat);
        pole.position.y = 0.9;
        group.add(pole);

        const shadeMat = new THREE.MeshStandardMaterial({
          color: isLampRenovated ? 0x06b6d4 : 0xfef08a,
          emissive: isLampRenovated ? 0x06b6d4 : 0xfef08a,
          emissiveIntensity: 0.6
        });
        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.3, 16, 1, true), shadeMat);
        shade.position.y = 1.65;
        group.add(shade);
      } else {
        const mat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, item.h || 1.0, l), mat);
        mesh.position.y = (item.h || 1.0) / 2;
        group.add(mesh);
      }

      group.position.set(item.x, 0, item.z);
      if (item.rot) group.rotation.y = item.rot;
      this.furnitureGroup.add(group);

      // PRECISE FURNITURE COLLIDER
      this.colliders.push({
        id: item.id,
        isFurniture: true,
        minX: item.x - w / 2,
        maxX: item.x + w / 2,
        minZ: item.z - l / 2,
        maxZ: item.z + l / 2,
        w, l, x: item.x, z: item.z
      });
    });

    this.scene.add(this.furnitureGroup);
  }

  spawnMicroTrash(count) {
    const { width, length } = this.currentProp.size;
    const types = ['popcorn', 'cookie', 'candy', 'dust_bunny', 'coin', 'paper', 'kibble', 'screw'];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * (width - 2.0);
      const z = (Math.random() - 0.5) * (length - 2.0);
      if (this.isPointInsideCollider(x, z)) continue;

      const type = types[Math.floor(Math.random() * types.length)];
      const item = RealisticTrashFactory.create(type, x, z);
      this.scene.add(item.group);
      if (GameState.isUV) item.updateUV(true);
      this.trashItems.push(item);
    }
  }

  spawnLiquidStains(count) {
    const { width, length } = this.currentProp.size;
    const stainTypes = ['coffee', 'ketchup', 'mud'];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * (width - 2.5);
      const z = (Math.random() - 0.5) * (length - 2.5);
      if (this.isPointInsideCollider(x, z)) continue;

      const type = stainTypes[Math.floor(Math.random() * stainTypes.length)];
      const stain = new LiquidStain(this.scene, x, z, type);
      this.liquidStains.push(stain);
    }
  }

  spawnUVItems(count) {
    const { width, length } = this.currentProp.size;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * (width - 2.0);
      const z = (Math.random() - 0.5) * (length - 2.0);
      if (this.isPointInsideCollider(x, z)) continue;

      const isGold = Math.random() > 0.4;
      const item = new SecretUVItem(this.scene, x, z, isGold);
      this.uvItems.push(item);
    }
  }

  isPointInsideCollider(x, z) {
    for (let c of this.colliders) {
      if (x >= c.minX && x <= c.maxX && z >= c.minZ && z <= c.maxZ) return true;
    }
    return false;
  }

  updateHouseValue() {
    let base = this.currentProp.basePrice || 15000;
    let cleanBonus = GameState.cleanPercent * 70;
    let shineBonus = GameState.shinePercent * 90;
    let furnBonus = 0;

    if (GameState.renovations.sofa) furnBonus += 4500;
    if (GameState.renovations.tv) furnBonus += 5500;
    if (GameState.renovations.table) furnBonus += 2800;
    if (GameState.renovations.lamp) furnBonus += 1800;
    if (GameState.renovations.plant) furnBonus += 1400;

    GameState.houseValue = base + cleanBonus + shineBonus + furnBonus;
    const valEl = document.getElementById('house-value');
    if (valEl) valEl.innerText = `₺${GameState.houseValue.toLocaleString('tr-TR')}`;
    const flipperValEl = document.getElementById('flipper-house-val');
    if (flipperValEl) flipperValEl.innerText = `₺${GameState.houseValue.toLocaleString('tr-TR')}`;
    const flipperCleanEl = document.getElementById('flipper-clean-val');
    if (flipperCleanEl) flipperCleanEl.innerText = `%${GameState.cleanPercent}`;
  }

  initControls() {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key) || e.code === 'Space') e.preventDefault();
      this.keys[key] = true;

      // Cancel auto-docking upon manual player movement
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        if (GameState.isAutoDocking) {
          GameState.isAutoDocking = false;
          this.updateDockButton();
          this.showToast("🎮 Manuel Kontrole Geçildi");
        }
      }

      if (key === 'u' || key === 'f') this.toggleUV();
      if (key === 'c') this.toggleCamera();
      if (key === 'h') this.toggleAutoDock();
      if (e.code === 'Space') this.toggleTurbo();
    });

    window.addEventListener('keyup', (e) => {
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase()) || e.code === 'Space') e.preventDefault();
      this.keys[e.key.toLowerCase()] = false;
    });

    // Touch D-PAD
    const bindBtn = (id, key) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      const press = (e) => {
        e.preventDefault();
        this.keys[key] = true;
        if (GameState.isAutoDocking) {
          GameState.isAutoDocking = false;
          this.updateDockButton();
        }
      };
      const release = (e) => { e.preventDefault(); this.keys[key] = false; };
      btn.addEventListener('pointerdown', press);
      btn.addEventListener('pointerup', release);
      btn.addEventListener('pointerleave', release);
      btn.addEventListener('pointercancel', release);
    };
    bindBtn('dpad-up', 'w');
    bindBtn('dpad-down', 's');
    bindBtn('dpad-left', 'a');
    bindBtn('dpad-right', 'd');

    const joystick = document.getElementById('joystick-base');
    const thumb = document.getElementById('joystick-thumb');
    if (joystick && thumb) {
      const resetJoystick = () => {
        ['w', 'a', 's', 'd'].forEach(key => { this.keys[key] = false; });
        thumb.style.transform = 'translate(0, 0)';
      };
      const moveJoystick = (event) => {
        const box = joystick.getBoundingClientRect();
        const max = Math.min(box.width, box.height) * 0.28;
        const rawX = event.clientX - (box.left + box.width / 2);
        const rawY = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(rawX, rawY);
        const scale = distance > max ? max / distance : 1;
        const x = rawX * scale;
        const y = rawY * scale;
        thumb.style.transform = `translate(${x}px, ${y}px)`;
        this.keys.w = y < -max * 0.24;
        this.keys.s = y > max * 0.24;
        this.keys.a = x < -max * 0.24;
        this.keys.d = x > max * 0.24;
      };
      joystick.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        joystick.setPointerCapture(event.pointerId);
        moveJoystick(event);
      });
      joystick.addEventListener('pointermove', (event) => {
        if (joystick.hasPointerCapture(event.pointerId)) { event.preventDefault(); moveJoystick(event); }
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => joystick.addEventListener(type, resetJoystick));
    }
  }

  toggleControlMode() {
    GameState.controlMode = GameState.controlMode === 'dpad' ? 'joystick' : 'dpad';
    this.syncControlModeUI();
    saveData();
  }

  syncControlModeUI() {
    document.getElementById('dpad-zone').classList.toggle('hidden', GameState.controlMode !== 'dpad');
    document.getElementById('joystick-zone').classList.toggle('hidden', GameState.controlMode !== 'joystick');
    document.getElementById('ctrl-mode-label').innerText = GameState.controlMode === 'dpad' ? 'D-PAD' : 'JOYSTICK';
    document.getElementById('ctrl-mode-icon').innerText = GameState.controlMode === 'dpad' ? '🕹️' : '🎮';
  }

  toggleUV() {
    GameState.isUV = !GameState.isUV;
    const btn = document.getElementById('btn-uv-toggle');
    const overlay = document.getElementById('uv-overlay');
    const badge = document.getElementById('uv-badge');
    if (btn) btn.classList.toggle('active', GameState.isUV);
    if (overlay) overlay.classList.toggle('hidden', !GameState.isUV);
    if (badge) badge.classList.toggle('hidden', !GameState.isUV);
    if (this.uvLight) this.uvLight.intensity = GameState.isUV ? 2.2 : 0;
    if (this.headlight) this.headlight.intensity = GameState.isUV ? 0.15 : 0.85;
    this.trashItems.forEach(t => { if (t.updateUV) t.updateUV(GameState.isUV); });
    this.sound.playUVToggle(GameState.isUV);
    this.showToast(GameState.isUV ? "🔦 UV Işık Açıldı (Fosforlu Tozlar & Altınlar Görünür)" : "🔦 Normal Işık Modu");
  }

  toggleTurbo() {
    GameState.isTurbo = !GameState.isTurbo;
    const btn = document.getElementById('btn-turbo-boost');
    if (btn) btn.classList.toggle('active', GameState.isTurbo);
    this.showToast(GameState.isTurbo ? "⚡ TURBO AKTİF!" : "⚡ Standart Güç Modu");
  }

  toggleCamera() {
    const modes = ['pov', 'follow', 'top'];
    const currIdx = modes.indexOf(GameState.cameraMode);
    GameState.cameraMode = modes[(currIdx + 1) % modes.length];

    const label = document.getElementById('cam-label');
    if (label) {
      if (GameState.cameraMode === 'pov') label.innerText = '1. Şahıs Kokpit';
      else if (GameState.cameraMode === 'follow') label.innerText = '3D Takip';
      else label.innerText = 'Kuşbakışı';
    }
    this.showToast(`🎥 Kamera: ${label ? label.innerText : GameState.cameraMode}`);
  }

  toggleAutoDock() {
    GameState.isAutoDocking = !GameState.isAutoDocking;
    this.updateDockButton();
    if (GameState.isAutoDocking) {
      this.showToast("🏠 Otopilot: İstasyona Dönüş Başlatıldı...");
    } else {
      this.showToast("⏹️ İstasyona Dönüş İptal Edildi");
    }
  }

  updateDockButton() {
    const label = document.getElementById('dock-label');
    const btn = document.getElementById('btn-dock-home');
    if (label) label.innerText = GameState.isAutoDocking ? "İptal Et" : "İstasyona Dön";
    if (btn) btn.classList.toggle('highlight-btn', GameState.isAutoDocking);
  }

  initUI() {
    document.getElementById('btn-start-game').addEventListener('click', () => {
      document.getElementById('start-screen').classList.add('hidden');
      this.sound.init();
      this.sound.startMotor();
    });

    document.getElementById('btn-camera-toggle').addEventListener('click', () => this.toggleCamera());
    document.getElementById('btn-turbo-boost').addEventListener('click', () => this.toggleTurbo());
    document.getElementById('btn-uv-toggle').addEventListener('click', () => this.toggleUV());
    document.getElementById('btn-dock-home').addEventListener('click', () => this.toggleAutoDock());
    document.getElementById('btn-ctrl-toggle').addEventListener('click', () => this.toggleControlMode());
    this.syncControlModeUI();

    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      document.getElementById('sound-icon').innerText = this.sound.enabled ? '🔊' : '🔇';
    });

    // Shop & Renovation Modals
    const shopModal = document.getElementById('shop-modal');
    document.getElementById('btn-shop-open').addEventListener('click', () => {
      this.updateShopUI();
      shopModal.classList.remove('hidden');
      this.switchShopTab('upgrades');
    });

    document.getElementById('btn-flipper-open').addEventListener('click', () => {
      this.updateShopUI();
      shopModal.classList.remove('hidden');
      this.switchShopTab('flipper');
    });

    document.getElementById('btn-shop-close').addEventListener('click', () => {
      shopModal.classList.add('hidden');
    });

    // Shop Tabs
    document.querySelectorAll('.shop-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchShopTab(e.target.dataset.tab);
      });
    });

    // Real Estate Portfolio Modal
    const portfolioModal = document.getElementById('portfolio-modal');
    document.getElementById('btn-open-portfolio').addEventListener('click', () => {
      this.renderPortfolio();
      portfolioModal.classList.remove('hidden');
    });
    document.getElementById('btn-portfolio-close').addEventListener('click', () => {
      portfolioModal.classList.add('hidden');
    });

    // House Flipper Flip / Sell Modal
    const sellModal = document.getElementById('sell-modal');
    document.getElementById('btn-open-sell-modal').addEventListener('click', () => {
      shopModal.classList.add('hidden');
      this.renderBuyerOffers();
      sellModal.classList.remove('hidden');
    });
    document.getElementById('btn-cancel-sell').addEventListener('click', () => {
      sellModal.classList.add('hidden');
    });

    // Upgrades bindings
    this.bindUpgrade('buy-speed', 'speed', 50);
    this.bindUpgrade('buy-mop', 'mop', 75);
    this.bindUpgrade('buy-water', 'water', 50);
    this.bindUpgrade('buy-battery', 'battery', 40);
    this.bindUpgrade('buy-charge', 'charge', 50);
    this.bindUpgrade('buy-suction', 'suction', 45);
    this.bindUpgrade('buy-bin', 'bin', 40);

    // Modules bindings
    this.bindModule('buy-mod-magnet', 'magnet', 100);
    this.bindModule('buy-mod-steam', 'steam', 130);
    this.bindModule('buy-mod-laser', 'laser', 160);

    // House Flipper furniture items
    this.bindRenovation('buy-furn-sofa', 'sofa', 80);
    this.bindRenovation('buy-furn-tv', 'tv', 110);
    this.bindRenovation('buy-furn-table', 'table', 60);
    this.bindRenovation('buy-furn-lamp', 'lamp', 45);
    this.bindRenovation('buy-furn-plant', 'plant', 35);

    // Revive
    document.getElementById('btn-revive').addEventListener('click', () => {
      document.getElementById('gameover-modal').classList.add('hidden');
      this.robotPos = { x: this.currentProp.dockPos.x, z: this.currentProp.dockPos.z };
      GameState.battery = GameState.maxBattery;
      GameState.isGameOver = false;
      this.showToast("⚡ Robot İstasyona Çekildi!");
    });
    document.getElementById('btn-restart-gameover').addEventListener('click', () => {
      document.getElementById('gameover-modal').classList.add('hidden');
      this.loadProperty(this.currentPropIndex);
      this.showToast('🔄 Oda temiz bir başlangıç durumuna alındı.');
    });

    document.querySelectorAll('.skin-card').forEach(card => {
      card.addEventListener('click', () => {
        const skin = card.dataset.skin;
        const button = card.querySelector('.skin-select-btn');
        const cost = Number(button?.dataset.cost || 0);
        if (!GameState.ownedSkins.includes(skin)) {
          if (GameState.coins < cost) { this.showToast(`🪙 Bu görünüm için ${cost} jeton gerekli.`); return; }
          GameState.coins -= cost;
          GameState.ownedSkins.push(skin);
        }
        GameState.currentSkin = skin;
        saveData();
        if (this.robot) {
          this.scene.remove(this.robot);
          this.robot.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
          });
          this.robot = null;
        }
        this.createRobot();
        this.robot.position.set(this.robotPos.x, 0, this.robotPos.z);
        this.robot.rotation.y = this.robotAngle;
        document.querySelectorAll('.skin-card').forEach(item => item.classList.toggle('active', item.dataset.skin === skin));
        this.updateShopUI();
        this.showToast('🎨 Robombo görünümü değiştirildi.');
      });
    });
  }

  switchShopTab(tabName) {
    document.querySelectorAll('.shop-tabs .tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });
    document.querySelectorAll('.shop-tab-content').forEach(c => {
      c.classList.toggle('hidden', c.id !== `tab-${tabName}`);
    });
  }

  bindUpgrade(btnId, type, cost) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (GameState.coins >= cost) {
        GameState.coins -= cost;
        GameState.upgrades[type]++;
        applyUpgrades();
        saveData();
        this.sound.playCoin();
        this.updateShopUI();
        this.updateHUD();
        this.showToast(`✨ ${type.toUpperCase()} Yükseltildi!`);
      } else {
        this.showToast("❌ Yetersiz Bakiye!");
      }
    });
  }

  bindModule(btnId, moduleKey, cost) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (GameState.modules[moduleKey]) return;
      if (GameState.coins >= cost) {
        GameState.coins -= cost;
        GameState.modules[moduleKey] = true;
        saveData();
        this.sound.playChime(1.3);
        this.updateShopUI();
        this.showToast(`🚀 ${moduleKey.toUpperCase()} Modülü Satın Alındı!`);
      } else {
        this.showToast("❌ Yetersiz Bakiye!");
      }
    });
  }

  // IN-PLACE RENOVATION (PRESERVES CLEAN PROGRESS & TRASH STATE!)
  bindRenovation(btnId, itemKey, cost) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (GameState.renovations[itemKey]) return;
      if (GameState.coins >= cost) {
        GameState.coins -= cost;
        GameState.renovations[itemKey] = true;
        saveData();
        this.sound.playChime(1.4);
        this.updateShopUI();
        this.updateHouseValue();
        
        // Rebuild only furniture without resetting level/trash/robot!
        this.rebuildFurniture();
        this.showToast(`🛋️ Lüks Mobilya Odaya Yerleştirildi!`);
      } else {
        this.showToast("❌ Yetersiz Bakiye!");
      }
    });
  }

  updateShopUI() {
    document.getElementById('shop-coin-amount').innerText = `🪙 ${GameState.coins}`;
    const mopBtn = document.getElementById('buy-mop');
    if (mopBtn && GameState.hasMop) {
      mopBtn.innerText = '✅ SATIN ALINDI';
      mopBtn.disabled = true;
    }
  }

  renderPortfolio() {
    const container = document.getElementById('portfolio-list');
    if (!container) return;
    container.innerHTML = '';

    PROPERTIES.forEach((prop, idx) => {
      const isUnlocked = GameState.unlockedProperties.includes(prop.id);
      const isCurrent = idx === this.currentPropIndex;

      const card = document.createElement('div');
      card.className = `portfolio-card ${isCurrent ? 'active-prop' : ''}`;
      card.innerHTML = `
        <div>
          <div class="prop-icon">🏠</div>
          <div class="prop-title">${prop.name}</div>
          <p class="prop-desc">${prop.desc}</p>
        </div>
        <div>
          <div class="prop-value">Piyasa Değeri: ₺${prop.basePrice.toLocaleString('tr-TR')}</div>
          <button class="prop-btn" ${!isUnlocked ? 'disabled' : ''}>
            ${isCurrent ? 'Şu Anki Daire 📍' : isUnlocked ? 'Bu Daireye Geç 🚀' : '🔒 Kilitli (Önceki Evi Sat)'}
          </button>
        </div>
      `;

      if (isUnlocked && !isCurrent) {
        card.querySelector('.prop-btn').addEventListener('click', () => {
          document.getElementById('portfolio-modal').classList.add('hidden');
          this.loadProperty(idx);
          this.showToast(`✈️ ${prop.name} Dairesine Geçildi!`);
        });
      }
      container.appendChild(card);
    });
  }

  renderBuyerOffers() {
    const container = document.getElementById('buyers-offers-container');
    if (!container) return;
    container.innerHTML = '';

    const baseVal = GameState.houseValue;
    const cleanRatio = GameState.cleanPercent / 100;
    const hasFurn = Object.values(GameState.renovations).filter(Boolean).length;

    const buyers = [
      {
        name: "Berk (Üniversite Öğrencisi)",
        avatar: "🧑‍🎓",
        comment: cleanRatio > 0.7 ? "Zeminler harika temizlenmiş, tam aradığım stüdyo!" : "Biraz daha süpürülse fena olmazdı ama fiyat uygun.",
        offer: Math.round(baseVal * (0.85 + cleanRatio * 0.15)),
        profit: Math.round(180 + cleanRatio * 150 + hasFurn * 40)
      },
      {
        name: "Selin (İç Mimar)",
        avatar: "👩‍💼",
        comment: hasFurn >= 3 ? "Seçtiğiniz mobilyalar ve zümrüt koltuk inanılmaz lüks duruyor!" : "Temizlik güzel ama mobilyalar daha lüks olabilirdi.",
        offer: Math.round(baseVal * (0.95 + hasFurn * 0.08)),
        profit: Math.round(250 + hasFurn * 75 + cleanRatio * 100)
      },
      {
        name: "Kaya Bey (Emlak Yatırımcısı)",
        avatar: "🤵",
        comment: cleanRatio >= 0.9 && hasFurn >= 2 ? "Ayna gibi parlayan bir zemin ve harika bir dönüşüm! Peşin alıyorum!" : "İyi bir başlangıç, biraz daha renovasyonla harika olur.",
        offer: Math.round(baseVal * (1.05 + cleanRatio * 0.12 + hasFurn * 0.05)),
        profit: Math.round(350 + cleanRatio * 180 + hasFurn * 90)
      }
    ];

    buyers.forEach(b => {
      const card = document.createElement('div');
      card.className = 'buyer-card';
      card.innerHTML = `
        <div class="buyer-info">
          <div class="buyer-avatar">${b.avatar}</div>
          <div>
            <div class="buyer-name">${b.name}</div>
            <div class="buyer-comment">"${b.comment}"</div>
          </div>
        </div>
        <div class="buyer-bid">
          <div class="bid-amount">₺${b.offer.toLocaleString('tr-TR')}</div>
          <div class="bid-profit">+🪙 ${b.profit} Kâr</div>
          <button class="accept-bid-btn">Teklifi Kabul Et & Sat ✅</button>
        </div>
      `;

      card.querySelector('.accept-bid-btn').addEventListener('click', () => {
        GameState.coins += b.profit;
        this.sound.playChime(1.5);
        document.getElementById('sell-modal').classList.add('hidden');

        // Reset renovations for the next property (Fresh renovation for new house)
        GameState.renovations = { sofa: false, tv: false, table: false, lamp: false, plant: false };

        if (this.currentPropIndex < PROPERTIES.length - 1) {
          const nextPropId = PROPERTIES[this.currentPropIndex + 1].id;
          if (!GameState.unlockedProperties.includes(nextPropId)) {
            GameState.unlockedProperties.push(nextPropId);
          }
          saveData();
          this.showToast(`🎉 Ev Satıldı! +🪙 ${b.profit} Kâr Kazandınız! Yeni Emlak Açıldı!`);
          this.loadProperty(this.currentPropIndex + 1);
        } else {
          saveData();
          this.showToast(`🏆 TEBRİKLER! Tüm Evleri En Yüksek Kârla Sattınız!`);
        }
      });
      container.appendChild(card);
    });
  }

  showToast(text) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = text;
    toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.add('hidden'), 2600);
  }

  // --- GAME LOOP & UPDATES ---
  update(delta) {
    if (GameState.isGameOver) return;

    this.handleMovement(delta);
    this.handleSuctionAndCleaning(delta);
    this.handleDocking(delta);
    this.updateCamera();
    this.updateRadar(delta);
    this.updateHUD();

    if (this.cat) this.cat.update(delta, this.robotPos);
    if (this.riderCat && this.riderCat.tail) {
      this.riderCat.tail.rotation.z = Math.sin(performance.now() * 0.008) * 0.45;
    }
    if (this.uvDustField) {
      this.uvDustField.update(delta, GameState.isUV, this.robotPos, 0.62 + (GameState.upgrades.suction - 1) * 0.12, this.currentProp.size.width, this.currentProp.size.length);
    }
    this.bubbles.update(delta);
    this.uvItems.forEach(u => u.update(GameState.isUV));

    if (GameState.modules.laser && Math.random() < 0.05) this.zapClosestTrash();
    if (GameState.modules.magnet) this.pullNearbyItems();
  }

  handleMovement(delta) {
    let forward = 0;
    let turn = 0;

    // Autonomous Dock Autopilot Navigation
    if (GameState.isAutoDocking) {
      const dockPos = this.currentProp.dockPos;
      const targetX = dockPos.x + Math.sin(dockPos.rot || 0) * 0.45;
      const targetZ = dockPos.z + Math.cos(dockPos.rot || 0) * 0.45;

      const dx = targetX - this.robotPos.x;
      const dz = targetZ - this.robotPos.z;
      const dist = Math.hypot(dx, dz);

      if (dist > 0.45) {
        const targetAngle = Math.atan2(dx, dz);
        let angleDiff = targetAngle - this.robotAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        turn = Math.sign(angleDiff) * Math.min(1.0, Math.abs(angleDiff) * 3.0);
        forward = Math.abs(angleDiff) < 0.8 ? 1.0 : 0.2;
      } else {
        // Near dock: align angle with dock rotation
        const targetRot = dockPos.rot || 0;
        let rotDiff = targetRot - this.robotAngle;
        while (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
        while (rotDiff < -Math.PI) rotDiff += Math.PI * 2;

        if (Math.abs(rotDiff) > 0.08) {
          turn = Math.sign(rotDiff) * 1.5;
        } else {
          // Parked!
          GameState.isAutoDocking = false;
          GameState.isDocked = true;
          GameState.isCharging = true;
          this.updateDockButton();
          this.sound.playChime(1.4);
          this.showToast("⚡ Robombo İstasyona Park Etti & Şarj Başladı!");
        }
      }
    } else {
      // Manual Player Input
      if (this.keys['w'] || this.keys['arrowup']) forward += 1;
      if (this.keys['s'] || this.keys['arrowdown']) forward -= 0.6;
      if (this.keys['a'] || this.keys['arrowleft']) turn += 1;
      if (this.keys['d'] || this.keys['arrowright']) turn -= 1;
    }

    const baseSpeed = 2.4 + (GameState.upgrades.speed - 1) * 0.7;
    const maxSpeed = GameState.isTurbo ? baseSpeed * 1.5 : baseSpeed;
    const turnSpeed = 2.9;

    this.robotAngle += turn * turnSpeed * delta;
    this.robotVelocity = forward * maxSpeed;

    const moveDist = this.robotVelocity * delta;
    const targetX = this.robotPos.x + Math.sin(this.robotAngle) * moveDist;
    const targetZ = this.robotPos.z + Math.cos(this.robotAngle) * moveDist;

    // SMOOTH SLIDING COLLISION SYSTEM
    if (!this.checkCollision(targetX, targetZ)) {
      this.robotPos.x = targetX;
      this.robotPos.z = targetZ;
    } else if (!this.checkCollision(targetX, this.robotPos.z)) {
      this.robotPos.x = targetX;
    } else if (!this.checkCollision(this.robotPos.x, targetZ)) {
      this.robotPos.z = targetZ;
    }

    this.robot.position.set(this.robotPos.x, 0, this.robotPos.z);
    this.robot.rotation.y = this.robotAngle;

    if (forward !== 0 || turn !== 0) {
      this.brushL.rotation.y += 16 * delta;
      this.brushR.rotation.y -= 16 * delta;
      GameState.battery = Math.max(0, GameState.battery - (GameState.isTurbo ? 2.4 : 1.1) * delta);

      if (GameState.battery <= 0 && !GameState.isGameOver) {
        GameState.isGameOver = true;
        document.getElementById('gameover-modal').classList.remove('hidden');
      }
    }

    const isMoving = Math.abs(forward) > 0 || Math.abs(turn) > 0;
    this.sound.updateMotor(isMoving, GameState.isTurbo, GameState.upgrades.speed / 5);
  }

  // PRECISE TIGHT COLLISION CHECK
  checkCollision(x, z) {
    const robotR = 0.36; // Exact physical chassis collision radius
    for (let c of this.colliders) {
      if (x + robotR > c.minX && x - robotR < c.maxX && z + robotR > c.minZ && z - robotR < c.maxZ) {
        return true;
      }
    }
    return false;
  }

  handleSuctionAndCleaning(delta) {
    const suctionRadius = 0.62 + (GameState.upgrades.suction - 1) * 0.12;

    // 1. Erase Canvas Dirt & Polish Floor in 3D
    this.clearDirtAt(this.robotPos.x, this.robotPos.z, suctionRadius);

    // 2. Sucking Micro-Trash (Check dust bin capacity + Magnetic vortex animation)
    const isBinFull = GameState.dust >= GameState.maxDust;

    for (let item of this.trashItems) {
      if (item.collected) continue;
      const dx = item.pos.x - this.robotPos.x;
      const dz = item.pos.z - this.robotPos.z;
      const dist = Math.hypot(dx, dz);

      if (dist < suctionRadius * 1.65) {
        if (!isBinFull) {
          item.isSucking = true;
          item.suckProgress = (item.suckProgress || 0) + delta * 5.5;

          // Pull magnetically toward robot center
          const targetObj = item.group || item.mesh;
          if (targetObj) {
            const pullRatio = Math.min(1.0, delta * 12.0);
            targetObj.position.x += (this.robotPos.x - targetObj.position.x) * pullRatio;
            targetObj.position.z += (this.robotPos.z - targetObj.position.z) * pullRatio;
            targetObj.position.y = 0.02 + Math.sin(Math.min(1.0, item.suckProgress) * Math.PI) * 0.12;
            targetObj.rotation.y += delta * 18.0;
            targetObj.scale.setScalar(Math.max(0.01, 1.0 - item.suckProgress * 0.95));
          }

          if (item.suckProgress >= 1.0 || dist < 0.25) {
            item.collected = true;
            if (targetObj) this.scene.remove(targetObj);
            GameState.dust = Math.min(GameState.maxDust, GameState.dust + (item.type === 'coin' ? 0.2 : 0.6));
            GameState.coins += (item.type === 'coin' ? 10 : 2);
            if (item.type === 'coin') {
              this.sound.playCoin();
              this.showToast("🪙 Yerdeki Bozuk Para Toplandı! +🪙 10");
            } else {
              this.sound.playCrackle();
            }
          }
        } else {
          // Alert user to empty dust bin at dock
          if (dist < suctionRadius && Math.random() < 0.02) {
            this.showToast("⚠️ Hazne Dolu! İstasyona dönüp boşaltın.");
          }
        }
      }
    }

    // 3. Scrubbing liquid stains requires an equipped, filled mop.
    for (let stain of this.liquidStains) {
      if (stain.cleaned) continue;
      const dx = stain.pos.x - this.robotPos.x;
      const dz = stain.pos.z - this.robotPos.z;
      if (Math.hypot(dx, dz) < suctionRadius + stain.radius * 0.4) {
        if (!GameState.hasMop || GameState.water <= 0) {
          if (Math.random() < 0.012) this.showToast(!GameState.hasMop ? '💦 Bu leke için Mop Eklentisi gerekli.' : '💧 Mop suyu bitti. İstasyona dönün.');
          continue;
        }
        const scrubRate = 65 * (GameState.modules.steam ? 2 : 1) * delta;
        const fullyCleaned = stain.scrub(scrubRate);
        this.sound.playMopSwish();
        this.bubbles.emit(stain.pos.x, stain.pos.z, 2);

        if (fullyCleaned) {
          GameState.coins += 15;
          this.sound.playChime(1.2);
          this.showToast("✨ Leke Paspaslandı! +🪙 15 Para");
        }
      }
    }

    // 4. UV Items
    if (GameState.isUV) {
      for (let uvItem of this.uvItems) {
        if (uvItem.collected) continue;
        const dx = uvItem.pos.x - this.robotPos.x;
        const dz = uvItem.pos.z - this.robotPos.z;
        if (Math.hypot(dx, dz) < suctionRadius) {
          uvItem.collect();
          GameState.coins += uvItem.isGold ? 20 : 10;
          this.sound.playCoin();
          this.showToast(uvItem.isGold ? "⭐ GİZLİ ALTIN BULUNDU! +🪙 20" : "🧪 Fosforlu Leke Yok Edildi! +🪙 10");
        }
      }
    }

    if (GameState.hasMop && GameState.water > 0) {
      GameState.water = Math.max(0, GameState.water - 0.7 * delta);
    }

    // Cleanliness is deliberately based on both the actual floor and litter.
    // A player can no longer achieve 100% by only collecting spawned objects.
    const collectedTrash = this.trashItems.filter(t => t.collected).length;
    const trashRatio = collectedTrash / Math.max(1, this.trashItems.length);
    const floorRatio = this.cleanedFloorCells / Math.max(1, this.cleanGrid.length);
    GameState.cleanPercent = Math.min(100, Math.round((floorRatio * 0.72 + trashRatio * 0.28) * 100));

    const cleanedStains = this.liquidStains.filter(s => s.cleaned).length;
    const stainRatio = cleanedStains / Math.max(1, this.liquidStains.length);
    const shineRatio = this.shinedFloorCells / Math.max(1, this.shineGrid.length);
    GameState.shinePercent = GameState.hasMop ? Math.min(100, Math.round((shineRatio * 0.7 + stainRatio * 0.3) * 100)) : 0;

    this.updateHouseValue();
  }

  zapClosestTrash() {
    if (GameState.dust >= GameState.maxDust) return;
    let closestItem = null;
    let minDist = 4.5;

    for (let item of this.trashItems) {
      if (item.collected) continue;
      const dx = item.pos.x - this.robotPos.x;
      const dz = item.pos.z - this.robotPos.z;
      const dist = Math.hypot(dx, dz);
      if (dist < minDist) {
        minDist = dist;
        closestItem = item;
      }
    }

    if (closestItem) {
      closestItem.collected = true;
      const targetObj = closestItem.group || closestItem.mesh;
      if (targetObj) this.scene.remove(targetObj);
      GameState.dust = Math.min(GameState.maxDust, GameState.dust + 0.5);
      GameState.coins += 2;
      this.sound.playCrackle();
      this.showToast("🔴 Lazer Tareti En Yakın Tozu İmha Etti! +🪙 2");
    }
  }

  pullNearbyItems() {
    for (let item of this.trashItems) {
      if (item.collected) continue;
      const dx = this.robotPos.x - item.pos.x;
      const dz = this.robotPos.z - item.pos.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 2.5 && dist > 0.4) {
        item.pos.x += (dx / dist) * 2.0 * 0.016;
        item.pos.z += (dz / dist) * 2.0 * 0.016;
        const targetObj = item.group || item.mesh;
        if (targetObj) targetObj.position.set(item.pos.x, targetObj.position.y, item.pos.z);
      }
    }
  }

  handleDocking(delta) {
    const dockPos = this.currentProp.dockPos;
    const dx = dockPos.x - this.robotPos.x;
    const dz = dockPos.z - this.robotPos.z;
    const dist = Math.hypot(dx, dz);

    if (dist < 1.1) {
      GameState.isCharging = true;
      GameState.battery = Math.min(GameState.maxBattery, GameState.battery + 22 * delta);
      GameState.water = Math.min(GameState.maxWater, GameState.water + 26 * delta);
      GameState.dust = Math.max(0, GameState.dust - 32 * delta);
      if (this.dockLedMat) this.dockLedMat.color.setHex(0x38bdf8);
    } else {
      GameState.isCharging = false;
      if (this.dockLedMat) this.dockLedMat.color.setHex(0x10b981);
    }
  }

  // REALISTIC COCKPIT / HOOD POV CAMERA
  updateCamera() {
    if (GameState.cameraMode === 'pov') {
      // Positioned slightly above and behind robot center
      // Bottom 30% of screen displays the front curved bumper, LED eyes, and spinning brushes!
      const offsetBack = -0.38;
      const camY = 0.52;

      const camX = this.robotPos.x + Math.sin(this.robotAngle) * offsetBack;
      const camZ = this.robotPos.z + Math.cos(this.robotAngle) * offsetBack;
      this.camera.position.set(camX, camY, camZ);

      // Look forward into the room ahead with subtle downward tilt
      const lookAhead = 3.2;
      const lookX = this.robotPos.x + Math.sin(this.robotAngle) * lookAhead;
      const lookZ = this.robotPos.z + Math.cos(this.robotAngle) * lookAhead;
      this.camera.lookAt(lookX, 0.16, lookZ);
    } else if (GameState.cameraMode === 'follow') {
      // 3D Third-Person Follow Camera
      const followDist = 3.2;
      const camY = 2.4;
      const camX = this.robotPos.x - Math.sin(this.robotAngle) * followDist;
      const camZ = this.robotPos.z - Math.cos(this.robotAngle) * followDist;

      // Anti-wall clipping clamp
      const { width, length } = this.currentProp.size;
      const clampedX = Math.max(-width/2 + 0.4, Math.min(width/2 - 0.4, camX));
      const clampedZ = Math.max(-length/2 + 0.4, Math.min(length/2 - 0.4, camZ));

      this.camera.position.set(clampedX, camY, clampedZ);
      this.camera.lookAt(this.robotPos.x, 0.25, this.robotPos.z);
    } else if (GameState.cameraMode === 'top') {
      // 90° Overhead Tactical Map
      this.camera.position.set(0, 17.5, 0);
      this.camera.lookAt(0, 0, 0);
    }
  }

  // HIGH-TECH LIDAR SLAM RADAR RENDERER (CACHED 2D CONTEXT)
  updateRadar(delta) {
    if (!this.radarCtx) return;
    const ctx = this.radarCtx;
    const w = this.radarCanvas.width;
    const h = this.radarCanvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Tactical dark grid background
    ctx.fillStyle = '#030a06';
    ctx.fillRect(0, 0, w, h);

    const roomW = this.currentProp.size.width;
    const roomL = this.currentProp.size.length;
    const scale = (w - 18) / Math.max(roomW, roomL);

    const toRadX = (wx) => cx + wx * scale;
    const toRadY = (wz) => cy + wz * scale;

    const halfW = (roomW / 2) * scale;
    const halfL = (roomL / 2) * scale;

    // 1. Room Floor Field
    ctx.fillStyle = 'rgba(16, 185, 129, 0.06)';
    ctx.fillRect(cx - halfW, cy - halfL, halfW * 2, halfL * 2);

    // 2. Room Perimeter Walls
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.0;
    ctx.strokeRect(cx - halfW, cy - halfL, halfW * 2, halfL * 2);

    // 3. Grid Rings
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.lineWidth = 1;
    [22, 44, 58].forEach(r => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // 4. Furniture Obstacles (Solid Cyan with border)
    this.colliders.forEach(c => {
      if (c.w && c.l) {
        const ox = toRadX(c.x) - (c.w * scale) / 2;
        const oy = toRadY(c.z) - (c.l * scale) / 2;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.fillRect(ox, oy, c.w * scale, c.l * scale);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(ox, oy, c.w * scale, c.l * scale);
      }
    });

    // 5. Liquid Stains on Radar (Amber Warning Spots)
    this.liquidStains.forEach(s => {
      if (!s.cleaned) {
        const sx = toRadX(s.pos.x);
        const sy = toRadY(s.pos.z);
        ctx.fillStyle = s.type === 'ketchup' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 158, 11, 0.8)';
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 6. Micro-Trash Blips (Golden Dots)
    ctx.fillStyle = '#fbbf24';
    this.trashItems.forEach(t => {
      if (!t.collected) {
        ctx.fillRect(toRadX(t.pos.x) - 1.5, toRadY(t.pos.z) - 1.5, 3, 3);
      }
    });

    // 7. Dock Station on Radar
    const dx = toRadX(this.currentProp.dockPos.x);
    const dy = toRadY(this.currentProp.dockPos.z);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(dx - 3, dy - 3, 6, 6);

    // 8. Robot Real Position & Heading
    const rx = toRadX(this.robotPos.x);
    const ry = toRadY(this.robotPos.z);

    // Rotating 360° LiDAR Laser Sweep Beam from Robot
    this.radarScanAngle += delta * 3.5;
    ctx.save();
    ctx.translate(rx, ry);
    const grad = ctx.createLinearGradient(0, 0, Math.cos(this.radarScanAngle) * 45, Math.sin(this.radarScanAngle) * 45);
    grad.addColorStop(0, 'rgba(34, 197, 94, 0.7)');
    grad.addColorStop(1, 'rgba(34, 197, 94, 0.0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 45, this.radarScanAngle - 0.45, this.radarScanAngle);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Vision cone
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.arc(rx, ry, 18, this.robotAngle - 0.38, this.robotAngle + 0.38);
    ctx.closePath();
    ctx.fill();

    // Robot icon
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(rx, ry, 4, 0, Math.PI * 2);
    ctx.fill();

    // Heading arrow
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx + Math.sin(this.robotAngle) * 9, ry + Math.cos(this.robotAngle) * 9);
    ctx.stroke();
  }

  updateHUD() {
    document.getElementById('clean-percent').innerText = `${GameState.cleanPercent}%`;
    document.getElementById('clean-bar').style.width = `${GameState.cleanPercent}%`;
    document.getElementById('shine-percent').innerText = `${GameState.shinePercent}%`;
    document.getElementById('shine-bar').style.width = `${GameState.shinePercent}%`;
    document.getElementById('coin-amount').innerText = GameState.coins;

    const batPercent = Math.max(0, Math.min(100, Math.round((GameState.battery / GameState.maxBattery) * 100)));
    document.getElementById('battery-text').innerText = `${batPercent}%`;
    document.getElementById('battery-bar').style.height = `${batPercent}%`;

    const dustPercent = Math.min(100, Math.round((GameState.dust / GameState.maxDust) * 100));
    document.getElementById('dust-text').innerText = `${Math.round(GameState.dust)}/${GameState.maxDust}g`;
    document.getElementById('dust-bar').style.height = `${dustPercent}%`;

    const waterPercent = Math.min(100, Math.round((GameState.water / GameState.maxWater) * 100));
    document.getElementById('water-text').innerText = `${waterPercent}%`;
    document.getElementById('water-bar').style.height = `${waterPercent}%`;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    this.update(delta);
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new RoboGame();
});
