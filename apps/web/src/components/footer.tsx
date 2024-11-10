export function Footer(): JSX.Element {
  return (
    <footer className="text-sm dark:text-white text-center py-5 border-t fixed bottom-0 w-full">
      Painel do parceiro © BOT - {new Date().getFullYear()}
    </footer>
  );
}
