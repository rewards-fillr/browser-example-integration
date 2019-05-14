const FillrController = require('fillr-extension/fillr-controller');
const { ProfileDataInterface } = FillrController;

const ProfileData = {
  "ContactDetails.Emails.Email.Address":"jamesw999@gmail.com",
  "PersonalDetails.FirstName":"John",
  "PersonalDetails.LastName":"Wick",
}

const devKey = '';  // Set your dev key
const secretKey = ''; // Set your secret key
const profileDataHandler = new ProfileDataInterface((mappings) => {
  mappings.profile = ProfileData; // Set your profile data
  fillr.performFill(mappings);
  console.log(fillr.getApiState().toString()) // Check api state
})

const fillr = new FillrController.default(devKey, secretKey, profileDataHandler);
