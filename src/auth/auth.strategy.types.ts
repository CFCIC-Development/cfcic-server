export interface FacebookProfileDeconstructed {
  name?: { familyName: string; givenName: string };
  emails?: { value: string; type?: string }[];
  photos?: { value: string }[];
  provider: string;
}

export interface GoogleProfileDeconstructed {
  name?: { familyName: string; givenName: string };
  emails?: { value: string; verified?: boolean }[];
  photos?: { value: string }[];
}
