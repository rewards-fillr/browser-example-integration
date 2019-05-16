let intervalCount = 0;

// Waiting for document readystate to be complete...
const interval = setInterval(() => {
  intervalCount++;
  if (document && document.readyState === "complete" || intervalCount == 10) {
    clearInterval(interval);

    const FillrController = require('fillr-extension/fillr-controller');
    const ProfileData =  require('./profile-data-en-us');
    const { ProfileDataInterface } = FillrController;
  
    const devKey = '06c39ea3972285cdbd19f4b649024b8f';  // Set your dev key
    const secretKey = 'blah'; // Set your secret key
    const profileDataHandler = new ProfileDataInterface((mappings) => {
      mappings.profile = ProfileData; // Set your profile data
      fillr.performFill(mappings);
      console.log(fillr.getApiState().toString()) // Check api state
    })
    const fillr = new FillrController.default(devKey, secretKey, profileDataHandler);
  }
}, 1000);
