package com.yyuap.summer;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

/**
 * Created by xyy on 16/4/18.
 */
public class YYScrollView1 extends ScrollView {

    public static final int HEADER_HEIGHT = 180;
    public static final int HEADER_TEXT_SIZE = 18;
    private boolean isUp = true;
    private boolean isFirst = true;

    private TextView mHeader = null;
    private LinearLayout llp = null;

    private View.OnClickListener mUpListener = null;

    private boolean isInvokeListener = false;

    public YYScrollView1(Context context) {
        this(context, null);

    }

    public YYScrollView1(Context context, AttributeSet attrs) {
        this(context, attrs, 0);

    }

    public YYScrollView1(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);

        llp = new LinearLayout(context);
        llp.setOrientation(LinearLayout.VERTICAL);
        super_addView(llp, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);


        mHeader = new TextView(context);
//        <TextView
//        android:layout_width="match_parent"
//        android:layout_height="60dp"
//        android:background="#a6c7a8"
//        android:text="Hello, world"
//        android:textColor="#000000"
//        android:textSize="22dp" />
        mHeader.setBackgroundColor(Color.parseColor("#EFEFEF"));
        mHeader.setTextColor(Color.BLACK);
        mHeader.setTextSize(HEADER_TEXT_SIZE);
        mHeader.setGravity(Gravity.CENTER);
//        mHeader.setVisibility(GONE);
        llp.addView(mHeader, ViewGroup.LayoutParams.MATCH_PARENT, HEADER_HEIGHT);
    }

    private void super_addView(View v, int width, int height) {
        super.addView(v, width, height);
    }

    @Override
    public void addView(View child) {
        llp.addView(child);
    }


    @Override
    public void addView(View child, int index) {
        llp.addView(child, index);
    }

    @Override
    public void addView(View child, ViewGroup.LayoutParams params) {
        llp.addView(child, params);
    }

    @Override
    public void addView(View child, int index, ViewGroup.LayoutParams params) {
        if (child == llp) {
            super.addView(child, index, params);
        } else {
            llp.addView(child, index, params);
        }
    }

    protected void onScrollChanged(int l, int t, int oldl, int oldt) {
        Log.d("testtttt", "sc" + t);
        super.onScrollChanged(l, t, oldl, oldt);
        if (isUp) {
            resetScroll();
        }
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);
        if(isFirst) {
            resetScroll();
//            isFirst=false;
        }
    }

    private void resetScroll() {
        if (this.getScrollY() < HEADER_HEIGHT) {
            this.scrollTo(0, HEADER_HEIGHT);
        }
        if (isInvokeListener) {
            this.scrollTo(0, HEADER_HEIGHT);
            isInvokeListener = false;
            if (mUpListener != null) {
                mUpListener.onClick(this);
            }
        }
    }

//    @Override
//    public boolean onInterceptTouchEvent(MotionEvent ev) {
//        Log.d("test", String.valueOf(ev.getAction()));
//        if (ev.getAction() == MotionEvent.ACTION_UP) {
//            isUp = true;
//        }
//        return super.onInterceptTouchEvent(ev);
//        //super.onTouchEvent()
////        return false;
//    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        Log.d("testtttt", "tt" + ev.getAction());
        isFirst=false;
        if (ev.getAction() == MotionEvent.ACTION_UP) {
            resetScroll();
            isUp = true;
            return super.onTouchEvent(ev);
        }
//        mHeader.setVisibility(VISIBLE);
        if (this.getScrollY() <= 20) {
            mHeader.setText("释放触发刷新事件");
            isInvokeListener = true;
        } else {
            mHeader.setText("继续向下拉动");
            isInvokeListener = false;
        }
        isUp = false;
        return super.onTouchEvent(ev);
    }

    public void setOnUpListener(OnClickListener listener) {
        this.mUpListener = listener;
    }
}
