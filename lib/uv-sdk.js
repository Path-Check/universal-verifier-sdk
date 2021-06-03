import * as CRED from '@pathcheck/cred-sdk';
import * as BBSJXT from '@pathcheck/bbs-jxt-sdk';
import * as DIVOC from '@pathcheck/divoc-sdk';
import * as DCC from '@pathcheck/dcc-sdk';

export async function verifyQRCode(data) {
  if (data === "" || data == null) {
      return null;
  } else if (typeof(data) === 'string' && data.startsWith("CRED:")) {
      return CRED.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.startsWith("CBLD:")) {
  //    verifyDisplayCBOR(data); 
  } else if (typeof(data) === 'string' && data.startsWith("HC1:")) {
      return DCC.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.startsWith("JXT:")) {
      return BBSJXT.unpackAndVerify(data); 
  } else if (data.startsWith("PK")) {
      return DIVOC.unpackAndVerify(data); 
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
