import * as CRED from '@pathcheck/cred-sdk';
import * as BBS_JXT from '@pathcheck/bbs-jxt-sdk';
import * as DIVOC from '@pathcheck/divoc-sdk';
import * as DCC from '@pathcheck/dcc-sdk';
import * as BBS_CBLD from '@pathcheck/bbs-cbld-sdk';
import * as SHC from '@pathcheck/shc-sdk';
import * as VDS from '@pathcheck/vds-sdk';

export async function verifyQRCode(data) {
  if (data === "" || data == null) {
      return null;
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("CRED:")) {
      return CRED.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("CBLD:")) {
      return BBS_CBLD.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("HC1:")) {
      return DCC.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("JXT:")) {
      return BBS_JXT.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("SHC:")) {
      return SHC.unpackAndVerify(data); 
  } else if (data.startsWith("PK")) {
      return DIVOC.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.startsWith("{")) {
    if (data.includes("icao.vacc")) {
        return VDS.unpackAndVerify(data); 
    } else if (data.includes("did:india")) {
        return DIVOC.unpackAndVerify(data); 
    } else if (data.includes("did:hpass")) {
        // make IBM's version.
        return undefined;
    }
  } else {
      return undefined;
  }
}
