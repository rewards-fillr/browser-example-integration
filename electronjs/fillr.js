let intervalCount = 0;

// Waiting for document readystate to be complete...
const interval = setInterval(() => {
  intervalCount++;
  if (document && document.readyState === "complete" || intervalCount == 10) {
    clearInterval(interval);

    const FillrController = require('@fillr_letspop/desktop-autofill');
    const ProfileData =  require('./profile-data-en-us');
  
    const devKey = '';  // Set your dev key
    const secretKey = ''; // Set your secret key
    // Autofill setup
    let mappings

    // Should add this listner on top frame window only
    if(window.self === window.top) {
      const onFormDetected = (event) => {
        // Parse mappings data
        mappings = JSON.parse(event.detail);

        // Set your profile data
        mappings.profile = ProfileData;

        // Fill the fields with the profile data
        fillr.performFill(mappings);
      }
      document.addEventListener('fillr:form:detected', onFormDetected);
    }

    const fillr = new FillrController.default(devKey, secretKey);

    const FillrScraper = require('@fillr_letspop/cart-scraper')
    FillrScraper.setDevKey(devKey);
    const onCartDetected = function(event) {

      const cartInfo = event.detail;
      // Do something with cartInfo. See the example cart information json on readme
    }
    document.addEventListener('fillr:cart:detected', onCartDetected);
    FillrScraper.start();
  }
}, 1000);
