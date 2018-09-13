# Browser Example Integration

## Building

### Pre-requisites

- Set dev key and profile data on index.ts
- Run build script (./build.sh)

### Build

```bash
$> ./build.sh
```

### Installation

```bash
$> npm install fillr-extension --registry https://api.bintray.com/npm/fillr/npm
```

### Usage

- Configure dev key
- Declare user profile data

```typescript
import FillrController from "fillr-extension/fillr-controller";
// import ProfileData from './profile-german'; // See full profile example data

const profileData = {
  "PersonalDetails.FirstName": "John",
  "PersonalDetails.Honorific": "Mr.",
  "PersonalDetails.LastName": "Wick",
  }

const devKey = "ab14bfe7c1b4befbf6e51d5f14fa50e7";  // Set your dev key

new FillrController(devKey, profileData);
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
- When you get the following error, set your deve key with `new FillrController(devKey, profileData)`

```
Uncaught Error: Pleas set your dev key!
```

- When you get the following error, set user profile data with `new FillrController(devKey, profileData)`

``` 
Uncaught Error: ProfileData should be configured before fetching mappings!
```

