import * as CRED from '@pathcheck/cred-sdk';
import * as BBS_JXT from '@pathcheck/bbs-jxt-sdk';
import * as EDDSA_JXT from '@pathcheck/eddsa-jxt-sdk';
import * as DIVOC from '@pathcheck/divoc-sdk';
import * as DCC from '@pathcheck/dcc-sdk';
import * as BBS_CBLD from '@pathcheck/bbs-cbld-sdk';
import * as SHC from '@pathcheck/shc-sdk';
import * as VDS from '@pathcheck/vds-sdk';

export async function verifyQRCode(data) {
  if (data === "" || data == null) {
      return null;
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("CRED:")) {
      return await CRED.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("CBLD:")) {
      return await BBS_CBLD.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("HC1:")) {
      return await DCC.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("JXT:")) {
      return await BBS_JXT.unpackAndVerify(data) || EDDSA_JXT.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.toUpperCase().startsWith("SHC:")) {
      return await SHC.unpackAndVerify(data); 
  } else if (data.startsWith("PK")) {
      return await DIVOC.unpackAndVerify(data); 
  } else if (typeof(data) === 'string' && data.startsWith("{")) {
    if (data.includes("icao.vacc")) {
        return await VDS.unpackAndVerify(data); 
    } else if (data.includes("did:india")) {
        return await DIVOC.unpackAndVerify(data); 
    } else if (data.includes("did:hpass")) {
        // make IBM's version.
        return undefined;
    }
  } else {
      return undefined;
  }
}
