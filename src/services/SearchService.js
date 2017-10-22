const DeCasaModel = require('../models/RecipeSource/DeCasaModel');
const TudoGostosoModel = require('../models/RecipeSource/TudoGostosoModel');
const OmniModel = require('../models/RecipeSource/OmniModel');

class SearchService {
  static mapSources(source) {
    switch (source.toLocaleLowerCase()) {
      case 'decasa':
        return DeCasaModel;
      case 'tudogostoso':
        return TudoGostosoModel;
      case 'all':
        return OmniModel;
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
