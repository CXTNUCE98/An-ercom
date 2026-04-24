import type { CatalogProduct } from "~/types/landing";

/** Danh mục Mũ — 6 sản phẩm. */
export const HAT_PRODUCTS: CatalogProduct[] = [
  {
    id: "p-hat-01",
    slug: "fedora-len-long-cuu",
    name: "Fedora Len Lông Cừu Classic",
    brand: "IRONMAN",
    categorySlug: "hats",
    categoryName: "Hats",
    price: 680000,
    icon: "hat",
    images: [
      "https://i.pinimg.com/1200x/cc/d7/6a/ccd76abca2485d4e7bebee50532010a2.jpg",
      "https://i.pinimg.com/736x/48/e2/26/48e226bab1875bdfb2e6efadd4df7421.jpg",
      "https://i.pinimg.com/736x/68/1f/e1/681fe1ba2143e351d4285b252a753757.jpg"
    ],
    description:
      "Len lông cừu Úc, vành 7cm, băng grosgrain đen. Phong cách quý ông thập niên 40.",
    specs: [
      { label: "Chất liệu", value: "Len lông cừu 100%" },
      { label: "Vành", value: "7cm" },
      { label: "Size", value: "M/L/XL" },
      { label: "Màu", value: "Đen / Xám / Nâu" },
    ],
    tags: ["fedora", "classic", "wool"],
    rating: 4.7,
    reviewCount: 56,
    stock: 20,
    isBestSeller: true,
  },
  {
    id: "p-hat-02",
    slug: "flat-cap-tweed",
    name: "Flat Cap Tweed Harris",
    brand: "IRONMAN",
    categorySlug: "hats",
    categoryName: "Hats",
    price: 520000,
    icon: "hat",
    images: [
      "https://i.pinimg.com/1200x/83/2c/a4/832ca4799a32ceaec2bff534e60a041d.jpg",
      "https://i.pinimg.com/1200x/15/4a/bb/154abb4b8d8cf8b291bdcab66974ccb0.jpg",
      "https://i.pinimg.com/1200x/4f/f5/6e/4ff56e991c9050610d984af728ebe60c.jpg"
    ],
    description:
      "Vải tweed Harris Scotland, lót lụa, lưỡi trai cứng. Mũ beret Anh cổ điển.",
    specs: [
      { label: "Chất liệu", value: "Harris Tweed" },
      { label: "Lót", value: "Lụa" },
      { label: "Size", value: "M/L/XL" },
      { label: "Xuất xứ vải", value: "Scotland" },
    ],
    tags: ["flat-cap", "tweed", "british"],
    rating: 4.6,
    reviewCount: 43,
    stock: 18,
    isNew: true,
  },
  {
    id: "p-hat-03",
    slug: "beret-da-nappa",
    name: "Beret Da Nappa Đen",
    brand: "IRONMAN",
    categorySlug: "hats",
    categoryName: "Hats",
    price: 750000,
    icon: "hat",
    images: [
      "https://i.pinimg.com/1200x/78/73/cd/7873cd163419e07da52ed2adb1fe77a6.jpg",
      "https://i.pinimg.com/1200x/11/cb/b8/11cbb8ae40f317fe395720259f746882.jpg",
      "https://i.pinimg.com/1200x/d2/c0/15/d2c0150e26f1746ff2ebd71bb381d986.jpg"
    ],
    description:
      "Da nappa cừu mềm mịn, lót cotton thoáng, kiểu dáng beret Pháp. Sang trọng bốn mùa.",
    specs: [
      { label: "Chất liệu", value: "Da nappa cừu" },
      { label: "Lót", value: "Cotton" },
      { label: "Size", value: "M/L/XL" },
      { label: "Màu", value: "Đen" },
    ],
    tags: ["beret", "leather", "french"],
    rating: 4.8,
    reviewCount: 31,
    stock: 10,
    isLuxury: true,
  },
  {
    id: "p-hat-04",
    slug: "panama-coi-thu-cong",
    name: "Mũ Panama Cói Ecuador",
    brand: "IRONMAN",
    categorySlug: "hats",
    categoryName: "Hats",
    price: 1200000,
    icon: "hat",
    images: [
      "https://i.pinimg.com/1200x/e0/5b/ec/e05bec58810a77e405a8ae03a6dc1a59.jpg",
      "https://i.pinimg.com/1200x/33/12/0c/33120c6ce7d4107d1e2ca230bd8b634f.jpg",
      "https://i.pinimg.com/736x/e7/da/d0/e7dad0df02a85e762fd17dd8a778b2e9.jpg"
    ],
    description:
      "Cói Toquilla bện thủ công tại Ecuador. Nhẹ, thoáng, gập được. Biểu tượng mùa hè quý ông.",
    specs: [
      { label: "Chất liệu", value: "Cói Toquilla" },
      { label: "Bện", value: "Thủ công" },
      { label: "Vành", value: "6.5cm" },
      { label: "Xuất xứ", value: "Ecuador" },
    ],
    tags: ["panama", "handmade", "summer"],
    rating: 4.9,
    reviewCount: 19,
    stock: 6,
    isLuxury: true,
  },
  {
    id: "p-hat-05",
    slug: "mu-newsboy-wool",
    name: "Newsboy Cap Wool Blend",
    brand: "IRONMAN",
    categorySlug: "hats",
    categoryName: "Hats",
    price: 450000,
    icon: "hat",
    images: [
      "https://i.pinimg.com/1200x/bc/4c/72/bc4c72085ef2b03ec5868342add4995e.jpg",
      "https://i.pinimg.com/1200x/47/2a/36/472a36776a7072c712fe5e1aca856bfe.jpg",
      "https://i.pinimg.com/1200x/e1/e4/f7/e1e4f7cbe26e009cf97026148c41dcb8.jpg"
    ],
    description:
      "Mũ newsboy 8 múi, len pha, nút bọc trên đỉnh. Phong cách Peaky Blinders.",
    specs: [
      { label: "Chất liệu", value: "Len pha 80/20" },
      { label: "Kiểu", value: "8 múi" },
      { label: "Size", value: "M/L/XL" },
      { label: "Màu", value: "Xám đậm" },
    ],
    tags: ["newsboy", "peaky-blinders"],
    rating: 4.5,
    reviewCount: 67,
    stock: 25,
    isBestSeller: true,
  },
  {
    id: "p-hat-06",
    slug: "mu-bucket-da-lon",
    name: "Bucket Hat Da Lộn",
    brand: "IRONMAN",
    categorySlug: "hats",
    categoryName: "Hats",
    price: 580000,
    icon: "hat",
    images: [
      "https://i.pinimg.com/1200x/1c/b2/a7/1cb2a7610488aeb35888fa60b5351542.jpg",
      "https://i.pinimg.com/736x/f6/2c/52/f62c52f475367999bac5c895d64a10ce.jpg",
      "https://i.pinimg.com/736x/46/46/52/46465222eba289d67fef7bee92611ff2.jpg"
    ],
    description:
      "Da lộn (suede) mềm mại, vành ngắn 5cm, kiểu dáng bucket hiện đại. Casual sang trọng.",
    specs: [
      { label: "Chất liệu", value: "Da lộn (suede)" },
      { label: "Vành", value: "5cm" },
      { label: "Size", value: "M/L" },
      { label: "Màu", value: "Nâu camel" },
    ],
    tags: ["bucket", "suede", "casual"],
    rating: 4.4,
    reviewCount: 38,
    stock: 22,
    isNew: true,
  },
];
