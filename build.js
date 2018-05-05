const path = require('path')
const fs = require('fs-extra')

const ProductionLine = require('productionline-web')
const TaskRunner = require('shortbus')

const Postcss = require('postcss')
const Chassis = require('@chassis/core')
const CleanCss = require('clean-css')

class Builder extends ProductionLine {
  constructor (cfg) {
    cfg.assets = [path.resolve('./src/assets')]
    super(cfg)

    this.chassis = Postcss([
      Chassis({
        importBasePath: path.resolve(`${this.SOURCE}/assets/css`),
        theme: path.resolve(`${this.SOURCE}/main.theme`),
        layout: {
          minWidth: 320,
          maxWidth: 1200
        }
      })
    ])
  }

  buildCSS (minify = true) {
    this.addTask('Build CSS', next => {
      let tasks = new TaskRunner()

      this.walk(path.join(this.SOURCE, '/**/*.css')).forEach(filepath => {
        let filename = /[^/]*$/.exec(filepath)[0]

        if (filename.startsWith('_')) {
          return
        }

        tasks.add(`Process ${this.localDirectory(filepath)}`, cont => {
          let css = this.readFileSync(filepath)

          this.chassis.process(css, {from: void 0}).then(res => {
            let outputPath = this.outputDirectory(filepath)

            if (!minify) {
              this.writeFile(outputPath, res.css, cont)
              return
            }

            let minified = new CleanCss({
              sourceMap: true
            }).minify(res.css)

            if (minified.sourceMap) {
              this.writeFileSync(`${outputPath}.map`, minified.sourceMap)
            }

            // this.writeFile(outputPath, this.applyHeader(minified.styles, 'css'), cont)
            // TODO: Check this.applyHeader (its returning undefined)
            this.writeFile(outputPath, minified.styles, cont)
          }).catch(err => this.failure(err))
        })
      })

      tasks.on('complete', next)
      tasks.run()
    })
  }

  make (minify = true) {
    this.clean()
    this.copyAssets()
    this.buildHTML()
    this.buildJavaScript()
    this.buildCSS()
  }
}

const builder = new Builder({
  commands: {
    '--build' (cmd) {
      builder.make()
    },

    '--dev' () {
      builder.checkForUpdate()
      builder.identifyOutdatedModules()

      this.make()

      this.watch((action, filepath) => {
        if (action === 'create' || action === 'update') {
          switch (path.extname(filepath).toUpperCase()) {
            case '.JS':
              this.buildJavaScript()
              break

            case '.HTM':
            case '.HTML':
              this.buildHTML()
              break

            case '.CSS':
              this.buildCSS()
              break

            default:
              // let isAssetUpdate = false
              //
              // for (let i = 0; i < builder.assets.length; i++) {
              //   isAssetUpdate = filepath.startsWith(builder.assets[i])
              //
              //   if (isAssetUpdate) {
              //     break
              //   }
              // }
              //
              // if (isAssetUpdate) {
                // this.copyAssets()
              // } else {
                this.make()
              // }
          }

          this.run()
        }
      })
    }
  }
})

builder.run()
