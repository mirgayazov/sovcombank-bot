import pgPromise from "pg-promise";
import * as dotenv from "dotenv";

const createScript = `
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

-- Started on 2022-06-17 11:36:07

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

--
-- TOC entry 200 (class 1259 OID 49596)
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id bigint NOT NULL,
    text text NOT NULL,
    emotion text NOT NULL
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 49602)
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO postgres;

--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 201
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- TOC entry 202 (class 1259 OID 49604)
-- Name: emoji; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emoji (
    id bigint NOT NULL,
    code text NOT NULL,
    emotion text NOT NULL
);


ALTER TABLE public.emoji OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 49610)
-- Name: emoji_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.emoji_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.emoji_id_seq OWNER TO postgres;

--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 203
-- Name: emoji_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.emoji_id_seq OWNED BY public.emoji.id;


--
-- TOC entry 204 (class 1259 OID 49612)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    text text NOT NULL,
    chat_id bigint NOT NULL,
    emotion text,
    "time" timestamp with time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 49618)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 205
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 206 (class 1259 OID 49622)
-- Name: messages_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_user_id_seq OWNER TO postgres;

--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 206
-- Name: messages_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_user_id_seq OWNED BY public.messages.chat_id;


--
-- TOC entry 2867 (class 2604 OID 49629)
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- TOC entry 2868 (class 2604 OID 49630)
-- Name: emoji id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji ALTER COLUMN id SET DEFAULT nextval('public.emoji_id_seq'::regclass);


--
-- TOC entry 2869 (class 2604 OID 49631)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 2870 (class 2604 OID 49632)
-- Name: messages chat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN chat_id SET DEFAULT nextval('public.messages_user_id_seq'::regclass);


--
-- TOC entry 2872 (class 2606 OID 49636)
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- TOC entry 2874 (class 2606 OID 49638)
-- Name: emoji emoji_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji
    ADD CONSTRAINT emoji_pkey PRIMARY KEY (id);


--
-- TOC entry 2876 (class 2606 OID 49640)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


-- Completed on 2022-06-17 11:36:07

--
-- PostgreSQL database dump complete
--
`;

dotenv.config({path: '../.env'});

const pgp = pgPromise({});
let db = pgp(`postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/${process.env.DB_NAME}`);

db.connect()
    .then(async () => {
        try {
            await db.any(createScript)
            console.log('database initialized')
            pgp.end()
        } catch (e) {
            console.log(e)
            pgp.end()
        }
    })
    .catch(err => {
        console.log(err);
    });
