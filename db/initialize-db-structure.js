import pgPromise from "pg-promise";
import * as dotenv from "dotenv";

const createScript = `
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

-- Started on 2022-06-16 17:52:35

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
-- TOC entry 201 (class 1259 OID 49538)
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id bigint NOT NULL,
    text text NOT NULL,
    emotion text NOT NULL
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 49536)
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
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 200
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- TOC entry 203 (class 1259 OID 49549)
-- Name: emoji; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emoji (
    id bigint NOT NULL,
    code text NOT NULL,
    emotion text NOT NULL
);


ALTER TABLE public.emoji OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 49547)
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
-- TOC entry 3026 (class 0 OID 0)
-- Dependencies: 202
-- Name: emoji_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.emoji_id_seq OWNED BY public.emoji.id;


--
-- TOC entry 206 (class 1259 OID 49562)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    text text NOT NULL,
    user_id bigint NOT NULL,
    emotion text,
    session_id bigint NOT NULL,
    "time" timestamp with time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 49558)
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
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 204
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 207 (class 1259 OID 49572)
-- Name: messages_session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_session_id_seq OWNER TO postgres;

--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 207
-- Name: messages_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_session_id_seq OWNED BY public.messages.session_id;


--
-- TOC entry 205 (class 1259 OID 49560)
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
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 205
-- Name: messages_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_user_id_seq OWNED BY public.messages.user_id;


--
-- TOC entry 209 (class 1259 OID 49584)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id bigint NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 49582)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 208
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 2875 (class 2604 OID 49541)
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- TOC entry 2876 (class 2604 OID 49552)
-- Name: emoji id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji ALTER COLUMN id SET DEFAULT nextval('public.emoji_id_seq'::regclass);


--
-- TOC entry 2877 (class 2604 OID 49565)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 2878 (class 2604 OID 49566)
-- Name: messages user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN user_id SET DEFAULT nextval('public.messages_user_id_seq'::regclass);


--
-- TOC entry 2879 (class 2604 OID 49574)
-- Name: messages session_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN session_id SET DEFAULT nextval('public.messages_session_id_seq'::regclass);


--
-- TOC entry 2880 (class 2604 OID 49587)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 2882 (class 2606 OID 49546)
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- TOC entry 2884 (class 2606 OID 49557)
-- Name: emoji emoji_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji
    ADD CONSTRAINT emoji_pkey PRIMARY KEY (id);


--
-- TOC entry 2886 (class 2606 OID 49571)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 2888 (class 2606 OID 49589)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 2889 (class 2606 OID 49590)
-- Name: messages sessions_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT sessions_fk FOREIGN KEY (session_id) REFERENCES public.sessions(id) NOT VALID;


-- Completed on 2022-06-16 17:52:35

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
