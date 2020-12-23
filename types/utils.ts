export type OmitDataProp<T extends { data: any }, K extends keyof any> = Omit<T, 'data'> & {
  data: Omit<T['data'], K>
}

export type RemoveUser<T extends { data: { user: any } }> = OmitDataProp<T, 'user'>
