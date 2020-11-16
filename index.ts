import FillrController from '@fillr_letspop/desktop-autofill';
import profileData from './profile-data-en-au'; // see full profile example data
import * as FillrScraper from '@fillr_letspop/cart-scraper';

// Set custom profile data
// const profileData = {
//   "PersonalDetails.FirstName": "John",
//   "PersonalDetails.Honorific": "Mr.",
//   "PersonalDetails.LastName": "Wick",
// }

let intervalCount = 0;

// Waiting for document readystate to be complete...
const interval = setInterval(() => {
  intervalCount++;
  if (document && document.readyState === "complete" || intervalCount === 10) {
    clearInterval(interval);

    const devKey = '';  // Set your dev key
    const secretKey = ''; // Set your secret key

    // Autofill setup
    let mappings

    // Should add this listner on top frame window only
    if(window.self === window.top) {
      const onFormDetected = (event:any) => {
        // Parse mappings data
        mappings = JSON.parse(event.detail);

        // Set your profile data
        mappings.profile = profileData;

        // Fill the fields with the profile data
        fillr.performFill(mappings);
      }
      document.addEventListener('fillr:form:detected', onFormDetected);
    }

    const fillr = new FillrController(devKey, secretKey);

    // Cart scraper setup
    FillrScraper.setDevKey(devKey);
    const onCartDetected = (event:any) => {
      // const cartInfo = event.detail;
      // Do something with cartInfo. See the example cart information json on readme
    }
    document.addEventListener('fillr:cart:detected', onCartDetected);
    FillrScraper.start();
  }
}, 1000);