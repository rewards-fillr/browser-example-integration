# Browser Example Integration

## Building

### Pre-requisites

- Set dev key, secret key, profile listener and profile data on index.ts
- Run build script (./build.sh)

### Installation

```bash
$> npm install fillr-extension --registry https://api.bintray.com/npm/fillr/npm
```

### Build

```bash
$> ./build.sh
```


### Usage

- Configure dev key and secret key
- Implement profile listener
- Declare user profile data

```typescript
import FillrController from "fillr-extension/fillr-controller";
// import ProfileData from './profile-german'; // See full profile example data

const profileData = {
  "PersonalDetails.FirstName": "John",
  "PersonalDetails.Honorific": "Mr.",
  "PersonalDetails.LastName": "Wick",
  }

const devKey = '';
const secretKey = '';
const profileDataHandler = new ProfileDataInterface((mappings) => {
  mappings.profile = ProfileData; // Set your profile data
  fillr.performFill(mappings);
  console.log(fillr.getApiState().toString()) // Check api state
})

const fillr = new FillrController(devKey, secretKey, profileDataHandler);
```

See the sample code for more details.

### Sample extension for Chrome

See the sample extension under `dist/chrome` after running build script. You can check the basic functionality of `fillr-extension` library on sample extension. After `load upacked`, all the page which has the form will be filled automatically.

When you make your own extension, you should configure the following things on `manifest.json`. `all_frames` should be `true` and `js` includes the files which imports `fillr-extension/fillr-controller`. This will enable all the iframe which has form to be filled.

```
  "content_scripts": [
    {
      "matches": [
        "http://*/*",
        "https://*/*"
      ],
      "all_frames": true,
      "js": [
        "sample-index-bundled.js"
      ]
    }
  ],
```  

### Error
- When you get the following log, set your dev key.

```
Please set your dev key! The Fillr API will be non-functional until re-initialized with a valid dev key.
```

- When you get the following log, set your secret key.

```
Please set your secret key! The Fillr API will be non-functional until re-initialized with a valid secret key.
```

- When you get the following log, set your profile listener.

```
Please declare new ProfileDataInterface() with an implementation of onFormDetected() as argument.
```

- When you get the following log, set user profile data.

``` 
ProfileData was empty. ProfileData is required for filling the form.
```

