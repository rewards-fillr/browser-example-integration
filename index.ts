import FillrController, { ProfileDataInterface } from 'fillr-extension/fillr-controller';
import ProfileData from './profile-german'; // see full profile example data

// //Setting custom profile data
// const profileData = {
//   "PersonalDetails.FirstName": "John",
//   "PersonalDetails.Honorific": "Mr.",
//   "PersonalDetails.LastName": "Wick",
// }

const devKey = 'ab14afe7b1b4befaf6e52d5f24fa90e8';  // Set your dev key
const secretKey = 'Y2VhZGVmMDhkZWZiZWM1NWFhM2U4NjI='; // Set your secret key
const profileDataHandler = new ProfileDataInterface((mappings) => {
  mappings.profile = ProfileData; // Set your profile data
  fillr.performFill(mappings);
  console.log(fillr.getApiState().toString()) // Check api state
})

const fillr = new FillrController(devKey, secretKey, profileDataHandler);
