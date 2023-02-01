const products = [
  {
    product_id: 1,
    sku: "123456",
    category_id: 1,
    sub_cat_id: 1,
    title: "Напольная акустика",
    brand: "DALI",
    model: "Opticon 6 MKII",
    color: "Black",
    retail_price: 189990,
    unit_pricing_measure: 'пара',
    currency: "₽",
    thumbnail: "http://localhost:8000/images/products/1/dali-opticon-6-mk2-black.webp",
    images: [
      "http://localhost:8000/images/products/1/dali-opticon-6-mk2-black.webp",
  
      "https://images.unsplash.com/photo-1480926965639-9b5f63a0817b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1494791368093-85217fbbf8de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1551405780-03882d5a2ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1562059392-096320bccc7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1478359844494-1092259d93e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1514999037859-b486988734f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1509477887414-681937645173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1454783904586-9fa42a1e8442?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1530539595977-0aa9890547c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  
      "https://images.unsplash.com/photo-1542262868-cec49cce6571?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    ],
    prod_condition: "Brand New",
    stock_state: "В наличии",
    new_state: 1,
    promo_state: 0,
    sale_state: 0,
    rating: 5,
  },
  {
    product_id: 2,
    sku: "123457",
    category_id: 2,
    sub_cat_id: 3,
    title: "Интегральный усилитель",
    brand: "Rotel",
    model: "RA-1572MKII",
    color: "Black",
    retail_price: 157990,
    unit_pricing_measure: 'шт.',
    currency: "₽",
    thumbnail: "http://localhost:8000/images/products/2/RA-1572MKII_black-FRONT.webp",
    images: [
      "http://localhost:8000/images/products/2/RA-1572MKII_black-FRONT.webp",
    ],
    prod_condition: "B-stock",
    stock_state: "Снят с производства",
    new_state: 0,
    promo_state: 0,
    sale_state: 1,
    rating: 4,
  },
  {
    product_id: 3,
    sku: "123458",
    category_id: 4,
    sub_cat_id: 5,
    title: "Проигрыватель винила",
    brand: "Pro-Ject",
    model: "Debut Carbon EVO",
    color: "Walnut",
    retail_price: 44990,
    unit_pricing_measure: 'шт.',
    currency: "₽",
    thumbnail: "http://localhost:8000/images/products/3/EVO-(2M-Red)-Wal.jpg", 
    images: [
      "http://localhost:8000/images/products/3/EVO-(2M-Red)-Wal.jpg",
  
      "http://localhost:8000/images/products/3/carbon_evo_back.jpg",
  
      "http://localhost:8000/images/products/3/Debut-Carbon-EVO-Platter-TPE.78553a5e.jpg",
  
      "http://localhost:8000/images/products/3/Debut-Carbon-Evo-motor.jpg",
    ],
    prod_condition: "Brand New",
    stock_state: "В наличии",
    new_state: 0,
    promo_state: 1,
    sale_state: 0,
    rating: 3,
  },
  {
    product_id: 4,
    sku: "123459",
    category_id: 3,
    sub_cat_id: null,
    title: "AV Ресивер",
    brand: "Denon",
    model: "AVC-X3700H",
    color: "Black",
    retail_price: 186990,
    unit_pricing_measure: 'шт.',
    currency: "₽",
    thumbnail: "http://localhost:8000/images/products/4/avcx3700-denon-avc-x3700h-9-2-channel-8k-av-receiver.jpg",
    images: [
      "http://localhost:8000/images/products/4/avcx3700-denon-avc-x3700h-9-2-channel-8k-av-receiver.jpg",
      "http://localhost:8000/images/products/4/avcx3700-denon-avc-x3700h-9-2-channel-8k-av-receiver-2.jpg",
      "http://localhost:8000/images/products/4/avcx3700-denon-avc-x3700h-9-2-channel-8k-av-receiver-3.jpg",
      "http://localhost:8000/images/products/4/avcx3700-denon-avc-x3700h-9-2-channel-8k-av-receiver-4.jpg",
    ],
    prod_condition: "Brand New",
    stock_state: "Предзаказ (2-4 недели)",
    new_state: 0,
    promo_state: 0,
    sale_state: 0,
    rating: 5,
  },
  {
    product_id: 5,
    sku: "123460",
    category_id: 3,
    sub_cat_id: null,
    title: "AV Ресивер",
    brand: "Denon",
    model: "AVC-X1700H",
    color: "Black",
    retail_price: 119990,
    unit_pricing_measure: 'шт.',
    currency: "₽",
    thumbnail: "http://localhost:8000/images/products/5/avr-x1700h-front.jpg",
    images: [
      "http://localhost:8000/images/products/5/avr-x1700h-back.jpg",
    ],
    prod_condition: "Brand New",
    stock_state: "В наличии",
    new_state: 0,
    promo_state: 0,
    sale_state: 0,
    rating: 3.5,
  },
  {
    product_id: 6,
    sku: "123461",
    category_id: 1,
    sub_cat_id: 2,
    title: "Полочная акустика",
    brand: "B&W",
    model: "607 S2 Anniversary Edition",
    color: "Black",
    retail_price: 57990,
    unit_pricing_measure: 'пара',
    currency: "₽",
    thumbnail: "http://localhost:8000/images/products/6/b-w607-s-2-anniversary-black.jpg",
    images: [
      "http://localhost:8000/images/products/6/b-w607-s-2-anniversary-black.jpg",
    ],
    prod_condition: "Brand New",
    stock_state: "В наличии",
    new_state: 0,
    promo_state: 0,
    sale_state: 0,
    rating: 5,
  },
];

export default products;


