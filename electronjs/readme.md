# Electron Example Integration

## Building

### Pre-requisites

- Set dev key, secret key, profile listener and profile data on fillr.js

### Installation

```bash
$> npm install fillr-extension --registry https://api.bintray.com/npm/fillr/npm
$> npm install
```

### Run

```bash
$> npm start
```

### Usage

- Configure dev key and secret key
- Implement profile listener
- Declare user profile data

```javascript
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
```

See the sample code for more details.

### Error
Check this [url](https://github.com/Fillr/browser-example-integration#error)

### Packaging

Build a electron app for `macOS`

```
npm build
```