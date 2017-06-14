var SALicenseParser = (function () {

  function parse(base64String) {
    var buff = window.atob(base64String);
    var len = buff.length;
    var bytes = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
      bytes[i] = buff.charCodeAt(i);
    }    

    var thisLicense = {
      'idNumber': '',
      'idNumberType': '',
      'idCountryOfIssue': '',
      'surname': '',
      'gender': '', // '01' = male, '02' = female
      'initials': '',
      'birthDate': '', // YYYY-MM-DD
      'driverRestrictions': '',  // "00" / "10" / "20" / "12"
      'licenseCountryOfIssue': 'ZA',
      'licenseIssueNumber': '01',
      'licenseNumber': '6234560001AB',
      'licenseValidityStart': '', // YYYY-MM-DD
      'licenseValidityExpiry': '', // YYYY-MM-DD
      'professionalDrivingPermitExpiry': null, // YYYY-MM-DD
      'professionalDrivingPermitCodes': [ // Array of string codes, or null
          //'G',
          //'P'
      ],
      'vehicleLicenses': [
          {
          'code': '',
          'restriction': '',
          'firstIssueDate': '' // YYYY-MM-DD
          }
      ]
    }

    // Header section -- first 10 bytes:    
    var headerSection = {
        barcodeVersionNumber: bytes[0],
        stringSectionLength: bytes[5],
        binarySectionLength: bytes[7]
    };

    var stringSectionStartPostion = 10,
      stringSectionLength = bytes[5],
      stringSectionEndPostion = stringSectionStartPostion + stringSectionLength;

    var stringSection = String.fromCharCode.apply(null, bytes.slice(stringSectionStartPostion, stringSectionEndPostion));

    var arr = new Array(),
      i = 0,
      sS = stringSection.length;

      for (; i < sS; i++) {

        if ( stringSection[i].charCodeAt(0) !== 225 && stringSection[i].charCodeAt(0) !== 224 ) {
          if (i === 0) arr[i] = stringSection[i];
          else {
            if (arr[arr.length - 1] === '') {
              arr[arr.length - 1] = stringSection[i];
            }
            else arr[arr.length - 1] += stringSection[i];
          }
        }
        else {
          if ( arr[arr.length - 1] !== '' ) {
//             switch (i) {
//               case 1:
//               case 2:
//               case 6:
//                 if (stringSection[i].charCodeAt(0) === 224) {
//                   arr[arr.length] += ',';
//                 }
//                 break;
//               case 3:
//               default:
                arr[arr.length] = '';
//             }
          }
        }

      }

    thisLicense.vehicleLicenses.code = arr[0];
    thisLicense.surname = arr[1];
    thisLicense.initials = arr[2];
    thisLicense.idCountryOfIssue = arr[3];
    thisLicense.licenseCountryOfIssue = arr[4];
    thisLicense.vehicleLicenses.restriction = arr[5];
    thisLicense.licenseNumber = arr[6];
    thisLicense.idNumber = arr[7];

    return thisLicense;
  }

  return {
    parse: parse
  }

})();

var sampleData = 'Am0WAwAyARaCWkLh4eFTQU5ERVJT4ErhWkHgWkHgMOHh4TYyMzQ1NjAwMDFBQuA4NjA5MTM1MTM5MDEyAiAHAhmqoQoBGYYJEyASERQgFxIUAVdJBAD6AMhDLihAAChCNFWnQrzo0jDnNeVd2987O9NM9v45zkHm/ll7Ivb5cBQx7vfrFr3e975/m97of/HDQKGCh/LRixwt8OqE5KhYXoNDmoVPDQKFWdbMIXtUo8+40zll0RmpShJw785Ys/luDajQ1gRRksEkr7FjiKHRMO4wpyFBGMJfagh7iuNxHOEMJFrGOBpRg5UETHrDTx0mx9RmWuHQjFA+Naa7abq64z0qL5B3ktR5oFuN4rtWXoZeql6MiPthbIY+vGEUN5mPczaChm0UvGwwkQckiCBP+LSAAVexEcEgAKywW4F+62PhksQeG6Zx/0fCjSQUBWD4fEwVwSnz5ARYJAVimcsOERK2EkQ0kXYSqR2NGSxZ9JY1ADb8Y2aC1hQPh/F/NXq+j/IVV3ratkIa1ETAaPu91/FhMgl1MdUWp5yn8UVVm+wFiWW1IC/UsvkUOkKHhSYCaMqt5loAOXGqumWXwtoOK4QcqHboj8RwAqatEPFrOGDu9ChjRI9HpjPpgvTsB3VGApj8Q8RXRPC8zi097mSBVqhNcGcO2vSTKjjIPC5yG+ISRwvFBBnEW9tarAR3lZ98IAMIQgu0VTRca4lsqeIB8xjXXuw1l24bRDiPYi5JEwAlWO09CP+G+6jYdgVLBYskCWGukFDX2g2NLBGjvYB47rCucJ8Yhgjdik1EAgNiKFN3KCCS6qCixBMkBqrbd0FnPWnX3eYFjOWqLbVoEAUARFpF1RRFEBRZS4YgoqogABY7UAEAFFAFVVUBBEVAVVQQAAAAAAAAAAAAAAAA';

function startParsing(event) {
  event.preventDefault();

  var str = document.getElementById('txtBase64String').value.trim();

  if ( str === '' ) return alert('Enter the Base64 String');
  
  document.getElementById('displayParsedJson').textContent = 
  JSON.stringify(SALicenseParser.parse(str), true);
  document.getElementById('displayParsedJson').style.display = 'block';
    
}