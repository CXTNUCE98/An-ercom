import type {
  Product,
  Category,
  EditorialFeature,
  LifestyleFeature,
  Testimonial,
  NavItem,
  Stat,
} from '~/types/landing';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Đồng Hồ', path: '/dong-ho' },
  { name: 'Zippo', path: '/zippo' },
  { name: 'Kính Mắt', path: '/kinh-mat' },
  { name: 'Thắt Lưng', path: '/that-lung' },
  { name: 'Ví Da', path: '/vi-da' },
];

export const HERO_STATS: Stat[] = [
  { value: '500', suffix: '+', label: 'Sản phẩm chọn lọc' },
  { value: '12', suffix: 'k', label: 'Khách hàng tin dùng' },
  { value: '10', suffix: 'năm', label: 'Lành nghề' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'seiko-presage',
    category: 'Đồng Hồ Cơ',
    name: 'Seiko Presage Cocktail Time',
    price: '4.500.000đ',
    icon: 'watch',
    image: '',
    badge: 'Bán Chạy #1',
    featured: true,
  },
  {
    id: 'zippo-black-ice',
    category: 'Zippo USA',
    name: 'Zippo Black Ice Brushed',
    price: '650.000đ',
    icon: 'zippo',
    image: '',
    badge: 'Mới Về',
    badgeVariant: 'olive',
  },
  {
    id: 'rayban-aviator',
    category: 'Kính Mát',
    name: 'Ray-Ban Aviator Classic',
    price: '2.200.000đ',
    icon: 'glasses',
    image: '',
  },
  {
    id: 'belt-genuine',
    category: 'Thắt Lưng Da',
    name: 'Da Bò Full-grain Italy',
    price: '480.000đ',
    icon: 'belt',
    image: '',
  },
  {
    id: 'wallet-italy',
    category: 'Ví Da Cao Cấp',
    name: 'Ví Da Bò Italy Bifold',
    price: '850.000đ',
    icon: 'wallet',
    image: '',
  },
];

export const CATEGORIES: Category[] = [
  { name: 'Đồng Hồ', icon: 'watch', count: 142, featured: true, image: '' },
  { name: 'Zippo', icon: 'zippo', count: 89, image: '' },
  { name: 'Kính Mắt', icon: 'glasses', count: 76, image: '' },
  { name: 'Thắt Lưng', icon: 'belt', count: 58, image: '' },
  { name: 'Ví Da', icon: 'wallet', count: 94, image: '' },
];

export const EDITORIAL_FEATURES: EditorialFeature[] = [
  { icon: 'check',  title: 'Chất Liệu Thật',     desc: 'Da bò full-grain · Thép 316L · Thau đặc' },
  { icon: 'shield', title: 'Bảo Hành Trọn Đời',  desc: 'Đồng hồ 24 tháng · Zippo trọn đời' },
  { icon: 'truck',  title: 'Giao Trong Ngày',    desc: 'Nội thành 2h · Toàn quốc 24h' },
  { icon: 'return', title: 'Đổi Trả 30 Ngày',    desc: 'Hoàn tiền không cần lý do' },
];

export const LIFESTYLE_FEATURES: LifestyleFeature[] = [
  { icon: 'gift',    title: 'Hộp Quà Sang',           desc: 'Hộp gỗ phôi · Ribbon lụa · Thiệp viết tay' },
  { icon: 'engrave', title: 'Khắc Tên Miễn Phí',      desc: 'Khắc laser sắc nét trên Zippo & thắt lưng' },
  { icon: 'box',     title: 'Giao Đúng Hẹn',          desc: 'Cam kết giao trước ngày trọng đại' },
  { icon: 'card',    title: 'Trả Góp 0%',              desc: 'Linh hoạt qua thẻ tín dụng các ngân hàng' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    quote:
      'Mua chiếc Seiko tặng ba, ông cụ đeo suốt không tháo. Đóng gói chỉn chu, có giấy bảo hành đàng hoàng — hơn cả mong đợi.',
    name: 'Thanh Lâm',
    role: 'Doanh nhân · Hà Nội',
    initials: 'TL',
  },
  {
    stars: 5,
    quote:
      'Khắc tên ba lên Zippo, chữ sắc và sâu, cảm giác cầm trong tay nặng đúng kiểu. Ba thích lắm, lấy ra ngắm hoài.',
    name: 'Hoàng Minh',
    role: 'Kiến trúc sư · Đà Nẵng',
    initials: 'HM',
  },
  {
    stars: 5,
    quote:
      'Ví da bò Italy mềm mịn, đường may chắc, mùi da thật chứ không phải da PU. Mua cho chồng và anh ấy mê ngay.',
    name: 'Ngọc Quỳnh',
    role: 'Khách hàng · TP.HCM',
    initials: 'NQ',
  },
];

export const BRANDS: string[] = [
  'SEIKO',
  'ZIPPO',
  'RAY-BAN',
  'FOSSIL',
  'MONT BLANC',
  'HUGO BOSS',
  'DIESEL',
];

export const MARQUEE_ITEMS: string[] = [
  'Đồng Hồ Cơ',
  'Zippo Chính Hãng',
  'Kính Phân Cực',
  'Thắt Lưng Da Thật',
  'Ví Bò Italy',
  'Khắc Tên Tặng Quà',
  'Bảo Hành Dài Hạn',
];

export const FOOTER_CATEGORIES: NavItem[] = NAV_ITEMS;

export const FOOTER_SUPPORT: NavItem[] = [
  { name: 'Chính Sách Đổi Trả', path: '#' },
  { name: 'Bảo Hành',           path: '#' },
  { name: 'Vận Chuyển',         path: '#' },
  { name: 'Câu Hỏi Thường Gặp', path: '#' },
];

export const FOOTER_CONTACT: NavItem[] = [
  { name: 'Hotline: 1800 1234',     path: '#' },
  { name: 'Zalo: 0987 654 321',     path: '#' },
  { name: 'Email: hello@ironman.vn', path: '#' },
  { name: 'Cửa hàng Hà Nội',         path: '#' },
  { name: 'Cửa hàng TP.HCM',         path: '#' },
];

export const NEWSLETTER_TAGS: string[] = [
  'Đồng Hồ', 'Zippo', 'Kính Mắt', 'Da Thuộc',
];
