DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users
(
    id bigserial NOT NULL PRIMARY KEY,
    name character varying(100),
    email character varying(50) NOT NULL,
    avatar character varying(50),
    password character varying(50) NOT NULL,
    CONSTRAINT email_unique UNIQUE (email)
);

DROP TABLE IF EXISTS public.articles CASCADE;
CREATE TABLE public.articles
(
    id bigserial NOT NULL PRIMARY KEY,
    title character varying(250) NOT NULL,
    announce character varying(500) NOT NULL,
    full_text text NOT NULL,
    picture character varying(50),
    created_date date NOT NULL,
    author_id bigint NOT NULL,
    CONSTRAINT users_fk FOREIGN KEY (author_id)
        REFERENCES public.users (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

DROP TABLE IF EXISTS public.comments CASCADE;
CREATE TABLE public.comments
(
    id bigserial NOT NULL PRIMARY KEY,
    text text NOT NULL,
    created_date date NOT NULL,
    article_id bigint NOT NULL,
    author_id bigint NOT NULL,
    CONSTRAINT articles_fk FOREIGN KEY (article_id)
        REFERENCES public.articles (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT users_fk FOREIGN KEY (author_id)
        REFERENCES public.users (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

DROP TABLE IF EXISTS public.categories CASCADE;
CREATE TABLE public.categories
(
    id bigserial NOT NULL PRIMARY KEY,
    name character varying(100) NOT NULL
);

DROP TABLE IF EXISTS public.articles_categories CASCADE;
CREATE TABLE public.articles_categories
(
    article_id bigint NOT NULL,
    category_id bigint NOT NULL,
    PRIMARY KEY (article_id, category_id),
    CONSTRAINT articles_fk FOREIGN KEY (article_id)
        REFERENCES public.articles (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT categories_fk FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);
