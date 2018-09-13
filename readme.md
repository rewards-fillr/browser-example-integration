# Browser Extensions Sample For Library

## Building

### Pre-requisites

- Webpack
- Configuring bintray account setting

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

### Error
- When you get the following error, set your deve key with `new FillrController(devKey, profileData)`

```
Uncaught Error: Pleas set your dev key!
```

- When you get the following error, set user profile data with `new FillrController(devKey, profileData)`

``` 
Uncaught Error: ProfileData should be configured before fetching mappings!
```

