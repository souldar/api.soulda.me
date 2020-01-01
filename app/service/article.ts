import { Service } from 'egg';
import { Article, Tag } from '../models';

export default class ArticleService extends Service {
  public async queryWithPage(pageNo: number, pageSize: number) {
    const sql =
      'SELECT article.*, category.name as category_name ' +
      'FROM article LEFT JOIN category ' +
      'ON article.category_id=category.category_id ' +
      'WHERE article.visible = 1 ORDER BY article.create_time DESC ' +
      'LIMIT ? OFFSET ?';

    const articles = await this.app.mysql.query(sql, [ pageSize, (pageNo - 1) * pageSize ]);
    const totalCount = await this.app.mysql.count('article', { visible: 1 });

    return {
      pageNo,
      pageSize,
      totalCount,
      totalPage: Math.ceil(totalCount / pageSize),
      list: articles.map(article => {
        return {
          id: article.article_id,
          title: article.title,
          subtitle: article.subtitle,
          content: article.content,
          createTime: article.create_time,
          updateTime: article.update_time,
          category: {
            id: article.category_id,
            name: article.category_name,
          },
        };
      }),
    };
  }

  public async queryByArticleId(article_id): Promise<Article> {
    const article = await this.app.mysql.get('article', {
      article_id,
    });

    const categoryName = article.category_id ? await this.app.mysql.get('category', {
      category_id: article.category_id,
    }) : '';
    return {
      id: article.article_id,
      title: article.title,
      subtitle: article.subtitle,
      content: article.content,
      createTime: article.create_time,
      updateTime: article.update_time,
      category: {
        id: article.category_id,
        name: categoryName,
      },
    };
  }

  public async addArticle(article: Article) {
    const { title, subtitle, content, category } = article;
    const currentTime = new Date().getTime();
    const result = await this.app.mysql.insert('article', {
      title,
      subtitle,
      content,
      category_id: category?.id,
      create_time: currentTime,
      update_time: currentTime,
    });

    return result.affectedRows === 1;
  }

  public async addTagRelation(article_id: number, tags: Tag[]) {
    const relations = tags.map((tag: Tag) => {
      return { tag_id: tag.id, article_id };
    });
    const result = await this.app.mysql.insert('tag_relation', relations);

    return result.affectedRows === relations;
  }
}
