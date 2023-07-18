# National Portal Frontend Service

## Prerequisites for development

- Node v14.x

We recommend installing [Node Version Manager](https://github.com/nvm-sh/nvm) to easily be able to manage multiple Node installs on a single system.

#### Windows

1. Install bash: https://gitforwindows.org/
2. Setup npm to use bash binary:\
   `npm config set script-shell "PATH TO YOUR BASH BINARY"`\
   for example:\
   `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`

### Mac OS / Linux

Should work out of the box.

## Local development server

Run `npm start` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

You can also run `npm run serve:{environment}` to quickly try the applicaion with the different environments.

## Build

Run `npm run build` to build the project with the local configuration. The build artifacts will be stored in the `dist/` directory. Use `npm run build:production` for a production build.

- Build Portal component: `npm run build:{environment}`
- Build Settings component: `npm run build:nova`

**Testing the build**

Start a web-server inside /dist/{thing-you-want-to-test}, for example:

- `npx http-server ./dist/portal-component -p 8080`
- `npx http-server ./dist/settings-component -p 8080`

## Testing

- Run lint: `npm run lint`
- Run unit tests: `npm run test`
- Run e2e tests: `npm run e2e`

**Local e2e testing**

Edit `cypress.config.ts` to change environment, by default it runs in `test` env.
Just change the following

```diff
- import { environment } from './src/environments/environment.test';
+ import { environment } from './src/environments/environment.local';
```

**Run a single e2e test**
Before running you have to make sure you are running the application locally.

Run a spesific test file: `./node_modules/.bin/cypress run --browser firefox --spec 'cypress/e2e/*/NAME_OF_FILE.cy.ts'` (supports glob patterns)

**Debug e2e tests**

`npm run cy:open`

## Simultaneously Working on Application and Dependency

See guide here: https://components.design.adstate.com/?path=/story/about-getting-started--page#how-to-use-components-in-an-app-while-still-in-development

## How to deploy with changes from component library

See guide here: https://adstate.atlassian.net/wiki/spaces/IP/pages/2647851024/How+to+deploy+with+changes+from+component+library

## Handy commands

### Update component library to latest version

`npm i @adstate_as/flora@develop -D`

### Test other environments

You can run `npm run serve:{ENVIRONMENT}`, where ENVIRONMENT is the environment you want to test.
For example: `npm run serve:production`

### Setup docker image

Assuming you are using VSCode with [Docker extention](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) installed.

1. `npm run build`
2. Open `Dockerfile`
3. Right click inside the file, click "Build image".
4. Open the Docker tab, right click the image you just built, and select "Run".

Now you should have the project runnin on http://localhost:8080/

## Update favicons

Download SVG from design.adstate.com and upload to https://realfavicongenerator.net/.
Put the generated content in /src/root-assets
