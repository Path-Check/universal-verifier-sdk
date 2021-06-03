# Universal Verifier SDK for QRCode-based Verifiable Credentials
SDK to verify all Verifiable QR codes out there. 

## Supported Platforms

- [x] [CRED](https://github.com/Path-Check/cred-sdk.js): PathCheck's [PaperCreds](https://github.com/Path-Check/paper-cred)
- [x] [DIVOC](https://github.com/Path-Check/divoc-sdk.js): [COWIN's](https://www.cowin.gov.in/) Credentials in India
- [x] [HC1](https://github.com/Path-Check/dcc-sdk.js): Europe's [Digital Covid Certificates](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en) by the eHealth Network
- [x] [SHC](https://github.com/Path-Check/shc-sdk.js): [SmartHealth Cards](https://smarthealth.cards/)
- [x] [JXT](https://github.com/Path-Check/bbs-jxt-sdk.js): A BBS+ W3C Verifiable Credentials minimized with [JSON-XT](https://jsonxt.io/)
- [x] [CBLD](https://github.com/Path-Check/bbs-cbor-sdk.js): A CBOR-LD version of W3C Verifiable Credentials. 
- [x] [VDS](https://github.com/Path-Check/vds-sdk.js): ICAO's [Visible Digital Seals](https://www.icao.int/Security/FAL/TRIP/Documents/TR%20-%20Visible%20Digital%20Seals%20for%20Non-Electronic%20Documents%20V1.31.pdf)
- [ ] Excelsior: [NYC's](https://covid19vaccine.health.ny.gov/excelsior-pass) COVID pass

# Install

```sh
npm install @pathcheck/universal-verifier-sdk --save
```

# Usage

Import the library

```js
const { verifyQRCode } = require('@pathcheck/universal-verifier-sdk');
```

Read a Verifiable QR

```js
const qr = 'CRED:STATUS:2:GBCQEIIAWXECNVIUJQXPDV44EW3UHJIGNBGK4ITZAKX37MJNXG6IQZDXS7ZAEIB3ROQ2EWIRYH66FGPJOWBWP3MK6YTYVGJE332CXM6V2YQOBLHECU:1A9.PCF.PW:1//JD82'
```

Check if it's valid and get the unpacked version of the QR with: 

```js
const result = await verifyQRCode(qr);
```

Result will be on the format of the package type before signature depending on the QR format. Package types include: 
- Array of elements
- JSON Web Token
- CBOR Web Token
- JSON-LD documents

# Development

```sh
npm install
``` 

# Test

```sh
npm test
```

## Contributing

[Issues](https://github.com/Path-Check/universal-verifier-sdk/issues) and [pull requests](https://github.com/Path-Check/universal-verifier-sdk/pulls) are very welcome! :)
