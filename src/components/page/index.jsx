export default function Page({ title, children }) {
  document.title = `${title} - Ax Nguyen TTX`;

  return <>{children}</>;
}
