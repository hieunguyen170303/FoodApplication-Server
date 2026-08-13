-- SQL Schema for Supabase PostgreSQL Database (Food Application)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  is_vip BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  bg_color TEXT DEFAULT '#E98308',
  image_url TEXT,
  sort_order INT DEFAULT 0
);

-- 3. RESTAURANTS TABLE
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  branch TEXT,
  logo_url TEXT,
  rating NUMERIC(2,1) DEFAULT 4.5,
  review_count TEXT DEFAULT '100+',
  delivery_fee NUMERIC(10,2) DEFAULT 15000,
  original_delivery_fee NUMERIC(10,2),
  delivery_time TEXT DEFAULT '25 phút',
  category TEXT DEFAULT 'BURGERS',
  is_sponsored BOOLEAN DEFAULT FALSE,
  tag TEXT,
  voucher_badge TEXT,
  min_order TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MENU SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.menu_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 5. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID REFERENCES public.menu_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  image_url TEXT,
  tag TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE
);

-- 6. OPTION GROUPS TABLE
CREATE TABLE IF NOT EXISTS public.option_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_required BOOLEAN DEFAULT TRUE
);

-- 7. OPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES public.option_groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  extra_price NUMERIC(10,2) DEFAULT 0,
  is_default BOOLEAN DEFAULT FALSE
);

-- 8. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  store_name TEXT NOT NULL,
  store_logo TEXT,
  status TEXT DEFAULT 'DELIVERING',
  status_text TEXT DEFAULT 'Tài xế đang giao hàng đến bạn',
  estimated_time TEXT DEFAULT '19 phút',
  current_step_index INT DEFAULT 2,
  total_price NUMERIC(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'MoMo',
  delivery_address TEXT,
  driver_name TEXT DEFAULT 'Nguyễn Văn Hùng',
  driver_phone TEXT DEFAULT '0901234567',
  driver_rating NUMERIC(2,1) DEFAULT 4.9,
  driver_vehicle TEXT DEFAULT '61B1 - 888.99',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity INT DEFAULT 1,
  price NUMERIC(10,2) NOT NULL
);
