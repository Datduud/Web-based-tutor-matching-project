"use client";
import { useEffect, useState } from "react";
import SignInModal from "../modals/sign-in-modal";
import ProfileModal from "../modals/profile-modal";
import AddSubjectModal from "../modals/add-subject-modal";
import AddQualificationModal from "../modals/add-qualification-modal";
import AddAvailableTimeModal from "../modals/add-available-time";
import ScheduleModal from "../modals/schedule-modal";
import ChangeAvatarModal from "../modals/change-profile-picture";
import DeleteSubjectModal from "../modals/delete-subject-modal";
import EditQualificationModal from "../modals/edit-qualification-modal";
import DeleteAvailableTimeModal from "../modals/delete-available-time-modal";
import ReviewModal from "../modals/review-modal";
import EditDescriptionModal from "../modals/edit-description-modal";
import EditNameModal from "../modals/edit-name-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SignInModal />
      <ProfileModal />
      <AddSubjectModal />
      <AddQualificationModal />
      <AddAvailableTimeModal />
      <ScheduleModal />
      <ChangeAvatarModal />
      <DeleteSubjectModal />
      <EditQualificationModal />
      <EditDescriptionModal />
      <DeleteAvailableTimeModal />
      <ReviewModal />
      <EditNameModal />
    </>
  );
};

export default ModalProvider;
