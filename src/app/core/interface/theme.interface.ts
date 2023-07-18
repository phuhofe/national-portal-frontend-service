import { ImageAlignment, ThemeColorTypes } from 'src/app/app.config';

export interface Theme {
  id: number;
  logo: {
    imageUrl: string;
    align: ImageAlignment;
    display: boolean;
  };
  banner: {
    imageUrl: string;
    align: ImageAlignment;
    display: boolean;
  };
  colors: {
    type: ThemeColorTypes;
    baseColor: string;
    palette: {};
  }[];
}
