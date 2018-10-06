
#import "RNChunkSplit.h"

#import <React/RCTBridge.h>
#import <React/RCTJavaScriptLoader.h>

@interface RCTBridge()
- (void)loadSource:(RCTSourceLoadBlock)_onSourceLoad onProgress:(RCTSourceLoadProgressBlock)onProgress;
- (void)executeSourceCode:(NSData *)sourceCode sync:(BOOL)sync;
@end

@implementation RNChunkSplit

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(loadScript:(NSURL*) url
                  resolve: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTBridge* bridge = self.bridge;
  NSURL* originBundle = [bridge valueForKey:@"bundleURL"];
  [bridge setValue:url forKey:@"bundleURL"];
  [bridge loadSource:^(NSError *error, RCTSource *source) {
    if (error != nil) {
      reject(@"Failed", error.localizedDescription, error);
      return;
    }
    [bridge executeSourceCode:source.data sync:NO];
    resolve(nil);
  } onProgress:^(RCTLoadingProgress *progressData) {
    
  }];
  [bridge setValue:originBundle forKey:@"bundleURL"];
}

@end
  
