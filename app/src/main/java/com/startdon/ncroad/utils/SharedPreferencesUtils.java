package com.startdon.ncroad.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;


public class SharedPreferencesUtils {
	public static void saveString(Context mActivity, String key,
			String value) {
		SharedPreferences sp = mActivity.getSharedPreferences("ncroadconfig",
				Context.MODE_PRIVATE);
		sp.edit().putString(key, value).commit();
	}

	public static String getString(Context mActivity, String key,
			String defValue) {
		SharedPreferences sp = mActivity.getSharedPreferences("ncroadconfig",
				Context.MODE_PRIVATE);
		return sp.getString(key, defValue);
	}

	public static void setBoolean(Context mActivity, String key,
                                  boolean value) {
		SharedPreferences sp = mActivity.getSharedPreferences("ncroadconfig",
				Context.MODE_PRIVATE);
		Editor edit = sp.edit();
		edit.putBoolean(key, value);
		edit.commit();
	}

	public static boolean isFirst(Context mActivity) {
		return getBoolean(mActivity, "isfirst", true);
	}

	public static boolean getBoolean(Context mActivity, String key,
			boolean defValue) {
		SharedPreferences sp = mActivity.getSharedPreferences("ncroadconfig",
				Context.MODE_PRIVATE);
		return sp.getBoolean(key, defValue);
	}



    /**
     * 删除Key对应的内容
     *
     * @param key     名字
     * @return
     */
    public static boolean remove(Context mActivity, String key) {
        SharedPreferences sharedPreference = mActivity.getSharedPreferences("ncroadconfig", Context.MODE_PRIVATE);
        Editor editor = sharedPreference.edit();
        editor.remove(key);
        return editor.commit();
    }
}
