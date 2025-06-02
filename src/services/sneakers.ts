import type { TFilters } from '@/pages/Home/Home.types.ts'
import type { Sneaker } from '../../@types/sneakers.ts'
import axios from 'axios'

export const fetchSneakers = async (filtersObj: TFilters, sneakers: Sneaker[]) => {
  try {
    const { data } = await axios.get<Sneaker[]>(
      `https://125448a15992a523.mokky.dev/sneakers?sortBy=${filters.sortBy}&title=*${filters.searchQuery}*`
    )
    return data
  } catch (e) {
    console.log(e)
  }
}
