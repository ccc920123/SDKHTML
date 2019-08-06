package com.startdon.ncroad;

import android.content.Context;
import android.support.multidex.MultiDex;

import io.dcloud.application.DCloudApplication;
import io.dcloud.feature.internal.sdk.SDK;

/**
 * 描述：
 * 公司：四川星盾科技股份有限公司
 * 编写人：陈渝金-pc:chenyujin
 * 时间： 2019/7/19
 * 修改人：
 * 修改时间：
 */


public class NCRoadApplication extends DCloudApplication {

    
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);


        MultiDex.install(this);
    }

}
