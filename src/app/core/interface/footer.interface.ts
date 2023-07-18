export interface Footer {
  logo?: string;
  description?: string;
  descriptionLink?: FooterLink;
  menu?: FooterLink[];
  copyright?: string;
  menuHeading?: string;
}

export interface FooterLink {
  target?: string;
  link?: string;
  text?: string;
}
