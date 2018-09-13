import FillrController from "fillr-extension/fillr-controller";
import ProfileData from './profile-german'; // see full profile example data

// //Setting custom profile data
// const profileData = {
//   "PersonalDetails.FirstName": "John",
//   "PersonalDetails.Honorific": "Mr.",
//   "PersonalDetails.LastName": "Wick",
// }

const devKey = "ab14bfe7c1b4befbf6e51d5f14fa50e7";  // Set your dev key

new FillrController(devKey, ProfileData);
