import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Substitua 'https://jessicanatalia.com.br' pelo domínio oficial quando estiver no ar
  const baseUrl = 'https://jessicanataliapersonal.com.br'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Adicione outras rotas internas do seu site aqui se criar novas páginas no futuro:
    // {
    //   url: `${baseUrl}/sobre`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
