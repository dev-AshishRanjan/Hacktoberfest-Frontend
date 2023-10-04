const context = new (window.AudioContext || window.webkitAudioContext)();

const makeDistortionCurve = (amount, samples = 44100) => {
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < samples; ++i) {
        const x = i * 2 / samples - 1;
        curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
    }
    return curve;
};


const addSmallDistortion = (context, gainNode, distortionAmount) => {
    const distortionNode = context.createWaveShaper();
    distortionNode.curve = makeDistortionCurve(distortionAmount);
    distortionNode.oversample = '16x';
    connectNodes(gainNode, distortionNode, context.destination);
};

const createOscillator = (type) => Object.assign(context.createOscillator(), { type });

const createGainNode = (initialValue) => {
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(initialValue, context.currentTime);
    return gainNode;
};

const connectNodes = (...nodes) => nodes.reduce((prev, next) => (prev.numberOfOutputs >= 1 && next.numberOfInputs >= 1) ? (prev.connect(next), next) : prev);

const setFrequencyRamp = (oscillator, startTime, values) => {
    oscillator.frequency.setValueAtTime(values[0], startTime);
    values.slice(1).forEach((value, i) => oscillator.frequency.exponentialRampToValueAtTime(value, startTime + i * 0.05));
};

const setGainRamp = (gainNode, startTime, values) => {
    gainNode.gain.setValueAtTime(values[0], startTime);
    values.slice(1).forEach((value, i) => gainNode.gain.exponentialRampToValueAtTime(value, startTime + i * 0.05));
};



const generateKick = context => {

    const { destination, currentTime } = context;

    const osc = context.createOscillator();
    const gain = context.createGain();


    osc.connect(gain).connect(destination);

    osc.frequency.setValueAtTime(150, currentTime);
    gain.gain.setValueAtTime(1, currentTime);

    osc.frequency.exponentialRampToValueAtTime(0.01, currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.5);

    osc.start(currentTime);
    osc.stop(currentTime + 0.5);
};



const generateSnare = (context) => {

    const noiseBuffer = () => {
        const bufferSize = context.sampleRate;
        const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const output = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        return buffer;
    };

    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer();

    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    noise.connect(noiseFilter);

    const noiseEnvelope = context.createGain();
    noiseFilter.connect(noiseEnvelope);


    const { destination, currentTime } = context;

    noiseEnvelope.connect(destination);

    const osc = context.createOscillator();
    osc.type = 'triangle';

    const oscEnvelope = context.createGain();
    osc.connect(oscEnvelope);
    oscEnvelope.connect(destination);

    noiseEnvelope.gain.setValueAtTime(1, currentTime);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.2);
    noise.start(context.currentTime);

    osc.frequency.setValueAtTime(100, currentTime);
    oscEnvelope.gain.setValueAtTime(0.7, currentTime);
    oscEnvelope.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.1);
    osc.start(currentTime);

    osc.stop(currentTime + 0.2);
    noise.stop(currentTime + 0.2);
};

const generateClap = () => {
    const noise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const gainNode = createGainNode(0.5);
    const buffer = context.createBuffer(1, context.sampleRate * 0.5, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 10;

    noise.buffer = buffer;

    const { destination, currentTime } = context;
    connectNodes(noise, noiseFilter, gainNode, destination);
    setGainRamp(gainNode, context.currentTime, [0.001, 0.7, 0.3, 0.001]);

    noise.start(currentTime);
    noise.stop(currentTime + 0.5);
};

const generateHiTom = (context) => {
    const oscillator = context.createOscillator();
    oscillator.type = 'triangle';

    const gainNode = context.createGain();
    gainNode.gain.value = 0.6;

    oscillator.connect(gainNode);

    const { destination, currentTime } = context;
    gainNode.connect(destination);

    const frequencies = [440, 880, 660, 440];
    setFrequencyRamp(oscillator, currentTime, frequencies);

    const gains = [0.8, 0.1, 0.1, 0.001];
    setGainRamp(gainNode, currentTime, gains);

    addSmallDistortion(context, gainNode, 12);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.5);
};

const generateCH = () => {
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = createGainNode(0.3);
    const buffer = context.createBuffer(1, context.sampleRate * 0.05, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    noise.buffer = buffer;
    connectNodes(noise, filter, gain);

    const { destination, currentTime } = context;
    gain.connect(destination);

    filter.type = 'highpass';
    filter.frequency.value = 3000;
    filter.Q.value = 8;

    setGainRamp(gain, currentTime, [0.005, 0.7, 0.1]);

    gain.gain.setValueAtTime(0.2, currentTime);
    const distortion = context.createWaveShaper();
    distortion.curve = makeDistortionCurve(0.01);
    connectNodes(gain, distortion, destination);

    noise.start(currentTime);
    noise.stop(currentTime + 0.1);
};

const generateOH = () => {
    const noise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const gainNode = createGainNode(0.5);
    const compressor = context.createDynamicsCompressor();
    const buffer = context.createBuffer(1, context.sampleRate * 0.4, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 5500;
    noiseFilter.Q.value = 10;

    noise.buffer = buffer;
    const { destination, currentTime } = context;
    connectNodes(noise, noiseFilter, compressor, gainNode, destination);

    noise.start(currentTime);
    noise.stop(currentTime + 0.1);

    setNoiseFrequencyRamp(noise, currentTime, [1.5, 1.75, 2.6, 2.5]);
    setGainRamp(gainNode, currentTime, [0.01, 1, 0.7, 0.7]);
    addSmallDistortion(context, gainNode, 12);

    compressor.threshold.setValueAtTime(-12, currentTime);
    compressor.ratio.setValueAtTime(12, currentTime);
    compressor.attack.setValueAtTime(0.003, currentTime);
    compressor.release.setValueAtTime(2.1, currentTime);
};

const setNoiseFrequencyRamp = (noise, startTime, values) => {
    noise.playbackRate.setValueAtTime(values[0], startTime);
    values.slice(1).forEach((value, i) => {
        noise.playbackRate.exponentialRampToValueAtTime(value, startTime + i * 0.05);
    });
};

export {
    generateKick,
    generateSnare,
    generateClap,
    generateHiTom,
    generateCH,
    generateOH,
    setNoiseFrequencyRamp
};
