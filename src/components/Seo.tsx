import { Helmet } from "react-helmet-async";
import { business } from "@/content/business";
import type { SeoData } from "@/content/seo";

interface SeoProps extends SeoData {
  noindex?: boolean;
}

const Seo = ({ title, description, canonicalPath, jsonLd, noindex }: SeoProps) => {
  const canonicalUrl = `${business.siteUrl}${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
