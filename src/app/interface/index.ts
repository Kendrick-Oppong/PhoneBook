export interface SignUpDataType {
  username: string | null;
  email: string | null;
  password: string | null;
  confirm_password: string | null;
}

export interface SignInDataType {
  email: string;
  password: string;
}



export interface Address {
  id: string;
  city: string;
  state: string;
  street: string;
  country: string;
  contact_id: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  contact_id: string;
  phone_type: string;
}

export interface SocialLinks {
  id: string;
  twitter: string;
  website: string;
  linkedin: string;
  contact_id: string;
}

export interface ContactType {
  id: string;
  name: string;
  profile_image: string;
  position: string;
  company: string;
  email: string;
  secondary_email: string;
  notes: string;
  birthday: string;
  favorite: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  group: string;
  tags: string[];
  addresses: Address;
  contact_info: ContactInfo;
  social_links: SocialLinks;
}

