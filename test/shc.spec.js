const {verifyQRCode} = require('../lib/index');
const expect = require('chai').expect; 

const EXAMPLE1_PACKED = "shc:/56762909524320603460292437404460312229595326546034602925407728043360287028647167452228092861333145643765314159064022030645045908564355034142454136403706366541713724123638030437562204673740753232392543344332605736010645292953127074242843503861221276716852752941725536670334373625647345380024213944077025250726312423573657001132105220316267750968640761356508111008270666243020277044446712214341455936637024282703544034660963252707282555072932056232255262395660612010735336331255715610420057716412306973057066214536651135113958591233120032575026733958333075072812533734264534700060266054734545664338772667663471584128617435526828390065275357404052057121004150076600323056277610287226003175060305765803534256207472564464060539095425076777272921345209305565332021506258456045760350722804223710051277402927664527742911662372066523664321240336446744622769760467573259652733383263657311072452563376417025746807407539006144613252696869456340066810522645386256555532111000531265754227302628303438085756243800662563286838775672222439672172403542396107375860647335106645704512536703506321757004413636764365347431287321355256580631556063583463563610567737660541737377552828605563116564297412076854033003344323337052606873573426066033102439280977115921594064314334576408722871427337224310757744412937522268303871367257627564750472597763507745283571571263580550066921715611703323062474012471272931363924743604256803437445104259400424433362673769543855403976310365501153573745056364696326060377575776050561075823064353055604551028500311453022452525062305534574";
      
const EXAMPLE1_OBJECT = {
  "iss": "https://spec.smarthealth.cards/examples/issuer",
  "nbf": 1622576398.924,
  "vc": {
    "type": [
      "https://smarthealth.cards#health-card",
      "https://smarthealth.cards#immunization",
      "https://smarthealth.cards#covid19"
    ],
    "credentialSubject": {
      "fhirVersion": "4.0.1",
      "fhirBundle": {
        "resourceType": "Bundle",
        "type": "collection",
        "entry": [
          {
            "fullUrl": "resource:0",
            "resource": {
              "resourceType": "Patient",
              "name": [
                {
                  "family": "Anyperson",
                  "given": [
                    "John",
                    "B."
                  ]
                }
              ],
              "birthDate": "1951-01-20"
            }
          },
          {
            "fullUrl": "resource:1",
            "resource": {
              "resourceType": "Immunization",
              "status": "completed",
              "vaccineCode": {
                "coding": [
                  {
                    "system": "http://hl7.org/fhir/sid/cvx",
                    "code": "207"
                  }
                ]
              },
              "patient": {
                "reference": "resource:0"
              },
              "occurrenceDateTime": "2021-01-01",
              "performer": [
                {
                  "actor": {
                    "display": "ABC General Hospital"
                  }
                }
              ],
              "lotNumber": "0000001"
            }
          },
          {
            "fullUrl": "resource:2",
            "resource": {
              "resourceType": "Immunization",
              "status": "completed",
              "vaccineCode": {
                "coding": [
                  {
                    "system": "http://hl7.org/fhir/sid/cvx",
                    "code": "207"
                  }
                ]
              },
              "patient": {
                "reference": "resource:0"
              },
              "occurrenceDateTime": "2021-01-29",
              "performer": [
                {
                  "actor": {
                    "display": "ABC General Hospital"
                  }
                }
              ],
              "lotNumber": "0000007"
            }
          }
        ]
      }
    }
  }
}

const EXAMPLE2_PACKED = "shc:/56762909524320603460292437404460312229595326546034602925407728043360287028647167452228092862412238031276337729374040376141242941554145093643676945622940370541063225672132394527554155035639440353633271540654605736010645292953127074242843503861221276716952346945726136710334373625647245380024213944077025250726312423573657001132105221716234384040064261003453615607001120754022552323243428527268703028705875260023605803272466675721126835214264252561682460550324322155695627696364051055733108567304686377413936263959340734076525240927101144391024733966712569745804333209454076760967562876716365595529336864504270220420567277373760430371103910603930766757055850200609742974340667370405372235500407630505716261545758626755076556062356523207757427677122535276366255072800406254592909001256620021007368712954311207213576410771201155765832656023223024031156265529070332000709206471337761450527457509522410407421550769227375563742540409053877684571274232325025660509520812041100695760242441322854576322075028257736293045432561567077365367560540320527660759666164502710684536410042775911685369443068685062552470206438565969415474530054227565322505540756354169051265562329272938296700063434760432605524647435432728726805617173092305762576266111077770413760047627415653380700662440731232412725034441595252606824397107675562556174305557105229757170501170260550413133106160614564000674013252122752717170126956565610232010386111695754286227110409572804316225384361067004523909715526642360735623240576336860104527273032416025286552705006102760096432693642072120"

const EXAMPLE2_OBJECT = {
  "iss": "https://spec.smarthealth.cards/examples/issuer",
  "nbf": 1622576398.801,
  "vc": {
    "type": [
      "https://smarthealth.cards#health-card",
      "https://smarthealth.cards#immunization",
      "https://smarthealth.cards#covid19"
    ],
    "credentialSubject": {
      "fhirVersion": "4.0.1",
      "fhirBundle": {
        "resourceType": "Bundle",
        "type": "collection",
        "entry": [
          {
            "fullUrl": "resource:0",
            "resource": {
              "resourceType": "Patient",
              "name": [
                {
                  "family": "Anyperson",
                  "given": [
                    "Jane",
                    "C."
                  ]
                }
              ],
              "birthDate": "1961-01-20"
            }
          },
          {
            "fullUrl": "resource:1",
            "resource": {
              "resourceType": "Immunization",
              "status": "completed",
              "vaccineCode": {
                "coding": [
                  {
                    "system": "http://hl7.org/fhir/sid/cvx",
                    "code": "208"
                  }
                ]
              },
              "patient": {
                "reference": "resource:0"
              },
              "occurrenceDateTime": "2021-01-01",
              "performer": [
                {
                  "actor": {
                    "display": "ABC General Hospital"
                  }
                }
              ],
              "lotNumber": "0000002"
            }
          },
          {
            "fullUrl": "resource:2",
            "resource": {
              "resourceType": "Immunization",
              "status": "completed",
              "vaccineCode": {
                "coding": [
                  {
                    "system": "http://hl7.org/fhir/sid/cvx",
                    "code": "208"
                  }
                ]
              },
              "patient": {
                "reference": "resource:0"
              },
              "occurrenceDateTime": "2021-01-29",
              "performer": [
                {
                  "actor": {
                    "display": "ABC General Hospital"
                  }
                }
              ],
              "lotNumber": "0000008"
            }
          }
        ]
      }
    }
  }
}

describe('SmartHealth Cards QRs', function() {
  it('should Verify Example 1', async () => {
    const jwtPayload = await verifyQRCode(EXAMPLE1_PACKED);
    expect(jwtPayload).to.eql(EXAMPLE1_OBJECT);
  });


  it('should Verify Example 2', async () => {
    const jwtPayload = await verifyQRCode(EXAMPLE2_PACKED);
    expect(jwtPayload).to.eql(EXAMPLE2_OBJECT);
  });
});

