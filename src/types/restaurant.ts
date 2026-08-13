export interface RestaurantRow {
  id: string;
  name: string;
  branch: string;
  logo_url: string;
  rating: number;
  review_count: string;
  delivery_fee: number;
  original_delivery_fee?: number;
  delivery_time: string;
  category: string;
  is_sponsored?: boolean;
  tag?: string;
  voucher_badge?: string;
  min_order?: string;
  created_at?: string;
}

export interface MenuSectionRow {
  id: string;
  restaurant_id: string;
  title: string;
  sort_order?: number;
}

export interface MenuItemRow {
  id: string;
  section_id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  tag?: string;
  is_popular?: boolean;
  is_new?: boolean;
}

export interface OptionGroupRow {
  id: string;
  menu_item_id: string;
  title: string;
  is_required: boolean;
}

export interface OptionRow {
  id: string;
  group_id: string;
  name: string;
  extra_price: number;
  is_default?: boolean;
}
