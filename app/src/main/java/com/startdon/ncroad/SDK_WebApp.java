package com.startdon.ncroad;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.Window;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.startdon.ncroad.utils.SharedPreferencesUtils;

import java.util.UUID;

import io.dcloud.EntryProxy;
import io.dcloud.common.DHInterface.ICore;
import io.dcloud.common.DHInterface.ICore.ICoreStatusListener;
import io.dcloud.common.DHInterface.ISysEventListener.SysEventType;
import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.IWebviewStateListener;
import io.dcloud.feature.internal.sdk.SDK;

/**
 * 启动界面的处理
 */
public class SDK_WebApp extends Activity {

    //	boolean doHardAcc = true;
    EntryProxy mEntryProxy = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        if (mEntryProxy == null) {
            FrameLayout rootView = new FrameLayout(this);

            // 创建5+内核运行事件监听
            WebviewModeListener wm = new WebviewModeListener(this, rootView);
            // 初始化5+内核
            mEntryProxy = EntryProxy.init(this, wm);
            // 启动5+内核
            mEntryProxy.onCreate(this, savedInstanceState, SDK.IntegratedMode.WEBVIEW, null);
            setContentView(rootView);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return mEntryProxy.onActivityExecute(this, SysEventType.onCreateOptionMenu, menu);
    }

    @Override
    public void onPause() {
        super.onPause();
        mEntryProxy.onPause(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        mEntryProxy.onResume(this);
    }

    @SuppressLint("WrongConstant")
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        if (intent.getFlags() != 0x10600000) {// 非点击icon调用activity时才调用newintent事件
            mEntryProxy.onNewIntent(this, intent);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mEntryProxy.onStop(this);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        boolean _ret = mEntryProxy.onActivityExecute(this, SysEventType.onKeyDown, new Object[]{keyCode, event});
        return _ret ? _ret : super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        boolean _ret = mEntryProxy.onActivityExecute(this, SysEventType.onKeyUp, new Object[]{keyCode, event});
        return _ret ? _ret : super.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyLongPress(int keyCode, KeyEvent event) {
        boolean _ret = mEntryProxy.onActivityExecute(this, SysEventType.onKeyLongPress, new Object[]{keyCode, event});
        return _ret ? _ret : super.onKeyLongPress(keyCode, event);
    }

    public void onConfigurationChanged(Configuration newConfig) {
        if (newConfig.fontScale != 1)//非默认值
            getResources();
        try {
            int temp = this.getResources().getConfiguration().orientation;
            if (mEntryProxy != null) {
                mEntryProxy.onConfigurationChanged(this, temp);
            }
            super.onConfigurationChanged(newConfig);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //系统字体变大导致的布局异常
    @Override
    public Resources getResources() {
        Resources res = super.getResources();
        if (res.getConfiguration().fontScale != 1) {//非默认值
            Configuration newConfig = new Configuration();
            newConfig.setToDefaults();//设置默认
            res.updateConfiguration(newConfig, res.getDisplayMetrics());
        }
        return res;
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        mEntryProxy.onActivityExecute(this, SysEventType.onActivityResult, new Object[]{requestCode, resultCode, data});
    }

}

class WebviewModeListener implements ICoreStatusListener {

    LinearLayout btns = null;
    Activity activity = null;
    ViewGroup mRootView = null;
    IWebview webview = null;

    TextView setPara;
    String url;


    public WebviewModeListener(final Activity activity, ViewGroup rootView) {
        this.activity = activity;
        url = SharedPreferencesUtils.getString(activity, "URL", "");
        if ("".equals(url)) {
            Intent itt = new Intent();
            itt.setClass(activity, SetActivity.class);
            activity.startActivity(itt);
            activity.finish();

            return;
        }


        mRootView = rootView;
        btns = new LinearLayout(activity);
//		mRootView.setBackgroundColor(0xff0000ff);
        View view = activity.getLayoutInflater().inflate(R.layout.activity_ncrmain, null);
        setPara = view.findViewById(R.id.setpara);
        setPara.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent itt = new Intent();
                itt.setClass(activity, SetActivity.class);
                activity.startActivity(itt);
                activity.finish();

                return;

            }
        });

        mRootView.addView(view);
        mRootView.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                webview.onRootViewGlobalLayout(mRootView);
            }
        });
    }

    /**
     * 5+内核初始化完成时触发
     */
    @Override
    public void onCoreInitEnd(ICore coreHandler) {
        // 设置单页面集成的appid
//		String appid = "TestAppid";   如果使用本地直接配置的数据这里就配置assets/apps/stardonh5
        String appid = UUID.randomUUID().toString();
        // 单页面集成时要加载页面的路径，可以是本地文件路径也可以是网络路径
//		String url = "http://www.baidu.com";
//		String url = "html/login/login.html";

        // 设置启动参数,可在页面中通过plus.runtime.arguments;方法获取到传入的参数
//        String args = "{url:'http://www.baidu.com'}";

        webview = SDK.createWebview(activity, url, appid, new IWebviewStateListener() {
            @Override
            public Object onCallBack(int pType, Object pArgs) {
                switch (pType) {
                    case IWebviewStateListener.ON_WEBVIEW_READY:
                        // 准备完毕之后添加webview到显示父View中，设置排版不显示状态，避免显示webview时，html内容排版错乱问题
                        ((IWebview) pArgs).obtainFrameView().obtainMainView().setVisibility(View.INVISIBLE);
                        SDK.attach(mRootView, ((IWebview) pArgs));
                        break;
                    case IWebviewStateListener.ON_PAGE_STARTED:
                        // 首页面开始加载事件
                        break;
                    case IWebviewStateListener.ON_PROGRESS_CHANGED:
                        // 首页面加载进度变化
                        break;
                    case IWebviewStateListener.ON_PAGE_FINISHED:
                        // 页面加载完毕，设置显示webview
                        webview.obtainFrameView().obtainMainView().setVisibility(View.VISIBLE);
                        break;
                }
                return null;
            }
        });
        //我们需要的webview
        final WebView webviewInstance = webview.obtainWebview();
        // 监听返回键
        webviewInstance.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_UP) {
                    if (webviewInstance.canGoBack()) {
                        webviewInstance.goBack();
                        return true;
                    }
                }
                return false;
            }
        });
    }

    // 5+SDK 开始初始化时触发
    @Override
    public void onCoreReady(ICore coreHandler) {
        try {
            // 初始化5+ SDK，
            // 5+SDK的其他接口需要在SDK初始化后才能調用
            SDK.initSDK(coreHandler);
            // 当前应用可使用全部5+API
            SDK.requestAllFeature();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean onCoreStop() {
        // TODO Auto-generated method stub
        return false;
    }
}
