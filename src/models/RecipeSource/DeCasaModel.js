const cheerio = require('cheerio');
const fakeUa = require('fake-useragent');

const BaseModel = require('./BaseModel');

const BASE_URL = 'ingredientesdecasa.com.br';
const BASE_OPTIONS = {
  method: 'GET',
  hostname: BASE_URL,
  headers: {
    'User-Agent': fakeUa(),
  },
};

const sanatizeImage = (image) => {
  return image.replace(/(-[0-9]+x[0-9]+)/g, '');
};

class DeCasaModel extends BaseModel {
  static cookOptions(ingredients, offset = 0) {
    const searchString = (ingredients instanceof Array) ? ingredients.join(',') : ingredients;
    return Object.assign(BASE_OPTIONS, {
      path: `/pesquisar.php?ingredientes=${searchString}&offset=${offset * 30}`,
    });
  }

  static cookDetailsOptions(item) {
    return Object.assign(BASE_OPTIONS, {
      path: `/${item.link}`,
    });
  }

  static parseList(html) {
    const $ = cheerio.load(html);
    const $lista = $('.lista_receitas').contents();
    const receitas = [];

    Object.keys($lista).forEach((index) => {
      const elem = $lista[index];
      if (
        elem.type === 'tag' &&
        elem.attribs.class === 'receita' &&
        elem.attribs.id.indexOf('receita-') !== -1
      ) {
        const image = sanatizeImage(elem.children[3].children[1].attribs.src);
        const title = elem.children[5].children[1].children[0].data;
        const requestedIngredients = elem.children[5].children[3].children.filter(c => c.name === 'span').map(i => i.children[0].data);
        const link = elem.children[7].children[1].attribs.href;

        receitas.push({
          image, title, requestedIngredients, link, source: 'decasa',
        });
      }
    });
    return receitas;
  }

  static parseDetails(html) {
    const $ = cheerio.load(html);
    const $details = $('#detalhes_receita').contents();
    const result = {};

    Object.keys($details).forEach((index) => {
      const elem = $details[index];
      if (
        elem.type === 'tag' &&
        elem.attribs.class === 'ingredientes right'
      ) {
        result.ingredients = elem.children.filter(c => c.name === 'span').map(c => c.children[0].data);
        result.originalLink = elem.children[elem.children.length - 2].children[1].attribs.href;
      }
    });

    return result;
  }

  static list(ingredients, offset) {
    let content;
    const options = this.cookOptions(ingredients, offset);

    return new Promise((resolve, reject) => {
      this.get(options)
        .then((response) => {
          content = this.parseList(response);
          return Promise.all(content.map(item => this.get(this.cookDetailsOptions(item))));
        })
        .then((responses) => {
          return resolve(responses.map((d, index) => {
            return Object.assign(content[index], {
              details: this.parseDetails(d),
            });
          }));
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = DeCasaModel;
