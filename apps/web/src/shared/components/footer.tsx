export function Footer(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-10">
      <footer className="text-sm dark:text-white text-center py-10 mt-5 border-t w-[60vw]">
        Painel do parceiro © Bot - {new Date().getFullYear()}
      </footer>
    </div>
  );
}
