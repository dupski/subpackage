# Subpackage - Utilities for managing NodeJS projects with sub-packages

## Overview

Designed for use with NodeJS projects made up of multiple sub-projects.

Allows you run npm scripts in multiple sub-projects (e.g. run `npm install`
and `npm run build` across multiple projects)

## Set up

```bash
npm install --save-dev subpackage
```

To use `subpackage` commands, you will first need to add a `subPackages` entry
to your parent project's `package.json` file:

```json
{
    "name": "my-awesome-project",
    "version": "2.5.1",
    "subPackages": [
        "packages/sub-package-1",
        "packages/sub-package-2"
    ]
}
```

## Run an npm command across all sub-packages - subpkg

To use `subpkg-run`, add it to the `scripts` entry in your parent project's
`package.json`:

```json
  "scripts": {
    "postinstall": "subpkg install",
    "build": "subpkg run build"
  }
```

The above will run `npm install` or `npm run build` for each of the packages defined in the
`subPackages` entry

## Related Projects

 * [run-bin](https://github.com/dupski/run-bin)
 * [cross-env](https://github.com/kentcdodds/cross-env)

## License

MIT