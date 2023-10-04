import { generateKick, generateSnare, generateClap, generateHiTom, generateCH, generateOH } from './generator.js' 

const seq = {
    kick: [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    clap: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ch: [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    oh: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    hitom: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
const bpmToTimeout = (bpm) => parseFloat(15000 / bpm);

let bpm = 120;
let currentStep = 0;
let stepsCount=16;
// let stepSize=4;
let timerID = null;
let isPlaying = false;
let context = new (window.AudioContext || window.webkitAudioContext)();
let nextNoteTime=0;

let scheduleAheadTime=0.1;
let schedulerTimeoutVal=bpmToTimeout(bpm);
// let stepDuration= ((bpm/2)/bpm)/stepSize;
let stepDuration= 0.125;


const keys = { c: 'kick', x: 'snare', b: 'clap', z: 'ch', v: 'oh', n: 'hitom' };

const soundGenerators = { kick: generateKick, snare: generateSnare, clap: generateClap, oh: generateOH, ch: generateCH, hitom: generateHiTom };


const playSound = (sound, generator, context, isSingle = false) => (seq[sound][currentStep] || isSingle) && generator(context);

const createSeqSteps = () => {
    Object.keys(seq).forEach((drum) => {
        const stepsContainer = document.getElementById(`${drum}-steps`);
        stepsContainer.innerHTML = '';

        seq[drum].forEach((_, i) => {
            const step = document.createElement('div');
            step.classList.add('step', 'w-6', 'h-6', 'border', 'border-gray-700', 'mr-1', 'cursor-pointer');
            step.classList.toggle('active', seq[drum][i]);
            step.dataset.sound = drum;
            step.dataset.step = i;
        
            step.addEventListener('click', () => {
                seq[drum][i] = !seq[drum][i];
                step.classList.toggle('active', seq[drum][i]);
            });
        
            stepsContainer.appendChild(step);
        });
        
    });
};

const createIndicatorSteps = () => {
    const indicator = document.getElementById('indicator-steps');
    indicator.innerHTML = '';

    Array.from({ length: stepsCount }).forEach((_, i) => {
        const step = document.createElement('div');
        step.classList.add('step', 'w-6', 'h-6', 'border', 'border-gray-700', 'mr-1', 'cursor-pointer');
        step.classList.toggle('activeIndicator', i === currentStep);
    
        indicator.appendChild(step);
    });
    
};

const playSequence = () => {
    const currentTime = context.currentTime;
    ['kick', 'snare', 'hitom', 'oh', 'ch', 'clap'].forEach(sound => playSound(sound, soundGenerators[sound], context));
    currentStep = (currentStep + 1) % stepsCount;

    const indicatorSteps = document.querySelectorAll('#indicator .step');
    indicatorSteps.forEach((step, index) => step.classList.toggle('activeIndicator', index === currentStep));
    nextNoteTime = currentTime + stepDuration;
}

const scheduler = () => {
    while (nextNoteTime < context.currentTime + scheduleAheadTime) {
        playSequence();
    }
    timerID = setTimeout(scheduler, schedulerTimeoutVal);
}

const togglePlayback = () => {
    context = new (window.AudioContext || window.webkitAudioContext)();
    isPlaying = !isPlaying;
    const playButton = document.getElementById('togglePlayback');

    playButton.textContent = "Pause";
    if (isPlaying) {
        if (context.state === "suspended") {
            context.resume();
        }
        nextNoteTime = context.currentTime;

        scheduler();
    } else {
        clearTimeout(timerID);
        playButton.textContent = "Play"; 
    }
};

const toggleStep = (drum, step) => seq[drum][step] = seq[drum][step] === 1 ? 0 : 1;

const handleKeyPress = (event) => {
    const key = event.key;
    if (keys[key]) playSound(keys[key], soundGenerators[keys[key]], context, true);
    else if (key === ' ') togglePlayback();
};

const buttons = document.querySelectorAll('.drum-machine button[data-sound]');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const sound = button.dataset.sound;
        playSound(sound, soundGenerators[sound], context, true);
    });
});

document.getElementById('togglePlayback').addEventListener('click', togglePlayback);
document.getElementById('bpm').addEventListener('input', (event) => {
    bpm = event.target.value;
    schedulerTimeoutVal = bpmToTimeout(bpm);
});

window.addEventListener('keydown', handleKeyPress);

createSeqSteps();
createIndicatorSteps();
