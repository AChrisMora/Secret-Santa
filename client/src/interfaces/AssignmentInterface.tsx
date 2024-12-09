export interface Assignment {
  giver: string;
  receiver: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}