const {verifyQRCode, DCC} = require('../lib/index');
const expect = require('chai').expect; 

const TEST_PAYLOAD_DE = {
  "dob": "1951-03-01", 
  "nam": {
      "fn": "Tinsman",
      "fnt": "TINSMAN",
      "gn": "Roger",
      "gnt": "ROGER",
  }, 
  "v": [
    {
      "ci": "URN:UVCI:01DE/A56002311/1P0ZEVP96CZGGR17THF8D3#K",
      "co": "DE",
      "dn": 1, 
      "dt": "2021-01-20", 
      "is": "Robert Koch-Institut", 
      "ma": "ORG-100030215", 
      "mp": "EU/1/20/1528", 
      "sd": 2, 
      "tg": "840539006", 
      "vp": "1119349007"
      }
  ], 
  "ver": "1.3.0"
}

describe('DCC QRs', function() {
  it('should Verify the json from Germany', async () => {
    // Signed by the original EU source.  They encoded the JSON as a String
    const signed = 'HC1:6BF4W1C9QJPO%20KIJ6ZEI5UKKGARNC:N*B7A4K-8P IMX:I/HAOGR7TJOXO5HHKIHW8AIF7JFAYV5:IOK*J%T8-7W8 1OH8QWVQ2G6JG6KVQCPHX9*QQN.C8.TY:MQMBG%6/BLBFJ591II6J18M:2OCCVELB70SMC.5P5W8T02A22H/0PML$M2DIBO4K%36%PE:86210O883JO6BDT/MMP2*17JBBF2P+MNA9FP6BD7459FGXKL 03-Q160FTO00H*9G/4JE*1ERF-LMAJSUAELGNWZKRS28OLKKA0CCG00GS7LT8%6N91B6IP4BG5E4Z29.4T5$QYVSC24IC2NFATBUM22ED958FYWOAQGR55M4S3HUKDJP4VX.M+BAYGH+RLX83P0BLQ89LSLHKRW4I-R%R9HIMREL-ZINPMSZVJ2AY$L$OGQ:MWYOSSK-T5W5SZN7V6Q5OP CQ32R OV:14A4OJ RRBPSGEH*7K BHUS/GC1YVZ9E8ES.YQK1AJYQUK13W1C0I3G80FW76I+1';
    const cwtPayload = await verifyQRCode(signed);
    expect(await DCC.parseCWT(cwtPayload)).to.eql(TEST_PAYLOAD_DE);
  });
});