import type { CatalogCategory } from "~/types/landing";

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: "cat-watch",
    slug: "watches",
    name: "Watches",
    tagline: "Thời gian của người đàn ông",
    description:
      "Đồng hồ cơ chính hãng — từ Seiko Presage tới Mont Blanc Heritage. Chứng nhận, bảo hành quốc tế, vận chuyển an toàn.",
    icon: "watch",
    image:
      "https://i.pinimg.com/1200x/fd/98/a9/fd98a910b898a293b1c481e806387a7b.jpg",
    featured: true,
  },
  {
    id: "cat-zippo",
    slug: "zippo",
    name: "Zippo",
    tagline: "Ngọn lửa không bao giờ tắt",
    description:
      "Zippo USA chính hãng, khắc tên miễn phí. Từ classic brushed tới phiên bản giới hạn — món quà đàn ông không thể bỏ qua.",
    icon: "zippo",
    image:
      "https://i.pinimg.com/736x/88/d5/93/88d5935ecd8a7397e6a74dc9db7f2c27.jpg",
  },
  {
    id: "cat-glasses",
    slug: "glasses",
    name: "Glasses",
    tagline: "Một ánh nhìn — một phong thái",
    description:
      "Kính mát phân cực, gọng titan nhẹ, khung acetate Ý. Ray-Ban, Persol, Hugo Boss — chính hãng từng chiếc.",
    icon: "glasses",
    image:
      "https://i.pinimg.com/webp80/1200x/b5/77/0c/b5770c59a302364f9906369fc0e36cd8.webp",
  },
  {
    id: "cat-belt",
    slug: "belts",
    name: "Belts",
    tagline: "Đường nét chính giữa trang phục",
    description:
      "Thắt lưng da bò full-grain Italy, khoá liền nguyên khối, đường may chỉ sáp. Khắc tên — đóng hộp gỗ.",
    icon: "belt",
    image:
      "https://i.pinimg.com/736x/aa/49/c0/aa49c0560aab4b880aff6ff5203e3932.jpg",
  },
  {
    id: "cat-wallet",
    slug: "wallets",
    name: "Wallets",
    tagline: "Vật bất ly thân của quý ông",
    description:
      "Ví bifold, ví dài, ví card — da bê Ý, da Saffiano, da kỳ đà. Mềm mịn, lên màu đẹp theo thời gian.",
    icon: "wallet",
    image:
      "https://i.pinimg.com/1200x/55/c4/09/55c4095442731e334b8aab3b3d82e1e2.jpg",
  },
  {
    id: "cat-hat",
    slug: "hats",
    name: "Hats",
    tagline: "Phong cách trên đỉnh đầu",
    description:
      "Fedora, Flat cap, Beret, Panama — len lông cừu, da nappa, cói bện thủ công. Đậm chất quý ông cổ điển.",
    icon: "hat",
    image:
      "https://i.pinimg.com/1200x/9f/b1/3e/9fb13eb554d9d673e40b8090e5a77623.jpg",
  },
];

export const CATEGORY_BY_SLUG: Record<string, CatalogCategory> =
  Object.fromEntries(CATALOG_CATEGORIES.map((c) => [c.slug, c]));
