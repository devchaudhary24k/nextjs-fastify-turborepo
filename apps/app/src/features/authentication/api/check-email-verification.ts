type CheckEmailVerificationProps = {
  id: string;
  email: string;
};

export const checkEmailVerification = async (
  props: CheckEmailVerificationProps,
) => {
  const { id, email } = props;

  const res = await fetch(
    `/api/v1/user/check-email-verification/?id=${id}&email=${email}`,
  );
  if (!res.ok) return { error: true };
  return await res.json();
};
