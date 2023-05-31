#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "RNFBCrashlyticsInitProvider.h"
#import "RNFBCrashlyticsModule.h"
#import "RNFBCrashlyticsNativeHelper.h"

FOUNDATION_EXPORT double RNFBCrashlyticsVersionNumber;
FOUNDATION_EXPORT const unsigned char RNFBCrashlyticsVersionString[];

