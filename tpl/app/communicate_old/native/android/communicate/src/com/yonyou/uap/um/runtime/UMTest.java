package com.yonyou.uap.um.runtime;

import android.widget.Toast;

import com.yonyou.uap.um.base.UMEventArgs;

/**
 * Created by xyy on 16/3/29.
 */
public class UMTest {

    public static void showMessage(UMEventArgs args) {
        Toast.makeText(args.getUMActivity(), args.getString("text"), Toast.LENGTH_LONG).show();
        RTHelper.execCallBack(args);
    }
}
