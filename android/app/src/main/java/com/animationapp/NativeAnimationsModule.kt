package com.animationapp

import android.view.View
import android.view.animation.AlphaAnimation
import android.view.animation.RotateAnimation
import android.view.animation.TranslateAnimation
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NativeAnimationsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NativeAnimations"
    }

    @ReactMethod
    fun fadeInAnimation(viewTag: Int, duration: Int) {
        val view = currentActivity?.findViewById<View>(viewTag)
        val fadeIn = AlphaAnimation(0f, 1f)
        fadeIn.duration = duration.toLong()
        view?.startAnimation(fadeIn)
    }

    @ReactMethod
    fun slideInAnimation(viewTag: Int, duration: Int) {
        val view = currentActivity?.findViewById<View>(viewTag)
        val slideIn = TranslateAnimation(-view!!.width.toFloat(), 0f, 0f, 0f)
        slideIn.duration = duration.toLong()
        view.startAnimation(slideIn)
    }

    @ReactMethod
    fun rotateButton(viewTag: Int) {
        val view = currentActivity?.findViewById<View>(viewTag)
        val rotate = RotateAnimation(
            0f, 360f,
            RotateAnimation.RELATIVE_TO_SELF, 0.5f,
            RotateAnimation.RELATIVE_TO_SELF, 0.5f
        )
        rotate.duration = 500
        view?.startAnimation(rotate)
    }
}
