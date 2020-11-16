# Browser Example Integration

## Building

### Pre-requisites

- Set dev key, secret key, profile listener and profile data on index.ts
- Setup [npm authentication tokens](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow)
- Run [build script](./build.sh)

### Installation

- To install private package for `@fillr_letspop/desktop-autofill` and `@fillr_letspop/cart-scraper`, 
you will first authenticate with npm credentials. Please contact product@fillr.com

```bash
npm login
```

Once logged in or setup npm tokens, you can npm install private packages from your npm account.

Private packages can only be downloaded and installed by those who have been granted read access to the package. Since private packages are always scoped, you must reference the scope name during installation:

```bash
$> npm i @fillr_letspop/desktop-autofill
$> npm i @fillr_letspop/cart-scraper
```

### Build

```bash
$> ./build.sh
```


## Usage for Desktop Autofill

- Configure a dev key and a secret key
- Add a event listener for `fillr:form:detected`
- Declare [user's profile data](https://github.com/Fillr/browser-example-integration/blob/master/profile-data-en-us.ts)

```javascript
import FillrController from "@fillr_letspop/desktop-autofill";
 
const profileData = {
  "PersonalDetails.FirstName": "John",
  "PersonalDetails.Honorific": "Mr.",
  "PersonalDetails.LastName": "Wick",
  }
 
const devKey = 'YOUR_FILLR_DEV_KEY'
const secretKey = 'YOUR_FILLR_SECRET_KEY'
let mappings

if(window.self == window.top) {
  const onFormDetected = (event:any) => {
    mappings = JSON.parse(event.detail)
    mappings.profile = profileData
    fillr.performFill(mappings)
  }
  document.addEventListener('fillr:form:detected', onFormDetected)
}

const fillr = new FillrController(devKey, secretKey)
```

See the sample code for more details.

## Usage for Cart Scraper

- Require `@fillr_letspop/cart-scraper`
```javascript
const FillrScraper = require('@fillr_letspop/cart-scraper')
```

- Set dev key before calling `FillrScraper.start()`

```javascript
FillrScraper.setDevKey('YOUR_FILLR_DEV_KEY');
```

- Define the event listener `onCartDetected()` 
```javascript
const onCartDetected = function(event:any) {
  const cartInfo = event.detail;
  // Do something with cartInfo. See the following example cart information json
}
document.addEventListener('fillr:cart:detected', onCartDetected);
```

- start the cart information extraction
```javascript
FillrScraper.start(); 
```

### Example Cart Information JSON

```json
{
  "cart_total":2519,
  "currency":"USD",
  "id":"e14a939a-43a4-4e8e-81a7-6af50cbf10fd",
  "timestamp":1561984450662,
  "version":"1.3.35",
  "page_url":"https://www.amazon.com/gp/buy/spc/handlers/display.html?hasWorkingJavascript=1",
  "total_only":true,
  "is_cart":["buy"]
}
```

The `cart_total` value type of cart information represents as the number to avoid any floating rounding or precision issue. The `cart_total` works everything as cents. For example, USD 36.89 will be converted to integer value like USD 3689, which will preserve .89. The currency value follows the ISO 4217 code list like USD, EUR and SEK.

### Sample extension for Chrome

See the sample extension under `dist/chrome` after running build script. You can check the basic functionality of `fillr-extension` library on sample extension. After `load upacked`, all the page which has the form will be filled automatically.

When you make your own extension, you should configure the following things in your `manifest.json`. This configuration will enable all the iframe which has form to be filled. 

- `all_frames` should be `true`.
- `js` should include the files which imports `@fillr_letspop/desktop-autofill`. 
- `match_about_blank` should be `true` to inject the script in iframe having no url.

```
  "content_scripts": [
    {
      "matches": [
        "http://*/*",
        "https://*/*"
      ],
      "all_frames": true,
      "match_about_blank": true,
      "js": [
        "sample-index-bundled.js"
      ]
    }
  ],
```  

### Error message for Desktop autofill
- When you get the following log, set your dev key.

```
Please set your dev key! The Fillr API will be non-functional until re-initialized with a valid dev key.
```

- When you get the following log, set your secret key.

```
Please set your secret key! The Fillr API will be non-functional until re-initialized with a valid secret key.
```

- When you get the following log, set user profile data.

``` 
ProfileData was empty. ProfileData is required for filling the form.
```

## License

[Copyright (c) 2015-present Pop Tech Pty Ltd.](./electronjs/LICENSE)