import CustomCursor from "./CustomCursor";

export default function Layout({ children }) {
  return (
    <div>
      <CustomCursor />
      {children}
    </div>
  );
}
