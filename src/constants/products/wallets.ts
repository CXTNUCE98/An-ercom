import type { CatalogProduct } from "~/types/landing";

/** Danh mục Ví Da — 6 sản phẩm. */
export const WALLET_PRODUCTS: CatalogProduct[] = [
  {
    id: "p-wallet-01",
    slug: "vi-bifold-italy",
    name: "Ví Bifold Da Bò Italy",
    brand: "IRONMAN",
    categorySlug: "wallets",
    categoryName: "Wallets",
    price: 850000,
    icon: "wallet",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://i.pinimg.com/1200x/eb/d5/92/ebd592fc3839b828cbffea15e5f9457e.jpg",
      "https://i.pinimg.com/1200x/46/3d/2c/463d2cadc0d4614e9c67b58403856cca.jpg"
    ],
    description:
      "Da bò Italy vegetable-tanned, 8 ngăn thẻ, 2 ngăn tiền, 1 ngăn zip. Lên patina đẹp theo thời gian.",
    specs: [
      { label: "Chất liệu", value: "Veg-tan Italy" },
      { label: "Ngăn thẻ", value: "8" },
      { label: "Kích thước", value: "11×9.5cm" },
      { label: "Màu", value: "Nâu cognac" },
    ],
    tags: ["bifold", "classic"],
    rating: 4.7,
    reviewCount: 189,
    stock: 35,
    isBestSeller: true,
  },
  {
    id: "p-wallet-02",
    slug: "vi-card-holder",
    name: "Card Holder Da Saffiano",
    brand: "IRONMAN",
    categorySlug: "wallets",
    categoryName: "Wallets",
    price: 350000,
    icon: "wallet",
    images: [
      "https://i.pinimg.com/1200x/10/e7/2b/10e72b3980b5d6def01bf4e8cdd8ba8e.jpg",
      "https://i.pinimg.com/736x/50/e3/3b/50e33b9226a0526f01a9f4a1985ec362.jpg",
      "https://i.pinimg.com/1200x/34/c8/69/34c869f091ee5cd0f4d80f3473e62adf.jpg"
    ],
    description:
      "6 ngăn thẻ, 1 ngăn giữa. Da Saffiano chống trầy, mỏng gọn bỏ túi trước.",
    specs: [
      { label: "Chất liệu", value: "Da Saffiano" },
      { label: "Ngăn thẻ", value: "6" },
      { label: "Kích thước", value: "10×7.5cm" },
      { label: "Độ dày", value: "7mm" },
    ],
    tags: ["card-holder", "slim"],
    rating: 4.5,
    reviewCount: 234,
    stock: 65,
    isNew: true,
  },
  {
    id: "p-wallet-03",
    slug: "vi-dai-da-bo",
    name: "Ví Dài Da Bò Zipper",
    brand: "IRONMAN",
    categorySlug: "wallets",
    categoryName: "Wallets",
    price: 980000,
    icon: "wallet",
    images: [
      "https://i.pinimg.com/1200x/85/43/b6/8543b6fe224c7fda9332dbb8af96cd0a.jpg",
      "https://i.pinimg.com/736x/21/1f/ce/211fced8a24ce75b3f62f5ab920f580e.jpg",
      "https://i.pinimg.com/736x/54/6e/b7/546eb7d247c5d38b378d000aeae03a20.jpg"
    ],
    description:
      "Ví dài full-zip, 12 ngăn thẻ, 3 ngăn tiền, 1 ngăn phone. Da bò nappa mềm mịn.",
    specs: [
      { label: "Chất liệu", value: "Da nappa" },
      { label: "Ngăn thẻ", value: "12" },
      { label: "Kích thước", value: "20×10cm" },
      { label: "Khóa", value: "YKK zipper" },
    ],
    tags: ["long-wallet", "zipper"],
    rating: 4.6,
    reviewCount: 97,
    stock: 20,
    isLuxury: true,
  },
  {
    id: "p-wallet-04",
    slug: "vi-money-clip",
    name: "Money Clip Da + Thép",
    brand: "IRONMAN",
    categorySlug: "wallets",
    categoryName: "Wallets",
    price: 450000,
    icon: "wallet",
    images: [
      "https://i.pinimg.com/736x/dc/b7/f6/dcb7f6eb3fdbd389747aeb7a00cfcc0f.jpg",
      "https://i.pinimg.com/1200x/a3/2c/9b/a32c9bc1697a2d1ef3196265a74aba5d.jpg",
      "https://i.pinimg.com/736x/94/d1/ae/94d1ae23346772eb10d144b2343b014a.jpg"
    ],
    description:
      "Kẹp tiền thép phay CNC, bọc da bò hai mặt. 4 ngăn thẻ. Mỏng chỉ 8mm.",
    specs: [
      { label: "Chất liệu", value: "Da bò + thép 316L" },
      { label: "Ngăn thẻ", value: "4" },
      { label: "Kích thước", value: "10.5×7.5cm" },
      { label: "Độ dày", value: "8mm" },
    ],
    tags: ["money-clip", "minimalist"],
    rating: 4.4,
    reviewCount: 78,
    stock: 38,
  },
  {
    id: "p-wallet-05",
    slug: "vi-passport-da",
    name: "Ví Passport Da Bò",
    brand: "IRONMAN",
    categorySlug: "wallets",
    categoryName: "Wallets",
    price: 520000,
    icon: "wallet",
    images: [
      "https://i.pinimg.com/1200x/46/3d/2c/463d2cadc0d4614e9c67b58403856cca.jpg",
      "https://i.pinimg.com/736x/ef/d0/d0/efd0d0259d6f44ed90ef3b284183514e.jpg",
      "https://i.pinimg.com/736x/9a/fd/31/9afd31bffb8bd246c24f575dd103fb2d.jpg"
    ],
    description:
      "Ngăn passport, 4 ngăn thẻ, ngăn boarding pass. Khắc tên miễn phí — quà đi du lịch lý tưởng.",
    specs: [
      { label: "Chất liệu", value: "Da bò full-grain" },
      { label: "Ngăn", value: "Passport + 4 thẻ" },
      { label: "Kích thước", value: "14×10cm" },
      { label: "Khắc tên", value: "Miễn phí" },
    ],
    tags: ["passport", "travel", "gift"],
    rating: 4.8,
    reviewCount: 112,
    stock: 25,
    isBestSeller: true,
  },
  {
    id: "p-wallet-06",
    slug: "vi-rfid-blocking",
    name: "Ví RFID Blocking Slim",
    brand: "IRONMAN",
    categorySlug: "wallets",
    categoryName: "Wallets",
    price: 620000,
    icon: "wallet",
    images: [
      "https://i.pinimg.com/1200x/a9/27/0f/a9270f189c9848a910bf918ed0e3835f.jpg",
      "https://i.pinimg.com/1200x/09/c9/bb/09c9bb6475256e2a8250384670932204.jpg",
      "https://i.pinimg.com/1200x/9d/0c/de/9d0cdee5f635d10ce299f39a6d741544.jpg"
    ],
    description:
      "Lớp chống RFID bảo vệ thẻ. Da carbon fiber texture, 6 ngăn thẻ, ngăn tiền mặt.",
    specs: [
      { label: "Chất liệu", value: "Da carbon texture" },
      { label: "RFID", value: "Blocking" },
      { label: "Ngăn thẻ", value: "6" },
      { label: "Độ dày", value: "10mm" },
    ],
    tags: ["rfid", "tech", "slim"],
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    isNew: true,
  },
];
