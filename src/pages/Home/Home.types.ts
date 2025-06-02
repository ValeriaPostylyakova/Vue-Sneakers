export type TSortSearchSelected = 'title' | 'price' | '-price'

export type TFilters = {
  sortBy: TSortSearchSelected
  searchQuery: string
}

export type TFetchParams = {
  sortBy: TSortSearchSelected
  title: string
}
