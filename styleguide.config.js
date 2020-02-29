const path = require('path')

module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', [{
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
  }
};
