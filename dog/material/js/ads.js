const AdController = window.Adsgram.init({ blockId: "7986362957" });
AdController.show().then((result) => {
    // user watch ad till the end or close it in interstitial format
    // your code to reward user for rewarded format
}).catch((result) => {
    // user get error during playing ad
    // do nothing or whatever you want
})
