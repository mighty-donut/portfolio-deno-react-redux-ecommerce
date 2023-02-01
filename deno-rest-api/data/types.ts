export type Item = {
  id: number;
  quantity: number;
};

export type Product = {
  product_id: number;
  sku: string;
  gtin: string;
  gtin_12: string;
  category_id: number;
  sub_cat_id: number | null;

  title: string;
  brand: string;
  model: string;
  color: string;

  retail_price: number;
  sale_price: number;
  currency: string;

  thumbnail: string;
  images: string[];
  manual_url: string;
  page_url: string;

  prod_condition: string;
  stock_state: string;
  new_state: number;
  promo_state: number;
  sale_state: number;
  rating: number;

  hidden_state: boolean;
  size: string;
  weight: string;
  shipment_size: string;
  shipment_weight: string;
  supplyment_date: string;
  made_in: string;
  unit_pricing_measure: string;
  extra_info: string;
};

export type Department = {
  dep_id: number;
  title: string;
  img_url_big: string;
  img_url_small: string;
};

export type Category = {
  category_id: number;
  department_id: number;
  title: string;
  img_url_big: string;
  img_url_small: string;
};

export type SubCategory = {
  sub_cat_id: number;
  department_id: number;
  category_id: number;
  title: string;
  img_url_big: string;
  img_url_small: string;
};

export type Customer = {
  customer_id: number;
  email: string;
  password: string;
  phone: string;
  lastName: string;
  firstName: string;
  middleName: string;
  createdAt: Date;
  updatedAt: Date;
};

// ?
export type Address = {
  city: string;
  street: string;
};


// ?
export type OrderType = {
  order_id: number;
  customer_id: number;
  address: Address | {};
  items: Product[];
  totalAmount: number;
};


