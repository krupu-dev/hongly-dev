export const Footer = () => {
  return (
    <footer className="mx-auto my-4 w-full max-w-7xl px-8 py-4 text-center text-[0.8rem] text-text-secondary dark:text-d-text-secondary font-comfortaa">
      <span>
        &copy; {new Date().getFullYear()} Hongly Dev
      </span>
    </footer>
  );
};

export default Footer;
