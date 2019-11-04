import FillrController, { ProfileDataInterface } from '@fillr_letspop/desktop-autofill';
import profileData from './profile-data-en-us'; // see full profile example data
import * as FillrScraper from '@fillr_letspop/cart-scraper';

// Setting custom profile data
// const profileData = {
//   "PersonalDetails.FirstName": "John",
//   "PersonalDetails.Honorific": "Mr.",
//   "PersonalDetails.LastName": "Wick",
// }

let intervalCount = 0;

// Waiting for document readystate to be complete...
const interval = setInterval(() => {
  intervalCount++;
  if (document && document.readyState === "complete" || intervalCount == 10) {
    clearInterval(interval);

    const devKey = '';  // Set your dev key
    const secretKey = ''; // Set your secret key

    // Autofill setup
    const profileDataHandler = new ProfileDataInterface((mappings) => {
      mappings.profile = profileData; // Set your profile data
      fillr.performFill(mappings);
      console.log(fillr.getApiState().toString()) // Check api state
    })

    const fillr = new FillrController(devKey, secretKey, profileDataHandler);

    // Cart scraper setup
    FillrScraper.setDevKey(devKey);
    const onCartDetected = function(ev) {
      // const cartInfo = ev.detail;
      // Do something with cartInfo. See the example cart information json on readme
    }
    document.addEventListener('fillr:cart:detected', onCartDetected);
    FillrScraper.start();
  }
}, 1000);