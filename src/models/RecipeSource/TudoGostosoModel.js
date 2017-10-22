const cheerio = require('cheerio');
const fakeUa = require('fake-useragent');

const BaseModel = require('./BaseModel');

const BASE_URL = 'www.tudogostoso.com.br';
const BASE_OPTIONS = {
  method: 'GET',
  hostname: BASE_URL,
  headers: {
    'User-Agent': fakeUa(),
  },
};

const sanatizeImage = (image) => {
  return image.replace(/(\?+.+)/g, '?mode=crop&width=600&height=450');
};

class TudoGostosoModel extends BaseModel {
  static cookOptions(ingredients, offset = 0) {
    const searchString = (ingredients instanceof Array) ? ingredients.join(',') : ingredients;
    return Object.assign(BASE_OPTIONS, {
      path: `/busca.php?q=${searchString}&pag=${offset}`,
    });
  }

  static parseList(html) {
    const $ = cheerio.load(html);
    const $lista = $('.listing.box').find('li.box-hover');
    const receitas = [];

    Object.keys($lista).forEach((index) => {
      const elem = $lista[index];
      if (elem.type === 'tag') {
        const image = sanatizeImage(elem.children[1].children[1].children[1].attribs.src);
        const title = elem.children[1].children[3].children[1].children[0].data;
        const requestedIngredients = [];
        const link = elem.children.filter(c => c.name === 'a')[0].attribs.href;
        const details = {
          ingredients: [],
          originalLink: `http://${BASE_URL}${link}`,
        };

        receitas.push({
          image, title, requestedIngredients, link, details,
        });
      }
    });
    return receitas;
  }

  static list(ingredients, offset) {
    const options = this.cookOptions(ingredients, offset);

    return new Promise((resolve, reject) => {
      this.get(options)
        .then((response) => {
          return resolve(this.parseList(response));
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = TudoGostosoModel;
