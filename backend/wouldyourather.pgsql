--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    user_id character varying NOT NULL,
    question_id character varying NOT NULL,
    answer character varying
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id character varying NOT NULL,
    "optionOne" character varying,
    "optionTwo" character varying,
    author character varying NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying NOT NULL,
    name character varying,
    "avatarURL" character varying(200)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
56be0b566039
\.


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (user_id, question_id, answer) FROM stdin;
sarahedo	8xf0y6ziyjabvozdd253nd	optionOne
johndoe	6ni6ok3ym7mf1p33lnez	optionTwo
sarahedo	6ni6ok3ym7mf1p33lnez	optionTwo
sarahedo	am8ehyc8byjqgar0jgpub9	optionTwo
sarahedo	loxhs1bqm25b708cmbf3g	optionTwo
tylermcginnis	vthrdm985a262al8qx3do	optionOne
johndoe	vthrdm985a262al8qx3do	optionTwo
johndoe	xj352vofupe1dqz9emx13r	optionOne
tylermcginnis	xj352vofupe1dqz9emx13r	optionTwo
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, "optionOne", "optionTwo", author) FROM stdin;
8xf0y6ziyjabvozdd253nd	have horrible short term memory	have horrible long term memory	sarahedo
6ni6ok3ym7mf1p33lnez	become a superhero	become a supervillain	johndoe
am8ehyc8byjqgar0jgpub9	be telekinetic	be telepathic	sarahedo
loxhs1bqm25b708cmbf3g	be a front-end developer	be a back-end developer	tylermcginnis
vthrdm985a262al8qx3do	find $50 yourself	have your best friend find $500	tylermcginnis
xj352vofupe1dqz9emx13r	write JavaScript	write Swift	johndoe
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, "avatarURL") FROM stdin;
sarahedo	Sarah Edo	https://icon-library.net/images/avatar-icon/avatar-icon-8.jpg
tylermcginnis	Tyler McGinnis	https://icon-library.net/images/avatar-icon/avatar-icon-4.jpg
johndoe	John Doe	https://icon-library.net/images/avatar-icon/avatar-icon-22.jpg
\.


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (user_id, question_id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: answers answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: answers answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: questions questions_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_author_fkey FOREIGN KEY (author) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

