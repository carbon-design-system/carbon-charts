# Neutrino Seed

Kick start your application development with Neutrino.

## First time user?
[Yes.](#firsttimeuser) [No.](#experienceduser) 

## Prerequisites

* [npm](https://www.npmjs.com/) (`brew install npm`)
* [git](https://git-scm.com/) (`brew install git`)
* [angular-cli](https://cli.angular.io/) (`sudo npm install -g @angular/cli`)


### Get access to IBM Artifactory NPM Peretz registry

If you used to use Peretz libraries from Whitewater NPM, you'll need to clean those settings from your `~/.npmrc`.
You can easily do that by removing that file (`rm -f ~/.npmrc`) or backing it up (`mv ~/.npmrc ~/.npmrc.backup`),
although if you have other things dependant on it, it may break things, so you'll want to do it manually by
removing all the lines containing `npm-registry.whitewater.ibm.com` from it.

```bash
nano ~/.npmrc
```

<a id="firsttimeuser"></a>

#### Really get access to IBM artifactory NPM Peretz registry

Run the following to add the needed information
to your `~/.npmrc`. Replace `your.email@ibm.com` with your actual IBM email address and use your w3id password to
authenticate when asked.

```bash
curl -uyour.email@ibm.com https://na.artifactory.swg-devops.com/artifactory/api/npm/wce-peretz-npm-local/auth/peretz >> ~/.npmrc
```

After you've set up your NPM, proceed to download and install.

### Have you used Github (GHE) before?

If you haven't already, [add an SSH key to your GHE account](https://github.ibm.com/settings/keys).

<a id="experienceduser"></a>

## Download and install

Run the following in the terminal:

```bash
# to download
git clone git@github.ibm.com:peretz/neutrino-seed.git

# to install
cd neutrino-seed
npm install
```

On Whitewater and got an error during `npm install`? See [this](#npminstallerror).

## Development server
Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## How to use components

Look at the [component library](http://billboard1.fyre.ibm.com/component-library) and [developer documentation](https://pages.github.ibm.com/peretz/neutrino/documentation/).

## Create new angular components

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## PWA ready

Neutrino seed was built with offline and progressive web app in mind.

It provides [`manifest.json`](src/manifest.json) and service worker ([`sw.js`](src/sw.js)), along with [IBM bee icons](src/assets/icons) you can replace with your own to start you with.

For daily development purposes, this may get in the way of your workflow, so if you're not actively working on customizing your service worker, we suggest disabling cache/offline data/service worker in your browser. Just remember to re-enable it when you're doing tests on it.

### Lighthouse results

when ran with `ng serve --prod`

![PWA results](./images/PWA%20results.png)

Things you can/should do when deploying your app to make these scores even higher that we can't really do for you:

- make service worker custom if what we're providing doesn't fully fit your use case
- redirect HTTP traffic to HTTPS
- enable text compression on your server (gzip, deflate or brotli)
- inline css for above the fold content
- make a custom icons sprite of only the icons you use and use it instead of our "convenience sprites"
- use HTTP/2

### Contact

[Send feedback](https://peretz.slack.com/messages/C6DS43Y5N)

[Ask a question](https://peretz.slack.com/messages/C6DS43Y5N)
