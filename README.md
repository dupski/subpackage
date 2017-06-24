# Subpackage - Utility for managing NodeJS projects with sub-packages

## Overview

Designed for use with NodeJS projects made up of multiple sub-projects.

Allows you run scripts defined in `package.json` across multiple sub-projects
(e.g. run `npm install` and `npm run build` across multiple projects)

Supports `npm` or `yarn` (thanks to @mateuszluczak). Yarn is detected via
the presence of a yarn.lock file.

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

## Running a command across all sub-packages

To use `subpkg`, add it to the start of `scripts` entries in your parent project's
`package.json` file:

```json
  "scripts": {
    "postinstall": "subpkg install",
    "build": "subpkg run build"
  }
```

With the configuration above in your parent project, you can type `npm run build`
(or `yarn run build`) to build all sub-packages.

## Related Projects

 * [run-bin](https://github.com/dupski/run-bin)
 * [cross-env](https://github.com/kentcdodds/cross-env)

## License

MIT