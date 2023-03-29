export const actionForgotSettings = {
    url: 'https://www.example.com/?email=khoadole21@gmail.com',
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true,
    // When multiple custom dynamic link domains are defined, specify which
    // one to use.
    dynamicLinkDomain: "example.page.link"
  };

export const actionVerifySettings = (email) => {
    ({
        url: `https://www.example.com/?email=${email}`,
        handleCodeInApp: true,
        // When multiple custom dynamic link domains are defined, specify which
        // one to use.
        dynamicLinkDomain: "example.page.link"
    })
}