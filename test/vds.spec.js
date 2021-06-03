const {verifyQRCode} = require('../lib/index');
const expect = require('chai').expect; 

const SIGNED_TEST_PAYLOAD = '{"data":{"hdr":{"t":"icao.vacc","v":1,"is":"UTO"},"msg":{"uvci":"U32870","pid":{"n":"Smith Bill","dob":"1990-01-02","sex":"M","i":"A1234567Z","ai":"L4567890Z"},"ve":[{"des":"XM68M6","nam":"Comirnaty","dis":"RA01.0","vd":[{"dvc":"2021-03-03","seq":1,"ctr":"UTO","adm":"RIVM","lot":"VC35679","dvn":"2021-03-24"},{"dvc":"2021-03-24","seq":2,"ctr":"UTO","adm":"RIVM","lot":"VC87540"}]}]}},"sig":{"alg":"ES256","sigvl":"MEQCIDtAxcDjBsNT2I0ry6JDj+sAVAsEREEgJHm5aN1KUzNcAiAUyRiGuA6wDviFP3VprHHqFs6x+JGd/5u15R8snKzdjQ==","cer":"MIIBYDCCAQYCEQCAG8uscdLb0ppaneNN5sB7MAoGCCqGSM49BAMCMDIxIzAhBgNVBAMMGk5hdGlvbmFsIENTQ0Egb2YgRnJpZXNsYW5kMQswCQYDVQQGEwJGUjAeFw0yMTA0MjcyMDQ3MDVaFw0yNjAzMTIyMDQ3MDVaMDYxJzAlBgNVBAMMHkRTQyBudW1iZXIgd29ya2VyIG9mIEZyaWVzbGFuZDELMAkGA1UEBhMCRlIwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARkJeqyO85dyR+UrQ5Ey8EdgLyf9NtsCrwORAj6T68/elL19aoISQDbzaNYJjdD77XdHtd+nFGTQVpB88wPTwgbMAoGCCqGSM49BAMCA0gAMEUCIQDvDacGFQO3tuATpoqf40CBv09nfglL3wh5wBwA1uA7lAIgZ4sOK2iaaTsFNqENAF7zi+d862ePRQ9Lwymr7XfwVm0="}}';
    
const TEST_PAYLOAD = {
    "data": {
        "hdr": {
            "t": "icao.vacc",
            "v": 1,
            "is": "UTO"
        },
        "msg": {
            "uvci": "U32870",
            "pid": {
                "n": "Smith Bill",
                "dob": "1990-01-02",
                "sex": "M",
                "i": "A1234567Z",
                "ai": "L4567890Z"
            },
            "ve": [{
                "des": "XM68M6",
                "nam": "Comirnaty",
                "dis": "RA01.0",
                "vd": [{
                    "dvc": "2021-03-03",
                    "seq": 1,
                    "ctr": "UTO",
                    "adm": "RIVM",
                    "lot": "VC35679",
                    "dvn": "2021-03-24"
                }, {
                    "dvc": "2021-03-24",
                    "seq": 2,
                    "ctr": "UTO",
                    "adm": "RIVM",
                    "lot": "VC87540"
                }]
            }]
        }
    }
};

describe('ICAOs VDS', function() {
  it('should Verify test payload', async () => {
    const result = await verifyQRCode(SIGNED_TEST_PAYLOAD);

    expect(result).to.eql(TEST_PAYLOAD);
  });
});