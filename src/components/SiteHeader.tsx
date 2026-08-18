import { getSiteSettings, publicAssetUrl } from '@/lib/site-settings';
import Header from '@/components/Header';

export default async function SiteHeader() {
  const settings = await getSiteSettings();

  return (
    <Header
      settings={{
        ...settings,
        logoUrl: settings.logoPath ? publicAssetUrl(settings.logoPath) : '/logo.png',
        musicUrl: settings.musicPath ? publicAssetUrl(settings.musicPath) : '',
      }}
    />
  );
}
