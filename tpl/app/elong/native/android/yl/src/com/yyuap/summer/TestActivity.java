package com.yyuap.summer;

import android.app.ActionBar;
import android.os.Bundle;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;

import com.yonyou.uap.um.control.UMWebView;
import com.yonyou.uap.um.core.UMActivity;
import com.yyuap.summer.control.scrollview.YYScrollView;
import com.yyuap.summer.control.scrollview.YYScrollViewBase;

/**
 * Created by xyy on 16/3/7.
 */
public class TestActivity extends UMActivity {

    YYScrollView mPullRefreshScrollView;
    ScrollView mScrollView;
    private UMWebView vb = null;

    @Override
    public String getContextName() {
        return null;
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FrameLayout lay = new FrameLayout(this);

        mPullRefreshScrollView = new YYScrollView(this,0);
        setContentView(lay);
        mScrollView = mPullRefreshScrollView.getRefreshableView();
        //获取显示的内容
        lay.addView(mPullRefreshScrollView, new FrameLayout.LayoutParams(400, 500));
        mScrollView.setLayoutParams(new LinearLayout.LayoutParams(400, 500));
       // mPullRefreshScrollView.setOnRefreshListener(defaultOnRefreshListener);
//		ViewGroup view = (ViewGroup) inflater.inflate(R.layout.text, null);
        LinearLayout view = new LinearLayout(this);
        view.setLayoutParams(new ActionBar.LayoutParams(-1,-1));
        view.setOrientation(LinearLayout.VERTICAL);
        vb = new UMWebView(this);
        view.addView(vb,new LinearLayout.LayoutParams(-1,-1));
        vb.loadUrl("http://www.baidu.com");
        mScrollView.addView(view);

    }
    private final YYScrollViewBase.OnRefreshListener defaultOnRefreshListener = new YYScrollViewBase.OnRefreshListener() {
        @Override
        public void onRefresh(int tag) {
            mPullRefreshScrollView.onRefreshComplete();
            if(tag == 1){
                vb.loadUrl("http://news.baidu.com");
            }
            if(tag == 2){
                vb.loadUrl("http://www.baidu.com");
            }
        }

    };
    @Override
    public void onInit(Bundle savedInstanceState) {

    }
}
