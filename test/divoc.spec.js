const { verifyQRCode } = require('../lib/index')
const expect = require('chai').expect

const base32url = require('base32url')

const PRODUCTION_PAYLOAD = {
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://divoc.lgcc.gov.lk/credentials/vaccination/v1'],
  type: ['VerifiableCredential', 'ProofOfVaccinationCredential'],
  credentialSubject: {
    type: 'Person',
    id: '962433308V',
    refId: '962433308v',
    name: 'GAVIN MATTHEW DE SILVA',
    gender: 'Male',
    age: '24',
    nationality: 'Sri Lankan',
    address: {
      streetAddress: '209/2 Batalanda Road, Makola South, Makola',
      streetAddress2: '',
      district: ' ',
      city: '',
      addressRegion: 'state',
      addressCountry: 'IN',
      postalCode: 'pincode',
    },
  },
  issuer: 'https://divoc.lgcc.gov.lk/',
  issuanceDate: '2021-09-24T16:25:43.497Z',
  evidence: [
    {
      id: 'https://divoc.lgcc.gov.lk/vaccine/819152878',
      feedbackUrl: 'https://divoc.lgcc.gov.lk/?819152878',
      infoUrl: 'https://divoc.lgcc.gov.lk/?819152878',
      certificateId: '819152878',
      type: ['Vaccination'],
      batch: 'SINOPHARM (VERO CELL) - 202106B1269',
      vaccine: 'SINOPHARM (VERO CELL)',
      manufacturer: 'SINOPHARM (VERO CELL)',
      date: '2021-07-15T00:00:00.000Z',
      effectiveStart: '2020-12-15',
      effectiveUntil: '2021-01-15',
      dose: 1,
      totalDoses: 2,
      verifier: { name: 'Unknown' },
      facility: {
        name: 'ABC Medical Center',
        address: {
          streetAddress: 'addressLine1',
          streetAddress2: 'addressLine2',
          district: 'district',
          city: '',
          addressRegion: 'state',
          addressCountry: 'IN',
          postalCode: 'pincode',
        },
      },
    },
  ],
  nonTransferable: 'true',
  proof: {
    type: 'RsaSignature2018',
    created: '2021-09-24T16:25:43Z',
    verificationMethod: 'did:srilanka:moh',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..BADKnZGgtmhgSmU4gaNty2GXIV1NyxPFzFqK2t-QSBTXCaXxM991Mht63wyGvQBAZGg6xSqEF1RRffFYtSfqw8nYKGh-OtfG-CNVU2OnUBnzH0k0J9VRg8gsOiTXLJ4B7PAov41jZO1_nnzbXfNMxxkfgMQ-SKovXNOXbSKo-DxoVLfabYmrWWyf0_ioV4CddUjRuOdQsiSJ9ZDuXOIKXl8RQo5tKXj0GqZUxrvV2tu_nbOsHp0IiEle2Ur48iCEYiXQU-RC6poIvEcQBkQONDDefPbw-oGr8wKuySkfHvvpq3-FNGa44Kty5H-ZV8FAhaEk265Qy3Ff9MpLJI_lMw',
  },
}

