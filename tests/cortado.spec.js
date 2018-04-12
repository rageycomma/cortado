import { CortadoPath, CortadoOptions } from '../cortado';

describe('CortadoPath should work correctly', () => {
  it('Should correctly create a path and a regular expression for that path', () => {
    const options = new CortadoOptions({
      pathFormats: {
        param1: {
          type: 'number',
          min: 1,
          max: 100,
        },
        param2: {
          type: 'string',
        },
        param3: {
          type: 'string',
          value: /[A-Za-z0-9]/,
        },
        param4: {
          type: 'boolean',
        },
      },
    }); 
    const x = new CortadoPath('/test/:param1/:param2/', options);
  });
});
