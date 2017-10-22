const DeCasaModel = require('../models/RecipeSource/DeCasaModel');
const TudoGostosoModel = require('../models/RecipeSource/TudoGostosoModel');

class SearchService {
  static mapSources(source) {
    switch (source.toLocaleLowerCase()) {
      case 'decasa':
        return DeCasaModel;
      case 'tudogostoso':
        return TudoGostosoModel;
      default:
        return null;
    }
  }

  static list(source, ingredients, offset) {
    const SourceModel = this.mapSources(source);

    return SourceModel.list(ingredients, offset)
      .then(dbList => (dbList.length ? dbList : []));
  }
}

module.exports = SearchService;
