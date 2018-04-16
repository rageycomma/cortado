import { CortadoPath } from '../cortado';

describe('CortadoPath should work correctly without parameters', () => {
  const intPath = 'cuauhtémoc';
  const intPathDecode = 'xn--cuauhtmoc-g4a';

  it('Should match multi-lingual paths correctly', (done) => {
    const languagePaths = [
      ['mícheálócoileáin', 'xn--mchelcoilein-fbbg3o0d'],
      ['يوجينفيكتوردبس', 'xn--ngbdfnjo7gqazsfrcc'],
      ['엘리자베스걸리플린', 'xn--369aj4wbaq178a9vl6xfvzd105b'],
      ['уи́льямда́длихе́йвуд', 'xn--lsaaa42jmaiccgyfosek2io5a9jqc'],
      ['جوهیل', 'xn--rgb2cid57d'],
    ];

    languagePaths.forEach((path) => {
      const languagePortion = path[0];
      const punyPortion = path[1];

      const punyPathEx = new CortadoPath({ path: languagePortion });
      expect(punyPathEx.Options.path).toEqual(punyPortion);
    });

    done();
  });

  it('Should match a path normally without any parameters', () => {
    const normalPath = new CortadoPath({
      path: '/normal/path',
    });
    const match = normalPath.match('/normal/path');
    expect(match).toBeTruthy();
  });
  it('Should match the punycode representation', () => {
    const encodedPath = new CortadoPath({
      path: intPathDecode,
    });
    const match = encodedPath.match(intPathDecode);
    expect(match).toBeTruthy();
  });
  it('Should match incoming non-English paths', () => {
    const punyPath = new CortadoPath({
      path: intPathDecode,
    });
    const match = punyPath.match(intPath);
    expect(match).toBeTruthy();
  });
  it('Should default the path to punycode if set in another language', () => {
    const punyPathEnc = new CortadoPath({
      path: intPath,
    });
    expect(punyPathEnc.Options.path).toEqual(intPathDecode);
  });
});

describe('Cortado should work correctly with parameters', () => {

});
