import { CortadoPath, CortadoOptions } from '../cortado';

describe('CortadoPath should work correctly', () => {
  it('Should correctly create a path and a regular expression for that path', () => {
    const options = new CortadoOptions({
      path: '/test/:param1/:param2/:param3/:param4',
      pathFormats: {
        param1: {
          type: 'number',
          min: 1,
          max: 100,
        },
        param2: {
          type: 'latlng',
        },
        param3: {
          type: 'uuid',
        },
        param4: {
          type: 'string',
          minlength: 1,
          maxlength: 20,
        },
      },
    });
    const x = new CortadoPath(options);
    const y = new CortadoPath({
      path: '/test/:type/:latlng',
      pathFormats: {
        type: {
          type: 'string',
          minlength: 5,
          maxlength: 10,
        },
        latlng: {
          type: 'number',
          min: 1,
          max: 2,
        }
      }
    });

    var zzx = 'y';
  });
});
