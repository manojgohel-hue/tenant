// This runs on the server for every request
export async function generateMetadata({
  searchParams,
}){
    const searchParam = await searchParams;
    const tenantParam = searchParam.tenant;

  const tenant =
    typeof tenantParam === "string" && tenantParam.length > 0
      ? tenantParam
      : "default";


  return {
    title: tenant,
    description: tenant,
    openGraph: {
      title: tenant,
      description: tenant,
    },
    twitter: {
      card: "summary_large_image",
      title: tenant,
      description: tenant,
    },
  };
}

export default async function Home({ searchParams }) {
  const searchParam = await searchParams;
  const tenantParam = searchParam.tenant;
  const tenant =
    typeof tenantParam === "string" && tenantParam.length > 0
      ? tenantParam
      : "default";

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <h1>Hello {tenant}</h1>
    </div>
  );
}
