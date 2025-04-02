/** Generate a unique ID. */
export const uid = () => Math.random().toString(36).substring(2, 15);

/**
 * Create a network delay between 300ms to 1000ms.
 *
 * @returns A promise that can be awaited.
 */
export const networkDelay = async (): Promise<void> => {
  const min = 300;
  const max = 1000;
  const delay = Math.floor(Math.random() * (max - min + 1) + min);
  new Promise((resolve) => setTimeout(resolve, delay));
};
