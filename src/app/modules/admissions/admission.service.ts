import { Admission } from './admission.model';
import { IAdmission, IPaginationAdmission } from './auth.interface';

const studentAdmission = async (
  payload: IAdmission
): Promise<IAdmission | null> => {
  const result = await Admission.create(payload);
  return result;
};

const getAllStudentAdmission = async (
  skip: number,
  limit: number
): Promise<IPaginationAdmission | null> => {
  const result = await Admission.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 })
    .select(
      'firstName middleName lastName nickName gender nationality phone email address gradeApplyingFor yearApplyingFor currentSchoolName ' +
        'parentTitle parentFirstName parentMiddleName parentLastName parentRelation parentNationality parentPhone parentEmail parentAddress ' +
        'referralSource comments createdAt updatedAt'
    );
  const total = await Admission.countDocuments();
  return { data: result, total };
};

export const AdmissionService = {
  studentAdmission,
  getAllStudentAdmission,
};
