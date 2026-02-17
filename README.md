<h1 align="center"><b>🌙 Easy Sleep</b></h1>

<p align="center">
<b>Easy Sleep</b> is a high-performance Android application designed for
<b>brainwave entrainment and deep relaxation</b>.
</p>

<p align="center">
Unlike traditional sleep apps that rely on MP3 playback, Easy Sleep uses a
<b>custom native audio engine</b> to synthesize pure frequencies and binaural beats in real-time,
ensuring zero-latency, scientific precision, and minimal memory usage.
</p>

<hr>

<h2><b>🚀 Key Features</b></h2>

<h3><b>🎵 Real-Time Audio Synthesis</b></h3>
<p>
No audio files. No loops.  
All tones are dynamically generated using native Kotlin for precision and performance.
</p>

<h3><b>📱 Swipe-Based UX</b></h3>
<p>
Minimalist, distraction-free interface built with <code>react-native-pager-view</code>,
optimized for low-light environments.
</p>

<h3><b>⚡ Optimized Performance</b></h3>
<ul>
<li>Reduced APK size from <b>117MB → 46MB</b></li>
<li>R8 Minification enabled</li>
<li>Resource Shrinking enabled</li>
<li>Optimized JavaScriptCore engine</li>
</ul>

<h3><b>⏳ Background Playback & Timer</b></h3>
<ul>
<li>Full background audio support</li>
<li>Auto-stop timer (30m, 60m, 8h)</li>
</ul>

<h3><b>🎨 Adaptive Branding</b></h3>
<p>
Full support for Android Adaptive Icons (v26+) for a premium native appearance.
</p>

<hr>

<h2><b>🔬 The Science of Sound</b></h2>

<table>
<tr>
<th>Mode</th>
<th>Frequency</th>
<th>Description</th>
<th>Scientific Benefit</th>
</tr>

<tr>
<td>🌙 Lucid Dream</td>
<td>200Hz + 6Hz</td>
<td>Theta Binaural Beats</td>
<td>Facilitates REM sleep & creative visualization</td>
</tr>

<tr>
<td>😴 Deep Sleep</td>
<td>200Hz / 100Hz</td>
<td>Low-Frequency Drone</td>
<td>Creates stable auditory masking for deep rest</td>
</tr>

<tr>
<td>💚 Healing</td>
<td>432Hz</td>
<td>Harmonic Sine Wave</td>
<td>Associated with relaxation & heart-rate calming</td>
</tr>

<tr>
<td>🧘 Meditation</td>
<td>528Hz</td>
<td>Solfeggio Tone</td>
<td>Linked to emotional balance & stress reduction</td>
</tr>

</table>

<hr>

<h2 align="center"><b>📸 Screenshots</b></h2>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7cfd3798-3ab6-4551-87d4-11872a32cc7f" width="220"/>
  <img src="https://github.com/user-attachments/assets/c8ce596e-e9dc-4714-be02-3ac589e04db4" width="220"/>
  <img src="https://github.com/user-attachments/assets/d354366f-35da-4652-bee1-d74117ebefa7" width="220"/>
  <img src="https://github.com/user-attachments/assets/2a1e1cc6-92f3-4982-93f0-1ab497d07e0c" width="220"/>
</p>

<hr>

<h2><b>🛠 Technical Architecture</b></h2>

<h3><b>Core Stack</b></h3>
<ul>
<li><b>Frontend:</b> React Native (TypeScript)</li>
<li><b>Audio Engine:</b> Native Kotlin (Android)</li>
<li><b>Navigation:</b> react-native-pager-view</li>
<li><b>Build System:</b> Gradle (R8 + ProGuard enabled)</li>
</ul>

<hr>

<h2><b>🔊 Native Audio Engine</b></h2>

<p>
To eliminate large audio assets, a custom <code>AudioEngine.kt</code> was implemented
using <code>android.media.AudioTrack</code>.
</p>

<pre><code>
// Real-time sine wave generation
val sineL = sin(phaseL) * finalVol
val sineR = if (isBinaural) sin(phaseR) * finalVol else sineL

// Phase increment calculation
phaseL += 2 * PI * leftFreq / sampleRate
</code></pre>

<p>
This enables continuous waveform synthesis, precise binaural beats,
minimal memory usage, and high-fidelity output.
</p>

<hr>

<h2><b>📦 APK Size Optimization</b></h2>

<ul>
<li>✔ R8 Minification</li>
<li>✔ Resource Shrinking</li>
<li>✔ JavaScriptCore Optimization</li>
<li>✔ Dead Code Elimination</li>
</ul>

<hr>

<h2><b>🛠 Installation & Build</b></h2>

<h3>1️⃣ Clone Repository</h3>

<pre><code>
git clone https://github.com/your-username/easy-sleep.git
</code></pre>

<h3>2️⃣ Install Dependencies</h3>

<pre><code>
npm install
</code></pre>

<h3>3️⃣ Generate Release APK</h3>

<pre><code>
cd android
./gradlew assembleRelease
</code></pre>

<hr>

<h2><b>🛡 License</b></h2>

<p>
Distributed under the <b>Apache License</b>.  
See the LICENSE file for more information.
</p>
