export type CardType = 'video' | 'download' | 'link';

export interface CardItem {
  id: string;
  type: CardType;
  heading: string;
  subheading: string;
  notification?: string;
  url?: string;
  downloadUrl?: string;
  fileName?: string;
  fileType?: string;
  videoThumbnail?: string;
  linkThumbnail?: string;
  duration?: string;
}

export interface CardActionEvent {
  card: CardItem;
  action: 'play' | 'download' | 'open';
}
