const {verifyQRCode} = require('../lib/index');
const expect = require('chai').expect; 

const PRODUCTION_PAYLOAD = {
  "@context":["https://www.w3.org/2018/credentials/v1","https://cowin.gov.in/credentials/vaccination/v1"],
  "type":["VerifiableCredential","ProofOfVaccinationCredential"],
  "credentialSubject":{
    "type":"Person",
    "id":"did:Passport:Dummy256",
    "refId":"39791185041847",
    "name":"Third March User One",
    "gender":"Male",
    "age":"65",
    "nationality":"Indian",
    "address":{
      "streetAddress":"",
      "streetAddress2":"",
      "district":"Chamba",
      "city":"",
      "addressRegion":"Himachal",
      "addressCountry":"IN",
      "postalCode":176207
    }
  },
  "issuer":"https://cowin.gov.in/",
  "issuanceDate":"2021-03-03T04:28:46.012Z",
  "evidence":[{
    "id":"https://cowin.gov.in/vaccine/92047670169",
    "feedbackUrl":"https://cowin.gov.in/?92047670169",
    "infoUrl":"https://cowin.gov.in/?92047670169",
    "certificateId":"92047670169",
    "type":["Vaccination"],
    "batch":"Dummy-TGN-Chamba",
    "vaccine":"COVISHIELD",
    "manufacturer":"Serum Institute of India",
    "date":"2021-03-03T04:28:43.134Z",
    "effectiveStart":"2021-03-03",
    "effectiveUntil":"2021-03-03",
    "dose":1,
    "totalDoses":2,
    "verifier":{
      "name":"Dummy Vaccinator"
    },
    "facility":{
      "name":"Himachal Site Name 176207",
      "address":{
        "streetAddress":"Address Of Site 176207",
        "streetAddress2":"",
        "district":"Chamba",
        "city":"",
        "addressRegion":"Himachal",
        "addressCountry":"IN",
        "postalCode":""}
      }
    }
  ],
  "nonTransferable":"true",
  "proof":{
    "type":"RsaSignature2018",
    "created":"2021-03-03T04:28:46Z",
    "verificationMethod":"did:india",
    "proofPurpose":"assertionMethod",
    "jws":"eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..nE-3iYDcKok-CmTm3pbpyZQheqpVDor_f0YQt4ukWDGyZuqtZuu8NROtJjOZ-LNAavN-JZtCAdunofe19-mcC2HC20W_yxzGfB1Idft15CruJWOuvkkKXX0UoezZhsk_Cd-HmeHeCCUgoyLiDtpSqzXd9WqiHG_XN39PUMvIHnZAPo54sodtzAEX88L1GSSd37JBrOlKoeMMJaC0JDIEDSFV-SaVk_vH5e06Vq86WrkMj5oj4pqmgnql7W_qt3NAgNqQQgUUNhsMOHwHXKBr5j80yjp1LRMidB81u0SQJvbxQVxLnphUbPcTI4h6nLJeZJjOiecOLESgIELpC2_SDg"
  }
};

// payload is actually binary, but we are representing here in B64
const PRODUCTION_PAYLOAD_B64 = "UEsDBAoAAAAIADaCw1IKxNLi5AMAANkHAAAQAAAAY2VydGlmaWNhdGUuanNvbs1UXXPqOAz9KwzPCyThm5e7NPRCKCTQ8FWWHcY4TmIgdrAdKO30v6/j0EI77czu287wQKQjWUc6Uv51lf8TUiLQs1jlW3+t8qEQMW+VSqfTqXgqFykLSoamN0qQIQ8RgcGel476Kv/HFQrpCZNiQI9FTD7jAISYAIEpUTF/yyBxjlH20gwx7GOw2SPzI0blHTFKfcefXaNvAWmS6yNustkimNb++pFbZkCMU6KSYU9ZPOy1RoDzmDLR6iRRdDaqNQVgyLcyTLlZb+p6o6pV9EalrpwERFnGSYiZlxsCBsPclCOWcwhSiAARDzGFGYJ9ZgNBFlSrXpKkHMAei7MyW8TDIKsOeB5DnGflc8EQEu0P0yqvMJ/MxtXuYenBivsqb4Yg2gBlh+/v3L7wiAKcdkSaezgCMLz0+uI2aUIEu5RnK09MuQB7k3opF71eM7T621vaUM6TC+FvBZB1XYIAgagDRNYKQzP0glaWv4lWaRmNVqVW1HRjqdDoiOU4odLF68fIvs2eSQqVmoZWqdfqml5rqhQ+Qt4GwN2U7X8O/vU1ChOf/rcIiJiQqoWS10U1XxE3Ar8KOJPtBggYqiClwMKkaxduBnfhls3TmVluz7ofdJQrAiTxARQJu7TeRSyJchbhAotEoBz1c0pWmTJ+7nq5qJcrl677vtwcfESuAEx8wX9GTOWu7b9DeJQreaS8qZRLR36n0jVSOmq/Vb2vN5ukqOfee0OlO1WVJIcvC3ILftdqzsWSpC3NuUyK/2Z7Lv9zjp+F30T+H3YqTfb29pYKg1AyYYBwH7H0HiqnYEl2TeL0HH45cI8cuDiQ/ZOCSM9zViRDcvDeT/uWTT2bClSqHCIR0ut9xB8CUk+OEhZn45WUOE+Ffw2RoO0pazM698NNF2IH98fTF0u3scWtyDJs06oto98cGlP5bZ/BYoydPcdP2yfN2uvNYpHcF8r4qQMf6K5gRpOoHG/i83IcokM861C29rWnsagku3mne14mB7FMkob96Ij+1lkWBnYbHO1CfynMtpcQ6iO9WYigafRMQ5uvz88vXf9Otzxf6FWTJf25kxx3u4fFQptS9LIM+W5teoVehHrINKcBPQ9wR8Tu4WXhNecH3OuuF3a5OZoOj1aPLNsjWq1w6omX9v2i0RjoXdf1yvX+HXP2DxQNh31gav2Odd9xf88KLpjt1sdeFWm12aFRm7PdcFul20p8iAJy2Nfn64Mo2+3APozHwXRqh3zo9E69xcMdq24b2nkb64PHIfbuGnqiueP+cfM8nj0PSBxONyM4sSphjQz6aCkbgRF0BvduIE9FbBprtxOkqsr/A1BLAQIUAAoAAAAIADaCw1IKxNLi5AMAANkHAAAQAAAAAAAAAAAAAAAAAAAAAABjZXJ0aWZpY2F0ZS5qc29uUEsFBgAAAAABAAEAPgAAABIEAAAAAA=="
    
describe('DIVOC QRs', function() {
  it('should Verify w/ Production Key', async () => {
    const result = await verifyQRCode(atob(PRODUCTION_PAYLOAD_B64));

    expect(JSON.parse(result)).to.eql(PRODUCTION_PAYLOAD);
  });
});