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

describe('CBOR-LD-Based URIs with BBS+ W3C VCs', function() {
  it('should unpack and verify with arrays', async () => {
    const signed = "CBLD:PCOKLU2LNAJUCGAHOBL5BAYHIEIJSLJKBMRB45GNZTWCHG5FHVGHMN2J2PWW5GWN7NSNHJGJE3NU343KSIRGFKYXF73OVQMTVDCZW6AQRMUGERKEYSBQOQIRB46YRCEII7ISE3VNPVIKUUF4ZXAMY7F777GDO37WKDL2SCYH5C4WK6XOA5UNYABNOCM2N5XXTVMTQ4UJUYHNEVA7JUO6UXRJLGB5KXFLK6XIXGNUHCWQJNPIYQSBYDDCW6UVKSNGBOJXLLM4RU5OTNUZ5YSZK7BZRHZATEWNK2KRCPJYUTN2VZK2E7ZTKLXFMRBUSAQD4Z2NAX5KKSNXVKMS5TMOHDUWJQLJVKBUDTIVDICWVWV4MWFYVZR2TUMC2VGCGNNGI3VUQHFRZPJ25IDIYXGJA35SMJFH43LEMCAKMQFHMAL6ITRRF7DZJUHJLBNEMRB2UZVMGJTIZ4AAOXF5JHGXRYN4LBJ6B3X43L4DY6CYYEIAMWEILEWICR7NYIE5E2BO3ZZZWDGLJSG3UTDE2QU3VYFRDNVIZOUL6M23XSKGNORS46CSK5E5YMQNVM7ULDH6BDITKAZ4TUEMLCNBTCBVM76UEQDFRGH5KNZLE65Y3VYOL5WUTAWUGJA3XIOA5KZ6BEIREQJCZF4YY2PQFRX6RYDZNXMHN3LGVPIWG2XDJQVG3AIXW7LKJM7AUUW7CUHAAIIIVYCVBNBYYVWURBFSAXWGKCDDAB26O753ZI4ZKCR5O5AWV642OGE5RUKB265M4Z3IUJPQW2ADBB6BHNNTCU4DFIJVHYXAXWGULSBDAFBARFRKPIGCGPYKJAWPOTZZ42BEDCYTQPFP7SHZDXFDTHXT4QDCCCJGUFMYSVJZ47TSARDAVGWMORC64RMR5XE7LGTR7XKC26WZQL5OFE7IJJMAQSISOO53RX54GSU4R7V43UQFW4V2WYEB6UVN2WM5EDEHUB34VKWEL4JGT43WK7FQ6HZMPNZAMIHJDETJJOCDSPU6ZOSIR3UI4HPS24DODPFZOFOL272YXPAIXZWVQBHQPVJ4KZIK7SODBY3BJ4DCDZ5NCFUGVF7XTN6MRB5BB4EVRIVJXUKYIUEA4O6Q27U23K37XL2GSKYDQHTH2SWMKCKSJAGULODQMJENROIRN4Y65XVZ6ELYBL3QXU";
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