import type { CatalogProduct } from "~/types/landing";
import type { IconName } from "~/types/landing";
import { CATALOG_PRODUCTS } from "./products";

export interface ComboItem {
  productId: string;
  note?: string;
}

export interface Combo {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  story: string;
  heroImage: string;
  galleryImages: string[];
  icon: IconName;
  items: ComboItem[];
  /** Tổng giá lẻ tính ra từ products */
  originalPrice: number;
  /** Giá combo ưu đãi */
  comboPrice: number;
  /** Còn bao nhiêu set */
  stock: number;
  /** Mood / target user */
  occasion: string;
  perks: string[];
  badge?: string;
  badgeVariant?: "gold" | "olive" | "oxblood";
  isLimited?: boolean;
  isHot?: boolean;
}

export interface ResolvedComboItem extends ComboItem {
  product: CatalogProduct;
}

export interface ResolvedCombo extends Omit<Combo, "items"> {
  items: ResolvedComboItem[];
  savings: number;
  savingsPercent: number;
}

const findProduct = (slugOrId: string): CatalogProduct => {
  const p = CATALOG_PRODUCTS.find(
    (x) => x.slug === slugOrId || x.id === slugOrId
  );
  if (!p)
    throw new Error(`[combos] Product not found for "${slugOrId}". Check slug.`);
  return p;
};

