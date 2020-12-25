-- Получить список всех категорий (идентификатор, наименование категории);
SELECT id, name from categories;

-- Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT id, name from categories
  WHERE id IN (
    SELECT DISTINCT category_id from articles_categories
);

--Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);
SELECT
	categories.id,
	categories.name,
	count(categories.id) AS articles_count
FROM categories
JOIN articles_categories
	ON categories.id = articles_categories.category_id
GROUP BY categories.id;

--Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT posts.*, (STRING_AGG(categories.name, ',')) AS categories_names
FROM (
	SELECT
		articles.id,
		articles.title,
		articles.announce,
		articles.created_date,
		users.name AS author_name,
		users.email AS author_email,
		COUNT(comments) AS comments_count
	FROM articles
	INNER JOIN users ON users.id = articles.author_id
	LEFT JOIN comments ON comments.article_id = articles.id
	GROUP BY articles.id, users.name, users.email
) AS posts
LEFT JOIN articles_categories ON articles_categories.article_id = posts.id
LEFT JOIN categories ON categories.id = articles_categories.category_id
GROUP BY posts.id, posts.title, posts.announce, posts.created_date,
		 posts.author_name, posts.author_email, posts.comments_count
ORDER BY posts.created_date DESC

--Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT posts.*, (STRING_AGG(categories.name, ',')) AS categories_names
FROM (
	SELECT
		articles.id,
		articles.title,
		articles.announce,
		articles.full_text,
		articles.created_date,
		articles.picture,
		users.name AS author_name,
		users.email AS author_email,
		COUNT(comments) AS comments_count
	FROM articles
	INNER JOIN users ON users.id = articles.author_id
	LEFT JOIN comments ON comments.article_id = articles.id
	WHERE articles.id = 2
	GROUP BY articles.id, users.name, users.email
) AS posts
LEFT JOIN articles_categories ON articles_categories.article_id = posts.id
LEFT JOIN categories ON categories.id = articles_categories.category_id
GROUP BY posts.id, posts.title, posts.announce, posts.full_text, 
		 posts.created_date, posts.picture,
		 posts.author_name, posts.author_email, posts.comments_count;

--Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
SELECT
	comments.id,
	comments.article_id,
	users.name,
	comments.text
FROM comments
JOIN users ON users.id = comments.author_id
ORDER BY comments.created_date DESC
LIMIT 5;

--Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
	comments.id,
	comments.article_id,
	users.name,
	comments.text
FROM comments
JOIN users ON users.id = comments.author_id
WHERE comments.article_id = 3
ORDER BY comments.created_date DESC;

--Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
