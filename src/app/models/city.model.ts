export type CitiesResponse = City[]

export interface City {
  id: number
  name: string
  state_name: string
  country_code: string
  country_name: string
}