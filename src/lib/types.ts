export interface Book {
  name: string;
  source: 'Tiki' | 'Fahasa';
  id: string;
  sku?: string;
  url: string;
  seller?: string;
  thumbnailUrl?: string;
  sold?: number;
}

export interface ScanResult {
  results: Book[];
  warnings?: object;
}

/**
 * TIKI
 * ============================================================================
 */

export interface TikiProduct {
  id: number;
  sku: string;
  name: string;
  url_key: string;
  url_path: string;
  availability: number;
  seller_id: number;
  seller_name: string;
  price: number;
  original_price: number;
  badges_new: TikiBadge[];
  badges_v3: TikiBadgeV3[];
  discount: number;
  discount_rate: number;
  rating_average: number;
  review_count: number;
  category_ids: number[];
  primary_category_path: string;
  primary_category_name: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  productset_id: number;
  seller_product_id: number;
  seller_product_sku: string;
  master_product_sku: string;
  quantity_sold?: {
    text: string;
    value: number;
  };
  shippable: boolean;
  isGiftAvailable: boolean;
  earliest_delivery_estimate?: string;
  fastest_delivery_time?: string;
  order_route?: string;
  is_tikinow_delivery: boolean;
  is_nextday_delivery: boolean;
  is_from_official_store: boolean;
  is_authentic: number;
  tiki_verified: number;
  tiki_hero: number;
  freeship_campaign?: string;
  impression_info: TikiImpressionInfo[];
  visible_impression_info: {
    amplitude: TikiAmplitudeInfo;
  };
  layout_type: string;
  is_high_price_penalty: boolean;
  is_top_brand: boolean;
}

export interface TikiBadge {
  placement: string;
  type: string;
  code: string;
  icon?: string;
  icon_width?: number;
  icon_height?: number;
  text?: string;
  text_color?: string;
  promotions?: {
    icon: string;
    icon_height: number;
    icon_width: number;
    text: string;
  }[];
}

export interface TikiBadgeV3 {
  placement: string;
  type: string;
  code: string;
  image: string;
}

export interface TikiImpressionInfo {
  impression_id: string;
  metadata: {
    request_id: string;
    params?: {
      include?: string;
      q?: string;
      limit?: string;
      aggregations?: string;
      trackity_id?: string;
    };
    delivery_zone: string;
    query: string;
    mpid: number;
    spid: number;
    quantity_sold: number;
    delivery_info_badge_text?: string;
    delivery_date?: string;
    astra_reward: number;
    price: number;
    discount_rate: number;
    rating: number;
    is_ad: number;
    is_official_store: number;
    is_trusted_store: number;
    is_tikinow: number;
    is_tikipro: number;
    is_astra_plus: number;
    position: number;
    tiki_verified: number;
    flags: Record<string, unknown>;
  };
}

export interface TikiAmplitudeInfo {
  seller_type: string;
  seller_id: number;
  all_time_quantity_sold: number;
  category_l1_name: string;
  category_l2_name: string;
  category_l3_name: string;
  category_l4_name?: string;
  is_best_offer_available: boolean;
  is_flash_deal: boolean;
  is_gift_available: boolean;
  master_product_sku: string;
  seller_product_id: number;
  seller_product_sku: string;
  number_of_reviews: number;
  order_route: string;
  partner_rewards_amount: number;
  price: number;
  primary_category_name: string;
  product_rating: number;
  search_rank: number;
  tiki_verified: number;
  is_authentic: number;
  standard_delivery_estimate: number;
  earliest_delivery_estimate: number;
  tikipro_delivery_estimate: number;
  tikinow_delivery_estimate: number;
  layout: string;
  variant: boolean;
  ineligible_coupon_rule_id?: number;
  discounted_by_rule_ids?: string;
  is_hero: boolean;
  is_imported: boolean;
  is_high_price_penalty: boolean;
  deboosted_high_price_diff_position: number;
  joined_strategy_rerank: boolean;
  is_freeship_xtra: boolean;
  is_top_brand: boolean;
}

/**
 * FAHASA
 * ============================================================================
 */

export interface FahasaRawValue<T> {
  raw: T | null;
}

export interface FahasaMetaData {
  id: string;
  engine: string;
  score: number;
}

export interface FahasaProduct {
  soon_release: FahasaRawValue<number>;
  stock_status: FahasaRawValue<number>;
  num_orders_month: FahasaRawValue<number>;
  type_id: FahasaRawValue<string>;
  sku: FahasaRawValue<string>;
  link: FahasaRawValue<string>;
  subscribes: FahasaRawValue<null>;
  original_price: FahasaRawValue<number>;
  price: FahasaRawValue<number>;
  discount: FahasaRawValue<number>;
  display_episode: FahasaRawValue<null>;
  rating_summary: FahasaRawValue<number>;
  episode: FahasaRawValue<null>;
  series_id: FahasaRawValue<null>;
  rating_count: FahasaRawValue<number>;
  thumbnail: FahasaRawValue<string>;
  title: FahasaRawValue<string>;
  id: FahasaRawValue<string>;
  _meta: FahasaMetaData;
}

export interface FahasaSearchMeta {
  alerts: string[];
  warnings: string[];
  precision: number;
  engine: {
    name: string;
    type: string;
  };
  page: {
    current: number;
    total_pages: number;
    total_results: number;
    size: number;
  };
  request_id: string;
}

export interface FahasaSearchResponse {
  meta: FahasaSearchMeta;
  results: FahasaProduct[];
}
