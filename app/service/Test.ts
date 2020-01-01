import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    const articles =  await this.app.mysql.select('article');
    console.log(articles)
    return `hi, ${name}! has ${articles.length} articles`;
  }
}
