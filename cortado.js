import * as punycode from 'punycode';
import { CortadoInvalidPathError } from './cortado.errors';

/**
 * The options set on the cordado object.
 *
 * @class CortadoOptions
 */
export class CortadoOptions {
  /**
   * Get the regex for ASCII.
   *
   * @readonly
   * @static
   * @memberof CortadoOptions
   */
  static get nonAsciiRegex() {
    return new RegExp('[^\u0000-\u007F]'); // eslint-disable-line no-control-regex
  }

  /**
     * The path delimeter.
     *
     * @memberof CortadoOptions
     */
  set pathDelimeter(delimeter) {
    this.PathDelimeter = delimeter || '/';
  }

  /**
     * The path delimeter.
     *
     * @memberof CortadoOptions
     */
  get pathDelimeter() {
    return this.PathDelimeter;
  }

  /**
     * Sets the parameter prefix.
     *
     * @memberof CortadoOptions
     */
  set parameterPrefix(prefix) {
    this.ParameterPrefix = prefix;
  }

  /**
     * Get the parameter prefix.
     *
     * @readonly
     * @memberof CortadoOptions
     */
  get parameterPrefix() {
    return this.ParameterPrefix || ':';
  }

  /**
     * Get the parameter suffix.
     *
     * @memberof CortadoOptions
     */
  get parameterSuffix() {
    return this.ParameterSuffix || null;
  }

  /**
   * Setter for if there is a parameter suffix.
   *
   * @memberof CortadoOptions
   */
  set hasParameterSuffix(hasSuffix) {
    this.HasParameterSuffix = hasSuffix;
  }

  /**
   * Getter for the parameter suffix.
   *
   * @readonly
   * @memberof CortadoOptions
   */
  get hasParameterSuffix() {
    return this.HasParameterSuffix || false;
  }

  /**
     * Set the parameter suffix.
     *
     * @memberof CortadoOptions
     */
  set parameterSuffix(suffix) {
    this.ParameterSuffix = suffix;
    this.hasParameterSuffix = suffix === null;
  }

  /**
     * The format of the path (i.e. number, etc.)
     *
     * @memberof CortadoOptions
     */
  set pathFormats(formats) {
    this.PathFormats = formats || {};
  }

  /**
     * Getter for the path format.
     *
     * @memberof CortadoOptions
     */
  get pathFormats() {
    return this.PathFormats;
  }

  /**
   * Getter for path.
   *
   * @memberof CortadoOptions
   */
  get path() {
    return this.Path;
  }

  /**
   * Setter for path.
   *
   * @memberof CortadoOptions
   */
  set path(path) {
    if (CortadoOptions.nonAsciiRegex.test(path)) {
      this.Path = punycode.toASCII(path);
    } else {
      this.Path = path;
    }
  }

  /**
     * Creates an instance of CortadoOptions.
     * @param {any} options The options to provide.
     * @memberof CortadoOptions
     */
  constructor(options) {
    Object.assign(this, options);
  }
}

/**
 * A path being created.
 *
 * @class CortadoPath
 */
export class CortadoPath {
  /**
   * Getter for default path parameter.
   *
   * @readonly
   * @memberof CortadoPath
   */
  static get defaultPathParam() {
    return {
      type: 'string',
      value: '([\w]+)', // eslint-disable-line no-useless-escape
    };
  }

  /**
   * Get the regex for european (sane) date formats.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get dateRegexSane() {
    return '[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}';
  }

  /**
   * Get the regex for american (nuts) date formats.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get dateRegexCrazy() {
    return '(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])-(?:[0-9]{2})?[0-9]{2}';
  }

  /**
   * Get number regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get numberRegex() {
    return '[0-9]';
  }

  /**
   * Get the string regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get stringRegex() {
    return '[A-za-z0-9-_]';
  }

  /**
   * Lat long regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get latLongRegex() {
    return '[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)'; // eslint-disable-line no-useless-escape
  }


  /**
   * UUID v1 regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get uuidV1Regex() {
    return '[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
  }

  /**
   * Uuid v2 regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get uuidV2Regex() {
    return '[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
  }

  /**
   * UUID v3 regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get uuidV3Regex() {
    return '[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
  }

  /**
   * UUID v4 regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get uuidV4Regex() {
    return '[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
  }

  /**
   * UUID v5 regex.
   *
   * @readonly
   * @static
   * @memberof CortadoPath
   */
  static get uuidV5Regex() {
    return '[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
  }

  /**
   * Sets the options.
   *
   * @param {any} options
   * @memberof CortadoPath
   */
  setOptions(options) {
    this.Options = options instanceof CortadoOptions ?
      options : new CortadoOptions(options);
  }

  /**
     * Checks if the path has a parameter.
     *
     * @param {any} path
     * @memberof CortadoPath
     */
  hasPathParameter(path) {
    return this.Options.HasParameterSuffix ?
      path.indexOf(this.Options.parameterPrefix) !== -1 &&
      path.indexOf(this.Options.parameterSuffix) :
      path.indexOf(this.Options.parameterPrefix) !== -1;
  }


  /**
   * Gets the path parameters.
   *
   * @param {string} path The path parameters.
   * @memberof CortadoPath
   */
  getPathParameters(path) {
    const pattern = new RegExp(
      `${this.Options.parameterPrefix}([a-zA-Z0-9_\-~.]+)${this.Options.parameterSuffix || ''}`, // eslint-disable-line no-useless-escape
      'ig',
    );

    // Match will get re-assigned anyway, result
    let match = '';
    const result = [];

    while (match = pattern.exec(path)) { // eslint-disable-line no-cond-assign
      result.push(match[1]);
    }

    return result;
  }