export const COMBOS: Combo[] = [
  {
    id: "combo-gentleman-essential",
    slug: "gentleman-essential",
    name: "Bộ Quý Ông — Essential",
    tagline: "Thắt Lưng × Ví × Kính · 3 món tinh tuyển",
    story:
      "Khi ra khỏi nhà, bạn chỉ cần 3 thứ. Một chiếc thắt lưng giữ form chuẩn, một chiếc ví mềm tay, và một cặp kính giấu đi cái nhìn thấu suốt của một người đàn ông từng trải.",
    heroImage:
      "https://images.unsplash.com/photo-1593030668930-8130abedd2f8?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    ],
    icon: "belt",
    items: [
      { productId: "da-bo-fullgrain-italy", note: "Da bò Italy full-grain" },
      { productId: "vi-bifold-italy", note: "Veg-tan, lên patina theo năm tháng" },
      { productId: "rayban-aviator-classic", note: "Phi công huyền thoại 1937" },
    ],
    originalPrice: 480_000 + 850_000 + 2_200_000,
    comboPrice: 2_990_000,
    stock: 24,
    occasion: "Đi làm · Họp đối tác · Daily wear",
    perks: [
      "Hộp gỗ phôi khắc tên miễn phí",
      "Thiệp viết tay theo tên người nhận",
      "Bảo hành da 12 tháng · Kính 24 tháng",
      "Giao trong 2h nội thành",
    ],
    badge: "Best Combo",
    badgeVariant: "gold",
    isHot: true,
  },
  {
    id: "combo-fire-iron",
    slug: "fire-iron",
    name: "Bộ Lửa & Thép — Đồng Hồ × Zippo",
    tagline: "Tissot PRX × Zippo Armor · Quà tặng đỉnh cao",
    story:
      "Thời gian và lửa — hai thứ một quý ông không bao giờ rời tay. Một cỗ máy Thụy Sỹ trữ cót 80 giờ. Một viên thép Mỹ khắc 360°. Cả hai đều bảo hành dài hơn cả lời hứa.",
    heroImage:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=900&q=80",
      "https://i.pinimg.com/736x/0f/49/d2/0f49d26cfb9f2240619adb8814872fca.jpg",
    ],
    icon: "watch",
    items: [
      { productId: "rolex-do", note: "Rolex đỏ · Automatic flagship" },
      { productId: "zippo-armor-deep-carve", note: "Armor 1.5x · Khắc Celtic 360°" },
    ],
    originalPrice: 280_000 + 1_350_000,
    comboPrice: 1_490_000,
    stock: 6,
    occasion: "Quà sinh nhật · Tặng sếp · Kỉ niệm cha–con",
    perks: [
      "Hộp da bò nguyên tấm + đai khoá đồng",
      "Khắc tên Zippo + đáy đồng hồ",
      "Bảo hành đồng hồ 24 tháng · Zippo trọn đời",
      "Bảo hiểm vận chuyển 100% giá trị",
    ],
    badge: "Limited · 06 Sets",
    badgeVariant: "oxblood",
    isLimited: true,
  },
  {
    id: "combo-everyday-carry",
    slug: "everyday-carry",
    name: "EDC — Everyday Carry",
    tagline: "Card Holder × Money Clip × Zippo Navy",
    story:
      "Túi quần trước đủ rồi. Một card holder Saffiano 6 ngăn. Một money clip thép phay CNC. Một viên Zippo navy không phô trương. Thiết kế cho người ghét rườm rà.",
    heroImage:
      "https://i.pinimg.com/736x/ba/60/3f/ba603fc7eeb31b65c935eb6b35cc6e19.jpg",
    galleryImages: [
      "https://i.pinimg.com/736x/ba/60/3f/ba603fc7eeb31b65c935eb6b35cc6e19.jpg",
    ],
    icon: "wallet",
    items: [
      { productId: "vi-card-holder", note: "Saffiano 6 ngăn · 7mm mỏng" },
      { productId: "vi-money-clip", note: "Thép 316L phay CNC" },
      { productId: "zippo-matte-navy", note: "Navy matte #239" },
    ],
    originalPrice: 350_000 + 450_000 + 550_000,
    comboPrice: 1_190_000,
    stock: 40,
    occasion: "Daily · Du lịch · Off-day phong cách tối giản",
    perks: [
      "Túi nhung đựng riêng cho từng món",
      "Khắc tên Zippo miễn phí",
      "Đổi trả 30 ngày không cần lý do",
    ],
    badge: "Mới",
    badgeVariant: "olive",
    isHot: true,
  },
  {
    id: "combo-classic-attire",
    slug: "classic-attire",
    name: "Cổ Điển — Fedora × Đồng Hồ × Thắt Lưng",
    tagline: "Phong cách Peaky · Quý ông thập niên 40",
    story:
      "Bauhaus trên cổ tay. Lông cừu Úc trên đầu. Da Italy quanh hông. Một set không thể nhầm lẫn — dành cho những buổi chụp hình cưới, tiệc tối, hoặc đơn giản là thứ hai.",
    heroImage:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?auto=format&fit=crop&w=900&q=80",
    ],
    icon: "hat",
    items: [
      { productId: "fedora-len-long-cuu", note: "Len lông cừu Úc · vành 7cm" },
      { productId: "omega-kham-trai", note: "Omega khảm trai · Automatic" },
      { productId: "that-lung-da-van-ca-sau", note: "Da vân cá sấu · khoá đồng" },
    ],
    originalPrice: 680_000 + 300_000 + 890_000,
    comboPrice: 1_590_000,
    stock: 12,
    occasion: "Sự kiện · Chụp hình cưới · Tiệc trang trọng",
    perks: [
      "Hộp gỗ + ngăn nhung tách rời",
      "Free điều chỉnh size mũ tại cửa hàng",
      "Bảo hành đồng hồ 24 tháng",
    ],
    badge: "Editor's Pick",
    badgeVariant: "gold",
  },
];

export const COMBO_BY_SLUG: Record<string, Combo> = Object.fromEntries(
  COMBOS.map((c) => [c.slug, c])
);

export function resolveCombo(combo: Combo): ResolvedCombo {
  const items: ResolvedComboItem[] = combo.items.map((it) => ({
    ...it,
    product: findProduct(it.productId),
  }));
  const savings = combo.originalPrice - combo.comboPrice;
  const savingsPercent = Math.round((savings / combo.originalPrice) * 100);
  return { ...combo, items, savings, savingsPercent };
}

export const RESOLVED_COMBOS: ResolvedCombo[] = COMBOS.map(resolveCombo);
