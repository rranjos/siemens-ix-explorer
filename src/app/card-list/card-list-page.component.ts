import { Component } from '@angular/core';
import { CardListComponent } from './card-list.component';
import { CardItem } from './types';

@Component({
  selector: 'app-card-list-page',
  standalone: true,
  imports: [CardListComponent],
  template: `
    <div style="padding: 8px 12px;">
      <h1>Siemens IX Card List Explorer</h1>
      <lib-card-list [cards]="sampleCards" title="Sample Cards">
      </lib-card-list>
    </div>
  `,
})
export class CardListPageComponent {
  sampleCards: CardItem[] = [
    {
      id: '1',
      type: 'video',
      heading: 'Video Card 1',
      subheading: 'Sample video content',
      videoThumbnail:
        'https://assets.new.siemens.com/siemens/assets/api/uuid:e852d6d5-0e8b-4898-8202-015954ef4eb3/width:1125/quality:high/image-description.jpeg',
      duration: '5:30',
    },
    {
      id: '2',
      type: 'download',
      heading: 'Download Card 2',
      subheading: 'Sample download file',
      downloadUrl: '#',
      linkThumbnail:
        'https://assets.new.siemens.com/siemens/assets/api/uuid:6f9e5912-3b22-4b8b-99a7-f5a68e68c967/width:1920/quality:high/2n-hero-png.webp',
      fileName: 'sample-file.pdf',
      fileType: 'PDF',
    },
    {
      id: '3',
      type: 'link',
      heading: 'Link Card 3',
      subheading: 'External link example',
      url: 'https://example.com',
      linkThumbnail:
        'https://assets.new.siemens.com/siemens/assets/api/uuid:7ec73662-4d0d-4aae-81d5-899191f29772/width:1920/quality:high/cc-us-bt-cpp-aviation-image.webp',
    },
    {
      id: '4',
      type: 'video',
      heading: 'Video Card 4',
      subheading: 'Another video sample',
      videoThumbnail:
        'https://assets.new.siemens.com/siemens/assets/api/uuid:2032873f-fd16-4797-ac18-597f9704eb60/width:1920/quality:high/24-vision-visual.webp',
      duration: '3:45',
    },
    {
      id: '5',
      type: 'download',
      heading: 'Download Card 5',
      subheading: 'Document download',
      downloadUrl: '#',
      fileName: 'document.docx',
      linkThumbnail:
        'https://assets.new.siemens.com/siemens/assets/api/uuid:2cf883ff-4f63-4855-b9c4-27e8be5cf9fd/width:1125/quality:high/30C-Tax-CreditEV-Charging.webp',
    },
  ];
}
