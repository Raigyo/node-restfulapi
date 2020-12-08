# Node package manager (NPM)

## Init

`npm init`: create package.json

## Run

**package.json**
````json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },
````
`npm run start`: launch `nodemon app.js`

## Packages installation, update...

### Install

`npm install <package-name>` or `npm i <package-name>`: install the packages (dependencies)

`npm i --save-dev <package-name>`: install a packages used in development only (devDependencies) and won't be used in production

*Deprecated*: `npm install <package-name> --save` (now packages are automatically added in *package.json*)

`npm install`: used alone, reinstall all the packages listed in *package.json*.

`npm install <package-name>@6.1.4`: will install a specific version, here *6.1.4* and refresh *package.json*

### Versions numbers in package.json

````json
  "dependencies": {
    "babel-register": "^6.26.0"
  },
  "devDependencies": {
    "ms": "^2.1.2"
  },
````

`^6.26.0`: last 6.x.x (minor revision) will be downloaded during `npm install`

`~6.26.0`: last 6.26.x (bugfix) will be downloaded during `npm install`

`6.26.0`: same version will be downloaded during `npm install`

### List

`npm list`: will list dependancioes and dependancies threes

`npm list --depth=1` we can specify the depth level for dependancies. Zero will just list packages.

### View

`npm view <package-name>`: list informations about package

`npm view <package-name> dependancies`: list all dependancies

`npm view <package-name> versions`: list all versions

`npm view <package-name> maintainers`: list all maintainers of the package

### Update packages

`npm outdated`: list all outdated packages (if nothing is displayed, everything is up-to-tade)

`npm update`: update all packages

### Uninstall

`npm uninstall <package-name>` or `npm un <package-name>`: uninstall package

## Global install

`npm install -g <package-name>`: installed on the os and not in the development folder