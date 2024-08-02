export default function PageBackground({ children }) {
  return (
    <div className="home-page-main h-dvh w-dvw">
      <div className="home-page-main-overlay flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
