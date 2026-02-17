package com.sleepfreqtimer

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class SoundGeneratorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    // Companion object to hold the singleton engine if needed, or just instance
    // Keeping it instance based is fine as Module is usually singleton
    private val audioEngine = AudioEngine()

    override fun getName(): String {
        return "SoundGenerator"
    }

    @ReactMethod
    fun play(type: String, params: ReadableMap) {
        audioEngine.play(type, params)
    }

    @ReactMethod
    fun stop() {
        audioEngine.stop()
    }

    @ReactMethod
    fun setVolume(volume: Double) {
        audioEngine.setVolume(volume.toFloat())
    }
}
