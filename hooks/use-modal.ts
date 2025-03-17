import { AvailableTime, Qualification, Subject, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "signIn"
  | "profile"
  | "addSubject"
  | "addQualification"
  | "addAvailableTime"
  | "schedule"
  | "changeAvatar"
  | "deleteSubject"
  | "editQualification"
  | "editDescription"
  | "deleteAvailableTime"
  | "review"
  | "editName";

interface ModalData {
  user?: User | null;
  allSubjects?: Subject[];
  tutorInfo?: any;
  subjectToDelete?: any;
  qualification?: Qualification;
  availableTime?: AvailableTime;
  name?: string | undefined | null;
  senderId?: string;
  receiverId?: string;
  sessionId?: string;
  description?: string | undefined | null;
  userId?: string | undefined | null;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
