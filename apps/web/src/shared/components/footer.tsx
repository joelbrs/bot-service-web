export function Footer(): JSX.Element {
  return (
    <footer className="text-sm dark:text-white text-center py-5 mt-5 border-t w-full">
      Painel do parceiro © BOT - {new Date().getFullYear()}
    </footer>
  );
}
