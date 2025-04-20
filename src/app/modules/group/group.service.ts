import { ICategory } from "./group.interface";
import Category from "./group.model";

const categoryCreate = async (
  payload: ICategory
): Promise<ICategory | null> => {
  const result = await Category.create(payload);
  return result;
};

export const GroupService = {
  categoryCreate
};
