package com.sleepfreqtimer

import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import com.facebook.react.bridge.ReadableMap
import kotlin.math.sin
import kotlin.math.PI
import java.util.Random

class AudioEngine {
    private var audioTrack: AudioTrack? = null
    private var isPlaying = false
    private var thread: Thread? = null
    private val sampleRate = 44100
    private var volume = 0.5f // Master volume
    
    // State
    private var currentMode = "deep"
    
    // Pulse state
    private var time = 0.0
    private var pulsePhase = 0.0
    
    fun play(mode: String, params: ReadableMap) {
        stop()
        currentMode = mode
        isPlaying = true
        
        val bufferSize = AudioTrack.getMinBufferSize(
            sampleRate,
            AudioFormat.CHANNEL_OUT_STEREO,
            AudioFormat.ENCODING_PCM_16BIT
        ) * 2

        audioTrack = AudioTrack.Builder()
            .setAudioAttributes(AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .build())
            .setAudioFormat(AudioFormat.Builder()
                .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                .setSampleRate(sampleRate)
                .setChannelMask(AudioFormat.CHANNEL_OUT_STEREO)
                .build())
            .setBufferSizeInBytes(bufferSize)
            .setTransferMode(AudioTrack.MODE_STREAM)
            .build()
            
        setVolume(volume)
        audioTrack?.play()
        
        thread = Thread {
            val buffer = ShortArray(1024)
            var phaseL = 0.0
            var phaseR = 0.0
            
            // Pad phases
            var phasePad1 = 0.0
            
            // LFO for breathing
            var lfoPhase = 0.0

            // Mode Configuration
            var carrier = 100.0
            var beat = 0.0
            var hasHeartbeat = false
            var hasDrone = false
            var hasSubHarmonic = false
            var hasBreathing = false
            var isBinaural = false

            when (currentMode) {
                "deep" -> { // Pleasant audible tone (similar to Lucid)
                    carrier = 200.0  // Audible on phone speakers
                    beat = 0.0       // No binaural beat
                    hasSubHarmonic = true  // Warm bass undertone
                    isBinaural = false
                }
                "lucid" -> { // Theta + Warm Sub-tone
                    carrier = 200.0
                    beat = 6.0 
                    hasSubHarmonic = true 
                    isBinaural = true
                }
                "healing" -> { // 432Hz + Warm Sub-tone
                    carrier = 432.0
                    beat = 0.0
                    hasSubHarmonic = true
                    isBinaural = false
                }
                "meditation" -> { // 528Hz + Gentle Breath
                    carrier = 528.0
                    beat = 0.0
                    hasBreathing = true
                    isBinaural = false
                }
            }

            val leftFreq = carrier
            val rightFreq = carrier + beat
            
            // Drone Phase
            var dronePhase = 0.0

            while (isPlaying) {
                for (i in 0 until buffer.size step 2) {
                    // 1. Generate Ambience (Drone, Sub-tone, Breathing)
                    var ambience = 0.0
                    var ampMod = 1.0 
                    
                    if (hasDrone) {
                        // Constant 50Hz Warm Tone (Linear)
                        // Volume: Moderate/High as requested "hearable peacefully"
                        ambience = sin(dronePhase) * 0.5 
                        dronePhase += 2 * PI * 50.0 / sampleRate
                        if (dronePhase > 2*PI) dronePhase -= 2*PI
                    } else if (hasSubHarmonic) {
                        // Octave down sine wave (warmth)
                        val subFreq = carrier / 2.0
                        ambience = sin(phasePad1) * 0.15 // 15% volume
                        phasePad1 += 2 * PI * subFreq / sampleRate
                        if (phasePad1 > 2*PI) phasePad1 -= 2*PI
                    } else if (hasBreathing) {
                        // LFO: 0.1Hz (10s cycle)
                        ampMod = 0.8 + (sin(lfoPhase) * 0.2)
                        lfoPhase += 2 * PI * 0.1 / sampleRate
                        if (lfoPhase > 2*PI) lfoPhase -= 2*PI
                    }

                    // 2. Generate Tones
                    val baseVol = 0.8 // Standardized volume
                    val finalVol = baseVol * ampMod
                    
                    val sineL = sin(phaseL) * finalVol
                    val sineR = if (isBinaural) sin(phaseR) * finalVol else sineL
                    
                    // Mix
                    var valLeft = sineL + ambience
                    var valRight = sineR + ambience

                    // Phase increment
                    phaseL += 2 * PI * leftFreq / sampleRate
                    if (isBinaural) {
                        phaseR += 2 * PI * rightFreq / sampleRate
                    } else {
                        phaseR = phaseL 
                    }
                    
                    if (phaseL > 2 * PI) phaseL -= 2 * PI
                    if (phaseR > 2 * PI) phaseR -= 2 * PI

                    // Time increment for heartbeat
                    time += 1.0 / sampleRate
                    if (time > 10.0) time -= 10.0 // Prevent overflow, keep loop clean

                    // Clipping
                    if (valLeft > 1.0) valLeft = 1.0
                    if (valLeft < -1.0) valLeft = -1.0
                    if (valRight > 1.0) valRight = 1.0
                    if (valRight < -1.0) valRight = -1.0

                    buffer[i] = (valLeft * Short.MAX_VALUE).toInt().toShort()
                    buffer[i+1] = (valRight * Short.MAX_VALUE).toInt().toShort()
                }
                audioTrack?.write(buffer, 0, buffer.size)
            }
        }
        thread?.start()
    }

    fun stop() {
        isPlaying = false
        try {
            thread?.join()
        } catch (e: Exception) { e.printStackTrace() }
        
        try {
            audioTrack?.stop()
            audioTrack?.release()
        } catch (e: Exception) { e.printStackTrace() }
        
        audioTrack = null
    }

    fun setVolume(vol: Float) {
        this.volume = vol
        audioTrack?.setVolume(vol)
    }
}
