import {unpackAndVerify} from '@pathcheck/cred-sdk';

export async function verifyQRCode(data) {
  if (data === "" || data == null) {
      return null;
  } else if (typeof(data) === 'string' && data.startsWith("CRED:")) {
      return unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.startsWith("CBLD:")) {
  //    verifyDisplayCBOR(data); 
  } else if (typeof(data) === 'string' && data.startsWith("HC1:")) {
  //    verifyDisplayEU(data);
  } else if (typeof(data) === 'string' && data.startsWith("JXT:")) {
  //    verifyDisplayJXT(data); 
  } else if (data.startsWith("PK")) {
  //    unZipVerifyDisplayDIVOC(data);
  } else if (typeof(data) === 'string' && data.startsWith("{")) {
  //    if (data.includes("did:india")) {
  //        verifyDisplayDIVOC(json);
  //    } else {
  //        verifyDisplayIBM(json);
  //    }
  } else {
      return undefined;
  }
}
