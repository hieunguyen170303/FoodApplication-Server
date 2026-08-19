import { supabaseAdmin } from "../config/supabase";

// Mock Fallback Data matching frontend designs
const MOCK_CATEGORIES = [
  { id: "cat_1", title: "BURGERS", bgColor: "#E98308", image: "burgerTwo" },
  { id: "cat_2", title: "PIZZA", bgColor: "#0D4D3A", image: "pizzaOne" },
  { id: "cat_3", title: "BURRITO", bgColor: "#D54E13", image: "burrito" },
];

const MOCK_RESTAURANTS = [
  {
    id: "r1",
    name: "Burger King - Thủ Dầu Một",
    branch: "Thủ Dầu Một, Bình Dương",
    logo: "burgerOne",
    rating: 4.8,
    reviewCount: "500+",
    category: "Burgers",
    priceRange: "30k - 100k",
    originalDeliveryFee: "25.000đ",
    deliveryFee: "15.000đ",
    deliveryTime: "20-25 phút",
    isSponsored: true,
    tag: "Yêu thích",
    voucherBadge: "Giảm 15k",
    minOrder: "Đơn từ 50k",
  },
  {
    id: "r2",
    name: "Jollibee - Coopmart Bình Dương",
    branch: "EC Nguyễn Du - Thủ Dầu Một",
    logo: "logo",
    rating: 4.4,
    reviewCount: "1K+",
    category: "Burgers",
    priceRange: "30.000đ - 42.000đ",
    originalDeliveryFee: "42.000đ",
    deliveryFee: "30.000đ",
    deliveryTime: "36 phút trở lên",
    isSponsored: true,
    tag: "Bán chạy nhất",
    voucherBadge: "Giảm 10k",
    minOrder: "Đơn từ 70k",
  },
  {
    id: "r3",
    name: "KFC - Tòa Nhà Sora Gardens SC",
    branch: "Hòa Phú, Thủ Dầu Một",
    logo: "burgerTwo",
    rating: 4.6,
    reviewCount: "800+",
    category: "Pizza",
    priceRange: "40k - 150k",
    deliveryFee: "17.000đ",
    deliveryTime: "25 phút",
    tag: "Giao hàng nhanh",
    voucherBadge: "Freeship",
  },
];

const MOCK_SEARCH_FOODS = [
  {
    id: "g1",
    restaurantId: "r1",
    name: "Wendy's Burger",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burgers",
    image: "burgerOne",
  },
  {
    id: "g2",
    restaurantId: "r2",
    name: "Veggie Burger",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burgers",
    image: "burgerTwo",
  },
  {
    id: "g3",
    restaurantId: "r3",
    name: "Margherita Magic",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Pizza",
    image: "pizzaOne",
  },
  {
    id: "g4",
    restaurantId: "r3",
    name: "Veggie Delight",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Pizza",
    image: "pizzaOne",
  },
  {
    id: "g5",
    restaurantId: "r1",
    name: "Chicken Wrap",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burrito",
    image: "burrito",
  },
  {
    id: "g6",
    restaurantId: "r2",
    name: "Big Beef Burrito",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burrito",
    image: "burrito",
  },
];

