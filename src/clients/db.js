import config from './../config';
import pgp from 'pg-promise';
import { appPath } from './../utils/storage';

/*
 * Initialisation options
 */
const options = {};

export const defaultDb = pgp(options)(config.database.default.connection_string);

/*
 * Load SQL file queries
 */
export const loadQueryFile = (file) => {
    return new pgp.QueryFile(appPath('src/query/' + file), { minify: true });
};
