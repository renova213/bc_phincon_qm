export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const ResponseUtil = {
  success: <T>(data: T, message?: string): ApiResponse<T> => {
    return {
      success: true,
      data,
      message,
    };
  },

  error: (error: string): ApiResponse<null> => {
    return {
      success: false,
      error,
    };
  },
};
