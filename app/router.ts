import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/article', controller.article.getArticleById);
  router.get('/articles', controller.article.getArticlesWithPage);

  router.post('/article', controller.article.createArticle);
};
