export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  author: Author;
  featured?: boolean;
}

export const AUTHOR_VASUDEV: Author = {
  name: "Surya Pratap Singh",
  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
  role: "AI Engineer & Founder"
};
