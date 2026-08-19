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

-- 8. SHIPPERS TABLE (Tài xế / Shipper)
CREATE TABLE IF NOT EXISTS public.shippers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL DEFAULT 'Nguyễn Văn Hùng',
  phone TEXT NOT NULL DEFAULT '0912 345 678',
  vehicle_name TEXT DEFAULT 'Honda Wave Alpha 110',
  vehicle_plate TEXT DEFAULT '61B1 - 888.99',
  rating NUMERIC(2,1) DEFAULT 4.9,
  is_online BOOLEAN DEFAULT TRUE,
  wallet_balance NUMERIC(10,2) DEFAULT 350000,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  shipper_id UUID REFERENCES public.shippers(id) ON DELETE SET NULL,
  store_name TEXT NOT NULL,
  store_logo TEXT,
  status TEXT DEFAULT 'DELIVERING',
  status_text TEXT DEFAULT 'Tài xế đang giao hàng đến bạn',
  shipper_status TEXT DEFAULT 'ACCEPTED', -- AVAILABLE, ACCEPTED, PICKED_UP, DELIVERING, COMPLETED
  shipping_earnings NUMERIC(10,2) DEFAULT 25000,
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

-- 10. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity INT DEFAULT 1,
  price NUMERIC(10,2) NOT NULL
);

-- 11. ORDER MESSAGES TABLE (Real-time Chat giữa Shipper & Khách)
CREATE TABLE IF NOT EXISTS public.order_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL, -- 'CUSTOMER' | 'SHIPPER'
  sender_id TEXT,
  sender_name TEXT NOT NULL,
  message_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ORDER REVIEWS TABLE (Đánh giá nhà hàng & tài xế)
CREATE TABLE IF NOT EXISTS public.order_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  store_name TEXT,
  restaurant_rating INT CHECK (restaurant_rating BETWEEN 1 AND 5),
  restaurant_comment TEXT,
  restaurant_tags TEXT[],
  driver_name TEXT,
  shipper_rating INT CHECK (shipper_rating BETWEEN 1 AND 5),
  shipper_comment TEXT,
  shipper_tags TEXT[],
  tip_amount NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. NOTIFICATIONS TABLE (Trung tâm Thông báo)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'ORDER' | 'PROMO' | 'SYSTEM'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_unread BOOLEAN DEFAULT TRUE,
  order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. VOUCHERS TABLE (Mã Giảm Giá & Kho Voucher)
CREATE TABLE IF NOT EXISTS public.vouchers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  discount_text TEXT NOT NULL,
  min_order_amount NUMERIC(10,2) DEFAULT 0,
  expiry_date TIMESTAMPTZ,
  category TEXT DEFAULT 'DISCOUNT' -- 'FREESHIP' | 'DISCOUNT' | 'PARTNER'
);

-- 15. FAVORITES TABLE (Quán ăn & Món ăn Yêu thích)
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL, -- 'RESTAURANT' | 'FOOD'
  target_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. USER ADDRESSES TABLE (Sổ Địa chỉ Giao hàng)
CREATE TABLE IF NOT EXISTS public.user_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  tag TEXT DEFAULT 'HOME', -- 'HOME' | 'OFFICE' | 'SCHOOL' | 'OTHER'
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  contact_name TEXT,
  contact_phone TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. USER WALLETS & TRANSACTIONS TABLE (Ví FoodApp Pay)
CREATE TABLE IF NOT EXISTS public.user_wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  balance NUMERIC(12,2) DEFAULT 150000,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  type TEXT NOT NULL, -- 'TOPUP' | 'PAYMENT' | 'REFUND'
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. SHIPPER WITHDRAWALS TABLE (Rút tiền Shipper)
CREATE TABLE IF NOT EXISTS public.shipper_withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipper_id UUID REFERENCES public.shippers(id) ON DELETE CASCADE,
  bank_name TEXT DEFAULT 'Vietcombank',
  account_number TEXT DEFAULT '99998888',
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'COMPLETED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
