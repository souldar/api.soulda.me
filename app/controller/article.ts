import { Controller } from 'egg';

export default class ArticleController extends Controller {
  public async getArticlesWithPage () {
    const { pageNo = 1, pageSize = 10 } = this.ctx.query;
    const articles = await this.service.article.queryWithPage(pageNo, pageSize);
    this.ctx.body = articles;
  }

  public async getArticleById () {
    const { articleId } = this.ctx.query;
    const article = await this.service.article.queryByArticleId(articleId);
    this.ctx.body = article;
  }

  public async createArticle () {
    const { article } = this.ctx.request.body;
    const isSuccess = await this.service.article.addArticle(article)

    this.ctx.status = isSuccess ? 200 : 500;
  }

  public async changeCategory () {

  }

  public async addTag () {

  }

  public async deleteTag () {}
}