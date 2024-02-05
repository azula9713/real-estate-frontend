import rawCityData from "../data/cities-and-postalcode-by-district.json";
import { IDistrict } from "../interfaces/CityInterface";

const getAllCities = () => {
  const cities = Object.values(rawCityData).flat();
  return cities;
};

const getAllDistricts = () => {
  const districts = Object.keys(rawCityData);
  return districts as IDistrict[];
};

const getCityByPostalCode = (postalCode: string) => {
  const cities = getAllCities();
  const city = cities.find((city) => city.code === postalCode);
  return city;
};

const getCitiesByDistrict = (district: IDistrict | "all") => {
  if (district === "all") {
    return [];
  }
  const cities = rawCityData[district];

  return cities;
};

const CityUtils = {
  getAllCities,
  getAllDistricts,
  getCityByPostalCode,
  getCitiesByDistrict,
};

export default CityUtils;
