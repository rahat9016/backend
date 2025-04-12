import { ILetsTalk } from './letsTalk.interface';
import TalkForm from './LetsTalk.model';

const createLetsTalk = async (
  payload: ILetsTalk
): Promise<ILetsTalk | null> => {
  const result = await TalkForm.create(payload);
  return result;
};

export const LetsTalkService = {
  createLetsTalk,
};
