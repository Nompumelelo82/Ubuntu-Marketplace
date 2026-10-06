export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  seller: string;
  sellerId?: string;
  verifiedSeller: boolean;
  description: string;
  rating: number;
  reviewCount: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Calculus Textbook (3rd Edition)",
    price: 350,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop",
    category: "Textbooks",
    condition: "Good",
    seller: "Thabo M.",
    verifiedSeller: true,
    description:
      "Well-kept calculus textbook, used for one semester. No missing pages, light highlighting in chapters 1-3.",
    rating: 4.5,
    reviewCount: 12,
  },
  {
    id: "2",
    name: "HP Laptop 15-inch",
    price: 4500,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    category: "Electronics",
    condition: "Like New",
    seller: "Aisha K.",
    verifiedSeller: true,
    description:
      "8GB RAM, 256GB SSD, barely used. Comes with charger and a laptop sleeve.",
    rating: 5,
    reviewCount: 8,
  },
  {
    id: "3",
    name: "Study Desk & Chair Set",
    price: 800,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    category: "Furniture",
    condition: "Fair",
    seller: "Sipho N.",
    verifiedSeller: false,
    description:
      "Compact desk and chair, ideal for a res room. Some scuff marks but sturdy.",
    rating: 4,
    reviewCount: 5,
  },
  {
    id: "4",
    name: "Scientific Calculator",
    price: 180,
    image: "https://placehold.co/400x400/FFF8F2/772953?text=Calculator",
    category: "Textbooks",
    condition: "Good",
    seller: "Lerato P.",
    verifiedSeller: true,
    description: "Casio scientific calculator, works perfectly, all functions tested.",
    rating: 4.8,
    reviewCount: 20,
  },
];

export type CommunityPost = {
  id: string;
  title: string;
  description: string;
  category: "Events" | "Announcements" | "Services";
  date: string;
  postedBy: string;
  status: "Active" | "Closed";
};

export const communityPosts: CommunityPost[] = [
  {
    id: "1",
    title: "CPUT Student Market Day",
    description:
      "Join us on the main campus quad for a student-run market day featuring food, crafts and second-hand goods.",
    category: "Events",
    date: "2026-10-04",
    postedBy: "Student Council",
    status: "Active",
  },
  {
    id: "2",
    title: "Campus Notice: Library Hours Extended",
    description:
      "The library will be open until midnight during exam season starting next week.",
    category: "Announcements",
    date: "2026-09-28",
    postedBy: "CPUT Admin",
    status: "Active",
  },
  {
    id: "3",
    title: "Student Tutoring Service — Maths & Physics",
    description:
      "Offering affordable one-on-one tutoring for first and second year Maths and Physics modules.",
    category: "Services",
    date: "2026-09-20",
    postedBy: "Karabo S.",
    status: "Active",
  },
];

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Failed";
  paymentStatus: "Paid" | "Failed" | "Pending";
  date: string;
};

export const orders: Order[] = [
  {
    id: "ORD-1001",
    items: [{ productId: "1", name: "Calculus Textbook (3rd Edition)", price: 350, quantity: 1 }],
    total: 350,
    status: "Completed",
    paymentStatus: "Paid",
    date: "2026-09-10",
  },
  {
    id: "ORD-1002",
    items: [{ productId: "4", name: "Scientific Calculator", price: 180, quantity: 2 }],
    total: 360,
    status: "Shipped",
    paymentStatus: "Paid",
    date: "2026-09-15",
  },
];

export type Notification = {
  id: string;
  type: "Marketplace" | "Payment" | "Community" | "Account";
  message: string;
  date: string;
  read: boolean;
};

export const notifications: Notification[] = [
  { id: "1", type: "Marketplace", message: "Your order has been placed.", date: "2026-09-15", read: false },
  { id: "2", type: "Payment", message: "Your payment was successful.", date: "2026-09-15", read: false },
  { id: "3", type: "Community", message: "A new community announcement has been posted.", date: "2026-09-14", read: true },
  { id: "4", type: "Account", message: "Your vendor verification status has changed.", date: "2026-09-10", read: true },
];

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Faculty" | "Resident" | "Vendor" | "Admin";
  status: "Active" | "Suspended";
};

export const adminUsers: AdminUserRow[] = [
  { id: "1", name: "Thabo Mokoena", email: "thabo@cput.ac.za", role: "Student", status: "Active" },
  { id: "2", name: "Aisha Khan", email: "aisha@cput.ac.za", role: "Faculty", status: "Active" },
  { id: "3", name: "Sipho Ndlovu", email: "sipho@gmail.com", role: "Resident", status: "Active" },
  { id: "4", name: "Lerato Phiri", email: "lerato@cput.ac.za", role: "Student", status: "Suspended" },
];

export type VendorRow = {
  id: string;
  businessName: string;
  owner: string;
  verified: boolean;
  listings: number;
};

export const vendors: VendorRow[] = [
  { id: "1", businessName: "Campus Tech Traders", owner: "Aisha Khan", verified: true, listings: 12 },
  { id: "2", businessName: "Second Chance Furniture", owner: "Sipho Ndlovu", verified: false, listings: 4 },
];

export type Review = {
  id: string;
  productName: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  { id: "1", productName: "HP Laptop 15-inch", reviewer: "Thabo M.", rating: 5, comment: "Exactly as described, great condition!", date: "2026-09-12" },
  { id: "2", productName: "Calculus Textbook (3rd Edition)", reviewer: "Karabo S.", rating: 4, comment: "Good book, a bit of highlighting but fine.", date: "2026-09-08" },
];