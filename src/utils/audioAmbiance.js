// Web Audio API Procedural Humidor Atmosphere & Analog Warmth
// Zero external mp3/wav files required, 100% standalone, royalty-free

let audioCtx = null;
let masterGain = null;
let osc1 = null;
let osc2 = null;
let filter = null;
let crackleTimer = null;
let isPlaying = false;

export function toggleHumidorAmbiance(onStateChange) {
  if (isPlaying) {
    stopHumidorAmbiance();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    const started = startHumidorAmbiance();
    if (onStateChange) onStateChange(started);
    return started;
  }
}

export function startHumidorAmbiance() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Master Volume with soft fade-in
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.065, audioCtx.currentTime + 3.0);
    masterGain.connect(audioCtx.destination);

    // Warm Low-pass Filter for dark humidor acoustic room
    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.2, audioCtx.currentTime);
    filter.connect(masterGain);

    // Primary warm harmonic drone (68Hz - warm sub octave)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(68.4, audioCtx.currentTime);

    // Secondary subtle fifth overtone (102.6Hz)
    osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(102.6, audioCtx.currentTime);

    const droneGain = audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.5, audioCtx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);

    osc1.start();
    osc2.start();

    // Occasional subtle warm analog crackle (gentle burning ember / vinyl warmth)
    function playMicroCrackle() {
      if (!isPlaying || !audioCtx) return;
      try {
        const bufferSize = audioCtx.sampleRate * 0.04;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1400 + Math.random() * 800;
        noiseFilter.Q.value = 4.0;

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.value = 0.008 + Math.random() * 0.012;

        noise.connect(noiseFilter);
        noiseFilter.connect(masterGain);

        noise.start();

        const nextDelay = 700 + Math.random() * 2200;
        crackleTimer = setTimeout(playMicroCrackle, nextDelay);
      } catch (err) {
        // ignore audio glitch
      }
    }

    crackleTimer = setTimeout(playMicroCrackle, 1000);

    isPlaying = true;
    return true;
  } catch (e) {
    console.warn('Web Audio Ambiance not initialized:', e);
    return false;
  }
}

export function stopHumidorAmbiance() {
  if (!isPlaying || !audioCtx) return;

  try {
    if (masterGain) {
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    }

    setTimeout(() => {
      if (osc1) { try { osc1.stop(); osc1.disconnect(); } catch (_) {} osc1 = null; }
      if (osc2) { try { osc2.stop(); osc2.disconnect(); } catch (_) {} osc2 = null; }
      if (crackleTimer) { clearTimeout(crackleTimer); crackleTimer = null; }
      isPlaying = false;
    }, 1300);
  } catch (e) {
    isPlaying = false;
  }
}

export function getAmbianceState() {
  return isPlaying;
}
