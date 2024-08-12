export default function PageBackground({ children }) {
  return (
    <div className="home-page-main  h-dvh w-dvw">
      <div className="home-page-main-overlay mobile-nav-is-open flex flex-col items-center justify-center pt-16">
        {children}
      </div>
    </div>
  );
}