const MOCK_JOLLIBEE_DETAIL = {
  id: "r2",
  name: "Jollibee",
  branch: "EC Nguyễn Du - Thủ Dầu Một",
  logo: "logo",
  rating: 4.4,
  reviewCount: "1K+",
  originalDeliveryFee: "42.000đ",
  deliveryFee: "30.000đ",
  deliveryTime: "36 phút trở lên",
  vouchers: [
    { id: "v1", title: "Giảm 10.000đ", subtitle: "Đơn hàng từ 70.000đ" },
    { id: "v2", title: "Ưu đãi đến 10%", subtitle: "Đặt đơn nhóm" },
  ],
  menuSections: [
    {
      id: "sec_today_deals",
      title: "Ưu đãi hôm nay",
      items: [
        {
          id: "m1",
          name: "2 Gà Giòn Vui Vẻ + 2 Mỳ Ý Jolly vừa + 1 Khoai Tây Chiên vừa + 2 Nước ngọt",
          description: "Giá gốc 180.000. 2 Gà Giòn Vui Vẻ + 2 Mỳ Ý Jolly vừa + 1 Khoai Tây...",
          price: 145000,
          originalPrice: 180000,
          image: "burgerOne",
          tag: "Ưu đãi 20%",
        },
      ],
    },
    {
      id: "sec_for_you",
      title: "Dành cho bạn",
      items: [
        {
          id: "m2",
          name: "1 Miếng Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly vừa + 1 Khoai tây chiên vừa + 1 Bánh xoài đào + 1 Nước ngọt",
          description: "Giá gốc 80.000. 1 Miếng Gà Giòn Vui Vẻ + 1 Khoai tây chiên vừa + 1 Bánh xoài đào + 1 Nước ngọt lớn",
          price: 78000,
          originalPrice: 80000,
          image: "burgerOne",
          tag: "Bán chạy",
          isPopular: true,
          optionGroups: [
            {
              id: "g_mango_pie",
              title: "Chọn Bánh Xoài Đào :",
              required: true,
              options: [{ id: "opt_mango_1", name: "1 Bánh xoài đào", extraPrice: 0, isDefault: true }],
            },
            {
              id: "g_drink",
              title: "Chọn Nước 1:",
              required: true,
              options: [
                { id: "opt_pepsi", name: "1 Pepsi lớn", extraPrice: 0, isDefault: true },
                { id: "opt_7up", name: "1 7up lớn", extraPrice: 0 },
                { id: "opt_mirinda", name: "1 Mirinda cam lớn", extraPrice: 0 },
              ],
            },
            {
              id: "g_chicken",
              title: "Chọn 1 Gà giòn - 1:",
              required: true,
              options: [
                { id: "opt_chick_original", name: "1 Gà giòn vui vẻ", extraPrice: 0, isDefault: true },
                { id: "opt_chick_spicy", name: "1 Miếng Gà Sốt Cay", extraPrice: 2000 },
              ],
            },
            {
              id: "g_fries",
              title: "Chọn 1 Khoai Tây Chiên - 1:",
              required: true,
              options: [
                { id: "opt_fries_reg", name: "1 Khoai tây chiên vừa", extraPrice: 0, isDefault: true },
                { id: "opt_fries_large", name: "1 Khoai Tây Chiên lớn", extraPrice: 10000 },
                { id: "opt_fries_bbq", name: "1 Khoai Lắc Vị BBQ", extraPrice: 5000 },
                { id: "opt_fries_bbq_large", name: "1 Khoai Lắc Vị BBQ Lớn", extraPrice: 15000 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export class RestaurantService {
  static async getCategories() {
    try {
      const { data, error } = await supabaseAdmin.from("categories").select("*");
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase categories fallback to mock");
    }
    return MOCK_CATEGORIES;
  }

  static async getRestaurants(category?: string, searchKey?: string) {
    try {
      let query = supabaseAdmin.from("restaurants").select("*");
      if (category) query = query.eq("category", category);
      if (searchKey) query = query.ilike("name", `%${searchKey}%`);

      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase restaurants fallback to mock");
    }

    if (searchKey) {
      return MOCK_RESTAURANTS.filter((r) =>
        r.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    return MOCK_RESTAURANTS;
  }

  static async getRestaurantDetail(id: string) {
    try {
      const { data: restaurant, error } = await supabaseAdmin
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && restaurant) {
        return restaurant;
      }
    } catch (e) {
      console.warn("Supabase restaurant detail fallback to mock");
    }

    return MOCK_JOLLIBEE_DETAIL;
  }

  static async searchFoodsAndStores(searchKey?: string, category?: string) {
    let foods = MOCK_SEARCH_FOODS;
    let restaurants = MOCK_RESTAURANTS;

    const cat = category?.trim();
    if (cat && cat !== "All" && cat !== "Tất cả") {
      foods = foods.filter((f) => f.category.toLowerCase() === cat.toLowerCase());
      restaurants = restaurants.filter(
        (r) =>
          r.category.toLowerCase().includes(cat.toLowerCase()) ||
          r.name.toLowerCase().includes(cat.toLowerCase())
      );
    }

    const q = searchKey?.trim().toLowerCase();
    if (q) {
      foods = foods.filter((f) => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
      restaurants = restaurants.filter(
        (r) => r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
      );
    }

    return { foods, restaurants };
  }
}
