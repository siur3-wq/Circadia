import { BANNERS } from "./BannerData";
import { SHOP_BANNERS } from "./ShopData";

const ALL_BANNERS = [...BANNERS, ...SHOP_BANNERS];

export function getBannerById(id) {
  if (!id) return BANNERS[0];
  return ALL_BANNERS.find(b => b.id === id) || BANNERS[0];
}