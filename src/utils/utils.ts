/** Generate a unique ID. */
export const uid = () => Math.random().toString(36).substring(2, 15);

/**
 * Create a delay.
 *
 * @param ms How long the delay should last in ms (default: 500).
 * @returns A promise that can be awaited.
 */
export const delay = async (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
