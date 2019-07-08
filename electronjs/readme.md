# Electron Example Integration

## Building

### Pre-requisites

- Set dev key, secret key, profile listener and profile data on fillr.js

### Installation

- To download `@fillr_letspop/cart-scraper` for the private package, you need to get permissions added to npmjs. Please contact product@fillr.com

```bash
$> npm i @fillr_letspop/desktop-autofill
$> npm i @fillr_letspop/cart-scraper
```

### Run

```bash
$> npm start
```

## Usage for Desktop Autofill

- Configure dev key and secret key
- Implement profile listener
- Declare user profile data

```javascript
import FillrController from "@fillr_letspop/desktop-autofill";
// https://github.com/Fillr/browser-example-integration/blob/master/profile-data-en-us.ts
// import ProfileData from './profile-data-en-us';
 
const profileData = {
  "PersonalDetails.FirstName": "John",
  "PersonalDetails.Honorific": "Mr.",
  "PersonalDetails.LastName": "Wick",
  }
 
const devKey = '';
const secretKey = '';
const profileDataHandler = new ProfileDataInterface((mappings) => {
  mappings.profile = ProfileData; 
  fillr.performFill(mappings);
})
 
const fillr = new FillrController(devKey, secretKey, profileDataHandler);
```

See the sample code for more details.

## Usage for Cart Scraper

- Require `@fillr_letspop/cart-scraper`
```javascript
const FillrScraper = require('@fillr_letspop/cart-scraper')
```

- Set dev key before calling `FillrCartInformationExtractionInterface.start()`

```javascript
window.FillrCartInformationExtractionInterface.setDevKey('YOUR_OWN_DEV_KEY');
```

- Define the event listener `onCartDetected()` 
```javascript
const onCartDetected = function(ev) {
  const cartInfo = ev.detail;
  console.log(JSON.stringify(cartInfo));
}
document.addEventListener('fillr:cart:detected', onCartDetected);
```

- start the cart information extraction
```javascript
window.FillrCartInformationExtractionInterface.start(); 
```

### Exampe Cart Information JSON

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

## Error
Check this [url](https://github.com/Fillr/browser-example-integration#error)

## Packaging

- Build a electron app for `macOS`
The output directory is in `./dist/`

```
npm run-script build:mac
```

- Build a electron app for `Windows`
The output directory is in `./dist/`

```
npm run-script build:win
```

## License

[Copyright (c) 2015-present Pop Tech Pty Ltd.](LICENSE)