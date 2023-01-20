const getErrorText = (error: any) => {
  if ("code" in error && "meta" in error) {
    // Get error code
    if (error.code === "P2002") {
      return "Can't measure twice for the same day";
    }

    return `Database error ${error.code}, meta = \'${JSON.stringify(
      error.meta
    )}\'`;
  }

  return JSON.stringify(error);
};

export default getErrorText;
