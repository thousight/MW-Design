const path = require('path')
const fs = require('fs')
const withCustomConfig = require('react-docgen-typescript').withCustomConfig

module.exports = {
  propsParser: withCustomConfig('./tsconfig.json', [{
    // eslint-disable-next-line no-undef
    componentNameResolver: (exp, source) => exp.getName() === 'StyledComponentClass' && getDefaultExportForFile(source),
    propFilter: (prop, component) => {
      if (prop.parent) {
        return !prop.parent.fileName.includes('node_modules')
      }
      return true
    },
  }]).parse,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/themes/ThemeWrapper')
  },
  theme: {
    color: {
      baseBackground: '#F0F0F3',
      sidebarBackground: '#FFFFFF',
      link: '#2EA8FF',
      linkHover: '#1999FF'
    },
  },
  title: 'MW Design',
  updateExample: (props, exampleFilePath) => {
    // props.settings are passed by any fenced code block, in this case
    const { settings, lang } = props
    if (settings && typeof settings.file === 'string') {
      // "absolute path to mySourceCode.js"
      const filepath = path.resolve(exampleFilePath, settings.file)
      // displays the block as static code
      settings.static = true
      // no longer needed
      delete settings.file
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang
      }
    }
    return props
  },
};
