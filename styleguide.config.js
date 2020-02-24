module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', [{
    // eslint-disable-next-line no-undef
    componentNameResolver: (exp, source) => exp.getName() === 'StyledComponentClass' && getDefaultExportForFile(source),
  }]).parse
};
