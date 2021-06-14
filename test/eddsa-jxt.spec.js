const { verifyQRCode } = require('../lib/index')
const expect = require('chai').expect

const CombinedDGC = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/dgc/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1',
  ],
  type: ['VerifiableCredential'],
  credentialSubject: {
    '@context': ['https://w3id.org/dgc/v1'],
    type: 'DGCCertificate',
    personalInformation: {
      '@context': ['https://w3id.org/dgc/v1'],
      type: 'DGCSubject',
      familyName: "d'Arsøns - van Halen",
      givenName: 'François-Joan',
      stdFamilyName: 'DARSONS<VAN<HALEN',
      stdGivenName: 'FRANCOIS<JOAN',
      birthDate: '2009-02-28',
    },
    proofOfVaccination: [
      {
        '@context': ['https://w3id.org/dgc/v1'],
        type: 'DGCProofOfVaccination',
        vaccinationInformation: {
          '@context': ['https://w3id.org/dgc/v1'],
          type: 'DGCVaccinationInformation',
          diseaseProtectedFrom: '840539006',
          prophylaxis: '1119349007',
          dateOfVaccination: '2021-05-05',
          dose: 1,
          totalDoses: 2,
          marketingAuthHolder: 'ORG-100030215',
          medicinalProductName: 'EU/1/20/1528',
        },
        id: 'urn:uvci:01:NL:PlA8UWS60Z4RZXVALl6GAZ',
        issuerName: 'Ministry of VWS',
        countryOfVaccination: 'NL',
      },
      {
        '@context': ['https://w3id.org/dgc/v1'],
        type: 'DGCProofOfVaccination',
        vaccinationInformation: {
          '@context': ['https://w3id.org/dgc/v1'],
          type: 'DGCVaccinationInformation',
          diseaseProtectedFrom: '840539006',
          prophylaxis: '1119349007',
          dateOfVaccination: '2021-05-25',
          dose: 2,
          totalDoses: 2,
          marketingAuthHolder: 'ORG-100030215',
          medicinalProductName: 'EU/1/20/1528',
        },
        id: 'urn:uvci:01:NL:ATS342XDYS358FDFH3GTK5',
        issuerName: 'Ministry of VWS',
        countryOfVaccination: 'NL',
      },
    ],
    proofOfCovidTest: [
      {
        '@context': ['https://w3id.org/dgc/v1'],
        type: 'DGCProofOfCovidTest',
        testInformation: {
          '@context': ['https://w3id.org/dgc/v1'],
          type: 'DGCTestInformation',
          testType: 'LP217198-3',
          testResult: '260415000',
          testCenter: 'GGD Fryslân, L-Heliconweg',
          diseaseTestedFrom: '840539006',
          testName: 'COVID PCR',
          testManufacturer: '1232',
          sampleCollectionDateTime: '2021-02-13T14:20:00Z',
        },
        id: 'urn:uvci:01:NL:GGD/81AAH16AZ',
        issuerName: 'Ministry of VWS',
        countryOfTestAdminstration: 'NL',
      },
      {
        '@context': ['https://w3id.org/dgc/v1'],
        type: 'DGCProofOfCovidTest',
        testInformation: {
          '@context': ['https://w3id.org/dgc/v1'],
          type: 'DGCTestInformation',
          testType: 'LP6464-4',
          testResult: '260373001',
          testCenter: 'GGD Fryslân, L-Heliconweg',
          diseaseTestedFrom: '840539006',
          testName: 'NAAT TEST',
          testManufacturer: '1343',
          sampleCollectionDateTime: '2021-04-13T14:20:00Z',
        },
        id: 'urn:uvci:01:NL:GGD/23BBS36BC',
        issuerName: 'Ministry of VWS',
        countryOfTestAdminstration: 'NL',
      },
    ],
    proofOfRecovery: [
      {
        '@context': ['https://w3id.org/dgc/v1'],
        type: 'DGCProofOfRecovery',
        infectionInformation: {
          '@context': ['https://w3id.org/dgc/v1'],
          type: 'DGCInfectionInformation',
          diseaseRecoveredFrom: '840539006',
          dateFirstPositive: '2021-04-21',
          validFrom: '2021-05-01',
          validUntil: '2021-10-21',
        },
        id: 'urn:uvci:01:NL:LSP/REC/1289821',
        issuerName: 'Ministry of VWS',
        countryOfTest: 'NL',
      },
    ],
  },
  issuanceDate: '2021-05-18T16:06:06Z',
  issuer: 'did:web:PCF.PW:1A12',
}

describe('JXT-Based URIs with EDDSA W3C VCs', function () {
  it('should unpack and verify with arrays', async () => {
    const signed =
      "JXT:PCF.PW:DGC:2:d'Ars%C3%B8ns+-+van+Halen/Fran%C3%A7ois-Joan/DARSONS%3CVAN%3CHALEN/FRANCOIS%3CJOAN/3AGM//2$001%3ANL%3APlA8UWS60Z4RZXVALl6GAZ/Ministry+of+VWS/NL$0$1/3MBL/1/2$1$0$001%3ANL%3AATS342XDYS358FDFH3GTK5*8/NL$0$1/3MC9/2/2$1$0/2$001%3ANL%3AGGD%2F81AAH16AZ*8/NL$1$0/GGD+Frysl%C3%A2n%2C+L-Heliconweg$0/COVID+PCR/1232/1G2FO0G$001%3ANL%3AGGD%2F23BBS36BC*8/NL$0$1*11$0/NAAT+TEST/1343/1G7BA4G/1$001%3ANL%3ALSP%2FREC%2F1289821*8/NL$0/3MAJ/3MBH/3MJV/1GA7PFE/$01A12//1GCFET3$01A12%23WEB/3UJ3YL1NI6XS8POCUGMCE278QTG55BEUZE7231I3KUX48VSDOD71HGDU6FW3EZINFIF9JX5H5B5MBAW7U9QBA2J0DO7VGUBDAPGJS"
    const result = await verifyQRCode(signed)

    expect(result.proof).to.not.be.null
    expect(result.issuer).to.not.be.null
    expect(result.issuanceDate).to.not.be.null
    expect(result).to.eql(CombinedDGC)
  })
})
