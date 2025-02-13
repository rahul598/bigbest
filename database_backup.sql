--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.5

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
-- Name: cart_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer,
    product_type text NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.cart_items OWNER TO neondb_owner;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO neondb_owner;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


ALTER TABLE public.carts OWNER TO neondb_owner;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO neondb_owner;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: children; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.children (
    id integer NOT NULL,
    parent_id integer NOT NULL,
    child_id integer NOT NULL,
    relationship text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.children OWNER TO neondb_owner;

--
-- Name: children_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.children_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.children_id_seq OWNER TO neondb_owner;

--
-- Name: children_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.children_id_seq OWNED BY public.children.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    author_id integer,
    thumbnail text,
    content jsonb,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.courses OWNER TO neondb_owner;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO neondb_owner;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: exam_results; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.exam_results (
    id integer NOT NULL,
    user_id integer,
    exam_id integer,
    score integer NOT NULL,
    grade text NOT NULL,
    status text NOT NULL,
    date timestamp without time zone DEFAULT now()
);


ALTER TABLE public.exam_results OWNER TO neondb_owner;

--
-- Name: exam_results_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.exam_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exam_results_id_seq OWNER TO neondb_owner;

--
-- Name: exam_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.exam_results_id_seq OWNED BY public.exam_results.id;


--
-- Name: exams; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.exams (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    author_id integer,
    questions jsonb NOT NULL,
    pdf_url text,
    duration integer NOT NULL,
    scheduled_for timestamp without time zone,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.exams OWNER TO neondb_owner;

--
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exams_id_seq OWNER TO neondb_owner;

--
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_type text NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.order_items OWNER TO neondb_owner;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO neondb_owner;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    status text NOT NULL,
    total numeric(10,2) NOT NULL,
    payment_intent_id text,
    shipping_address jsonb,
    billing_address jsonb,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.orders OWNER TO neondb_owner;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO neondb_owner;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    category text NOT NULL,
    subcategory text,
    image_url text,
    stock integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


ALTER TABLE public.products OWNER TO neondb_owner;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO neondb_owner;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: progress_reports; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.progress_reports (
    id integer NOT NULL,
    user_id integer,
    type text NOT NULL,
    period text NOT NULL,
    subject text NOT NULL,
    performance text NOT NULL,
    details text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.progress_reports OWNER TO neondb_owner;

--
-- Name: progress_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.progress_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.progress_reports_id_seq OWNER TO neondb_owner;

--
-- Name: progress_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.progress_reports_id_seq OWNED BY public.progress_reports.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    category text NOT NULL,
    subcategory text NOT NULL,
    author_id integer,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.questions OWNER TO neondb_owner;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO neondb_owner;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: subscription_plans; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.subscription_plans (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    "interval" text NOT NULL,
    features jsonb,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.subscription_plans OWNER TO neondb_owner;

--
-- Name: subscription_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.subscription_plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscription_plans_id_seq OWNER TO neondb_owner;

--
-- Name: subscription_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.subscription_plans_id_seq OWNED BY public.subscription_plans.id;


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.subscriptions (
    id integer NOT NULL,
    user_id integer,
    plan_id integer,
    status text NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    stripe_customer_id text,
    stripe_subscription_id text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.subscriptions OWNER TO neondb_owner;

--
-- Name: subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscriptions_id_seq OWNER TO neondb_owner;

--
-- Name: subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.subscriptions_id_seq OWNED BY public.subscriptions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'student'::text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    email_verified boolean DEFAULT false,
    refresh_token text,
    invite_token text
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: children id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.children ALTER COLUMN id SET DEFAULT nextval('public.children_id_seq'::regclass);


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: exam_results id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.exam_results ALTER COLUMN id SET DEFAULT nextval('public.exam_results_id_seq'::regclass);


--
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: progress_reports id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.progress_reports ALTER COLUMN id SET DEFAULT nextval('public.progress_reports_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: subscription_plans id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscription_plans ALTER COLUMN id SET DEFAULT nextval('public.subscription_plans_id_seq'::regclass);


--
-- Name: subscriptions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscriptions ALTER COLUMN id SET DEFAULT nextval('public.subscriptions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cart_items (id, cart_id, product_type, product_id, quantity, price, created_at) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.carts (id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: children; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.children (id, parent_id, child_id, relationship, created_at) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.courses (id, title, description, price, author_id, thumbnail, content, created_at) FROM stdin;
\.


--
-- Data for Name: exam_results; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.exam_results (id, user_id, exam_id, score, grade, status, date) FROM stdin;
\.


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.exams (id, title, description, price, author_id, questions, pdf_url, duration, scheduled_for, created_at) FROM stdin;
1	Mathematics Mock Exam 2024	Comprehensive mathematics exam covering algebra, calculus, and geometry	19.99	\N	[{"correct": "4", "options": ["4", "5", "6", "7"], "question": "Solve for x: 2x + 5 = 13"}]	\N	120	\N	2025-02-11 19:21:50.193654
2	English Language Test	Complete English proficiency test with reading and writing sections	24.99	\N	[{"correct": "went", "options": ["went", "go", "goes", "going"], "question": "Choose the correct word: He ___ to the store"}]	\N	90	\N	2025-02-11 19:21:50.193654
3	Science Assessment Pack	Bundle of physics, chemistry, and biology practice tests	39.99	\N	[{"correct": "6", "options": ["5", "6", "7", "8"], "question": "What is the atomic number of Carbon?"}]	\N	180	\N	2025-02-11 19:21:50.193654
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.order_items (id, order_id, product_type, product_id, quantity, price, created_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.orders (id, user_id, status, total, payment_intent_id, shipping_address, billing_address, created_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.products (id, name, description, price, category, subcategory, image_url, stock, is_active, created_at, updated_at) FROM stdin;
1	11+ Mathematics Practice Book	Comprehensive practice book covering all key topics for 11+ Mathematics	29.99	Books	Mathematics	https://vedsadhana.com/wp-content/uploads/2025/02/NVR-1-1.png	100	t	2025-02-11 23:47:39.578731	\N
2	11+ Verbal Reasoning Guide	Complete guide with practice questions and answers	24.99	Books	Verbal Reasoning	https://vedsadhana.com/wp-content/uploads/2025/02/NVR-1-1.png	100	t	2025-02-11 23:47:39.578731	\N
3	11+ Non-Verbal Reasoning Tests	Collection of practice tests with detailed solutions	24.99	Books	Non-Verbal Reasoning	https://vedsadhana.com/wp-content/uploads/2025/02/NVR-1-1.png	100	t	2025-02-11 23:47:39.578731	\N
4	11+ English Practice Papers	Set of practice papers with marking schemes	19.99	Practice Papers	English	https://vedsadhana.com/wp-content/uploads/2025/02/NVR-1-1.png	100	t	2025-02-11 23:47:39.578731	\N
5	Complete 11+ Study Guide	All-in-one study guide covering all subjects	49.99	Books	All Subjects	https://vedsadhana.com/wp-content/uploads/2025/02/NVR-1-1.png	50	t	2025-02-11 23:47:39.578731	\N
\.


--
-- Data for Name: progress_reports; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.progress_reports (id, user_id, type, period, subject, performance, details, created_at) FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.questions (id, title, content, category, subcategory, author_id, created_at) FROM stdin;
\.


--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.subscription_plans (id, name, description, price, "interval", features, created_at) FROM stdin;
1	Basic Plan	Access to basic features and limited exams	29.99	monthly	["5 Mock Exams per month", "Basic study materials", "Email support"]	2025-02-11 19:18:33.741457
2	Premium Plan	Full access to all features and unlimited exams	49.99	monthly	["Unlimited Mock Exams", "Premium study materials", "24/7 Support", "1-on-1 Tutoring"]	2025-02-11 19:18:33.741457
3	Pro Plan	Everything in Premium plus advanced features	79.99	monthly	["Everything in Premium", "Live Classes", "Personalized Study Plan", "Progress Analytics"]	2025-02-11 19:18:33.741457
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.subscriptions (id, user_id, plan_id, status, start_date, end_date, stripe_customer_id, stripe_subscription_id, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, first_name, last_name, email, password, role, status, created_at, email_verified, refresh_token, invite_token) FROM stdin;
2	vikash	yadav	vikash@gmail.com	a603cc528a7f1d99368fc1f7aa0afbb44c3e235dc48c966d738ff255d6a253a99f6cfd9257e0f2808fea0b160d6888b25e28a4269f7b57040cfc3a641365fc2d.3377ec9ce18041cd4f3ee0fb36c8ebb6	student	active	2025-02-11 19:13:04.124398	f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzM5MzAxMTg0LCJleHAiOjE3Mzk5MDU5ODR9.CVqA6z3c1hPHeQc2b75hB877Km4ZACOmDh0ZtDBAIs4	\N
3	Naveen 	Prajapati	naveen@gmail.com	e6e99f775fb8d91030ba6f393b71ace7c0c3beaa7da3c5bb0d812a83e66fa472838460d783d2aea8fa33098ab789867fdb3dd48541b19d8a350848436d8f49bb.677c1521a39e86fa9c47b014f80c4103	student	active	2025-02-11 19:36:50.152358	f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM5MzAyNjEwLCJleHAiOjE3Mzk5MDc0MTB9.nuZaXEzr7rFWRwtwHlTteCoogcIgj2F6RfahEyWgWeg	\N
4	rahul	kumar	rahul@gmail.com	d049e73673b61a3f9874be85fd1f39e442e36849f1668fafe35f24eadcc52212df35b892d030d66a83458f5ffa832efb56e4b4a4c379f78d4c52b1100e00a01e.c55e89cd47777df63734c21a59273934	student	active	2025-02-11 19:58:38.181604	f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzM5MzE1NTE1LCJleHAiOjE3Mzk5MjAzMTV9.gw6Y2J261H-k4gmaKDOapbKzgSsZ2dshp29L_3ESW6U	\N
1	Admin	User	admin@example.com	51eca5717704351f6862e2506868633ec01db2298d1e25d1e7ac4a22c8cf741af2bf59ac127b018fb68d9646fa301b502a7b4b7c651223e54aef649c30bc393f.b01169ab4724e0ef31a62be7801572be	admin	active	2025-02-11 18:51:51.204048	f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5MzIzMDEwLCJleHAiOjE3Mzk5Mjc4MTB9.b0Vp8e0UOSTAGBgfbTZiISSsWVeu43lP4-SCuUfL43Y	\N
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- Name: children_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.children_id_seq', 1, false);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.courses_id_seq', 1, false);


--
-- Name: exam_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.exam_results_id_seq', 1, false);


--
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.exams_id_seq', 1, false);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.products_id_seq', 5, true);


--
-- Name: progress_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.progress_reports_id_seq', 1, false);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.questions_id_seq', 1, false);


--
-- Name: subscription_plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.subscription_plans_id_seq', 1, false);


--
-- Name: subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.subscriptions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: children children_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: exam_results exam_results_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.exam_results
    ADD CONSTRAINT exam_results_pkey PRIMARY KEY (id);


--
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: progress_reports progress_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.progress_reports
    ADD CONSTRAINT progress_reports_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: subscription_plans subscription_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscription_plans
    ADD CONSTRAINT subscription_plans_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_cart_id_carts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_carts_id_fk FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- Name: carts carts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: children children_child_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_child_id_users_id_fk FOREIGN KEY (child_id) REFERENCES public.users(id);


--
-- Name: children children_parent_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_parent_id_users_id_fk FOREIGN KEY (parent_id) REFERENCES public.users(id);


--
-- Name: courses courses_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: exam_results exam_results_exam_id_exams_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.exam_results
    ADD CONSTRAINT exam_results_exam_id_exams_id_fk FOREIGN KEY (exam_id) REFERENCES public.exams(id);


--
-- Name: exam_results exam_results_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.exam_results
    ADD CONSTRAINT exam_results_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: exams exams_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: order_items order_items_order_id_orders_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_orders_id_fk FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: orders orders_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: progress_reports progress_reports_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.progress_reports
    ADD CONSTRAINT progress_reports_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: questions questions_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: subscriptions subscriptions_plan_id_subscription_plans_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_subscription_plans_id_fk FOREIGN KEY (plan_id) REFERENCES public.subscription_plans(id);


--
-- Name: subscriptions subscriptions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

