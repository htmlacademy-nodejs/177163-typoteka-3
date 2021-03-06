
TRUNCATE public.articles_categories, public.comments, public.articles, public.categories, public.users;

-- categories

INSERT INTO public.categories (name) VALUES
	('Разное'),
	('Программирование'),
	('Музыка'),
	('Кино'),
	('Железо'),
	('За жизнь'),
	('Деревья'),
	('Без рамки'),
	('IT');


-- users

INSERT INTO public.users (name, email, avatar, password) VALUES
	('Cade Rau', 'Kariane.Feest@gmail.com', 'avatar-1.png', 'f1KUlW'),
	('Casimer Yundt', 'Linwood_Schinner@gmail.com', 'avatar-2.png', 'SseNGCGWuMT'),
	('Paula Parker', 'Lois_Towne4@yahoo.com', 'avatar-3.png', '-8xvcl6-EgvI0mN'),
	('Montana Schneider', 'Emma.Buckridge@hotmail.com', 'avatar-4.png', '7H4nkUvwthHko0'),
	('Berniece Fisher', 'Moriah_Hickle16@hotmail.com', 'avatar-5.png', 'hVdx1phcaa');


-- articles

INSERT INTO public.articles (title, announce, full_text, picture, created_date, author_id) VALUES
	('Ёлки. История деревьев',
      'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов.',
      'Как начать действовать? Для начала просто соберитесь. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.',
      'forest@1x.jpg',
      '2020-11-01T09:34:14.669Z',
      '2'),
	('Ёлки. История деревьев',
      'Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году.',
      'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?',
      'sea@1x.jpg',
      '2020-10-02T20:25:57.590Z',
      '3'),
	('Борьба с прокрастинацией',
      'Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Собрать камни бесконечности легко, если вы прирожденный герой.',
      'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.',
      'sea@1x.jpg',
      '2020-12-03T08:02:00.130Z',
      '1'),
	('Ёлки. История деревьев',
      'Простые ежедневные упражнения помогут достичь успеха.',
      'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.',
      'forest@1x.jpg',
      '2020-11-14T21:48:15.333Z',
      '3'),
	('Учим HTML и CSS',
      'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция.',
      'Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.',
      'sea@1x.jpg',
      '2020-10-02T06:30:47.897Z',
      '4');


-- articlesCategories

INSERT INTO public.articles_categories (article_id, category_id) VALUES
	('1', '3'),
	('1', '9'),
	('2', '4'),
	('2', '2'),
	('2', '3'),
	('2', '5'),
	('2', '9'),
	('3', '3'),
	('3', '1'),
	('3', '7'),
	('3', '6'),
	('4', '2'),
	('4', '7'),
	('4', '5'),
	('4', '4'),
	('5', '4'),
	('5', '8'),
	('5', '6'),
	('5', '7'),
	('5', '9'),
	('5', '2'),
	('5', '1');


-- comments

INSERT INTO public.comments (text, created_date, article_id, author_id) VALUES
	('Плюсую, но слишком много буквы!',
    '2020-10-02T20:25:57.590Z',
    '2',
    '5'),
	('Мне кажется или я уже читал это где-то? Это где ж такие красоты? Хочу такую же футболку :-)',
    '2020-10-02T20:25:57.590Z',
    '2',
    '3'),
	('Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?',
    '2020-10-02T20:25:57.590Z',
    '2',
    '3'),
	('Хочу такую же футболку :-) Совсем немного... Согласен с автором!',
    '2020-10-02T20:25:57.590Z',
    '2',
    '4'),
	('Плюсую, но слишком много буквы! Согласен с автором!',
    '2020-12-03T08:02:00.130Z',
    '3',
    '3'),
	('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты?',
    '2020-12-03T08:02:00.130Z',
    '3',
    '4'),
	('Согласен с автором! Мне кажется или я уже читал это где-то? Совсем немного...',
    '2020-11-14T21:48:15.333Z',
    '4',
    '5'),
	('Плюсую, но слишком много буквы!',
    '2020-11-14T21:48:15.333Z',
    '4',
    '2'),
	('Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!',
    '2020-10-02T06:30:47.897Z',
    '5',
    '5'),
	('Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.',
    '2020-10-02T06:30:47.897Z',
    '5',
    '4'),
	('Согласен с автором! Это где ж такие красоты?',
    '2020-10-02T06:30:47.897Z',
    '5',
    '4');

