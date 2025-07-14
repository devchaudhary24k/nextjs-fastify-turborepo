type CheckEmailVerificationProps = {
  id: string;
};

export const checkEmailVerification = async (
  props: CheckEmailVerificationProps,
) => {
  const { id } = props;

  const res = await fetch(`/api/v1/user/check-email-verification/${id}`);
  if (!res.ok) return { error: true };
  return await res.json();
};
