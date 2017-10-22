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

  static cookDetailsOptions(item) {
    return Object.assign(BASE_OPTIONS, {
      path: `/${item.link}`,
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

        receitas.push({
          image, title, requestedIngredients, link, source: 'tudogostoso',
        });
      }
    });
    return receitas;
  }

  static parseDetails(html) {
    const $ = cheerio.load(html);
    const $details = $('.ingredients-box #info-user ul').contents();
    const result = {};

    result.ingredients = Object.keys($details).forEach((index) => {
      const elem = $details[index];
      return elem.children[0].children[0].data;
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

module.exports = TudoGostosoModel;
