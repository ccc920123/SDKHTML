package com.startdon.ncroad;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.startdon.ncroad.utils.SharedPreferencesUtils;

public class SetActivity extends Activity {


    private ImageView imageBack;

    private EditText addressIp;

    private Button savePara;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_set);

        imageBack = findViewById(R.id.back);
        addressIp = findViewById(R.id.address_ip);
        savePara = findViewById(R.id.save_para);
        String string=SharedPreferencesUtils.getString(this,"URL","www.stardon.com.cn");
        String newstrurl;
        if (string.contains("http://"))
        {
            newstrurl=string.split("//")[1];
        }else if(string.contains("https://"))
        {
            newstrurl=string.split("//")[1];
        }else {
            newstrurl=string;
        }


        addressIp.setText(newstrurl);

        imageBack.setOnClickListener(click);
        savePara.setOnClickListener(clickSava);
    }

    private View.OnClickListener clickSava = new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            String url = addressIp.getText().toString();
            if (!"".equals(url)) {

                if (url.contains("http://") || url.contains("https://")) {
                    SharedPreferencesUtils.saveString(SetActivity.this, "URL", url);

                } else {

                    SharedPreferencesUtils.saveString(SetActivity.this, "URL", "http://" + url);
                }
                onBackPressed();
            } else {

                Toast.makeText(SetActivity.this, "请输入IP地址", Toast.LENGTH_SHORT).show();
            }


        }
    };
    private View.OnClickListener click = new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            onBackPressed();

        }
    };


    @Override
    public void onBackPressed() {

        Intent itt = new Intent();
        itt.setClass(this, SDK_WebApp.class);
        startActivity(itt);
        finish();


    }
}
