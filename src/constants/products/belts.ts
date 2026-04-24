import type { CatalogProduct } from "~/types/landing";

/** Danh mục Thắt Lưng — 6 sản phẩm. */
export const BELT_PRODUCTS: CatalogProduct[] = [
  {
    id: "p-belt-01",
    slug: "da-bo-fullgrain-italy",
    name: "Thắt Lưng Da Bò Full-grain Italy",
    brand: "IRONMAN",
    categorySlug: "belts",
    categoryName: "Belts",
    price: 480000,
    icon: "belt",
    images: [
      "https://i.pinimg.com/736x/17/81/0e/17810e7b4d6202513d523d16d0a914e4.jpg",
      "https://i.pinimg.com/1200x/55/9e/2a/559e2a96af6c83a31870e790933ca8ce.jpg",
      "https://i.pinimg.com/736x/42/1f/b7/421fb7e5841fa12d91d24fecfe2c380f.jpg"
    ],
    description:
      "Da bò full-grain nhập Italy, khoá kim inox không rỉ, đường may chỉ sáp tay.",
    specs: [
      { label: "Chất liệu", value: "Da bò full-grain" },
      { label: "Khoá", value: "Inox 316L" },
      { label: "Rộng", value: "35mm" },
      { label: "Xuất xứ da", value: "Italy" },
    ],
    tags: ["fullgrain", "classic"],
    rating: 4.6,
    reviewCount: 201,
    stock: 50,
    isBestSeller: true,
  },
  {
    id: "p-belt-02",
    slug: "that-lung-khoa-tu-dong",
    name: "Thắt Lưng Khoá Tự Động Nano",
    brand: "IRONMAN",
    categorySlug: "belts",
    categoryName: "Belts",
    price: 350000,
    icon: "belt",
    images: [
      "https://i.pinimg.com/736x/ca/d6/c1/cad6c192c03de133cd3b6db5ed7e0209.jpg",
      "https://i.pinimg.com/1200x/3d/27/e6/3d27e66ae1db922c2969195aae6d0de0.jpg",
      "https://i.pinimg.com/1200x/34/69/8f/34698f8f407716a610a582d0b1212216.jpg"
    ],
    description:
      "Khoá tự động trượt êm, da bò top-grain, cắt size tại nhà dễ dàng.",
    specs: [
      { label: "Chất liệu", value: "Da bò top-grain" },
      { label: "Khoá", value: "Tự động nano" },
      { label: "Rộng", value: "35mm" },
      { label: "Dài", value: "Cắt được" },
    ],
    tags: ["auto-buckle", "everyday"],
    rating: 4.3,
    reviewCount: 156,
    stock: 80,
    isNew: true,
  },
  {
    id: "p-belt-03",
    slug: "that-lung-da-van-ca-sau",
    name: "Thắt Lưng Da Vân Cá Sấu",
    brand: "IRONMAN",
    categorySlug: "belts",
    categoryName: "Belts",
    price: 890000,
    icon: "belt",
    images: [
      "https://i.pinimg.com/736x/ce/de/b0/cedeb01c0bcedd8f0d00fe0ce5bf148d.jpg",
      "https://i.pinimg.com/736x/fb/03/69/fb03691c238eaa797ddc7add5b666235.jpg",
      "https://i.pinimg.com/736x/05/73/85/05738518049a2f7b837888b8e9ce0520.jpg"
    ],
    description:
      "Da bò dập vân cá sấu thật, khoá liền đồng thau cổ điển. Sang trọng, bền bỉ.",
    specs: [
      { label: "Chất liệu", value: "Da bò vân cá sấu" },
      { label: "Khoá", value: "Đồng thau antique" },
      { label: "Rộng", value: "35mm" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    tags: ["croc-embossed", "luxury"],
    rating: 4.7,
    reviewCount: 88,
    stock: 15,
    isLuxury: true,
  },
  {
    id: "p-belt-04",
    slug: "that-lung-hai-mat",
    name: "Thắt Lưng Hai Mặt Đen–Nâu",
    brand: "IRONMAN",
    categorySlug: "belts",
    categoryName: "Belts",
    price: 420000,
    icon: "belt",
    images: [
      "https://i.pinimg.com/1200x/55/9e/2a/559e2a96af6c83a31870e790933ca8ce.jpg",
      "https://i.pinimg.com/736x/a6/2c/c8/a62cc883fb67f89e90309d167c39480b.jpg",
      "https://i.pinimg.com/1200x/a3/ea/37/a3ea37c3cd8abe277a647557a27dc3e8.jpg",
    ],
    description:
      "Một chiếc thắt lưng, hai phong cách: mặt đen formal, mặt nâu casual. Khoá xoay 180°.",
    specs: [
      { label: "Chất liệu", value: "Da bò split" },
      { label: "Khoá", value: "Xoay 180°" },
      { label: "Rộng", value: "33mm" },
      { label: "Màu", value: "Đen / Nâu" },
    ],
    tags: ["reversible", "versatile"],
    rating: 4.4,
    reviewCount: 134,
    stock: 42,
  },
  {
    id: "p-belt-05",
    slug: "that-lung-braided",
    name: "Thắt Lưng Bện Tay Da Bò",
    brand: "IRONMAN",
    categorySlug: "belts",
    categoryName: "Belts",
    price: 560000,
    icon: "belt",
    images: [
      "https://i.pinimg.com/1200x/fb/24/33/fb243371e059772cade37832b1b6e69e.jpg",
      "https://i.pinimg.com/1200x/69/df/01/69df01e66c5e83fa5dd0b58925dfd017.jpg",
      "https://i.pinimg.com/1200x/fd/89/2f/fd892f6abb3389f40a95d7173eb231b6.jpg"
    ],
    description:
      "Bện thủ công 8 sợi da bò, co giãn linh hoạt, không cần lỗ, thoải mái cả ngày.",
    specs: [
      { label: "Chất liệu", value: "Da bò bện 8 sợi" },
      { label: "Khoá", value: "Inox bạc" },
      { label: "Rộng", value: "35mm" },
      { label: "Co giãn", value: "Có" },
    ],
    tags: ["braided", "casual"],
    rating: 4.5,
    reviewCount: 67,
    stock: 30,
  },
  {
    id: "p-belt-06",
    slug: "that-lung-montblanc-style",
    name: "Thắt Lưng Khoá Chữ M Premium",
    brand: "IRONMAN",
    categorySlug: "belts",
    categoryName: "Belts",
    price: 680000,
    icon: "belt",
    images: [
      "https://i.pinimg.com/1200x/3e/d6/4d/3ed64def98f75dd47c10e380d3301f76.jpg",
      "https://i.pinimg.com/1200x/54/6b/9d/546b9d33d2cbd67220cabf0a322149da.jpg",
      "https://i.pinimg.com/1200x/39/d4/10/39d41025f78e031e098a1252da5ea21e.jpg"
    ],
    description:
      "Khoá chữ M mạ PVD gold, da Saffiano đen. Dòng cao cấp nhất của IRONMAN.",
    specs: [
      { label: "Chất liệu", value: "Da Saffiano" },
      { label: "Khoá", value: "PVD gold chữ M" },
      { label: "Rộng", value: "35mm" },
      { label: "Hộp", value: "Hộp gỗ + túi nhung" },
    ],
    tags: ["premium", "gift"],
    rating: 4.8,
    reviewCount: 53,
    stock: 12,
    isLuxury: true,
  },
];
