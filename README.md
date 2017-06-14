## ZA Drivers License Decoding

This purpose of the project is to decode the binary data contained in a South Africa drivers
license barcode into a usable JSON format. The decode script must be implemented in JavaScript,
and must be able to run in a modern browser.

The goal is to have a function we can use for our mobile application, but for the purpose of this project
it can run in a browser page or node script.

For this project we assume that the scanning and decryption of the raw barcode has already been performed.

The (partial) specification of the format is in [SPEC.md](SPEC.md).

## Input / output

The input will be the decrypted barcode data. You may specify the input as base64-encoded string,
ArrayBuffer, or a file, but using ArrayBuffer / typed arrays is recommended.

The output should be in JSON, as follows:

```js
{
    "idNumber": "8609135139012",
    "idNumberType": "02",
    "idCountryOfIssue": "ZA",
    "surname": "SANDERS",
    "gender": "01", // '01' = male, '02' = female
    "initials": "J",
    "birthDate": "1986-09-13", // YYYY-MM-DD
    "driverRestrictions": "10",  // "00" / "10" / "20" / "12"
    "licenseCountryOfIssue": "ZA",
    "licenseIssueNumber": "01",
    "licenseNumber": "6234560001AB",
    "licenseValidityStart": "2012-11-14", // YYYY-MM-DD
    "licenseValidityExpiry": "2017-12-14", // YYYY-MM-DD
    "professionalDrivingPermitExpiry": null, // YYYY-MM-DD
    "professionalDrivingPermitCodes": [ // Array of string codes, or null
        "G",
        "P"
    ],
    "vehicleLicenses": [
        {
        "code": "B",
        "restriction": "0",
        "firstIssueDate": "2007-02-19"
        }
    ]
}
```

Any info not present in the output may be ignored when parsing the input (for example the image in section 3).

## Restrictions

The decoding must happen in pure JavaScript. No server-side processing or native Node extensions
may be used.

Third-party libraries may be used, but avoid needlessly increasing the code size.

## Sample data

A sample license is in `license-sample.raw` and `license-sample.base64`. The expected output
for this license is in `license-sample-parsed.json`.

Note that this sample does not cover all cases, for example professional driving permits.

## Other notes

While it is not a requirement to run the function in NodeJS, it may simplify testing.

