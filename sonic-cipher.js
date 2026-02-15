// ===============================
// SONIC CIPHER CORE ENGINE
// Image <-> Audio Encoder Decoder
// ===============================

const FIXED_WIDTH = 500;

// ---------- Logger ----------
function log(id, msg) {
  const box = document.getElementById(id);
  box.innerHTML += `<div>> ${msg}</div>`;
  box.scrollTop = box.scrollHeight;
}

// ---------- ENCODER ----------
let currentImgData = null;

function loadImageToCanvas(file, canvas, ctx) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.height / img.width;
      canvas.width = FIXED_WIDTH;
      canvas.height = Math.round(FIXED_WIDTH * ratio);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      currentImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function encodeImage(canvas) {
  if (!currentImgData) return alert("No image loaded");

  const raw = currentImgData.data;
  const samples = new Int16Array(raw.length + 2);

  samples[0] = canvas.height;
  samples[1] = FIXED_WIDTH;

  for (let i = 0; i < raw.length; i++) {
    samples[i + 2] = (raw[i] - 128) * 256;
  }

  const wav = createWav(samples);
  const url = URL.createObjectURL(wav);

  const a = document.createElement("a");
  a.href = url;
  a.download = `sonic_cipher_${Date.now()}.wav`;
  a.click();
}

// ---------- DECODER ----------
function decodeAudio(buffer, canvas, ctx) {
  const view = new DataView(buffer);
  const offset = 44;

  const height = view.getInt16(offset, true);
  canvas.width = FIXED_WIDTH;
  canvas.height = height;

  const imgData = ctx.createImageData(canvas.width, canvas.height);
  let p = 0;

  for (let i = offset + 4; i < buffer.byteLength; i += 2) {
    if (p >= imgData.data.length) break;
    let sample = view.getInt16(i, true);
    imgData.data[p++] = Math.min(255, Math.max(0, (sample / 256) + 128));
  }

  ctx.putImageData(imgData, 0, 0);
}

// ---------- WAV BUILDER ----------
function createWav(samples) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const write = (o, s) => [...s].forEach((c, i) => view.setUint8(o + i, c.charCodeAt(0)));

  write(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  write(8, "WAVE");

  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, 44100, true);
  view.setUint32(28, 44100 * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);

  write(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let o = 44;
  samples.forEach(s => {
    view.setInt16(o, s, true);
    o += 2;
  });

  return new Blob([view], { type: "audio/wav" });
}
