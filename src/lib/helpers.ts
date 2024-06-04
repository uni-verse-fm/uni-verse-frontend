function selectClassValidatorErrors(
  field: string,
  errors?: Array<string> | string | undefined
): Array<string> {
  if (!errors) {
    return [];
  }
  if (!Array.isArray(errors)) {
    return errors.toLowerCase().startsWith(field) ? [errors] : [];
  }

  return errors.filter((e) => e.toLowerCase().startsWith(field));
}

export { selectClassValidatorErrors };
