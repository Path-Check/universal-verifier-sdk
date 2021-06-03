const {verifyQRCode} = require('../lib/index');
const expect = require('chai').expect; 

const CombinedDGC = {
    "@context": ["https://www.w3.org/2018/credentials/v1", "https://w3id.org/dgc/v1", "https://w3id.org/security/bbs/v1"],
    "type": ["VerifiableCredential"],
    "credentialSubject": {
        "@context": ["https://w3id.org/dgc/v1"],
        "type": "DGCCertificate",
        "personalInformation": {
            "@context": ["https://w3id.org/dgc/v1"],
            "type": "DGCSubject",
            "familyName": "d'Arsøns - van Halen",
            "givenName": "François-Joan",
            "stdFamilyName": "DARSONS<VAN<HALEN",
            "stdGivenName": "FRANCOIS<JOAN",
            "birthDate": "2009-02-28"
        },
        "proofOfRecovery": [{
            "@context": ["https://w3id.org/dgc/v1"],
            "type": "DGCProofOfRecovery",
            "id": "urn:uvci:01:NL:LSP/REC/1289821",
            "issuerName": "Ministry of VWS",
            "countryOfTest": "NL",
            "infectionInformation": {
                "@context": ["https://w3id.org/dgc/v1"],
                "type": "DGCInfectionInformation",
                "diseaseRecoveredFrom": "840539006",
                "dateFirstPositive": "2021-04-21",
                "validFrom": "2021-05-01",
                "validUntil": "2021-10-21"
            }
        }],
        "proofOfVaccination": [{
            "@context": ["https://w3id.org/dgc/v1"],
            "type": "DGCProofOfVaccination",
            "id": "urn:uvci:01:NL:PlA8UWS60Z4RZXVALl6GAZ",
            "issuerName": "Ministry of VWS",
            "countryOfVaccination": "NL",
            "vaccinationInformation": {
                "@context": ["https://w3id.org/dgc/v1"],
                "type": "DGCVaccinationInformation",
                "diseaseProtectedFrom": "840539006",
                "prophylaxis": "1119349007",
                "dateOfVaccination": "2021-05-05",
                "dose": 1,
                "totalDoses": 2,
                "marketingAuthHolder": "ORG-100030215",
                "medicinalProductName": "EU/1/20/1528"
            }
        }, {
            "@context": ["https://w3id.org/dgc/v1"],
            "type": "DGCProofOfVaccination",
            "id": "urn:uvci:01:NL:ATS342XDYS358FDFH3GTK5",
            "issuerName": "Ministry of VWS",
            "countryOfVaccination": "NL",
            "vaccinationInformation": {
                "@context": ["https://w3id.org/dgc/v1"],
                "type": "DGCVaccinationInformation",
                "diseaseProtectedFrom": "840539006",
                "prophylaxis": "1119349007",
                "dateOfVaccination": "2021-05-25",
                "dose": 2,
                "totalDoses": 2,
                "marketingAuthHolder": "ORG-100030215",
                "medicinalProductName": "EU/1/20/1528"
            }
        }],
        "proofOfCovidTest": [{
            "@context": ["https://w3id.org/dgc/v1"],
            "type": "DGCProofOfCovidTest",
            "id": "urn:uvci:01:NL:GGD/81AAH16AZ",
            "issuerName": "Ministry of VWS",
            "countryOfTestAdminstration": "NL",
            "testInformation": {
                "@context": ["https://w3id.org/dgc/v1"],
                "type": "DGCTestInformation",
                "diseaseTestedFrom": "840539006",
                "testName": "COVID PCR",
                "testManufacturer": "1232",
                "testType": "LP217198-3",
                "sampleCollectionDateTime": "2021-02-13T14:20:00Z",
                "testResult": "260415000",
                "testCenter": "GGD Fryslân, L-Heliconweg"
            }
        }, {
            "@context": ["https://w3id.org/dgc/v1"],
            "type": "DGCProofOfCovidTest",
            "id": "urn:uvci:01:NL:GGD/23BBS36BC",
            "issuerName": "Ministry of VWS",
            "countryOfTestAdminstration": "NL",
            "testInformation": {
                "@context": ["https://w3id.org/dgc/v1"],
                "type": "DGCTestInformation",
                "diseaseTestedFrom": "840539006",
                "testName": "NAAT TEST",
                "testManufacturer": "1343",
                "testType": "LP6464-4",
                "sampleCollectionDateTime": "2021-04-13T14:20:00Z",
                "testResult": "260373001",
                "testCenter": "GGD Fryslân, L-Heliconweg"
            }
        }]
    }
};

describe('JXT-Based URIs with BBS+ W3C VCs', function() {
  it('should unpack and verify with arrays', async () => {
    const signed = "JXT:PCF.PW:DGC:1:d'Ars%C3%B8ns~-~van~Halen/Fran%C3%A7ois-Joan/DARSONS%3CVAN%3CHALEN/FRANCOIS%3CJOAN/3AGM//2/~001%3ANL%3APlA8UWS60Z4RZXVALl6GAZ/Ministry~of~VWS/NL/~0/~1/3MBL/1/2/~1/~0/~001%3ANL%3AATS342XDYS358FDFH3GTK5/Ministry~of~VWS/NL/~0/~1/3MC9/2/2/~1/~0/2/~001%3ANL%3AGGD%2F81AAH16AZ/Ministry~of~VWS/NL/~1/~0/GGD~Frysl%C3%A2n%2C~L-Heliconweg/~0/COVID~PCR/1232/1G2FO0G/~001%3ANL%3AGGD%2F23BBS36BC/Ministry~of~VWS/NL/~0/~1/GGD~Frysl%C3%A2n%2C~L-Heliconweg/~0/NAAT~TEST/1343/1G7BA4G/1/~001%3ANL%3ALSP%2FREC%2F1289821/Ministry~of~VWS/NL/~0/3MAJ/3MBH/3MJV/////1GBHU15/~0PCF.PW%3A1A8%23DEMO/QC6XY4FVS4XGFIRM3SNB6QR5BICE2YBKFKQ3I2MFZLE6TZLRU7OKAP6PCMMDKJBZSPYOKF6WRJ4HO32FALDUHDDQY4A5JVWLA4ULETYX5FT5IQRX3GBTFUZVTKJGOYKRJW2D3OOR6GT3JNOM4PXEPUG65QZE7KBPJ4R7UBV5IJD3FOEEZKMA";
    const result = await verifyQRCode(signed);

    expect(result.proof).to.not.be.null;
    expect(result.issuer).to.not.be.null;
    expect(result.issuanceDate).to.not.be.null;

    delete result["issuanceDate"]; // These change when tests run
    delete result["expirationDate"]; // These change when tests run
    delete result["issuer"]; // These change when tests run
    expect(result).to.eql(CombinedDGC);
  }); 
});