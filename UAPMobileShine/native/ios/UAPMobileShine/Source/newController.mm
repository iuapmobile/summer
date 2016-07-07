//
//  viewController.m
//
//
//  Created by zhangyuv.
//  Copyright (c) 2013年 yonyou. All rights reserved.
//

#import "newController.h"

#import <UMIOSControls/UMXWebViewForWebTemplate.h>


@interface newController ()
{
	


}
@end

@implementation newController
@synthesize navBarHidden = _navBarHidden;
@synthesize viewObject = _viewObject;
@synthesize New = _New;
@synthesize parentController = _parentController;
@synthesize currentContainer=_currentContainer;
@synthesize contextDictionary = _contextDictionary;
@synthesize context=_context;
@synthesize ctx = _ctx;

@synthesize viewPage0 = _viewPage0;

@synthesize webview0 = _webview0;


static NSString *controllerC = @"NewController";

static NSString *namespaceC = @"com.yyuap.demo";

static NSString *ModelName = @"";


- (id)initWithParentCtl:(UIViewController*)parentCtl
{
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        if(parentCtl){
            self.parentController = parentCtl;
        }else{
            self.parentController = self;
        }
        _navBarHidden = YES;
        self.navigationItem.hidesBackButton = YES;
        _viewObject = [[UMLayoutView alloc] init];
        _New = _viewObject;
            _viewObject.layoutType = Layout_vbox;

    _viewObject.weightUMPView = 0;
    _viewObject.paddingLeft = 0;
    _viewObject.paddingTop = 0;
    _viewObject.paddingRight = 0;
    _viewObject.paddingBottom = 0;
    _viewObject.marginLeft = 0;
    _viewObject.marginTop = 0;
    _viewObject.marginRight = 0;
    _viewObject.marginBottom = 0;//0;
    _viewObject.vAlignUMP = ALIGN_LEFT;
    _viewObject.hAlignUMP = ALIGN_CENTER;
    _viewObject.frame = CGRectMake(0, 0, [[UIScreen mainScreen] applicationFrame].size.width, [[UIScreen mainScreen] applicationFrame].size.height);
    _viewObject.bVisible = YES;
    _viewObject.disabled = NO;
    _viewObject.readOnly = NO;
    //_viewObject.isHeightFill = YES;
    //_viewObject.isWidthFill = YES;
    _viewObject.isHeightWrap = NO;
    _viewObject.isWidthWrap = NO;
       _viewObject.backgroundColor = [UIColor clearColor];

	   _viewObject.layoutType = Layout_vbox;

        
//        if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7) {
//        _viewObject.frame = CGRectMake(0, 0, [[UIScreen mainScreen] bounds].size.width, [[UIScreen mainScreen] bounds].size.height-20);
//    }
//    else{
//        _viewObject.frame = CGRectMake(0, 0, [[UIScreen mainScreen] bounds].size.width, [[UIScreen mainScreen] bounds].size.height);
//    }
    
        _context = [[UMEntityContext alloc]init];
        _ctx = _context;
  		self.xnamespace = namespaceC;
        self.controllerid = controllerC;
    }
	return self;
}
//- (void)loadView
//{
//	self.view = _viewObject.view;
//}
- (void)initChilds
{
    _startpage = @"index.html";
    
    _viewPage0 = [[UMLayoutView alloc] init];
    _viewPage0.controlId = @"viewPage0";
    _viewPage0.layoutType = Layout_vbox;
    [(UMLayoutView*)_New addSubUMView:_viewPage0];

    _viewPage0.weightUMPView = 0;
    _viewPage0.paddingLeft = 0;
    _viewPage0.paddingTop = 0;
    _viewPage0.paddingRight = 0;
    _viewPage0.paddingBottom = 0;
    _viewPage0.marginLeft = 0;
    _viewPage0.marginTop = 0;
    _viewPage0.marginRight = 0;
    _viewPage0.marginBottom = 0;
    _viewPage0.vAlignUMP = ALIGN_LEFT;
    _viewPage0.hAlignUMP = ALIGN_CENTER;
    _viewPage0.frame = CGRectMake(0, 0, 0, 0);
    _viewPage0.bVisible = YES;
    _viewPage0.disabled = NO;
    _viewPage0.readOnly = NO;
    _viewPage0.isHeightFill = YES;
    _viewPage0.isWidthFill = YES;
    _viewPage0.isHeightWrap = NO;
    _viewPage0.isWidthWrap = NO;
    _viewPage0.backgroundColor = [UIColor colorWithRed:0.9607843 green:0.9607843 blue:0.9607843 alpha:1];

    _webview0 = [[UMXWebViewForWebTemplate alloc] init];

    _webview0.weightUMPView = 0;
    _webview0.paddingLeft = 0;
    _webview0.paddingTop = 0;
    _webview0.paddingRight = 0;
    _webview0.paddingBottom = 0;
    _webview0.marginLeft = 0;
    _webview0.marginTop = 0;
    _webview0.marginRight = 0;
    _webview0.marginBottom = 0;
    _webview0.vAlignUMP = ALIGN_LEFT;
    _webview0.hAlignUMP = ALIGN_CENTER;
    _webview0.frame = CGRectMake(0, 0, 0, 0);
    _webview0.bVisible = YES;
    _webview0.disabled = NO;
    _webview0.readOnly = NO;
    _webview0.isHeightFill = YES;
    _webview0.isWidthFill = YES;
    _webview0.isHeightWrap = NO;
    _webview0.isWidthWrap = NO;
    _webview0.backgroundColor = [UIColor clearColor];
    _webview0.htmlUrl = [NSString stringWithFormat:@"file://%@/Web/web/%@",[NSBundle mainBundle].resourcePath,_startpage];
    [(UMLayoutView*)_viewPage0 addSubUMView:_webview0];


    [_viewObject adjustSize];
    
    //赋值
    id appDelegate = [UIApplication sharedApplication].delegate;
    [appDelegate setValue:_webview0.content forKey:@"webTemplateWebView"];
}
- (void)viewDidLoad
{
	[super viewDidLoad];
    [SysContext getInstance].CurrentViewController = self;
	[self.view addSubview:_viewObject.view];
	
	if(_webview0 == nil){
	    [self initChilds];
	}

    //[self dataBind:nil];
    
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7) {
        self.view.bounds = CGRectMake(0, -20, self.view.frame.size.width, self.view.frame.size.height );
    }
    
    


    //加载JS
   [self performSelectorInBackground:@selector(umOnload) withObject:nil];
}
-(void)umOnload{

    @autoreleasepool {
    
        AppDelegate* appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
        _currentContainer = [appDelegate currentContainer];
        
        _currentContainer.controllerName = [[namespaceC stringByAppendingString:@"."]stringByAppendingString:controllerC];
        [_currentContainer initCurrentViewController:_currentContainer.controllerName];
        
        [_currentContainer initCurrentViewContext:[[namespaceC stringByAppendingString:@"."]stringByAppendingString:ModelName]];
        
        //JS同步加载完成 回到主线程 刷新UI
        [self performSelectorOnMainThread:@selector(umload) withObject:nil waitUntilDone:YES];
        
  
    }
}
-(void)umload{

     


}
- (void)viewWillAppear:(BOOL)animated
{
    [self resignFirstResponder];
    [super viewWillAppear:animated];
    [SysContext getInstance].CurrentViewController = self;
//    self.navigationController.navigationBarHidden = _navBarHidden;
//    if (!_navBarHidden) {
//        for (UIView *subview in [self.navigationController.navigationBar subviews]) {
//            if (![NSStringFromClass(subview.class) isEqualToString:@"_UINavigationBarBackground"] && ![NSStringFromClass(subview.class) isEqualToString:@"_UINavigationBarBackIndicatorView"]) {
//                [subview removeFromSuperview];
//            }
            
//        }
//    }
    
    
    [_viewObject umviewAppear];
}
- (void)viewDidAppear:(BOOL)animated
{
	[super viewDidAppear:animated];
    [self becomeFirstResponder];
}
-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
    [_viewObject vmviewDisappear];
}
- (void)viewDidUnload
{
	[super viewDidUnload];
}
-(void)onInit{
    [_currentContainer onInit:controllerC];
}
-(void)onLoad{
    [_currentContainer onLoad:controllerC];
}
-(void)onDataBinding{
    //here do databinding
    NSString *context = [_currentContainer getModel:ModelName];
    _contextDictionary = [context objectFromJSONString];
    if(_contextDictionary != nil)
    	[self dataBind:[_contextDictionary JSONString]];
}
-(void)onComplete{
    [_currentContainer onComplete:controllerC];
}
-(id)valueByBindfield:(NSString*)bindingfield
{
    return [_contextDictionary objectForKey:bindingfield];
}
- (void)dataBind:(NSString*)data{
	if(data !=nil){
		[_context updateCtx:data];
 _ctx = _context;

	}
	
	


	[self bindAll];
   [_viewObject clearFinishedAdjustSize];
   [_viewObject adjustSize];
}






- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation
{
    return YES;
}
- (BOOL)shouldAutorotate
{
    return YES;
}
- (NSUInteger)supportedInterfaceOrientations
{
    return UIInterfaceOrientationMaskPortrait;
}
- (CGRect)frameForOrientation:(UIInterfaceOrientation)orientation
{
    CGRect frame;
    if (orientation == UIInterfaceOrientationLandscapeLeft || orientation == UIInterfaceOrientationLandscapeRight) {
        CGRect bounds = [UIScreen mainScreen].applicationFrame;
        CGRect bounds2 = [UIScreen mainScreen].bounds;
        frame = CGRectMake(bounds.origin.x, bounds.origin.y, bounds2.size.height, bounds.size.width-(bounds2.size.height - bounds.size.height));
    }else if (orientation == UIInterfaceOrientationPortrait ||orientation == UIInterfaceOrientationPortraitUpsideDown )
    {
        CGRect bounds = [UIScreen mainScreen].applicationFrame;
        CGRect bounds2 = [UIScreen mainScreen].bounds;
        frame = CGRectMake(bounds.origin.x, bounds.origin.y, bounds2.size.width, bounds.size.height-(bounds2.size.width - bounds.size.width));
    }
    return frame;
}

-(void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration
{
    CGRect frame;
    frame = [self frameForOrientation:toInterfaceOrientation];
    _viewObject.frame = CGRectMake(0, 0, frame.size.width, frame.size.height);
    [self.viewObject clearFinishedAdjustSize];
    [self.viewObject adjustSize];
}

-(BOOL)canBecomeFirstResponder
{
    return YES;
}
- (void) motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
    
    if (motion == UIEventSubtypeMotionShake) {
        //NSLog(@"摇一摇");
        
        
    }
}
@end
