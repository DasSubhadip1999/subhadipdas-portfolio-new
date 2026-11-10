// Tiny Web Audio synth: every sound is generated, so nothing extra ships.
let ctx: AudioContext | null = null;
let out: GainNode | null = null;
let on = true;

export function setSoundOn(v: boolean) {
  on = v;
}

// Browsers only allow audio after a user gesture; call this from one.
export function unlockAudio() {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
      out = ctx.createGain();
      out.gain.value = 0.7;
      out.connect(ctx.destination);
    }
    if (ctx.state === "suspended") void ctx.resume();
  } catch {
    ctx = null;
  }
}

function ready() {
  return on && ctx && out && ctx.state === "running" ? ctx : null;
}

type ToneOpts = { type?: OscillatorType; gain?: number; at?: number; to?: number };

function tone(freq: number, dur: number, { type = "sine", gain = 0.12, at = 0, to }: ToneOpts = {}) {
  const c = ready();
  if (!c || !out) return;
  const t = c.currentTime + at;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function noise(dur: number, { gain = 0.1, freq = 1000, at = 0, type = "lowpass" as BiquadFilterType } = {}) {
  const c = ready();
  if (!c || !out) return;
  const t = c.currentTime + at;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = c.createBufferSource();
  const f = c.createBiquadFilter();
  const g = c.createGain();
  src.buffer = buf;
  f.type = type;
  f.frequency.value = freq;
  g.gain.value = gain;
  src.connect(f).connect(g).connect(out);
  src.start(t);
}

export const sfx = {
  tick: () => tone(2400, 0.025, { type: "triangle", gain: 0.02 }),
  knock: () => {
    tone(210, 0.08, { gain: 0.22, to: 110 });
    noise(0.03, { gain: 0.06, freq: 1800 });
  },
  stamp: () => {
    tone(120, 0.16, { gain: 0.32, to: 48 });
    noise(0.1, { gain: 0.22, freq: 500 });
  },
  chain: () => [0, 0.05, 0.11, 0.18].forEach((at, i) => tone(3200 - i * 300, 0.05, { type: "triangle", gain: 0.04, at })),
  flip: () => {
    noise(0.16, { gain: 0.1, freq: 2200, type: "bandpass" });
    tone(420, 0.14, { type: "triangle", gain: 0.04, to: 820 });
  },
  coin: () => {
    tone(988, 0.07, { type: "square", gain: 0.035 });
    tone(1319, 0.22, { type: "square", gain: 0.035, at: 0.07 });
  },
  fanfare: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.24, { type: "triangle", gain: 0.08, at: i * 0.085 })),
  bell: () => {
    tone(1568, 0.9, { type: "sine", gain: 0.08 });
    tone(2093, 0.7, { type: "sine", gain: 0.05, at: 0.12 });
  },
  squash: () => {
    noise(0.07, { gain: 0.28, freq: 900 });
    tone(320, 0.09, { type: "sawtooth", gain: 0.05, to: 70 });
  },
  buzz: () => tone(140, 0.25, { type: "sawtooth", gain: 0.05, to: 90 }),
};

export type Sfx = keyof typeof sfx;
