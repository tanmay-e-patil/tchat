import SettingsNavbar from "./_components/SettingsNavbar";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-8">
        <SettingsNavbar></SettingsNavbar>
        {children}
      </div>
    </div>
  );
}