const PRODUCTION_PHILIPPINES =
  'PK\x03\x04\n' +
  '\x00\x00\x00\b\x00ì\x838SáÒ,Wù\x03\x00\x00Z\x07\x00\x00\x10\x00\x00\x00certificate.json­T[\x8FªH\x10þ+\x84§ÝdPÀË¨/»ÞE\x05T\x84\x83n6\x93\x16\x1AlÅn\x07ZÔ\x99Ì\x7F?Õ:ã8É\x99\x93l²\t\x0FtU}uýª^å¿\x03F9>q¹ñ\x8F¼æ|\x9F5\x8AÅãñX8\x96\n' +
  ',\x8D\x8BºªÕ\x8AA\x8ACL9AIVÌ5ùáf\x18\x92\x9C\x05\x85$\x0E\x82BÌòB²ýj\x8A\x82\x80PÄ\t£\x02öï\x83ÌÏ{,\x02y8%\x11A«\x04·oöàv\x922\x16Ù\x91÷\x89»S\x03üÓ¹sXmp\x00I¿¾û\x94\'8Í\x18\x05\'$\x84W½ª\x97K¥\x92Zó@\x92âÈø"ÌAHÑNÀúMÏ°$³9\x9F\x0Fº?¤NWr\x8C±×\x04}\x8Ci\x88S°0Q\x82á\x8Dba®\x97/P\x91\x1AJ\b?\x83ÈI\x894Ft\x8BDp\x14\x86)Î2\x91WÆS\x8CyóC ëj½¨K-ÄQ\x82h\x88¤\x19Cá\x83d¢-K\x90ä°\x03_\x7F¼ÀÏ\x17°\x0Eh\x90\x85\x04¤D\x14-Kð\f®á?\x83Îp\fi\x81(ã\x88ãOy\x9B\x1D(O\x85­a\x81tÏ@\x9F´Y(êÙ\x13\x1A\x88¿·7h\\\x96\x1D.\x15\x7F?]ùj\x85h\x80;"\x86¨J×\x14µ®èå¹Vmè\x95F¹T(×\x1F\x97`\x89s\x02Ó\n' +
  'ÄÀ_¯SùÞñ\x95*¸XÓêZE¯=Ö\x00\x1Fa\x1C®P°uÓä·Ø¿îA\x84Fì?\x01\x02\x9Cràb\x00å\\Hr¯»Ñõ\x93\x90\x82\x86+Ä\x83µ\x98¼aÙ\x93AsfJ\x7FxÝ\x99-µ»ãñ\x9F\x92"\x89\x9E¨Õ\x96¦Wëàä½´ïìÁb\x87è!B\x01?¤\x97ö\x7Fg\x16ÞwüQÑ*sUm\\¾\x82ªª\x97\x8EG\x11,\x05É±ÃQÊ¯¶ª¢é`{¯ua\x85\x92\x9B\'íª\rY\x06Þ5(\x9A\x01=:ð\x02Òê\x90þeUEb¯\x1F;ãÒ-eG*\x03g mrÝ\x83\x9B¶ÙjK&\x0E¡£\x89Ô\x86m\x05èo÷â]5\x86\x1Ei¿bþ\x9D^ÿº\x05·ßÿ}\x19Þ`Ê\x94Ñy\x8Ah\x16áT\x1C*Ðóô <íÅ\x95º»<³\f9$\x06zÀüÄ¹\x94/\x87\n' +
  '¢\x86¿Þ\x0F1©kW\x83\x0B¥LÌ×,¼Ô\x136²\x94$â\x984vlý\x11krH÷\x97éÈ(Ë\x04]o\x98\x07ys\x14=ÄçázÕ\x0F\x88M\x86S÷ÅÐ,bdÆÎÐ­¶Q]îzY »ð¶ÎÈ\x9F\x12;ÉÈb³P\x8DD«\x17\n' +
  "­fgD\x97ý\x98ïÖ±³sË1²øYïû\x86§YçÓ¤÷Ò{\x1Eé\\\x99:­¹ßFþÉ¬×5sÍ«¥ã¹\x9FO[M\x80VOÎs·§ÍfQÔ[p'z>ÖèbÔ_+6\x8FúJÛò\\Ý¦n\x8B¾\fÔ­:¬{³¸\x16g6\x99ûãa¹õ8i²¼¬m\x96¶öDéËÊ\x8F,ótÚF±9U\x9C\x11Ë}ËöWð£tNÌ\x1BGhµØ¥?~\x9C#õ\x890¯Ü\x0ECw3;Øá4#Î°¾ì\x1C|Û\x18ùIm6e\x15>ò7jÿyé\x9EÒÜÓùá\x89®ìl°W\rÒM°î¦å\x1Aiw\x17Ä\x9FºÊ¬]Ý3#ï\x06ÓÖvj[\x9D\x0E\x8E&«£Âúií8:\x9C\x9Dm4ÈóýsIéY}T.\x8Fø¹2P\x96^­×\\£îV¯V¦çR/ª\x9BûñÐxJÌ#Pè'PK\x01\x02\x14\x00\n" +
  "\x00\x00\x00\b\x00ì\x838SáÒ,Wù\x03\x00\x00Z\x07\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00certificate.jsonPK\x05\x06\x00\x00\x00\x00\x01\x00\x01\x00>\x00\x00\x00'\x04\x00\x00\x00\x00"

describe('DIVOC QRs', function () {
  it('should Verify w/ Production Key', async () => {
    const result = await verifyQRCode(PRODUCTION_PHILIPPINES)
    expect(result).to.eql(PRODUCTION_PAYLOAD)
  })
})
