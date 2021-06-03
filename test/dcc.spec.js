const {verifyQRCode, parseCWT, makeCWT} = require('../lib/index');
const expect = require('chai').expect; 

const TEST_PAYLOAD_AT = {
  "dob": "1998-02-26", 
  "nam": {
    "fn": "Musterfrau-Gößinger", 
    "fnt": "MUSTERFRAU<GOESSINGER", 
    "gn": "Gabriele", 
    "gnt": "GABRIELE"
  }, 
  "v": [
    {
      "ci": "ATOZQWGY3IOJUXGYTBOVWWC3TO", 
      "co": "AT", 
      "dn": 1, 
      "dt": "2021-02-18", 
      "is": "BMGSPK Austria", 
      "ma": "ORG-100030215", 
      "mp": "EU/1/20/1528", 
      "sd": 2, 
      "tg": "840539006", 
      "vp": "1119305005"
      }
  ], 
  "ver": "1.0.0"
}

const TEST_PAYLOAD_SE = {
    "v": [
      {
        "ci": "urn:uvci:01:SE:EHM/100000024GI5HMGZKSMS",
        "co": "SE",
        "dn": 2,
        "dt": "2021-03-18",
        "is": "Swedish eHealth Agency",
        "ma": "ORG-100030215",
        "mp": "EU/1/21/1529",
        "sd": 2,
        "tg": "840539006",
        "vp": "J07BX03"
      }
    ],
    "dob": "1958-11-11",
    "nam": {
      "fn": "Lövström",
      "gn": "Oscar",
      "fnt": "LOEVSTROEM",
      "gnt": "OSCAR"
    },
    "ver": "1.0.0"
}
 
describe('DCC QRs', function() {
  it('should Verify the json from Austria', async () => {
    // Signed by the original EU source.  They encoded the JSON as a String
    const signed = 'HC1:NCFOXN%TS3DHZN4HAF*PQFKKGTNA.Q/R8WRU2FCGJ9P+V%%H4G5NOK5F3ZMIN9HNO4*J8OX4W$C2VL*LA 43/IE%TE6UG+ZEAT1HQ13W1:O1YUI%F1PN1/T1J$HTR9/O14SI.J9DYHZROVZ05QNZ 20OP748$NI4L6RXKYQ8FRKBYOBM4T$7U-N0O4RK43%JTXO$WOS%H*-VZIEQKERQ8IY1I$HH%U8 9PS5OH6*ZUFZFEPG:YN/P3JRH8LHGL2-LH/CJTK96L6SR9MU9DV5 R1:PI/E2$4J6AL.+I9UV6$0+BNPHNBC7CTR3$VDY0DUFRLN/Y0Y/K9/IIF0%:K6*K$X4FUTD14//E3:FL.B$JDBLEH-BL1H6TK-CI:ULOPD6LF20HFJC3DAYJDPKDUDBQEAJJKHHGEC8ZI9$JAQJKZ%K.CPM+8172JB0Q/BSRMQ%LBI1IZ72UVMPVNQND%GA.Q4AF- EH5NTTS$*1DK1D.1WB3I4WA+FUC4HLBKHUZNLBV7.XCI:PJ7RY:0K RB3Q0BT AA:40V19G3';
    const cwtPayload = await verifyQRCode(signed);
    expect(await parseCWT(cwtPayload)).to.eql(TEST_PAYLOAD_AT);
  });


  it('should Verify the json from Sweden', async () => {
    // Signed by the original EU source.  They encoded the JSON as a String
    const signed = 'HC1:NCFOXN%TSMAHN-H3O4:PVH AJ2J$9J0II:Q5 43SLG/EBUD2XPO.TM8W42YBJSRQHIZC4.OI1RM8ZA*LPUY29+KCFF-+K*LPH*AA:G$LO5/A+*39UVC 0G8C:USOHDAPSY+3AZ33M3JZIM-1Z.4UX4795L*KDYPWGO+9AAEOXCRFE4IWMIT5NR7LY4357LC4DK4LC6DQ42JO9X7M16GF6:/6N9R%EP3/28MJE9A7EDA.D90I/EL6KKLIIL4OTJLI C3DE0OA0D9E2LBHHGKLO-K%FGLIA-D8+6JDJN XGHFEZI9$JAQJKHJLK3M484SZ4RZ4E%5MK9AZPKD70/LIFN7KTC5NI%KH NVFWJ-SUQK8%MPLI8:31CRNHS*44+4BM.SY$NOXAJ8CTAP1-ST*QGTA4W7.Y7N31D6K-BW/ N NRM1U*HFNHJ9USSK380E%WISO9+%GRTJ GBW0UEFJ42SUTU9I8/MD3N3ARC/03W-RHDMO1VC767.P95G-CFA.7L C02FM8F6UF';
    const cwtPayload = await verifyQRCode(signed);
    expect(await parseCWT(cwtPayload)).to.eql(TEST_PAYLOAD_SE);
  });
});