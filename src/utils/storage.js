import path from 'path';

let defaultStorageLocation = './var/';

export const appPath = (dir) => {
    return path.resolve(dir);
};

export const storagePath = (filename = null) => {
    return path.format({
        dir: appPath(defaultStorageLocation),
        base: filename
    });
};
