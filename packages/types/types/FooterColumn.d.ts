export type FooterColumnItem = {
  text: string;
  slug: string;
};

export type FooterColumn = {
  title: string;
  slug: string;
  items: FooterColumnItem[];
};
