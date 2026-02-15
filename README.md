# 🔊 SONIC CIPHER  
### aka **SonicCipher Protocol**

**Sonic Cipher** is a browser-based experimental data encoding system that converts **images into sound (WAV audio)** and reconstructs them back into visuals.  
Instead of hiding data *inside* audio, this project **turns audio itself into the data carrier**.

> _When pixels become waveforms, images become invisible._

---

## 🧠 What Is Sonic Cipher?

Sonic Cipher is inspired by:
- **SSTV (Slow Scan Television)**
- Signal-based data transmission
- Experimental steganography & digital signal processing

It demonstrates how **visual data can be transported as raw audio signals** using only browser technologies.

This project is:
- ⚙️ Fully client-side
- 🧪 Experimental & educational
- 🔒 Offline & privacy-friendly
- 🎛️ Real-time and interactive

---

## ✨ Features

- 🖼️ Encode any image into a **WAV audio file**
- 🔊 Use **audio samples as pixel data**
- 🔁 Decode WAV back into the original image
- 🎞️ Animated real-time reconstruction
- 🧠 Stores image dimensions inside audio samples
- 📦 No backend, no server, no uploads
- 💻 Works entirely in modern browsers


---

## ⚙️ How It Works (Technical Breakdown)

### 🔐 Encoding Process (Image → Audio)

1. Image is loaded into an HTML5 `<canvas>`
2. RGBA pixel data is extracted (0–255 values)
3. Each byte is converted into **16-bit PCM audio samples**
4. Image dimensions are stored in the first audio samples
5. A **WAV file (44100Hz, 16-bit, mono)** is generated

Result:  
📦 A `.wav` file that *contains the image data as sound*

---

### 🔓 Decoding Process (Audio → Image)

1. WAV header is parsed
2. Stored image dimensions are read
3. PCM samples are converted back to pixel bytes
4. Image is reconstructed pixel-by-pixel on canvas
5. Final image can be exported as PNG

⚠️ The audio **must remain WAV**.  
MP3 / AAC compression will permanently destroy the data.

---

## 🚀 How To Use

### 1️⃣ Encode an Image
1. Open `index.html` in your browser
2. Select an image file
3. Click **INITIALIZE ENCRYPTION**
4. Download the generated `.wav` file

### 2️⃣ Decode an Audio File
1. Upload the generated `.wav`
2. Click **START DECRYPTION**
3. Wait for reconstruction animation
4. Save the decoded image

---

## 🛠️ Technologies Used

### Core Technologies
- **JavaScript (Vanilla)**
- **HTML5 Canvas API**
- **Typed Arrays** (`Int16Array`, `Uint8ClampedArray`)
- **FileReader API**
- **Blob & DataView**

### Audio / Data Protocols
- WAV (RIFF format)
- PCM 16-bit, Mono
- 44.1 kHz sample rate
- Custom pixel-to-audio mapping

---

## 🔐 Privacy & Security

- 100% client-side
- No network requests
- No analytics
- No external libraries
- No data stored anywhere

Your files never leave your device.

---

## ⚠️ Limitations

- Large images produce very large WAV files
- Not cryptographically secure (experimental encoding)
- Designed for learning, demos, and exploration
- Audio must not be compressed

---

## 🧪 Use Cases

- Learning digital signal processing
- Understanding audio & image data structures
- Experimental steganography
- Creative coding projects
- Hacker-style demos & visualizations

---

## 🛣️ Future Improvements

- 🔐 Add real encryption (AES/XOR layer)
- 📡 Live audio playback of encoded data
- 🧬 Steganographic masking
- 🌐 Progressive Web App (PWA)
- 🎚️ Adjustable sample rates & quality

---

## 👤 Author

**Mohd Taki (Taki Zaidi)**  
Frontend Developer • Automation Learner • Creative Technologist  


