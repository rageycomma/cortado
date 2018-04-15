
class CortadoInvalidPathError extends Error {
    constructor() {
        super();
        this.message = 'The path provided is invalid - a path is required.';
        this.name = 'Invalid Path Error';
    }
}

export default {
    CortadoInvalidPathError,
};
