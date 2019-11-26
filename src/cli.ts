const program = require('commander')
const MapManager = require('./classes/MapManager.ts')

program
  .option('-a|--add', 'Add', MapManager.test)
  .option('-e|--edit', 'Editdd', MapManager.edit)
  .parse((process as any).argv);

