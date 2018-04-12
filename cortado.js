
/**
 * The options set on the cordado object.
 *
 * @class CortadoOptions
 */
export class CortadoOptions {
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
     * Sets the options.
     *
     * @param {any} options
     * @memberof CortadoPath
     */
  setOptions(options) {
    this.Options = new CortadoOptions(options);
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
      `${this.Options.parameterPrefix}([a-zA-Z0-9_\-~.]+)${this.Options.parameterSuffix || ''}`,
      'ig',
    );

    // Match will get re-assigned anyway, result
    let match = '';
    const result = [];

    while (match = pattern.exec(path)) {
      result.push(match[1]);
    }

    return result;
  }

  /**
   * Gets the format parameters.
   *
   * @memberof CortadoPath
   */
  getFormatParameters(formats) {
    return Object.keys(formats);
  }


  /**
   * Construct the path format.
   *
   * @param {Object} pathFormats
   * @memberof CortadoPath
   */
  constructPathFormats(pathFormats) {
    // Get the paths
    const formats = Object.keys(pathFormats);

    // Validate each format.
    const redoneFormats = formats.map((format) => {
      const type = format.type;

      // The current format.
      const thisFormat = Object.assign({}, format);

      if (type === 'number') {
        if (min === null && max !== null) {
          thisFormat.min = 0;
        }
        if (min > max || max < min) {
          delete thisFormat.min;
          delete thisFormat.max;
        }
        return thisFormat;
      }

      if (type === 'string') {
        if (thisFormat.value === null) {
          thisFormat.value = /([w+])/;
        }
        if (thisFormat.minlength !== null) {
          if (thisFormat.maxlength !== null && thisFormat.maxlength < thisFormat.minlength) {
            delete thisFormat.minlength;
            delete thisFormat.maxlength;
          }
          if (thisFormat.minlength <= 0) {
            delete thisFormat.minlength;
          }
        }
        if (thisFormat.maxlength !== null) {
          if (thisFormat.minlength !== null && thisFormat.minlength > maxLength) {
            delete thisFormat.minlength;
            delete thisFormat.maxlength;
          }
        }
        return thisFormat;
      }

      if (type === 'boolean' || type === 'date') {
        return thisFormat;
      }

      return {
        type: 'string',
        value: '[\w]+',
      };
    });
  }

  /**
   * Generate path with parameters.
   *
   * @param {object} params The parameters.
   * @param {object} paramFormats The formats for the parameters.
   * @memberof CortadoPath
   */
  generatePathWithParams(params, pathFormats, paramFormatTypes) {
    // Construct the path.
    const constructedPathFormats = this.constructPathFormats(pathFormats);

  }

  /**
     * Generate the path parameters (i.e. regex match)
     *
     * @param {any} path The path to generate the parameters for.
     * @memberof CortadoPath
     */
  generatePathParameters(path, pathFormats) {
    // Gets the params for the path parameters.
    const params = this.getPathParameters(path);

    // Get the parameter formats.
    const paramFormatTypes = this.getFormatParameters(pathFormats);

    // Generate the parameters.
    return this.generatePathWithParams(params, pathFormats, paramFormatTypes);
  }

  /**
     * Generates the path regex based on the path provided.
     *
     * @memberof CortadoPath
     */
  createPath(path) {
    // Generate the outpath.
    let outPath = '';

    // If it has the path parameter then parse the path parameter.
    if (this.hasPathParameter(path)) {
      outPath = this.generatePathParameters(path, this.Options.pathFormats);
    }
  }

  /**
     * Creates an instance of CortadoPath.
     * @param {any} [options={}]
     * @memberof CortadoPath
     */
  constructor(path, options = {}) {
    this.setOptions(options);
    this.createPath(path);
  }
}
