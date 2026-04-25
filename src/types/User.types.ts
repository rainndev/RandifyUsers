export type MenuItem = {
  image: string;
  link: string;
  title: string;
  description: string;
  userDetails: {
    gender: string;
    email: string;
    phone: string;
    cell: string;
    nationality: string;
    age: number;
    birthDate: string;
    registeredDate: string;
    username: string;
    uuid: string;
    idName: string;
    idValue: string | null;
    location: {
      street: string;
      city: string;
      state: string;
      country: string;
      postcode: number | string;
      latitude: string;
      longitude: string;
      timezoneOffset: string;
      timezoneDescription: string;
    };
  };
};

export type RandomUser = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

export type RandomUserInfo = {
  seed: string;
  results: number;
  page: number;
  version: string;
};

export type RandomUserResponse = {
  results: RandomUser[];
  info: RandomUserInfo;
};

export type UserDetails = {
  gender: string;
  email: string;
  phone: string;
  cell: string;
  nationality: string;
  age: number;
  birthDate: string;
  registeredDate: string;
  username: string;
  uuid: string;
  idName: string;
  idValue: string | null;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    latitude: string;
    longitude: string;
    timezoneOffset: string;
    timezoneDescription: string;
  };
};

export type TabKey = "overview" | "contact" | "location" | "account";
