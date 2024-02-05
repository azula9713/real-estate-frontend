import rawCityData from "../data/cities-and-postalcode-by-district.json";

interface ICity {
  city: string;
  code: string;
}

type IDistrict = keyof typeof rawCityData;

export type { ICity, IDistrict };
