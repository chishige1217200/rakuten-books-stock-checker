export type MultiFormatItems = {
  item: {
    title: string;
    price: string;
    currency: string;
    category: string;
    category_label: string;
    limited_type: string;
    benefit_info?: {
      benefit: string;
      benefit_type: string;
      benefit_condition_type: string;
      benefit_label: string;
    }[];
    original_dlv_type?: number;
    original_dlv_label?: string;
    original_dlv_text?: string;
    delv_date_id: number;
    delv_date_label: string;
  };
  related_items?: {
    url: string;
    title: string;
    price: string;
    currency: string;
    category: string;
    category_label: string;
    limited_type: string;
    delv_date_id: 30;
    delv_date_label: string;
  }[];
  updated_date_time: string;
  related_item_count: number;
};
