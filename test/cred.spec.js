const {verifyQRCode} = require('../lib/index');
const expect = require('chai').expect; 

const DGC_PAYLOAD_WITH_ARRAY = [
    "D'ARSØNS - VAN HALEN",
    'FRANÇOIS-JOAN',
    'DARSONS<VAN<HALEN',
    'FRANCOIS<JOAN',
    '-4BS',
    '1GB9TP7',
    '3OC7S0',
    'NL',
    '2',
    'P1J6RU',
    '1119349007',
    'EU/1/20/1528',
    'ORG-100030215',
    '1',
    '2',
    '-R',
    'NL',
    'MINISTRY OF VWS',
    '01:NL:PLA8UWS60Z4RZXVALL6GAZ',
    'P1J6RU',
    '1119349007',
    'EU/1/20/1528',
    'ORG-100030215',
    '2',
    '2',
    '-7',
    'NL',
    'MINISTRY OF VWS',
    '01:NL:ATS342XDYS358FDFH3GTK5',
    '2',
    'P1J6RU',
    'LP217198-3',
    'COVID PCR',
    '1232',
    '-8Q5ON',
    '260415000',
    'GGD FRYSLÂN, L-HELICONWEG',
    'NL',
    'MINISTRY OF VWS',
    '01:NL:GGD/81AAH16AZ',
    'P1J6RU',
    'LP6464-4',
    'NAAT TEST',
    '1343',
    '-4K59F',
    '260373001',
    'ALPHEN A/D RIJN',
    'NL',
    'MINISTRY OF VWS',
    '01:NL:GGD/23BBS36BC',
    '1',
    'P1J6RU',
    '-19',
    '-V',
    '4E',
    'NL',
    'MINISTRY OF VWS',
    '01:NL:LSP/REC/1289821'
  ];

describe('CRED-Based URIs', function() {
  it('should unpack and verify with arrays', async () => {
    const signed = "CRED:DGC:1:GBCAEIBFOUUISCLFFO6XGSS6AM7KZR7IYOSGFW7MGFFUFMHCTJRMIIWMSMBCANYGL7N5BODF3T6ADIHOHACOXJYIKXPGCIMCHY7W3G7NGV5TZ3KV:1A9.PCF.PW:D'ARS%C3%98NS%20-%20VAN%20HALEN/FRAN%C3%87OIS-JOAN/DARSONS%3CVAN%3CHALEN/FRANCOIS%3CJOAN/-4BS/1GB9TP7/3OC7S0/NL/2/P1J6RU/1119349007/EU%2F1%2F20%2F1528/ORG-100030215/1/2/-R/NL/MINISTRY%20OF%20VWS/01%3ANL%3APLA8UWS60Z4RZXVALL6GAZ/P1J6RU/1119349007/EU%2F1%2F20%2F1528/ORG-100030215/2/2/-7/NL/MINISTRY%20OF%20VWS/01%3ANL%3AATS342XDYS358FDFH3GTK5/2/P1J6RU/LP217198-3/COVID%20PCR/1232/-8Q5ON/260415000/GGD%20FRYSL%C3%82N%2C%20L-HELICONWEG/NL/MINISTRY%20OF%20VWS/01%3ANL%3AGGD%2F81AAH16AZ/P1J6RU/LP6464-4/NAAT%20TEST/1343/-4K59F/260373001/ALPHEN%20A%2FD%20RIJN/NL/MINISTRY%20OF%20VWS/01%3ANL%3AGGD%2F23BBS36BC/1/P1J6RU/-19/-V/4E/NL/MINISTRY%20OF%20VWS/01%3ANL%3ALSP%2FREC%2F1289821";
    const result = await verifyQRCode(signed);

    expect(result).to.eql(DGC_PAYLOAD_WITH_ARRAY);
  }); 
});