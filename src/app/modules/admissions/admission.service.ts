import { Admission, Appointment, PreRegisterSchema, SchoolTourBooking } from './admission.model';
import {
  IAdmission,
  IAppointment,
  IPaginationAdmission,
  IPreRegister,
  ISchoolTourBooking,
} from './auth.interface';

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

const OnlineAppointment = async (
  payload: IAppointment
): Promise<IAppointment | null> => {
  const result = await Appointment.create(payload);
  return result;
};

const schoolTourBooking = async (
  payload: ISchoolTourBooking
): Promise<ISchoolTourBooking | null> => {
  const result = await SchoolTourBooking.create(payload);
  return result;
};
const preRegister = async (
  payload: IPreRegister
): Promise<IPreRegister | null> => {
  const result = await PreRegisterSchema.create(payload);
  return result;
};
export const AdmissionService = {
  studentAdmission,
  getAllStudentAdmission,
  OnlineAppointment,
  schoolTourBooking,
  preRegister
};
