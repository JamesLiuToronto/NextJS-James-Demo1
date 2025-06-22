import { z } from "zod";
import { Row } from "@tanstack/react-table";

export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
});

export const filterSchema = z.object({
  rowId: z.string(),
  id: z.string(),
  operator: z.string(),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  type: z.enum(["text", "number", "date", "boolean", "select", "multi-select"]),
});

/**
 * Creates a parser for TanStack Table sorting state.
 * @param originalRow The original row data to validate sorting keys against.
 * @returns A parser for TanStack Table sorting state.
 */
export const getSortingStateParser = <TData>(
  originalRow?: Row<TData>["original"]
) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null;

  return {
    parse: (value: string) => {
      try {
        const parsed = JSON.parse(value);
        const result = z.array(sortingItemSchema).safeParse(parsed);

        if (!result.success) return null;

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null;
        }

        return result.data as ExtendedSortingState<TData>;
      } catch {
        return null;
      }
    },
    serialize: (value: ExtendedSortingState<TData>) => JSON.stringify(value),
    eq: (a: ExtendedSortingState<TData>, b: ExtendedSortingState<TData>) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc
      ),
  };
};

type ExtendedSortingState<TData> = Array<{
  id: keyof TData;
  desc: boolean;
}>;