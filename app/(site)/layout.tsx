import { LangProvider } from "@/components/lang";
import { Header } from "@/components/header";
import { ShaderFilters } from "@/components/shader-backdrop";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ShaderFilters />
      <LangProvider>
        <Header />
        {children}
      </LangProvider>
    </>
  );
}
