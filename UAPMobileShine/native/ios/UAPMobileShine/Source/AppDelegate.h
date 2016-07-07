//
//  AppDelegate.h
//
//
//  Created by zhangyuv.
//  Copyright (c) 2013年 yonyou. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <UMIOSControls/UMIOSControls.h>
#import "WXApi.h"

@class CustomUI_newController;

@interface AppDelegate:UIResponder <UIApplicationDelegate,WXApiDelegate>
@property (nonatomic,strong) UIWindow* window;
@property (nonatomic,strong) UMContainer* currentContainer;
@property (nonatomic,strong) UMPNavigationController* navigationCtl;
@property (nonatomic,strong) NSMutableDictionary* plugDict;
@property (nonatomic,strong) CustomUI_newController* newCon;


@property(nonatomic,assign)BOOL isWebTemplate;//标识是否是web模板

@property(nonatomic,strong)UIWebView *webTemplateWebView;//web模板的webview对象

- (CustomUI_newController*)newCon BV_OBJC_METHOD_FAMILY_NONE;




#pragma mark weixin
/*
 enum WXScene {
 
 WXSceneSession  = 0,        // 聊天界面
 WXSceneTimeline = 1,        // 朋友圈
 WXSceneFavorite = 2,        // 收藏
 };
 */
@property (nonatomic,assign) enum WXScene scene;//微信分享类型

/*
 * 微信 发送消息
 */
- (void) sendTextContent:(NSString*)msg;

/*
 * 微信 发送图片
 */
- (void) sendImageContent:(UIImage *)image;
/*
 * 微信 发送link
 */
- (void) sendLinkContent:(NSString*)url title:(NSString *)title description:(NSString *)des image:(UIImage *)image;
@end