  /**
   * Construct the path format.
   *
   * @param {Object} pathFormats
   * @memberof CortadoPath
   */
  static constructPathFormats(pathFormats) {
    // Get the paths
    const formats = Object.keys(pathFormats);

    // Return.
    const objectFormat = {};

    // Validate each format.
    formats.forEach((format) => {
      const {
        type, min, max, value, minlength, maxlength, dateFormat, version,
      } = pathFormats[format];

      // The current format.
      const thisFormat = Object.assign({}, pathFormats[format]);

      if (type === 'number') {
        if (value === null || value === undefined) {
          thisFormat.value = `${CortadoPath.numberRegex}+`;
        }
        if ((min === null && max !== null) || (min === undefined && max !== undefined)) {
          delete thisFormat.min;
        }
        if (min > max || max < min) {
          delete thisFormat.min;
          delete thisFormat.max;
        }
        if (min !== null && max !== null && min !== undefined && max !== undefined) {
          thisFormat.value = `${this.numberRegex}{${min},${max}}`;
        }
        objectFormat[format] = thisFormat;
        return;
      }

      if (type === 'string') {
        if (value === null || value === undefined) {
          thisFormat.value = `${this.stringRegex}+`;
        }
        if (minlength !== null) {
          if (maxlength !== null && maxlength < minlength) {
            delete thisFormat[format].minlength;
            delete thisFormat[format].maxlength;
          }
          if (minlength <= 0) {
            delete thisFormat[format].minlength;
          }
        }
        if (maxlength !== null) {
          if (minlength !== null && minlength > maxlength) {
            delete thisFormat[format].minlength;
            delete thisFormat[format].maxlength;
          }
        }
        if (minlength !== null && maxlength !== null
          && minlength !== undefined && maxlength !== undefined) {
          thisFormat.value = `${CortadoPath.stringRegex}{${minlength},${maxlength}}`;
        }
        objectFormat[format] = thisFormat;
        return;
      }

      if (type === 'boolean') {
        if (value === null || value === undefined) {
          thisFormat.value = '(true|false)';
        }
        objectFormat[format] = thisFormat;
        return;
      }

      if (type === 'date') {
        if (['sane', 'crazy'].indexOf(dateFormat) !== -1) {
          thisFormat.dateFormat = 'crazy'; // These
        }
        if (value === null || value === undefined) {
          thisFormat.value = thisFormat.dateFormat === 'crazy' ?
            this.dateRegexCrazy : this.dateRegexSane;
        }
        objectFormat[format] = thisFormat;
        return;
      }

      if (type === 'latlng') {
        if (value === null || value === undefined) {
          thisFormat.value = CortadoPath.latLongRegex;
        }
        objectFormat[format] = thisFormat;
        return;
      }

      if (type === 'uuid') {
        if (value === null || value === undefined) {
          thisFormat.value = CortadoPath.uuidV3Regex;

          if (version === 'v1') {
            thisFormat.value = CortadoPath.uuidV1Regex;
          }
          if (version === 'v2') {
            thisFormat.value = CortadoPath.uuidV2Regex;
          }
          if (version === 'v3') {
            thisFormat.value = CortadoPath.uuidV3Regex;
          }
          if (version === 'v4') {
            thisFormat.value = CortadoPath.uuidV4Regex;
          }
          if (version === 'v5') {
            thisFormat.value = CortadoPath.uuidV5Regex;
          }
        }
        objectFormat[format] = thisFormat;
        return;
      }

      objectFormat[format] = this.defaultPathParam;
    });

    return objectFormat;
  }

  /**
   * Creates the regular expression for the path.
   *
   * @memberof CortadoPath
   */
  createPathRegex() {
    let regexText = punycode.toASCII(this.IncomingPath);

    // Get the keys.
    Object.keys(this.PathFormats).forEach((format) => {
      let formatCompound = this.Options.parameterPrefix + format;
      formatCompound += this.Options.hasParameterSuffix ? this.Options.parameterSuffix : '';
      regexText = regexText.replace(formatCompound, this.PathFormats[format].value);
    });

    this.pathRegex = new RegExp(`${regexText}[/]?`);
  }

  /**
   * Creates the path formats in the right way.
   *
   * @memberof CortadoPath
   */
  createPath() {
    // The actual parameters defined in the path.
    const parameters = this.getPathParameters(this.IncomingPath);

    // The parameters passed to the options instance.
    const params = this.Options.pathFormats;

    // Create the formats.
    const formats = {};

    if (this.hasPathParameter(this.IncomingPath)) {
      // Ensure all the path formats are generated out.
      const allParams = CortadoPath.constructPathFormats(params);

      // Get all the params we need.
      parameters.forEach((param) => {
        if (allParams[param] !== undefined && allParams[param] !== null) {
          formats[param] = allParams[param];
        }
      });
    } else {
      parameters.forEach((param) => {
        formats[param] = CortadoPath.defaultPathParam;
      });
    }

    // Set the formats.
    this.PathFormats = formats;
    this.createPathRegex();
  }

  /**
   * Match the path.
   *
   * @param {string} path Match the path.
   * @returns
   * @memberof CortadoPath
   */
  match(path) {
    const encoded = punycode.toASCII(path);
    return this.pathRegex.test(encoded);
  }

  /**
   * Creates an instance of CortadoPath.
   * @param {any} path The path to create.
   * @param {any} [options={}]
   * @memberof CortadoPath
   */
  constructor(options = {}) {
    if (options.path === undefined || options.path === null) {
      throw new CortadoInvalidPathError();
    }

    this.IncomingPath = options.path;
    this.setOptions(options);
    this.createPath(options.path);
  }
}
