import config from './../config';
import logSymbols from 'log-symbols';

const start = (app) => {
  /*
   * Start the server
   */
  listen(app);
}

/*
 * Start the server
 */
const listen = (app) => {
    try {
        checkConfiguration();
        app.listen(config.port, (err) => {
            if (err) { console.error(err) };
            console.log(logSymbols.success, 'Application started on port', config.port);
            console.log('-----------------', config.api_version, '-----------------\n');
        });
    } catch (errors) {
        console.log('\n', '-----------------', 'Configuration errors', '-----------------');
        errors.forEach((err) => {
            console.error(logSymbols.error, err);
        });
    }
}

/*
 * Perform startup checks
 */
const checkConfiguration = () => {
    let errors = [];
    config.port|| errors.push('config.port');
    if (errors.length) {
        throw(errors);
    }
}

export { start }
