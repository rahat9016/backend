const validateObjectIdsExist = async (model: any, ids: string[]) => {
  const count = await model.countDocuments({ _id: { $in: ids } });
  return count === ids.length;
};

export default validateObjectIdsExist