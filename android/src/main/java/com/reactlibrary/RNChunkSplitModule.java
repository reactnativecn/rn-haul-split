
package com.reactlibrary;
import android.util.Log;

import com.facebook.react.bridge.CatalystInstanceImpl;
import com.facebook.react.bridge.JSBundleLoader;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name="RNChunkSplit")
public class RNChunkSplitModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNChunkSplitModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNChunkSplit";
  }

  @ReactMethod
  public void loadScript(String url, Promise promise) {
    Log.d("ReactNative", "Loading chunk:" + url);
    JSBundleLoader loader = null;
    if (url.startsWith("assets://")) {
      loader = JSBundleLoader.createAssetLoader(getReactApplicationContext(), url, false);
    } else {
      loader = JSBundleLoader.createFileLoader(url);
    }
    loader.loadScript((CatalystInstanceImpl)getReactApplicationContext().getCatalystInstance());
    promise.resolve(null);
  }
}