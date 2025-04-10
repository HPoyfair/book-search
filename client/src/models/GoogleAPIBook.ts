export interface GoogleAPIVolumeInfo {
  title: string;
  authors?: string[]; // made optional to match your fallback logic
  description?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  infoLink?: string; // ✅ Add this to support link: book.volumeInfo.infoLink
}

export interface GoogleAPIBook {
  id: string;
  volumeInfo: GoogleAPIVolumeInfo;
}
