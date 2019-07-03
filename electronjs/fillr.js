let intervalCount = 0;

// Waiting for document readystate to be complete...
const interval = setInterval(() => {
  intervalCount++;
  if (document && document.readyState === "complete" || intervalCount == 10) {
    clearInterval(interval);

    const FillrController = require('@fillr_letspop/desktop-autofill');
    const ProfileData =  require('./profile-data-en-us');
    const { ProfileDataInterface } = FillrController;
  
    const devKey = '';  // Set your dev key
    const secretKey = ''; // Set your secret key
    const profileDataHandler = new ProfileDataInterface((mappings) => {
      mappings.profile = ProfileData; // Set your profile data
      fillr.performFill(mappings);
    })
    const fillr = new FillrController.default(devKey, secretKey, profileDataHandler);

    const FillrScraper = require('@fillr_letspop/cart-scraper')
    window.FillrCartInformationExtractionInterface.setDevKey(devKey);
    const onCartDetected = function(ev) {

      const cartInfo = ev.detail;
      alert(JSON.stringify(cartInfo));
    }
    document.addEventListener('fillr:cart:detected', onCartDetected);
    window.FillrCartInformationExtractionInterface.start();
  }
}, 1000);
