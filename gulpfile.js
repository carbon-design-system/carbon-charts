const gulp = require("gulp");
const sass = require("node-sass");
const gulpsass = require("gulp-sass");
const concat = require("gulp-concat");
const tap = require("gulp-tap");
const path = require("path");
const htmlmin = require("html-minifier").minify;
const fs = require("fs");
const ts = require("gulp-typescript");

const SRC = "src";

const TS_SRC = [
	"src/**/*.ts",
	"!src/**/*.spec.ts"
];

const SASS_SRC = [
	"src/core/**/*.scss"
];

const FONT_SRC = [
	"src/core/fonts/**/*"
];

const DIST = "dist";
const SASS_DIST = `${DIST}/core`;

const LICENSE = `
/**
 *
 * Licensed Materials - Property of IBM
 * @FILE_NAME@
 * © Copyright IBM Corporation 2014, @THIS_YEAR@
 * U.S. Government Users Restricted Rights: Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */
`;

const TSCONFG = require("./tsconfig.json").compilerOptions;


gulp.task("build", ["build:angular", "build:sass", "build:css", "build:font", "build:i18n", "build:package"]);

gulp.task("build:angular", _ =>
	gulp.src(TS_SRC)
		.pipe(replaceTemplates())
		.pipe(gulp.dest(DIST + "/src")));

gulp.task("build:sass", _ =>
	gulp.src(SASS_SRC)
		.pipe(gulp.dest(SASS_DIST)));

gulp.task("build:css", _ =>
	gulp.src("src/core/common.scss")
		.pipe(gulpsass())
		.pipe(concat("charts.css"))
		.pipe(gulp.dest(SASS_DIST)));

gulp.task("build:font", _ =>
	gulp.src(FONT_SRC)
		.pipe(gulp.dest(`${DIST}/core/fonts`)));

gulp.task("build:i18n", _ =>
	gulp.src(SRC + "/i18n/**/*.json")
	.pipe(gulp.dest(DIST + "/i18n")));

gulp.task("build:package", _ =>
	gulp.src("./package.json")
		.pipe(version())
		.pipe(gulp.dest(DIST)));

gulp.task("build:license", _ =>
	gulp.src([
		`${DIST}/**/*.scss`,
		`${DIST}/**/*.css`,
		`${DIST}/**/*.ts`,
		`${DIST}/**/*.js`
	]).pipe(licenseHeaders())
		.pipe(gulp.dest(DIST)));

gulp.task("demo:fonts", _ =>
	gulp.src(FONT_SRC)
		.pipe(gulp.dest(`./demo/bundle/fonts`)));


function licenseHeaders() {
  return tap(function(file) {
    if (/scss|css|ts|js/.test(path.extname(file.path))) {
      if (file.contents.toString("utf-8").indexOf("Copyright IBM Corporation") < 0) {
        var updatedTemplate = LICENSE
          .replace("@FILE_NAME@", path.basename(file.path))
          .replace("@THIS_YEAR@", new Date().getFullYear());
        file.contents = Buffer.concat([new Buffer(updatedTemplate), file.contents]);
      }
    }
  });
}

function version() {
	return tap(function(file) {
		if (path.extname(file.path) === ".json") {
			let packageJSON = JSON.parse(file.contents.toString("utf-8"));
			if (process.env.TRAVIS) {
				// assume beta release on cron
				if (process.env.TRAVIS_EVENT_TYPE === "cron") {
					const build = process.env.TRAVIS_BUILD_NUMBER; // we'll use the build number so we dont have to think about versions
					packageJSON.version = `${packageJSON.version}-beta.${build}`;
				// dev release (every push)
				} else if (process.env.TRAVIS_BRANCH === "master") {
					const commit = process.env.TRAVIS_COMMIT;
					packageJSON.version = `${packageJSON.version}-alpha.${commit.slice(0, 5)}`;
				}
			}
			// otherwise we'll do a standard release with whatever version is in the package.json
			file.contents = new Buffer(JSON.stringify(packageJSON));
		}
	});
}

function replaceTemplates() {
	// regex borrwed from https://github.com/TheLarkInn/angular2-template-loader/blob/1403302e985bf689ee49e9dd8bb953225f32737b/index.js#L5-L7
	const templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`])/g;
	const stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;

	function templateToString(file, url) {
		url = url.trim().replace(/^\"/g, "").replace(/\"$/g, "");
		let fileStr = path.resolve(file.path, "..", url);
		return fs.readFileSync(fileStr).toString("utf-8");
	}

	function stylesToString(file, urls) {
		urls = JSON.parse(urls);
		let strStyles = "";
		for (let url of urls) {
			strStyles += sass.renderSync({
				file: path.resolve(file.path, "..", url)
			}).css;
		}
		return strStyles;
	}

	return tap(function(file) {
		if (path.extname(file.path) === ".ts") {
			let fileStr = file.contents.toString("utf-8");
			if (fileStr.indexOf(templateUrlRegex) < 0 || fileStr.indexOf(stylesRegex) < 0) {
				fileStr = fileStr.replace(templateUrlRegex, (match, url) => `template: \`${templateToString(file, url)}\``)
					.replace(stylesRegex, (match, urls) => `styles: [\`${stylesToString(file, urls)}\`]`);
				file.contents = new Buffer(fileStr);
			}
		}
	});
}
