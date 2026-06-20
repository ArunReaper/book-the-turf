export interface Turf {
  id?: number;
  name: string;
  location: string;
  description: string;
  pricePerHour: number;
  contactNumber: string;
  imageUrl: string;
  sportsType: string;
  rating: number;
  ratingCount?: number;
  distance?: string;
  area?: string;
  address?: string;
  amenities?: string[];
  images?: string[];
  isBookable?: boolean;
  sportsTypes?: string[];
}
