import type { Schema, Struct } from '@strapi/strapi';

export interface ImageImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_image_image_blocks';
  info: {
    displayName: 'Image Block';
    icon: 'brush';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ImagesGalleryBlock extends Struct.ComponentSchema {
  collectionName: 'components_images_gallery_blocks';
  info: {
    displayName: 'Gallery Block';
    icon: 'archive';
  };
  attributes: {
    multipleMedia: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SectionsBoardSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_board_sections';
  info: {
    displayName: 'board-section';
    icon: 'code';
  };
  attributes: {
    boardMember: Schema.Attribute.Component<'shared.board-member', true>;
    period: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedBoardMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_board_members';
  info: {
    displayName: 'board-member';
    icon: 'user';
  };
  attributes: {
    fullName: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    role: Schema.Attribute.String;
  };
}

export interface TestArchive extends Struct.ComponentSchema {
  collectionName: 'components_test_archives';
  info: {
    displayName: 'archive';
    icon: 'archive';
  };
  attributes: {
    contentt: Schema.Attribute.Blocks;
    media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface TextRichText extends Struct.ComponentSchema {
  collectionName: 'components_text_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'attachment';
  };
  attributes: {
    text: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'image.image-block': ImageImageBlock;
      'images.gallery-block': ImagesGalleryBlock;
      'sections.board-section': SectionsBoardSection;
      'shared.board-member': SharedBoardMember;
      'test.archive': TestArchive;
      'text.rich-text': TextRichText;
    }
  }
}
